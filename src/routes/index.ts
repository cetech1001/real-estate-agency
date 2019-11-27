import { Router } from 'express';

import passport from 'passport';
import User from '../models/user';

import listingsRouter from './listings';
import dashboardRouter from './dashboard';
import agentsRouter from './agents';
import {
  addErrorMessage, getSessionAlerts, resetSessionAlerts,
} from '../utils/alerts';
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

router.get('/about', (req, res) => {
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('about', { title: 'About Us', ...alerts });
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
  res.redirect('/');
});

router.post('/register', async (req, res, next) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      addErrorMessage(req, 'Passwords do not match!');
      res.redirect('/');
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        addErrorMessage(req, 'Email address already exists!');
        res.redirect('/');
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        await newUser.save();
        next();
      }
    }
  } catch (e) {
    serverErrorHandler(e, res);
  }
}, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/?error=true',
}));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/?error=true',
}));

router.use('/listings', listingsRouter);
router.use('/agents', agentsRouter);
router.use('/dashboard', dashboardRouter);

export default router;
