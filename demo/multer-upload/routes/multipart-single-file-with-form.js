import {Router} from 'express';

const router = Router();

// Single file upload with data page
router.get('/', (req, res) => {
  res.render('multipart-single-file-with-form', {
    title: 'Multipart: Single File + Form'
  });
});

export default router;
