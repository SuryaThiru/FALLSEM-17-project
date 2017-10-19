const express = require('express');
const router = express.Router();
const {getStudents} = require('../model/class_students');
const {getPersonalInfo} = require('../model/studentInfo');
const {getAllStudentInfo} = require('../model/studentInfo');
const {getStudentAttendance} = require('../model/studentInfo');

// GET leadclass page
router.get('/', function (req, res, next) {
    if (!req.session.user)
        res.redirect('/login');
    else {
        getStudents(req.session.user.leadingClass).then(result => {
            info = {};
            info.students = result;
            res.render('leadclass', {info: info});
        }).catch(err => {
            console.log('internal error: leadclass.js ' + err);
            next(err);
        })
    }
});

// GET leadclass student page
router.get('/:id', function (req, res, next) {
    if (!req.session.user)
        res.redirect('/login');
    else {
        let sno = Number(req.params.id);
        let info = {};

        let pinfo = getPersonalInfo(sno);
        let allmarks = getAllStudentInfo(sno);
        let attendance = getStudentAttendance(sno);

        Promise.all([pinfo, allmarks, attendance]).then(val => {
            info.personalInfo = val[0];
            let sinfo = val[1];
            info.attendance = val[2];

            //modify allstudentinfo for ease
            let keys = Object.keys(sinfo[0]);
            let temp_obj = {};

            keys.forEach((key) => {
                let temp = []; // temp list storing all values of a key

                sinfo.forEach(obj => {
                    temp.push(obj[key]);
                });

                temp_obj[key] = temp;
            });

            info.allStudentInfo = temp_obj;

            res.render('leadclassstudent', {info: info});
        }).catch(err => {
            console.log('internal error: leadclass.js ' + err);
            next(err);
        });
    }
});

module.exports = router;
