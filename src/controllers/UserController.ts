import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/UserService';

class UserController {

  public async create(request: Request, response: Response): Promise<Response> {
    
    const { nome, email, senha } = request.body
    const userRepository = new UserRepository();
    const createUser = new CreateUserService(userRepository)
    const user = await createUser.criarUsuario({
      nome,
      email,
      senha,
    })

    delete user.senha;
    return response.json(user);
  }

  public async list(request: Request, response: Response) {
    console.log('req: ', request);
    
  }

}
export default UserController;