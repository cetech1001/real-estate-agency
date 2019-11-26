import { Request, Response, Router } from 'express';
import { getSessionAlerts, resetSessionAlerts } from '../../utils/alerts';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('agents', { title: 'Agents', ...alerts });
});

router.get('/:id', (req: Request, res: Response) => {
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('agents/single', { title: 'Single Agent', ...alerts });
});

export default router;
