import {Router} from 'express';

const router = Router();

// Show todos page
router.get('/', (req, res) => {
  res.render('todos');
});

export default router;
