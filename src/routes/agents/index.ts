import { Router } from 'express';
import { getSessionAlerts, resetSessionAlerts } from '../../utils/alerts';
import User from '../../models/user';
import { serverErrorHandler } from '../../utils/error-handlers';
import { UserInterface } from '../../interfaces/user';
import {formatAgentName} from "../../utils/formatters";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const agentsPerPage = 4;
    const agents = await User.find({ role: 'agent' });
    const totalAgents = agents.length;
    const pages = Math.ceil(agents.length / 3);

    const page: {
      number: number;
      agents: UserInterface[];
      startIndex: number;
      endIndex: number;
    } = {
      number: parseInt(req.query.page, 10) || 1,
      agents: [],
      startIndex: 0,
      endIndex: 0,
    };

    const alerts = getSessionAlerts(req);
    resetSessionAlerts(req);

    page.startIndex = (page.number - 1) * agentsPerPage;
    page.endIndex = page.startIndex;

    // eslint-disable-next-line max-len
    for (let i = page.startIndex, count = 0; count < agentsPerPage && agents[i]; i += 1, count += 1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      page.agents.push(agents[i]);
      page.endIndex += 1;
    }
    res.render('agents', {
      title: 'Agents',
      ...alerts,
      pages,
      page,
      agents: page.agents,
      totalAgents,
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    res.render('agents/single', { title: formatAgentName(agent), ...alerts, agent });
  } catch (e) {
    serverErrorHandler(e, res);
  }
});

export default router;
