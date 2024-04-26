import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import cardValidator = require('card-validator');


const prisma = new PrismaClient();

class CreditCardController {
  async create(req: Request, res: Response) {
    const { number, ownerName, expirationDate, securityCode } = req.body;

    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      const decodedToken = jwt.verify(token, 'secretpassword');

      if (!decodedToken) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      const userId = (decodedToken as any).id;

      const card = await prisma.card.create({
        data: {
          number,
          ownerName,
          expirationDate,
          securityCode,
          userId,
        },
      });

      return res.json(card);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cadastrar cartão de crédito' });
    }
  }

  async validate(req: Request, res: Response) {
    const { number, ownerName, expirationDate, securityCode } = req.body;

    // Validação dos dados do cartão
    const validation = cardValidator.number(number);

    if (!validation.isValid) {
      return res.status(400).json({ error: 'Número do cartão inválido' });
    }

    // Mais validações podem ser adicionadas conforme necessário

    return res.json({ message: 'Cartão válido' });
  }
}

export default new CreditCardController();
