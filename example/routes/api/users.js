const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const Authentication = require('express-sweet').services.Authentication;

/**
 * Login.
 */
router.post('/login', async (req, res, next) => {
  try {
    const success = await Authentication.signin(req, res, next);
    if (success) res.json({result: true});
    else res.json({error: 'The user name or password is incorrect.'});
  } catch(e) {
    next(e);
  }
});

/**
 * Logout.
 */
router.get('/logout', async (req, res, next) => {
  try {
    Authentication.signout(req, res, next);
    res.redirect('/');
  } catch(e) {
    next(e);
  }
});

/**
 * List Users.
 */
router.get('/', async (req, res, next) => {
  try {
    const data = await UserModel.paginate({
      offset: req.query.offset,
      limit: req.query.limit,
      search: req.query.search,
      order: req.query.order,
      dir: req.query.dir
    });
    data.draw = req.query.draw;
    res.json(data);
  } catch(e) {
    next(e);
  }
});

/**
 * Create a User.
 */
router.post('/', async (req, res, next) => {
  try {
    console.log('req.body=', req.body);

    // Email duplication check.
    const emailExists = (await this.count({where: {email: req.body.email}})) > 0;

    // Returns an error if the email exists.
    if (emailExists)
      return void res.json({error: 'Email is already in use.'});

    // Add new user.
    const result = await UserModel.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    });
    console.log('result=', result);

    // Returns the ID of the added user.
    res.json({id: result.id});
  } catch(e) {
    next(e);
  }
});

// /**
//  * Delete a User.
//  */
// router.delete('/:id(\\d+)', async (req, res, next) => {
//   try {
//     res.json([]);
//   } catch(e) {
//     next(e);
//   }
// });

// /**
//  * Update a User.
//  */
// router.put('/:id(\\d+)', async (req, res, next) => {
//   try {
//     if (req.body.passwordChange) {
//       const passwordMatch = await UserModel.count({
//         where: {
//           id: req.params.id,
//           password: req.body.password
//         }
//       }) > 0;
//       if (!passwordMatch) return void res.json({error: 'wrongPassword'});
//     }
//     const set = {name: req.body.name};
//     if (req.body.passwordChange)
//       set.password = req.body.newPassword;
//     await UserModel.update(set, {where: {id: req.params.id}});
//     res.json(true);
//   } catch(e) {
//     next(e);
//   }
// });

module.exports = router;