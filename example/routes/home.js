const express = require('express');
const router = express.Router();

/**
 * GET home page.
 */
router.get('/', async (req, res, next) => {
  try {
    res.render('home');
  } catch(e) {
    next(e);
  }
});

module.exports = router;