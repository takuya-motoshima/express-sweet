import * as expx from 'express-sweet';
import {Router} from 'express';

const router = Router();

// Login endpoint
router.post('/login', async (req, res, next) => {
  const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
  res.json({success: isAuthenticated});
});

export default router;
