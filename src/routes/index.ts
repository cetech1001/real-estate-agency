import { Request, Response, Router } from 'express';

import listingsRouter from './listings';
import dashboardRouter from './dashboard';
import agentsRouter from './agents';


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

router.get('/logout', (req, res) => {
  res.redirect('/');
});

router.use('/listings', listingsRouter);
router.use('/agents', agentsRouter);
router.use('/agent', (req, res, next) => { res.locals.role = 'agent'; next(); }, dashboardRouter);
router.use('/admin', (req, res, next) => { res.locals.role = 'admin'; next(); }, dashboardRouter);

export default router;
