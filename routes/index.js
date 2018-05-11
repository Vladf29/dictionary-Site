'use strict'

const router = require('express').Router();
const authorized = require('../modules/authorized');
const User = require('../db/user');

router.get('/', authorized.isAuthorized, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const dictionary = user.dictionary;
        res.render('pages/index', {
            dictionary
        });
    } catch (err) {
        throw err;
    }
})

module.exports = router;