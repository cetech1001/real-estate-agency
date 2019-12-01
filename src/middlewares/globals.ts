import { NextFunction, Request, Response } from 'express';
import { formatAgentName } from '../utils/formatters';

export default (req: Request, res: Response, next: NextFunction): void => {
  res.locals.user = req.user;
  res.locals.formatAgentName = formatAgentName;
  next();
};
