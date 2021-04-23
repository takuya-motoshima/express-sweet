const express = require('express');
const router = express.Router();

/**
 * GET users page.
 */
router.get('/', async (req, res, next) => {
  try {
    res.render('users');
  } catch(e) {
    next(e);
  }
});

module.exports = router;