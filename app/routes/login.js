"use strict"

const express = require('express');
const auth = require('../model/auth');
const bcrypt = require('bcrypt');

const router = express.Router();


/* GET login page. */
router.get('/', function(req, res, next) {
    if (req.query.logout === 'true')
        res.render('login', {prevAction: 'logout'});

    if (req.session.user)
        res.send('user already logged in');
    else
        res.render('login', {prevAction: null});
});


/* POST login attempts */
router.post('/', function (req, res, next) {
    console.log(req.body);
    let userid = req.body.userid;
    let passwd = req.body.password;
    let user_type = req.body.user_type;

    if (!userid && !passwd)
        res.render('login', {prevAction: 'loginFail'});

    if (user_type === 'teacher') {
        let row = auth(userid, passwd); // get promise

        row.then(result => {
            console.log(result);

            if (!result.length) {
                res.render('login', {prevAction: 'loginFail'});
            }
            else {
                if (!bcrypt.compare(passwd, result['password']))
                    res.render('login', {prevAction: 'loginFail'});
                else {
                    // res.redirect('/dash');
                    req.session.user = {
                        userID: userid,
                        userType: user_type
                    };

                    res.send('login success!!');
                }
            }
        }).catch(err => {
            console.log('internal error: ' + err);
            next(err);
        });
    }
    else if (req.body.user_type === 'guardian') {
        // TODO everything
    }

    // res.render('login', {prevAction: 'loginFail'});
});

module.exports = router;
