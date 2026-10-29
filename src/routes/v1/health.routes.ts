import { Router } from 'express';
import { getHealth } from '../../controllers/v1/health.controller';

const router = Router();

router.get('/', getHealth);

export default router;
