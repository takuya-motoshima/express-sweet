import {Router} from 'express';

const router = Router();

// Multiple fields upload page
router.get('/', (req, res) => {
  res.render('multipart-multiple-file-form', {
    title: 'Multipart: Multiple File Fields'
  });
});

export default router;
