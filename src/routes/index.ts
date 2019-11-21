import { Request, Response, Router } from 'express';


const router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  res.render('home', { title: 'North Cyprus Real Estate' });
});

export default router;
