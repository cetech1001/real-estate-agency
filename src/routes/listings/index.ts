import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('listings', { title: 'Listings' });
});

router.get('/add', (req: Request, res: Response) => {
  res.render('listings/add', { title: 'Add Listing' });
});

router.get('/single/:id', (req: Request, res: Response) => {
  res.render('listings/single', { title: `Listing ${req.params.id}` });
});

export default router;
