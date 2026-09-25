import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { sendSuccess, sendError } from '../utils/response.util';

export const getMyModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    
    if (!user || user.profile.role !== 'lecturer') {
      sendError(res, 403, 'Access denied');
      return;
    }

    const { data: modules, error } = await supabaseAdmin
      .from('modules')
      .select('*')
      .eq('lecturer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      sendError(res, 500, 'Database error', error.message);
      return;
    }

    sendSuccess(res, 200, 'Modules retrieved successfully', { modules });
  } catch (error: any) {
    sendError(res, 500, 'Internal server error', error.message);
  }
};
