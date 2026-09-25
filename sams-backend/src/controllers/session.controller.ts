import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { sendSuccess, sendError } from '../utils/response.util';

function generateOTP(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude O, 0, I, 1
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { module_id, lecturer_lat, lecturer_lng } = req.body;

    // Verify module belongs to lecturer
    const { data: moduleData, error: moduleError } = await supabaseAdmin
      .from('modules')
      .select('id')
      .eq('id', module_id)
      .eq('lecturer_id', user.id)
      .single();

    if (moduleError || !moduleData) {
      sendError(res, 403, 'Forbidden: Module does not belong to you');
      return;
    }

    // Check for active session
    const { data: activeSession } = await supabaseAdmin
      .from('sessions')
      .select('id')
      .eq('module_id', module_id)
      .eq('status', 'active')
      .single();

    if (activeSession) {
      sendError(res, 400, 'An active session already exists for this module');
      return;
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 30 * 60000).toISOString(); // 30 mins

    const { data: newSession, error: insertError } = await supabaseAdmin
      .from('sessions')
      .insert([{
        module_id,
        lecturer_id: user.id,
        otp_code: otp,
        lecturer_lat,
        lecturer_lng,
        radius_meters: 50,
        status: 'active',
        started_at: new Date().toISOString(),
        expires_at: expiresAt
      }])
      .select('id, otp_code, expires_at')
      .single();

    if (insertError) {
      sendError(res, 500, insertError.message || 'Database error', insertError.details);
      return;
    }

    sendSuccess(res, 201, 'Session created successfully', newSession);
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const getSessionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    // Fetch session
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('sessions')
      .select('*, modules ( name, code )')
      .eq('id', id)
      .eq('lecturer_id', user.id)
      .single();

    if (sessionError || !session) {
      sendError(res, 404, 'Session not found or access denied');
      return;
    }

    // Fetch full enrolled roster
    const { data: enrollments, error: enrollError } = await supabaseAdmin
      .from('enrollments')
      .select('student_id, profiles!inner ( full_name, reg_number )')
      .eq('module_id', session.module_id);

    if (enrollError) {
      sendError(res, 500, 'Error fetching roster', enrollError.message);
      return;
    }

    // Fetch attendance
    const { data: attendance, error: attError } = await supabaseAdmin
      .from('attendance')
      .select('student_id, status, submitted_at')
      .eq('session_id', id);

    if (attError) {
      sendError(res, 500, 'Error fetching attendance', attError.message);
      return;
    }

    // Merge logic
    const roster = (enrollments || []).map(en => {
      const attRecord = (attendance || []).find(a => a.student_id === en.student_id);
      return {
        student_id: en.student_id,
        full_name: (en.profiles as any)?.full_name,
        email: (en.profiles as any)?.email,
        reg_number: (en.profiles as any)?.reg_number,
        status: attRecord ? attRecord.status : 'absent',
        submitted_at: attRecord ? attRecord.submitted_at : null
      };
    });

    sendSuccess(res, 200, 'Session roster retrieved', { session, roster });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const closeSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const { data: session, error: sessionError } = await supabaseAdmin
      .from('sessions')
      .update({ status: 'closed' })
      .eq('id', id)
      .eq('lecturer_id', user.id)
      .select()
      .single();

    if (sessionError || !session) {
      sendError(res, 404, 'Session not found or access denied');
      return;
    }

    sendSuccess(res, 200, 'Session closed', session);
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const getMySessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    const { data: sessions, error } = await supabaseAdmin
      .from('sessions')
      .select('*, modules ( name, code )')
      .eq('lecturer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      sendError(res, 500, 'Database error', error.message);
      return;
    }

    sendSuccess(res, 200, 'Sessions retrieved successfully', { sessions });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};
