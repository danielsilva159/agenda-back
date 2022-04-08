import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import './config/env.ts';
import 'express-async-errors'
import './databases';
import routes from './router';
import AppError from './errors/AppError';
var cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())
app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({status: 'error', message: err.message})
  } else {
    return response.status(500).json({status: 'error', message: 'Interval server error'})
  }
})
app.listen(3333);
