import { Response } from 'express';
import logger from '../lib/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,import/prefer-default-export
export function serverErrorHandler(error: any, res: Response): void {
  logger.error(error);
  res.render('errors/500');
}
