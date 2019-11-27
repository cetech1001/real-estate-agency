import { NextFunction, Request, Response } from 'express';
import { addErrorMessage } from '../utils/alerts';
import User from '../models/user';
import { serverErrorHandler } from '../utils/error-handlers';

export default class UserController {
  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.body.password !== req.body.confirmPassword) {
        addErrorMessage(req, 'Passwords do not match!');
        res.redirect('/');
      } else {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
          addErrorMessage(req, 'Email address already exists!');
          res.redirect('/');
        } else {
          const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          });
          await newUser.save();
          next();
        }
      }
    } catch (e) {
      serverErrorHandler(e, res);
    }
  }
}
