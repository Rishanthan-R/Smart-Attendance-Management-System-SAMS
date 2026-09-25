import { Router } from 'express';
import { getDashboardStats, getUsers, getModules, createModule, updateModule, getDepartments, createDepartment, updateDepartment, updateUser, deleteUser, deleteModule, deleteDepartment } from '../controllers/admin.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';


const router = Router();

router.get('/dashboard', requireAuth, requireRole(['admin']), getDashboardStats);
router.get('/users', requireAuth, requireRole(['admin']), getUsers);
router.put('/users/:id', requireAuth, requireRole(['admin']), updateUser);
router.delete('/users/:id', requireAuth, requireRole(['admin']), deleteUser);

router.get('/modules', requireAuth, requireRole(['admin']), getModules);
router.post('/modules', requireAuth, requireRole(['admin']), createModule);
router.put('/modules/:id', requireAuth, requireRole(['admin']), updateModule);
router.delete('/modules/:id', requireAuth, requireRole(['admin']), deleteModule);

router.get('/departments', requireAuth, requireRole(['admin']), getDepartments);
router.post('/departments', requireAuth, requireRole(['admin']), createDepartment);
router.put('/departments/:id', requireAuth, requireRole(['admin']), updateDepartment);
router.delete('/departments/:id', requireAuth, requireRole(['admin']), deleteDepartment);

export default router;
