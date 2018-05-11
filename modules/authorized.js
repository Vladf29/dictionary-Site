'use strict'

module.exports = {
    isAuthorized: (req, res, next) => {
        if (req.user) return next();
        req.flash('error', 'Sorry, but you must be registered');
        res.redirect('/users/login');
    },
    isNotAuthorized: (req, res, next) => {
        if (!req.user) return next()
        res.redirect('/');
    }
}