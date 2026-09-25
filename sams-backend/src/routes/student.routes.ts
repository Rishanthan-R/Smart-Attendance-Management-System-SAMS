import { Router } from 'express';
import { getDashboardData, getAvailableModules, enrollModule, getSessions, submitAttendance, getSessionDetails, getAttendanceHistory } from '../controllers/student.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/dashboard', requireAuth, requireRole(['student']), getDashboardData);
router.get('/modules', requireAuth, requireRole(['student']), getAvailableModules);
router.post('/modules/enroll', requireAuth, requireRole(['student']), enrollModule);
router.get('/sessions', requireAuth, requireRole(['student']), getSessions);
router.get('/sessions/:id', requireAuth, requireRole(['student']), getSessionDetails);
router.post('/attendance', requireAuth, requireRole(['student']), submitAttendance);
router.get('/history', requireAuth, requireRole(['student']), getAttendanceHistory);

export default router;
