import {Router} from 'express';

const router = Router();

// Single file upload page
router.get('/', (req, res) => {
  res.render('multipart-single-file', {
    title: 'Multipart: Single File'
  });
});

export default router;
