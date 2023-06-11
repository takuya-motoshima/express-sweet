const express = require('express');
const Authentication = require('express-sweet').services.Authentication;
const {query, body, validationResult} = require('express-validator');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const UserNotFound = require('../../exceptions/UserNotFound');
const CustomValidation = require('../../shared/CustomValidation');

router.post('/login', [
  body('email').trim().not().isEmpty().isEmail(),
  body('password').trim().not().isEmpty()
], async (req, res, next) => {
  const errs = validationResult(req);
  if (!errs.isEmpty())
    return void res.status(400).json({errors: errs.array()});
  const isAuthenticated = await Authentication.authenticate(req, res, next);
  res.json(isAuthenticated);
});

router.get('/logout', (req, res) => {
  Authentication.logout(req);
  res.redirect('/');
});

router.get('/', [
  query('draw').not().isEmpty().isInt({min: 0}),
  query('start').not().isEmpty().isInt({min: 0}),
  query('length').not().isEmpty().isInt({min: 1}),
  query('order').not().isEmpty().isIn(['name', 'email', 'modified']),
  query('dir').optional({nullable: true, checkFalsy: true}).isIn(['asc', 'desc']),
  query('search').trim().optional({nullable: true, checkFalsy: true}).trim()
], async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty())
    return void res.status(400).json({errors: errs.array()});
  const data = await UserModel.paginate(req.query);
  data.draw = req.query.draw;
  res.json(data);
});

router.get('/email-exists', [
  query('user.email').trim().not().isEmpty(),
  query('excludeUserId').optional({nullable: true, checkFalsy: true}).isInt({min: 1})
], async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty())
    return void res.status(400).json({errors: errs.array()});
  const emailExists = await UserModel.emailExists(req.query.user.email, req.query.excludeUserId || null);
  res.json({valid: !emailExists});
}); 

router.post('/', [
  body('user.email').trim().not().isEmpty().isEmail(),
  body('user.name').trim().not().isEmpty().isLength({max: 30}),
  body('user.password').trim().not().isEmpty().isLength({max: 128}),
  body('user.icon').not().isEmpty().custom(CustomValidation.isImageDataUrl)
], async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty())
    return void res.status(400).json({errors: errs.array()});
  await UserModel.createUser(req.body.user);
  res.json(true);
});

router.get('/:userId(\\d+)', async (req, res) => {
  const user = await UserModel.getUser(req.params.userId);
  res.json(user.toJSON());
});

router.put('/:userId(\\d+)', [
  body('user.email').trim().not().isEmpty().isEmail(),
  body('user.name').trim().not().isEmpty().isLength({max: 30}),
  body('user.password').trim().optional({nullable: true, checkFalsy: true}).isLength({max: 128}),
  body('user.icon').not().isEmpty().custom(CustomValidation.isImageDataUrl)
], async (req, res, next) => {
  try {
    const errs = validationResult(req);
    if (!errs.isEmpty())
      return void res.status(400).json({errors: errs.array()});
    await UserModel.updateUser(req.params.userId, req.body.user);
    res.json(true);
  } catch (err) {
    if (err instanceof UserNotFound)
      res.json({error: err.name});
    else
      next(err);
  }
});

router.delete('/:userId(\\d+)', async (req, res) => {
  await UserModel.deleteUser(req.params.userId);
  res.json(true);
});

router.put('/profile', [
  body('user.email').trim().not().isEmpty().isEmail(),
  body('user.name').trim().not().isEmpty().isLength({max: 30}),
  body('user.password').trim().optional({nullable: true, checkFalsy: true}).isLength({max: 128}),
  body('user.icon').not().isEmpty().custom(CustomValidation.isImageDataUrl)
], async (req, res, next) => {
  try {
    const errs = validationResult(req);
    if (!errs.isEmpty())
      return void res.status(400).json({errors: errs.array()});
    await UserModel.updateUser(req.user.id, req.body.user);
    res.json(true);
  } catch (err) {
    if (err instanceof UserNotFound)
      res.json({error: err.name});
    else
      next(err);
  }
});
module.exports = router;