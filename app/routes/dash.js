const express = require('express');
const router = express.Router();
const getClassDetails = require('../model/classDetails');
const getTeacherInfo = require('../model/teacherInfo');


// GET dash
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    }
    else {
        if (req.session.userType === 'guardian')
            res.redirect('/login');
        else {
            let info = {};
            let classDetails = getClassDetails(req.session.user.userID);
            let teacherInfo = getTeacherInfo(req.session.user.userID);

            Promise.all([teacherInfo, classDetails]).then(vals => {
                info.teacherInfo = vals[0];
                info.classDetails = vals[1];

                req.session.user.leadingClass = info.classDetails.leadingClass.class_number;
                req.session.user.classes = info.classDetails.classList.map(arr => {
                    return arr.class_number;
                });

                res.render('dash', {info: info});
            }).catch(err => {
                console.log('internal error: dash.js ' + err);
                next(err);
            });

        }
    }
});


module.exports = router;