import { Request, Response, Router } from 'express';

import listingsRouter from './listings';
import dashboardRouter from './dashboard';
import agentsRouter from './agents';
import {
  addErrorMessage, getSessionAlerts, resetSessionAlerts,
} from '../utils/alerts';


const router = Router();

router.get('/', (req: Request, res: Response) => {
  if (req.query.error) {
    addErrorMessage(req, 'Invalid Login Details');
  }
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('home', { title: 'North Cyprus Real Estate', ...alerts });
});

router.get('/about', (req: Request, res: Response) => {
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('about', { title: 'About Us', ...alerts });
});

router.get('/contact', (req: Request, res: Response) => {
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('contact', { title: 'Contact Us', ...alerts });
});

router.get('/faq', (req: Request, res: Response) => {
  const alerts = getSessionAlerts((req));
  resetSessionAlerts(req);
  res.render('faq', { title: 'Frequently Asked Questions', ...alerts });
});

router.get('/logout', (req, res) => {
  res.redirect('/');
});

router.use('/listings', listingsRouter);
router.use('/agents', agentsRouter);
router.use('/agent', (req, res, next) => { res.locals.role = 'agent'; next(); }, dashboardRouter);
router.use('/admin', (req, res, next) => { res.locals.role = 'admin'; next(); }, dashboardRouter);

export default router;
