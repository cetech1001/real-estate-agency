import { Router } from 'express';
import { agent } from '../../middlewares/auth';
import { getSessionAlerts, resetSessionAlerts } from '../../utils/alerts';

const router = Router();

router.get('/', (req, res) => {
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('dashboard', { ...alerts });
});

router.get('/messages', agent, (req, res) => {
  res.render('dashboard/messages');
});

router.get('/properties/add', (req, res) => {
  res.render('dashboard/properties/add');
});

router.get('/properties/:status', (req, res) => {
  res.render('dashboard/properties');
});

router.get('/reviews/:status', (req, res) => {
  res.render('dashboard/reviews');
});

router.get('/booking-requests', (req, res) => {
  res.render('dashboard/booking-requests');
});

router.get('/profile', (req, res) => {
  res.render('dashboard/profile');
});

export default router;
