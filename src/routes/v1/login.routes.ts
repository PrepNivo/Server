import { Router } from 'express';
import { loginUser } from '../../controllers/v1/login.controller';

const router = Router();

router.post('/', loginUser);

export default router;
