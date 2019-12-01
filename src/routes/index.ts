import { Router } from 'express';

import passport from 'passport';

import listingsRouter from './listings';
import dashboardRouter from './dashboard';
import agentsRouter from './agents';
import {
  addErrorMessage, getSessionAlerts, resetSessionAlerts,
} from '../utils/alerts';
import { authorized } from '../middlewares/auth';
import UserController from '../controllers/user';
import User from '../models/user';
import { serverErrorHandler } from '../utils/error-handlers';


const router = Router();

router.get('/', (req, res) => {
  if (req.query.error) {
    addErrorMessage(req, 'Invalid Login Details');
  }
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('home', { title: 'North Cyprus Real Estate', ...alerts });
});

router.get('/about', async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' });
    const alerts = getSessionAlerts(req);
    resetSessionAlerts(req);
    res.render('about', { title: 'About Us', ...alerts, agents });
  } catch (e) {
    serverErrorHandler(e, res);
  }
});

router.get('/contact', (req, res) => {
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('contact', { title: 'Contact Us', ...alerts });
});

router.get('/faq', (req, res) => {
  const alerts = getSessionAlerts((req));
  resetSessionAlerts(req);
  res.render('faq', { title: 'Frequently Asked Questions', ...alerts });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/register', UserController.create, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/?error=true',
}));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/?error=true',
}));

router.use('/listings', listingsRouter);
router.use('/agents', agentsRouter);
router.use('/dashboard', authorized, dashboardRouter);

export default router;
