import IUserRepository from '../repositories/IUserRepository'
import UserRepository from '../repositories/IUserRepository';
import { compare, hash } from 'bcryptjs';
import '../config/env';
import User from '../models/User';
import AppError from '../errors/AppError';
import { sign } from 'jsonwebtoken';
import { NextFunction } from 'express';

interface Request{
  email: string;
  senha: string;
}
interface Response{
  token: string,
  user: User
}
class SessionService{

  private userRepository: IUserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
   }
  public async execute({ email, senha }: Request): Promise<Response> {
    
    const user =  await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Credenciais invalidas', 401);
    }

    const passwordCompare = await compare(senha, user.senha);

    if (!passwordCompare) {
      throw new AppError('Credenciais invalidas', 401);
    }
    
    delete user.senha;
    
    const token = sign(
      { foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 
      'minhachavelocal', 
      {expiresIn: 300});

  
   
     

    return {
      token,
      user
    };
  }

   
    
   
    



}

export default SessionService