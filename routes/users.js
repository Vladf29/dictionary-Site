'use strict'

const router = require('express').Router();
const passport = require('passport');

const userControllers = require('../controllers/users');

router.route('/login')
    .get(userControllers.getLogin)
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    }))

router.route('/signup')
    .get(userControllers.getSignup)
    .post(userControllers.postSignup);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
});

module.exports = router;