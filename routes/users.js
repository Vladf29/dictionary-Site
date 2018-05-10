'use strict'

const router = require('express').Router();

const userControllers = require('../controllers/users');

router.route('/login')
    .get(userControllers.getLogin);

router.route('/signup')
    .get(userControllers.getSignup)
    .post(userControllers.postSignup);

module.exports = router;