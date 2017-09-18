const express = require('express');
const router = express.Router();
const {getStudents} = require('../model/class_students');
const {getSubjectOverall} = require('../model/class_students');


// GET class page
router.get('/:id/', function (req, res, next) {
    if (!req.session.user)
        res.redirect('/login');
    else {
        let cno = Number(req.params.id);
        let info = {};

        if (!cno)
            res.redirect('/dash');
        else if ((cno != req.session.user.leadingClass) && (req.session.user.classes.indexOf(cno) == -1))
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


module.exports = router;