import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { sendSuccess, sendError } from '../utils/response.util';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    if (!user || (user.profile.role !== 'admin' && user.role !== 'admin')) {
      sendError(res, 403, 'Access denied');
      return;
    }

    // Total Students
    const { count: studentCount, error: studentErr } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student');

    if (studentErr) throw studentErr;

    // Total Lecturers
    const { count: lecturerCount, error: lecturerErr } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'lecturer');

    if (lecturerErr) throw lecturerErr;

    // Active Departments
    const { count: deptCount, error: deptErr } = await supabaseAdmin
      .from('departments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (deptErr) {
      // If table doesn't exist yet, we'll return 0 instead of crashing the dashboard
      console.error("Error fetching departments (table might not exist yet):", deptErr.message);
    }

    // Active modules (Modules)
    const { count: moduleCount, error: moduleErr } = await supabaseAdmin
      .from('modules')
      .select('*', { count: 'exact', head: true });

    if (moduleErr) throw moduleErr;

    sendSuccess(res, 200, 'Admin dashboard stats retrieved', {
      totalStudents: studentCount || 0,
      totalLecturers: lecturerCount || 0,
      activeDepartments: deptCount || 0,
      activemodules: moduleCount || 0
    });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    if (!user || (user.profile.role !== 'admin' && user.role !== 'admin')) {
      sendError(res, 403, 'Access denied');
      return;
    }

    // Get auth users for emails
    let authUsersMap = new Map();
    try {
      const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.listUsers();
      if (!authErr && authData?.users) {
        authUsersMap = new Map(authData.users.map(u => [u.id, u.email]));
      } else {
        console.warn("Failed to fetch auth users for emails", authErr);
      }
    } catch (e) {
      console.warn("Exception fetching auth users", e);
    }

    // Get profiles
    const { data: profiles, error: profErr } = await supabaseAdmin.from('profiles').select('*');
    if (profErr) throw profErr;
    
    const users = profiles.map(p => ({
      ...p,
      email: authUsersMap.get(p.id) || 'N/A'
    }));

    sendSuccess(res, 200, 'Users retrieved', { users });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const getModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: modules, error } = await supabaseAdmin
      .from('modules')
      .select('*, profiles:lecturer_id(full_name)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    sendSuccess(res, 200, 'Modules retrieved', { modules });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const createModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, code, department, batch, lecturer_id } = req.body;

    const { data, error } = await supabaseAdmin
      .from('modules')
      .insert([{ name, code, department, batch, lecturer_id }])
      .select()
      .single();

    if (error) throw error;
    sendSuccess(res, 201, 'module created successfully', { module: data });
  } catch (error: any) {
    sendError(res, 500, 'Failed to create module', error.message);
  }
};

export const updateModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, code, department, batch, lecturer_id } = req.body;

    const { data, error } = await supabaseAdmin
      .from('modules')
      .update({ name, code, department, batch, lecturer_id })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    sendSuccess(res, 200, 'module updated successfully', { module: data });
  } catch (error: any) {
    sendError(res, 500, 'Failed to update module', error.message);
  }
};

export const getDepartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: departments, error } = await supabaseAdmin
      .from('departments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.code === '42P01') {
        // Table doesn't exist yet, return empty
        sendSuccess(res, 200, 'Departments retrieved (table missing)', { departments: [] });
        return;
      }
      throw error;
    }

    sendSuccess(res, 200, 'Departments retrieved', { departments });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const createDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, code, status } = req.body;

    const { data, error } = await supabaseAdmin
      .from('departments')
      .insert([{ name, code, status: status || 'active' }])
      .select()
      .single();

    if (error) throw error;
    sendSuccess(res, 201, 'Department created successfully', { department: data });
  } catch (error: any) {
    sendError(res, 500, 'Failed to create department', error.message);
  }
};

export const updateDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, code, status } = req.body;

    const { data, error } = await supabaseAdmin
      .from('departments')
      .update({ name, code, status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    sendSuccess(res, 200, 'Department updated successfully', { department: data });
  } catch (error: any) {
    sendError(res, 500, 'Failed to update department', error.message);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { full_name, department, reg_number, batch, employee_id } = req.body;

    const updatePayload: any = {};
    if (full_name !== undefined) updatePayload.full_name = full_name;
    if (department !== undefined) updatePayload.department = department;
    if (reg_number !== undefined) updatePayload.reg_number = reg_number;
    if (batch !== undefined) updatePayload.batch = batch;
    if (employee_id !== undefined) updatePayload.employee_id = employee_id;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    sendSuccess(res, 200, 'User updated successfully', { user: data });
  } catch (error: any) {
    sendError(res, 500, 'Failed to update user', error.message);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Delete from profiles first (cascade)
    const { error: profileErr } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', id);

    if (profileErr) throw profileErr;

    // Delete auth user
    const { error: authErr } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (authErr) console.warn('Could not delete auth user (may already be deleted):', authErr.message);

    sendSuccess(res, 200, 'User deleted successfully', {});
  } catch (error: any) {
    sendError(res, 500, 'Failed to delete user', error.message);
  }
};

export const deleteModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('modules')
      .delete()
      .eq('id', id);

    if (error) throw error;
    sendSuccess(res, 200, 'Module deleted successfully', {});
  } catch (error: any) {
    sendError(res, 500, 'Failed to delete module', error.message);
  }
};

export const deleteDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('departments')
      .delete()
      .eq('id', id);

    if (error) throw error;
    sendSuccess(res, 200, 'Department deleted successfully', {});
  } catch (error: any) {
    sendError(res, 500, 'Failed to delete department', error.message);
  }
};
