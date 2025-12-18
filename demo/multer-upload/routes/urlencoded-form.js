import {Router} from 'express';

const router = Router();

// URL-encoded form page
router.get('/', (req, res) => {
  res.render('urlencoded-form', {
    title: 'URL-encoded: Form Data'
  });
});

export default router;
