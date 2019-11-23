import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('agents', { title: 'Agents' });
});

router.get('/:id', (req: Request, res: Response) => {
  res.render('agents/single', { title: 'Single Agent' });
});

export default router;
