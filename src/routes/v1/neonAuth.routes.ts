import { Router } from 'express';
import neonAuthMiddleware from '../../auth/neonAuth';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

const router = Router();

// Initiate Neon Auth
router.get('/init', (_, res) => {
  // Redirect to Neon Auth base URL
  res.redirect(config.neonAuthBaseUrl as string);
});

// Neon Auth callback route
router.get(
  '/callback',
  neonAuthMiddleware,
  (req: any, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { userId: req.user.id },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

export default router;
