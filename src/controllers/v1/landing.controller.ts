import { Request, Response } from 'express';

export const getLanding = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Landing page',
    status: 'success'
  });
};
