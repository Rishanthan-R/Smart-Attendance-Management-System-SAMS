import { Router } from 'express';
import { getMyModules } from '../controllers/module.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/lecturer/modules', requireAuth, requireRole(['lecturer']), getMyModules);

export default router;
