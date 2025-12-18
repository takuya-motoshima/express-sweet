import {Router} from 'express';

const router = Router();

// Multiple files upload page
router.get('/', (req, res) => {
  res.render('multipart-multiple-files', {
    title: 'Multipart: Multiple Files'
  });
});

export default router;
