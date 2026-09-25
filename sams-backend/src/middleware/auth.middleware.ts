import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { sendError } from '../utils/response.util';

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(res, 401, 'Unauthorized: Missing or invalid token');
      return;
    }

    const token = authHeader.split(' ')[1];
    
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error || !user) {
      sendError(res, 401, 'Unauthorized: Invalid token');
      return;
    }

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    (req as any).user = { ...user, profile };
    next();
  } catch (error: any) {
    sendError(res, 500, 'Internal server error during authentication', error.message);
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user || !user.profile || !roles.includes(user.profile.role)) {
      sendError(res, 403, 'Forbidden: Insufficient privileges');
      return;
    }
    next();
  };
};
