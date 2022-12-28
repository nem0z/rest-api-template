import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

const dater = function (req: Request, res: Response, next: NextFunction) {
  console.log(`Requested at : ${Date.now()}`);
  next();
};

const syncUsers = function (req: Request, res: Response, next: NextFunction) {
  return User.sync()
    .then(() => next());
};

export { dater, syncUsers }