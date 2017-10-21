const express = require('express');
const router = express.Router();
const {addInteraction} = require('../model/interactions');
const {getInteraction} = require('../model/interactions');

router.get('/guardian', function (req, res, next) {
    if (!req.session.user)
        res.redirect('/guardian');
    else {
        if (req.session.user.userType === 'teacher')
            res.redirect('/login');
        else {
            let posts = getInteraction(req.session.user.userID);
            posts.then(rows => res.send(rows));
        }
    }
});

router.get('/teacher', function (req, res, next) {
    if (!req.session.user)
        res.redirect('/dash');
    else {
        if (req.session.user.userType === 'guardian')
            res.redirect('/login');
        else {
            let posts = getInteraction(req.session.user.userID);
            posts.then(rows => res.send(rows));
        }
    }
});


module.exports = router;