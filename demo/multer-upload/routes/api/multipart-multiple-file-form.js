import {Router} from 'express';

const router = Router();

// Multiple fields upload endpoint
router.post('/', (req, res) => {
  console.log('[Route] Multiple fields upload request received');
  console.log('[Route] Files:', req.files);
  console.log('[Route] Body:', req.body);

  if (!req.files) {
    console.log('[Route] Error: No files uploaded');
    return res.status(400).json({error: 'No files uploaded'});
  }

  const result = {
    success: true,
    message: 'Files uploaded successfully',
    files: {}
  };

  for (const fieldname in req.files) {
    result.files[fieldname] = req.files[fieldname].map(file => ({
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      filename: file.filename,
      path: `/uploads/${file.filename}`
    }));
  }

  console.log('[Route] Files uploaded successfully for fields:', Object.keys(req.files).join(', '));
  res.json(result);
});

export default router;
