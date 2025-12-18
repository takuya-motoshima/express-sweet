import {Router} from 'express';

const router = Router();

// Form-urlencoded endpoint
router.post('/', (req, res) => {
  console.log('[Route] URL-encoded form request received');
  console.log('[Route] Body:', req.body);

  if (!req.body.username || !req.body.email) {
    console.log('[Route] Error: Missing required fields');
    return res.status(400).json({error: 'Missing required fields'});
  }

  console.log('[Route] URL-encoded data received successfully');
  res.json({
    success: true,
    message: 'URL-encoded data received successfully',
    data: req.body
  });
});

export default router;
