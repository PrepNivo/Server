import { Router } from 'express';
import { createUser } from '../../controllers/v1/signup.controller';

const router = Router();

router.post('/', createUser);

export default router;
