import {Router} from 'express';

const router = Router();

// Multiple files upload endpoint
router.post('/', (req, res) => {
  console.log('[Route] Multiple files upload request received');
  console.log('[Route] Files:', req.files);
  console.log('[Route] Body:', req.body);

  if (!req.files || req.files.length === 0) {
    console.log('[Route] Error: No files uploaded');
    return res.status(400).json({error: 'No files uploaded'});
  }

  console.log('[Route] Files uploaded successfully:', req.files.length);
  res.json({
    success: true,
    message: `${req.files.length} files uploaded successfully`,
    files: req.files.map(file => ({
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      filename: file.filename,
      path: `/uploads/${file.filename}`
    }))
  });
});

export default router;
