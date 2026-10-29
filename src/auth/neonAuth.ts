import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { config } from '../config';
import { db } from '../database';
import { users } from '../schema';
import { eq } from 'drizzle-orm';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        fullname: string;
      };
    }
  }
}

// Middleware to verify Neon Auth JWT
const neonAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1] as string;

  try {
    // Get the JWKS client
    const client = jwksClient({
      jwksUri: config.neonAuthJwksUrl as string
    });

    // Get the signing key
    const getKey = (header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) => {
      client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key?.getPublicKey();
        callback(err, signingKey);
      });
    };

    // Verify the token using a Promise
    const decoded = await new Promise<jwt.JwtPayload>((resolve, reject) => {
      jwt.verify(token, getKey, {
        audience: config.neonAuthBaseUrl as string,
        issuer: config.neonAuthBaseUrl as string,
        algorithms: ['RS256']
      }, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded as jwt.JwtPayload);
      });
    });

      // Check if user exists in our database
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, decoded.email))
        .limit(1);

      if (!user) {
        // Create new user if doesn't exist
        const [newUser] = await db
          .insert(users)
          .values({
            fullname: decoded.name || '',
            email: decoded.email,
            password: '' // No password for Neon Auth users
          })
          .returning();

        req.user = newUser;
      } else {
        req.user = user;
      }

      next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

export default neonAuthMiddleware;

