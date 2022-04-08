import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/UserService';
import SessionService from '../services/SessionService';
import { verify } from 'jsonwebtoken';

class SessionController{

  public async create(request: Request, response: Response): Promise<Response>{
    const {email, senha } = request.body
    const userRepository = new UserRepository();
    const createSession = new SessionService(userRepository)
    const session = await createSession.execute({
      email,
      senha
    })
    return response.status(200).send({auth: true, token: session.token, user: session.user});
  }
  public verificarToken(req: Request, res: Response, next: NextFunction){
      let token = req.headers['x-access-token'];
      if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
      verify(token as string, 'minhachavelocal', function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        next();
      });
  }
}


export default SessionController;