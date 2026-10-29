import { Request, Response } from 'express';
import { users } from '../../schema';
import { eq } from 'drizzle-orm';
import { db } from '../../database';
import crypto from 'crypto';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      return res.status(409).json({
        error: 'User with this email already exists',
      });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    const hashedPassword = `${salt}:${hash}`;

    // Create new user
    const [newUser] = await db.insert(users).values({
      fullname,
      email,
      password: hashedPassword,
    }).returning({
      id: users.id,
      fullname: users.fullname,
      email: users.email,
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
