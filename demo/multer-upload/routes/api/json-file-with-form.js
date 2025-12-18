import {Router} from 'express';

const router = Router();

// JSON upload with data URL endpoint
router.post('/', (req, res) => {
  console.log('[Route] JSON upload request received');
  console.log('[Route] Body:', req.body);

  if (!req.body.avatar) {
    console.log('[Route] Error: No avatar data URL provided');
    return res.status(400).json({error: 'No avatar data URL provided'});
  }

  console.log('[Route] JSON data received successfully');
  res.json({
    success: true,
    message: 'JSON data received successfully',
    data: {
      username: req.body.username,
      email: req.body.email,
      filename: req.body.filename,
      mimetype: req.body.mimetype,
      avatar: req.body.avatar
    }
  });
});

export default router;
