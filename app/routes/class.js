const express = require('express');
const router = express.Router();
const getStudents = require('../model/class_students');


// GET class page
router.get('/:id/', function (req, res, next) {
    if (!req.session.user)
        res.redirect('/login');
    else {
        let cno = Number(req.params.id);

        if (!cno)
            res.redirect('/dash');
        else if ((cno != req.session.user.leadingClass) && (req.session.user.classes.indexOf(cno) == -1))
            res.redirect('/dash');

        console.log(cno);

        getStudents(cno).then( result => {
            console.log(result);
            res.render('class', {info: result});
        }).catch(err => {
            console.log('internal error: class.js ' + err);
            next(err);
        });
    }
});


module.exports = router;