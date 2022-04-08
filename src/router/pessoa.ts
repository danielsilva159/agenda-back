import { Router } from 'express';
import PessoaController from '../controllers/PessoaController';
import UserController from '../controllers/UserController';

const pessoaRoutes = Router();
const pessoaController = new PessoaController();
pessoaRoutes.post('/', pessoaController.create);
pessoaRoutes.get('/:id', pessoaController.buscarPessoa)
pessoaRoutes.get('/lista/:id', pessoaController.list);
pessoaRoutes.put('/cadastro/:id', pessoaController.update)
pessoaRoutes.delete('/cadastro/:id', pessoaController.deletaPessoa)

export default pessoaRoutes;