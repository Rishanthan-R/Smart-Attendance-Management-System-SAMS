import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';
import { sendError } from '../utils/response.util';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendError(res, 400, 'Validation failed', errors.array());
    return;
  }
  next();
};

export const registerValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['student', 'lecturer']).withMessage('Role must be student or lecturer'),
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('department').notEmpty().withMessage('Department is required'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

export const updateProfileValidator = [
  body('full_name').notEmpty().withMessage('Full name is required')
];
