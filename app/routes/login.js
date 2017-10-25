"use strict";

const express = require('express');
const {authTeacher} = require('../model/auth');
const {authGuardian} = require('../model/auth');
const bcrypt = require('bcrypt');

const router = express.Router();


/* GET login page. */
router.get('/', function(req, res, next) {
    if (req.query.logout === 'true')
        res.render('login', {prevAction: 'logout'});

    if (req.session.user)
        // res.send('user already logged in');
        res.redirect('dash');
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
        let row = authTeacher(userid, passwd); // get promise

        row.then(result => {
            if (!result) {
                res.render('login', {prevAction: 'loginFail'});
            }
            else {
                bcrypt.compare(passwd, result['password'], (err, response) => {
                    if (response) {
                        req.session.user = {
                            userID: Number(userid),
                            userType: user_type
                        };

                        res.redirect('/dash');
                    }
                    else {
                        res.render('login', {prevAction: 'loginFail'});
                    }
                });
            }
        }).catch(err => {
            console.log('internal error: login.js ' + err);
            next(err);
        });
    }
    else if (user_type === 'guardian') {
        let row = authGuardian(userid, passwd);

        row.then(result => {
            if (!result)
                res.render('login', {prevAction: 'loginFail'});
            else {
            bcrypt.compare(String(passwd), result['password'], (err, response) => {
                if (response) {
                    req.session.user = {
                        userID: Number(userid),
                        userType: user_type
                    };

                    res.redirect('/guardian');
                }
                else {
                    res.render('login', {prevAction: 'loginFail'});
                }
                });
            }
        }).catch(err => {
            console.log('internal error: login.js ' + err);
            next(err);
        });
    }
});

module.exports = router;
