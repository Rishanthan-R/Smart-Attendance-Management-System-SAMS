import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { sendSuccess, sendError } from '../utils/response.util';

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    
    if (!user || user.profile.role !== 'student') {
      sendError(res, 403, 'Access denied');
      return;
    }

    // 1. Enrolled modules count
    const { count: enrolledCount, error: enrollErr } = await supabaseAdmin
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('student_id', user.id);

    if (enrollErr) throw enrollErr;

    // Fetch enrolled module IDs for session filtering
    const { data: enrollments } = await supabaseAdmin
      .from('enrollments')
      .select('module_id')
      .eq('student_id', user.id);

    const enrolledModuleIds = enrollments?.map(e => e.module_id) || [];

    // 2. Attendance count
    const { count: attendanceCount, error: attErr } = await supabaseAdmin
      .from('attendance')
      .select('*', { count: 'exact', head: true })
      .eq('student_id', user.id);

    if (attErr) throw attErr;

    // 3. Sessions (Active and Upcoming)
    let activeSession = null;
    let upcomingSessions: any[] = [];
    let sessionsThisWeekCount = 0;

    if (enrolledModuleIds.length > 0) {
      const now = new Date().toISOString();
      const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

      // Get active sessions
      const { data: activeData, error: activeErr } = await supabaseAdmin
        .from('sessions')
        .select('*, modules ( name, code )')
        .in('module_id', enrolledModuleIds)
        .eq('status', 'active');

      if (activeErr) throw activeErr;
      if (activeData && activeData.length > 0) {
        // Find the one that hasn't expired, or just the first one
        // Typically there's only one active session for a student at a time
        activeSession = activeData[0];
      }

      // Get upcoming scheduled sessions (if they use scheduled_at or started_at in the future)
      // Since existing DB might not have scheduled_at, we will check started_at > now or status = 'scheduled'
      // Assuming 'status' could be 'scheduled' based on requirements, though we'll query for status != 'closed' and not active
      const { data: upcomingData, error: upcomingErr } = await supabaseAdmin
        .from('sessions')
        .select('*, modules ( name, code )')
        .in('module_id', enrolledModuleIds)
        .eq('status', 'scheduled')
        .gte('started_at', now)
        .order('started_at', { ascending: true });
        
      if (!upcomingErr && upcomingData) {
        upcomingSessions = upcomingData;
        sessionsThisWeekCount = upcomingData.filter(s => s.started_at <= oneWeekFromNow).length;
      }
    }

    sendSuccess(res, 200, 'Dashboard data retrieved', {
      enrolledModules: enrolledCount || 0,
      attendanceRecords: attendanceCount || 0,
      sessionsThisWeek: sessionsThisWeekCount,
      activeSession,
      upcomingSessions,
      hasActiveSession: !!activeSession
    });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const getAvailableModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    
    if (!user || user.profile.role !== 'student') {
      sendError(res, 403, 'Access denied');
      return;
    }

    const { department, batch } = user.profile;

    if (!department || !batch) {
      sendError(res, 400, 'Student profile is incomplete (missing department or batch)');
      return;
    }

    // Get modules matching department and batch
    const { data: modules, error: modErr } = await supabaseAdmin
      .from('modules')
      .select('*, profiles:lecturer_id(full_name)')
      .eq('department', department)
      .eq('batch', batch);

    if (modErr) {
      sendError(res, 500, 'Error fetching modules', modErr.message);
      return;
    }

    // Get current enrollments for the student
    const { data: enrollments, error: enrErr } = await supabaseAdmin
      .from('enrollments')
      .select('module_id')
      .eq('student_id', user.id);

    if (enrErr) {
      sendError(res, 500, 'Error fetching enrollments', enrErr.message);
      return;
    }

    const enrolledModuleIds = new Set(enrollments?.map(e => e.module_id) || []);

    // Merge status
    const availableModules = modules?.map(mod => ({
      ...mod,
      lecturer_name: mod.profiles?.full_name || 'Unknown',
      isEnrolled: enrolledModuleIds.has(mod.id)
    }));

    sendSuccess(res, 200, 'Available modules retrieved', { modules: availableModules });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const enrollModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { moduleId } = req.body;
    
    if (!user || user.profile.role !== 'student') {
      sendError(res, 403, 'Access denied');
      return;
    }

    const { department, batch } = user.profile;

    // Verify module exists and matches department/batch
    const { data: moduleData, error: modErr } = await supabaseAdmin
      .from('modules')
      .select('id')
      .eq('id', moduleId)
      .eq('department', department)
      .eq('batch', batch)
      .single();

    if (modErr || !moduleData) {
      sendError(res, 400, 'Module not available for enrollment');
      return;
    }

    // Verify not already enrolled
    const { data: existing, error: existErr } = await supabaseAdmin
      .from('enrollments')
      .select('id')
      .eq('student_id', user.id)
      .eq('module_id', moduleId)
      .single();

    if (existing) {
      sendError(res, 400, 'Already enrolled in this module');
      return;
    }

    // Insert enrollment
    const { error: insertErr } = await supabaseAdmin
      .from('enrollments')
      .insert([{ student_id: user.id, module_id: moduleId }]);

    if (insertErr) {
      sendError(res, 500, 'Error enrolling in module', insertErr.message);
      return;
    }

    sendSuccess(res, 201, 'Successfully enrolled in module', null);
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const getSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    
    if (!user || user.profile.role !== 'student') {
      sendError(res, 403, 'Access denied');
      return;
    }

    // Get enrolled modules
    const { data: enrollments, error: enrErr } = await supabaseAdmin
      .from('enrollments')
      .select('module_id')
      .eq('student_id', user.id);

    if (enrErr) {
      sendError(res, 500, 'Error fetching enrollments', enrErr.message);
      return;
    }

    const enrolledModuleIds = enrollments?.map(e => e.module_id) || [];
    
    let activeSession = null;
    let upcomingSessions: any[] = [];

    if (enrolledModuleIds.length > 0) {
      const now = new Date().toISOString();

      // Active Session
      const { data: activeData, error: activeErr } = await supabaseAdmin
        .from('sessions')
        .select('*, modules(name, code), profiles:lecturer_id(full_name)')
        .in('module_id', enrolledModuleIds)
        .eq('status', 'active');

      if (activeErr) throw activeErr;
      if (activeData && activeData.length > 0) {
        activeSession = activeData[0];
      }

      // Upcoming Sessions
      const { data: upcomingData, error: upcomingErr } = await supabaseAdmin
        .from('sessions')
        .select('*, modules(name, code), profiles:lecturer_id(full_name)')
        .in('module_id', enrolledModuleIds)
        .eq('status', 'scheduled')
        .gte('started_at', now)
        .order('started_at', { ascending: true });

      if (upcomingErr) throw upcomingErr;
      if (upcomingData) {
        upcomingSessions = upcomingData;
      }
    }

    sendSuccess(res, 200, 'Sessions retrieved', { activeSession, upcomingSessions });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // metres
  const f1 = lat1 * Math.PI/180;
  const f2 = lat2 * Math.PI/180;
  const df = (lat2-lat1) * Math.PI/180;
  const dl = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(df/2) * Math.sin(df/2) +
            Math.cos(f1) * Math.cos(f2) *
            Math.sin(dl/2) * Math.sin(dl/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

export const submitAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { sessionId, otp, latitude, longitude } = req.body;
    
    if (!user || user.profile.role !== 'student') {
      sendError(res, 403, 'Access denied');
      return;
    }

    if (!sessionId || !otp || latitude === undefined || longitude === undefined) {
      sendError(res, 400, 'Missing required fields (sessionId, otp, latitude, longitude)');
      return;
    }

    // 1. Fetch the session
    const { data: session, error: sessionErr } = await supabaseAdmin
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionErr || !session) {
      sendError(res, 404, 'Session not found');
      return;
    }

    // 2. Check if active
    if (session.status !== 'active') {
      sendError(res, 400, 'Session is not active');
      return;
    }
    
    // Check if expired
    if (new Date(session.expires_at) < new Date()) {
      sendError(res, 400, 'Session has expired');
      return;
    }

    // 3. Verify OTP
    if (session.otp_code.toUpperCase() !== otp.toUpperCase()) {
      sendError(res, 400, 'Invalid OTP code');
      return;
    }

    // 4. Verify enrollment
    const { data: enrollment, error: enrollErr } = await supabaseAdmin
      .from('enrollments')
      .select('id')
      .eq('student_id', user.id)
      .eq('module_id', session.module_id)
      .single();

    if (enrollErr || !enrollment) {
      sendError(res, 403, 'You are not enrolled in this module');
      return;
    }

    // 5. Check location radius
    const distance = getDistance(latitude, longitude, session.lecturer_lat, session.lecturer_lng);
    const radius = session.radius_meters || 50;

    if (distance > radius) {
      sendError(res, 400, `You are too far from the lecturer. You are ${Math.round(distance)}m away (max ${radius}m).`);
      return;
    }

    // Check if already submitted
    const { data: existingAtt } = await supabaseAdmin
      .from('attendance')
      .select('id')
      .eq('session_id', sessionId)
      .eq('student_id', user.id)
      .single();

    if (existingAtt) {
      sendError(res, 400, 'Attendance already submitted for this session');
      return;
    }

    // 6. Record attendance
    const { error: insertErr } = await supabaseAdmin
      .from('attendance')
      .insert([{
        session_id: sessionId,
        student_id: user.id,
        status: 'present',
        distance_meters: Math.round(distance),
        submitted_at: new Date().toISOString()
      }]);

    if (insertErr) {
      sendError(res, 500, 'Database error recording attendance', insertErr.message);
      return;
    }

    sendSuccess(res, 201, 'Attendance marked successfully', { distance: Math.round(distance) });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const getSessionDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    if (!user || user.profile.role !== 'student') {
      sendError(res, 403, 'Access denied');
      return;
    }

    const { data: session, error: sessionErr } = await supabaseAdmin
      .from('sessions')
      .select('*, modules(name, code)')
      .eq('id', id)
      .single();

    if (sessionErr || !session) {
      sendError(res, 404, 'Session not found');
      return;
    }

    // Check if already submitted
    const { data: attendance } = await supabaseAdmin
      .from('attendance')
      .select('id')
      .eq('session_id', id)
      .eq('student_id', user.id)
      .single();

    sendSuccess(res, 200, 'Session details retrieved', { 
      session, 
      hasSubmitted: !!attendance 
    });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const getAttendanceHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    if (!user || user.profile.role !== 'student') {
      sendError(res, 403, 'Access denied');
      return;
    }

    const { data: history, error: histErr } = await supabaseAdmin
      .from('attendance')
      .select('*, sessions(started_at, created_at, modules(name, code))')
      .eq('student_id', user.id)
      .order('submitted_at', { ascending: false });

    if (histErr) {
      sendError(res, 500, 'Error fetching history', histErr.message);
      return;
    }

    sendSuccess(res, 200, 'Attendance history retrieved', { history });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};
