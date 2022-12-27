import { Request, Response, NextFunction } from 'express';

const dater = function (req: Request, res: Response, next: NextFunction) {
  console.log(`Requested at : ${Date.now()}`);
  next();
};

export { dater };