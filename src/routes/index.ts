import { Request, Response, Router } from 'express';

import listingsRouter from './listings';


const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('home', { title: 'North Cyprus Real Estate' });
});

router.get('/about', (req: Request, res: Response) => {
  res.render('about', { title: 'About Us' });
});

router.get('/contact', (req: Request, res: Response) => {
  res.render('contact', { title: 'Contact Us' });
});

router.get('/faq', (req: Request, res: Response) => {
  res.render('faq', { title: 'Frequently Asked Questions' });
});

router.use('/listings', listingsRouter);

export default router;
