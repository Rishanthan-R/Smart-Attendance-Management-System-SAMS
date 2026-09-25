import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { sendSuccess, sendError } from '../utils/response.util';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role, fullName, regNumber, employeeId, department, batch } = req.body;

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true // Auto confirm for now
    });

    if (authError) {
      sendError(res, 400, authError.message);
      return;
    }

    const userId = authData.user.id;

    // 2. Insert profile record
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([
        {
          id: userId,
          role,
          full_name: fullName,
          department,
          reg_number: role === 'student' ? regNumber : null,
          batch: role === 'student' ? batch : null,
          employee_id: role === 'lecturer' ? employeeId : null
        }
      ]);

    if (profileError) {
      // Rollback auth user creation if profile fails
      await supabaseAdmin.auth.admin.deleteUser(userId);
      sendError(res, 400, profileError.message);
      return;
    }

    sendSuccess(res, 201, 'User registered successfully', { user: authData.user });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, asAdmin } = req.body;

    // 1. Authenticate with Supabase
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      sendError(res, 401, 'Invalid email or password');
      return;
    }

    // 2. Fetch profile to check role
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      sendError(res, 404, 'User profile not found');
      return;
    }

    // 3. Admin check if logging in via admin portal
    if (asAdmin && profile.role !== 'admin') {
      sendError(res, 403, 'Access denied. Admin privileges required.');
      return;
    }

    sendSuccess(res, 200, 'Login successful', {
      user: {
        id: data.user.id,
        email: data.user.email,
        role: profile.role
      },
      session: data.session
    });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      sendError(res, 401, 'Unauthorized');
      return;
    }
    sendSuccess(res, 200, 'User profile retrieved', { user });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const updateMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { full_name, phone_number, address } = req.body;

    const { data: updatedProfile, error } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name,
        phone_number,
        address
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error || !updatedProfile) {
      sendError(res, 500, 'Failed to update profile', error?.message);
      return;
    }

    sendSuccess(res, 200, 'Profile updated successfully', { user: updatedProfile });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};

export const getPublicDepartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('departments')
      .select('name')
      .eq('status', 'active');
    
    if (error) throw error;
    sendSuccess(res, 200, 'Departments retrieved', { departments: data });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};
