'use strict'

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Userdb = require('../db/user');

const localStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await Userdb.findOne({
                email
            });
            if (!user) {
                return done(null, false, {
                    message: 'Email or password is incorrect'
                });
            }
            if (password != user.password) {
                return done(null, false, {
                    message: 'Email or password is incorrect'
                });
            }

            return done(null, user);
        } catch (err) {
            done(err);
        }
    });

passport.use('local', localStrategy);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Userdb.findById(id, function (err, user) {
        done(err, user);
    });
});