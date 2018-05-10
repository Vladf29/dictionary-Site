'use strict'

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Userdb = require('../db/user');

const localStrategy = new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const user = await Userdb.findOne({
                email
            });
            if (!user) {
                req.flash('error', 'Email or password is incorrect');
                return done(null, false);
            }
            if (password != user.password) {
                req.flash('error', 'Email or password is incorrect');
                return done(null, false);
            }

            return done(null, user);
        } catch (err) {
            done(err);
        }
    });

passport.use(localStrategy);