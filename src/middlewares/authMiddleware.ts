import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secretpassword');
    req.userId = (decodedToken as any).id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

export default authMiddleware;
