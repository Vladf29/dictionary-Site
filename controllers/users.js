'use strict'

const UserDB = require('../db/user');

module.exports = {
    getLogin: (req, res) => {
        res.render('pages/login');
    },
    getSignup: (req, res) => {
        res.render('pages/signup');
    },
    postSignup: async (req, res) => {
        try {
            const user = await UserDB.findOne({
                email: req.body.email
            });

            if (user) {
                req.flash('error', 'Sorry, but that email is already used.');
                return res.status(400).send();
            }

            const newUser = new UserDB(req.body);
            await newUser.save();
            req.flash('success', 'Now you can log-in in your account!');
            res.send();
        } catch (err) {
            req.flash('error', 'Sorry, but something went wrong.');
        }
    }
}