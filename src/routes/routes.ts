import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import CreditCardController from '../controllers/CreditCardController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/users', UserController.create);

router.post('/login', AuthController.authenticate);

router.use(authMiddleware);

router.post('/cards', CreditCardController.create);

router.post('/cards/validate', CreditCardController.validate);

export default router;
