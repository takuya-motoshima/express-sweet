const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const sweet = require('express-sweet');

/**
 * Update user.
 */
router.put('/:id(\\d+)', async (req, res, next) => {
  try {
    if (req.body.passwordChange) {
      const passwordMatch = await UserModel.count({where: {id: req.params.id, password: req.body.password}}) > 0;
      if (!passwordMatch)
        return void res.json({error: 'wrongPassword'});
    }
    const set = {name: req.body.name};
    if (req.body.passwordChange)
      set.password = req.body.newPassword;
    await UserModel.update(set, {where: {id: req.params.id}});
    res.json(true);
  } catch(e) {
    next(e);
  }
});

/**
 * Login.
 */
router.post('/login', async (req, res, next) => {
  try {
    const success  = await sweet.services.Authentication.signin(req, res, next);
    res.json(success);
  } catch(e) {
    next(e);
  }
});

/**
 * Logout.
 */
router.get('/logout', async (req, res, next) => {
  try {
    sweet.services.Authentication.signout(req, res, next);
    res.redirect('/');
  } catch(e) {
    next(e);
  }
});

module.exports = router;