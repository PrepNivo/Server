import { Router } from 'express';
import healthRoutes from './health.routes';
import signupRoutes from './signup.routes';
import loginRoutes from './login.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);

export default router;
