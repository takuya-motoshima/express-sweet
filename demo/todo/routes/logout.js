import {Router} from 'express';
import * as expx from 'express-sweet';

const router = Router();

router.get('/', (req, res) => {
  expx.services.Authentication.logout(req);
  res.redirect('/login');
});

export default router;
