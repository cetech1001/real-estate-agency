import { NextFunction, Request, Response } from 'express';
import { addErrorMessage } from '../utils/alerts';

export function authorized(req: Request, res: Response, next: NextFunction): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (req.user) {
    next();
  } else {
    addErrorMessage(req, 'Authorization Required');
    res.redirect('/');
  }
}

export function admin(req: Request, res: Response, next: NextFunction): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (req.user.role === 'admin') {
    next();
  } else {
    addErrorMessage(req, 'Authorization Required');
    res.redirect('/');
  }
}

export function agent(req: Request, res: Response, next: NextFunction): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (req.user.role === 'agent') {
    next();
  } else {
    addErrorMessage(req, 'Authorization Required');
    res.redirect('/');
  }
}
