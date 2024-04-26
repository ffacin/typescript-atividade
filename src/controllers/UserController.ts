import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class UserController {
  async create(req: Request, res: Response) {
    const { name, email, login, password } = req.body;

    try {

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          login,
          password: hashedPassword,
        },
      });

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
  }
}

export default new UserController();
