const express = require('express');
const router = express.Router();

/**
 * GET dashboard page.
 */
router.get('/', async (req, res, next) => {
  try {
    res.render('dashboard');
  } catch(e) {
    next(e);
  }
});

module.exports = router;