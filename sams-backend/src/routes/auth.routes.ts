import { Router } from 'express';
import { register, login, getMe, updateMe, getPublicDepartments } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validateRequest, registerValidator, loginValidator, updateProfileValidator } from '../middleware/validate.middleware';

const router = Router();

router.post('/register', registerValidator, validateRequest, register);
router.post('/login', loginValidator, validateRequest, login);
router.get('/departments', getPublicDepartments);
router.get('/me', requireAuth, getMe);
router.put('/me', requireAuth, updateProfileValidator, validateRequest, updateMe);

export default router;
