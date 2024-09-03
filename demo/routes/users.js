const express = require('express');
const UserModel = require('../models/UserModel');

const router = express.Router();
router.get('/', (req, res, next) => {
  res.render('users');
});

router.get('/personal', async (req, res) => {
  const user = await UserModel.getUser(req.user.id);
  res.render('personal', {user: user.toJSON()});
});

router.get('/edit-personal', async (req, res) => {
  const user = await UserModel.getUser(req.user.id);
  res.render('edit-personal', {user: user.toJSON()});
});
module.exports = router;