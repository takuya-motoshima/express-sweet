const express = require('express');
const router = express.Router();

/**
 * GET user edit page.
 */
router.get('/(\\d+)', async (req, res, next) => {
  try {
    res.render('user');
  } catch(e) {
    next(e);
  }
});

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