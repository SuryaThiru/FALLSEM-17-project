const express = require('express');
const router = express.Router();
const {addInteraction} = require('../model/interactions');
const {getInteraction} = require('../model/interactions');

router.get('/guardian/', function (req, res, next) {
    if (!req.session.user)
        res.redirect('/guardian');
    else {
        if (req.session.user.userType === 'teacher')
            res.redirect('/login');
        else {
            let posts = getInteraction(req.session.user.userID);
            posts.then(rows => {
                res.render('interactions', {data: {
                    messages: rows,
                    byTeacher: false,
                    regid: req.session.user.userID
                }});
            });
        }
    }
});

router.get('/teacher/:sno', function (req, res, next) {
    if (!req.session.user)
        res.redirect('/dash');
    else {
        let regid = req.params.sno;

        if (req.session.user.userType === 'guardian')
            res.redirect('/login');
        else {
            let posts = getInteraction(regid);
            posts.then(rows => {
                console.log(rows);
                res.render('interactions', {data: {
                    messages: rows,
                    byTeacher: true,
                    regid: regid
                }});
            });
        }
    }
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    let regid = req.body.reg_id;
    let postText = req.body.message;
    let postByTeacher = Boolean(req.body.postByTeacher);
    let d = new Date();
    let timestamp = d.toUTCString();

    out = addInteraction(regid, postText, timestamp, postByTeacher);

    out.then(result => {
        res.redirect('back');
    }).catch(err => {
        console.log('internal error: interactions.js ' + err);
        next(err);
    });
});

module.exports = router;
