import {Router} from 'express';

const router = Router();

// Single file upload with form data endpoint
router.post('/', (req, res) => {
  console.log('[Route] Single file with form data upload request received');
  console.log('[Route] File:', req.file);
  console.log('[Route] Body:', req.body);

  if (!req.file) {
    console.log('[Route] Error: No file uploaded');
    return res.status(400).json({error: 'No file uploaded'});
  }

  console.log('[Route] File uploaded successfully:', req.file.filename);
  res.json({
    success: true,
    message: 'Single file with form data uploaded successfully',
    file: {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`
    },
    data: req.body
  });
});

export default router;
