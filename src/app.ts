import express, { NextFunction, Request, Response } from 'express';

import createError, { HttpError } from 'http-errors';


import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import indexRouter from './routes';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.render('error/404', { title: 'Page not found' });
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error/404');
});

export default app;
