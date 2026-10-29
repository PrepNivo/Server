import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routesV1 from './routes/v1/';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1', routesV1);

// Error handling middleware
app.use(errorHandler);

export default app;
