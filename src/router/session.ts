import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import UserController from '../controllers/UserController';

const sessionRoutes = Router();
const sessionController = new SessionController();
sessionRoutes.post('/', sessionController.create);
sessionRoutes.get('/', sessionController.verificarToken)


export default sessionRoutes;