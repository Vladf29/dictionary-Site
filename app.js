'use strict'

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/dictionary');

app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser());
app.use(session({
    resave: false,
    secret: 'music',
    saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    next();
});

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/dictionary', require('./routes/dictionary'));
app.use('/users', require('./routes/users'));

app.listen(port, () => console.log(`Listening on port ${port}`));