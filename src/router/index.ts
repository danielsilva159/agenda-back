import { Router, Request, Response, NextFunction } from 'express';
import userRoutes from './user';
import pessoaRoutes  from './pessoa'
import sessionRoutes from './session'
import { verify } from 'jsonwebtoken';
const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) => response.json({ message: 'Hello Daniel' }));

function verifyJWT(req: Request, res: Response, next: NextFunction){
  let token = req.headers['authorization'];
  
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  verify(token as string, 'minhachavelocal', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    
    
    next();
  });
  
 
  
}

routes.use(`${prefixRoutes}/users`, verifyJWT, userRoutes);
routes.use(`${prefixRoutes}/pessoas`, verifyJWT, pessoaRoutes);
routes.use(`${prefixRoutes}/sessions`, sessionRoutes);

export default routes;