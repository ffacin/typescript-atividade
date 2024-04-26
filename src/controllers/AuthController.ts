import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { login, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { login },
      });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      const token = jwt.sign({ id: user.id }, 'secretpassword', {
        expiresIn: '1h', // Define a validade do token (opcional)
      });

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }
  }
}

export default new AuthController();
