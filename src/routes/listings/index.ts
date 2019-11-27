import { Router } from 'express';
import { getSessionAlerts, resetSessionAlerts } from '../../utils/alerts';

const router = Router();

router.get('/', (req, res) => {
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('listings', { title: 'Listings', ...alerts });
});

router.get('/add', (req, res) => {
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('listings/add', { title: 'Add Listing', ...alerts });
});

router.get('/single/:id', (req, res) => {
  const alerts = getSessionAlerts(req);
  resetSessionAlerts(req);
  res.render('listings/single', { title: `Listing ${req.params.id}`, ...alerts });
});

export default router;
