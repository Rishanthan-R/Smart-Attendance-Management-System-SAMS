import { Router } from 'express';
import { body } from 'express-validator';
import { createSession, getSessionById, closeSession, getMySessions } from '../controllers/session.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validate.middleware';

const router = Router();

const createSessionValidator = [
  body('module_id').notEmpty().withMessage('Module ID is required'),
  body('lecturer_lat').isFloat().withMessage('Valid latitude is required'),
  body('lecturer_lng').isFloat().withMessage('Valid longitude is required')
];

router.post('/create', requireAuth, requireRole(['lecturer']), createSessionValidator, validateRequest, createSession);
router.get('/', requireAuth, requireRole(['lecturer']), getMySessions);
router.get('/:id', requireAuth, requireRole(['lecturer']), getSessionById);
router.put('/:id/close', requireAuth, requireRole(['lecturer']), closeSession);
export default router;
