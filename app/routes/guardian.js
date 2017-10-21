const express = require('express');
const router = express.Router();
const {getAllStudentInfo} = require('../model/studentInfo');
const {getStudentAttendance} = require('../model/studentInfo');

router.get('/', function (req, res, next) {
    if (!req.session.user)
        res.redirect('/login');
    else {
        let regid = req.session.user.userID;
        let allInfo = getAllStudentInfo(regid);
        let attendance = getStudentAttendance(regid);
        let info = {};

        Promise.all([allInfo, attendance]).then(val => {
            info.attendance = val[1];
            result = val[0];

            let keys = Object.keys(result[0]);
            let temp_obj = {};

            keys.forEach((key) => {
                let temp = []; // temp list storing all values of a key

                result.forEach(obj => {
                    temp.push(obj[key]);
                });

                temp_obj[key] = temp;
            });

            info.allStudentInfo = temp_obj;

            res.render('guardian', {info: info});
        }).catch(err => {
            console.log('internal error: guardian.js ' + err);
            next(err);
        });
    }
});

module.exports = router;
