import { Router } from 'express';
import healthRoutes from './health.routes';
import signupRoutes from './signup.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/signup', signupRoutes);

export default router;
