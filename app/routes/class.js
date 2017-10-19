const express = require('express');
const router = express.Router();
const {getStudents} = require('../model/class_students');
const {getSubjectOverall} = require('../model/class_students');
const {getSubjectStats} = require('../model/class_students');
const getStudentInfo = require('../model/studentInfo');


// GET class page
router.get('/:id/', function (req, res, next) {
    if (!req.session.user)
        res.redirect('/login');
    else {
        let cno = Number(req.params.id);
        let info = {};

        // validate user
        if (!cno)
            res.redirect('/dash');
        else if ((cno != req.session.user.leadingClass) && (req.session.user.classes.indexOf(cno) === -1))
            res.redirect('/dash');

        // TODO seperate view for class teachers
        // get promises
        let students = getStudents(cno).then( result => {
            info.infoList = result;
        }).catch(err => {
            console.log('internal error: class.js ' + err);
            next(err);
        });

        let subjectOverall = getSubjectOverall(cno, req.session.user.userID).then( result => {
            info.marksList = result;
        }).catch(err => {
            console.log('internal error: class.js ' + err);
            next(err);
        });

        Promise.all([students, subjectOverall]).then(vals => {
            res.render('class', {info: info});
        });
    }
});


router.get('/:cid/:sid', function (req, res, next) {    //cid - class id, sid - student id
    if (!req.session.user)
        res.redirect('/login');
    else {
        let cno = Number(req.params.cid);
        let sno = Number(req.params.sid);

        // validate user
        // TODO check student under class
        if (!cno || !sno)
            res.redirect('/dash');
        else if ((cno != req.session.user.leadingClass) && (req.session.user.classes.indexOf(cno) === -1))
            res.redirect('/dash');

        let studInfo = getStudentInfo(sno, req.session.user.userID);
        let classStat = getSubjectStats(cno, req.session.user.userID);

        Promise.all([studInfo, classStat]).then(val => {
            info = {};
            info.studInfo = val[0];
            info.classStat = val[1];

            console.log(info);
            res.render('student', {info: info});
        }).catch(err => {
            console.log('internal error: class.js ' + err);
            next(err);
        })
    }
});


module.exports = router;