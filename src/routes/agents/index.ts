import { Router } from 'express';
import { getSessionAlerts, resetSessionAlerts } from '../../utils/alerts';
import User from '../../models/user';
import { serverErrorHandler } from '../../utils/error-handlers';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const agentsPerPage = 3;
    const agents = await User.find({ role: 'agent' });
    const pages = Math.ceil(agents.length / 3);
    const page = req.query.page || 1;
    const pageAgents = [];
    const alerts = getSessionAlerts(req);

    // eslint-disable-next-line max-len
    for (let i = (page - 1) * agentsPerPage, count = 0; count < agentsPerPage && agents[i]; count += 1, i += 1) {
      pageAgents.push(agents[i]);
    }

    resetSessionAlerts(req);
    res.render('agents', {
      title: 'Agents',
      ...alerts,
      agents: pageAgents,
      pages,
      page,
    });
  } catch (e) {
    serverErrorHandler(e, res);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const agent = await User.findById(req.params.id);
    const alerts = getSessionAlerts(req);
    resetSessionAlerts(req);
    res.render('agents/single', { title: 'Single Agent', ...alerts, agent });
  } catch (e) {
    serverErrorHandler(e, res);
  }
});

export default router;
