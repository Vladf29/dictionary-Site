'use strict'

const router = require('express').Router();
const authorized = require('../modules/authorized');
const User = require('../db/user');

router.use(authorized.isAuthorized)

router.route('/new_word')
    .get(async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const dictionary = user.dictionary;

            res.render('pages/new_word', {
                a: dictionary.reverse().slice(0, 3)
            });
        } catch (err) {

        }
    }).post(async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (user.dictionary.length !== 0) {
                const found = user.dictionary.find((item) => item.word === req.body.word);
                if (found) {
                    req.flash('error', 'The word is already used.');
                    return res.send();
                }
            }

            user.dictionary.push(req.body);
            await user.save();

            req.flash('success', 'The word was added succefull.');
            res.send();
        } catch (err) {
            req.flash('error', 'Something went wrong!');
            res.send();
        }
    });

router.put('/edit', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        let word = await user.dictionary.id(req.body.id);
        word.word = req.body.data.word;
        word.translates = req.body.data.translates;
        await user.save();

        req.flash('success', 'The word was edited successfully');
        res.send();
    } catch (err) {
        req.flash('error', 'Something went wrong!');
        res.send();
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        await user.dictionary.pull(req.body.id);
        await user.save();

        req.flash('success', 'The word was removed successfully');
        res.send();
    } catch (err) {
        req.flash('error', 'Something went wrong!');
        res.send();
    }
});

router.get('/game', async (req, res) => {
    res.render('pages/game');
});

module.exports = router;