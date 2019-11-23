import { Request, Response, Router } from 'express';

import listingsRouter from './listings';
import adminRouter from './admin';
import agentRouter from './agent';


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

router.get('/agents', (req: Request, res: Response) => {
  res.render('agents', { title: 'Agents' });
});

router.get('/agents/:id', (req: Request, res: Response) => {
  res.render('agents/single', { title: 'Single Agent' });
});

router.use('/listings', listingsRouter);
router.use('/admin', adminRouter);
router.use('/agent', agentRouter);

export default router;
