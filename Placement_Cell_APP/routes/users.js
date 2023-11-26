const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controller/users_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/sign-out', usersController.destroySession);
router.get('/download-csv', passport.checkAuthentication, usersController.downloadCsv);

router.post('/create', usersController.create);

// router.post('/create-Session', usersController.createSession);
router.post('/create-Session', passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
  }), usersController.createSession);


router.get('/sign-out', usersController.destroySession);
module.exports = router;