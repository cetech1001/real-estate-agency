import { Request } from 'express';

export function resetSessionAlerts(req: Request): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  req.session.messages = {
    errors: [],
    success: '',
  };
}

export function addErrorMessage(req: Request, message: string): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  req.session.messages.errors.push(message);
}

export function setSuccessMessage(req: Request, message: string): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  req.session.messages.success = message;
}

export function getSessionAlerts(req: Request): { success: string; errors: string[] } {
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    success: req.session.messages.success,
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    errors: req.session.messages.errors,
  };
}
