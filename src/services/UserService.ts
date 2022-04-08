import IUserRepository from '../repositories/IUserRepository'
import UserRepository from '../repositories/IUserRepository';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request{
  nome: string;
  email: string;
  senha: string;
}
class UserService{

  private userRepository: IUserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
   }
  public async criarUsuario({ nome, email, senha }: Request): Promise<User> {
    
    const passwordHash = await hash(senha, 8);
    
    const user = this.userRepository.create({
      nome,
      email,
      senha: passwordHash
    })
    
    return user;
  }

  public async listarUsuarios(): Promise<User[]>{
    return this.userRepository.findAll();

  }

}

export default UserService