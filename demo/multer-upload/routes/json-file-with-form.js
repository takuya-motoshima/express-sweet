import {Router} from 'express';

const router = Router();

// JSON upload page
router.get('/', (req, res) => {
  res.render('json-file-with-form', {
    title: 'JSON: Base64 Image + Form'
  });
});

export default router;
