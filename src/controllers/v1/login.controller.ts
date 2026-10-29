import { Request, Response } from 'express';
import { db } from '../../database';
import { users } from '../../schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // Find user by email
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Verify password
    const passwordParts = user.password.split(':');
    if (passwordParts.length !== 2) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    const [salt, hash] = passwordParts;
    const verifyHash = crypto.pbkdf2Sync(password, salt as string, 1000, 64, 'sha512').toString('hex');

    // Check password match
    if (hash !== verifyHash) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Password is correct, proceed with login
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};
