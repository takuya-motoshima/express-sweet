import path from 'node:path';

export default {
  enabled: true,

  resolve_middleware: (req, multer) => {
    const fullPath = req.originalUrl.split('?')[0]; // Remove query string

    // Configure disk storage for uploaded files
    const storage = multer.diskStorage({
      // Set upload destination directory
      destination: (_req, _file, cb) => {
        const uploadPath = path.join(process.cwd(), 'public/uploads');
        cb(null, uploadPath);
      },
      // Generate unique filename with timestamp and random number
      filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Decode the original filename to handle non-ASCII characters correctly
        const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        // Update file.originalname for API response
        file.originalname = originalname;
        const filename = uniqueSuffix + '-' + originalname;
        cb(null, filename);
      }
    });

    // Create multer instance with storage configuration
    const upload = multer({
      storage,
      fileFilter: (_req, _file, cb) => {
        cb(null, true);
      }
    });

    // Single file upload
    if (fullPath === '/api/multipart-single-file' && req.method === 'POST') {
      return upload.single('avatar');
    }

    // Single file upload with form data
    if (fullPath === '/api/multipart-single-file-with-form' && req.method === 'POST') {
      return upload.single('avatar');
    }

    // Multiple files upload (same field name)
    if (fullPath === '/api/multipart-multiple-files' && req.method === 'POST') {
      return upload.array('photos');
    }

    // Multiple fields upload
    if (fullPath === '/api/multipart-multiple-file-form' && req.method === 'POST') {
      return upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'banner', maxCount: 1 }
      ]);
    }

    return null;
  }
}
