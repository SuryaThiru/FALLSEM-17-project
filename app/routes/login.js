var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', {prevAction: null});
});

router.post('/', function (req, res, next) {
    console.log(req.body);

    if (!req.body.userid && !req.body.password)
        res.render('login', {prevAction: 'loginFail'});

    //check auth error and return failure
    //if success redirect to dash

    res.render('login', {prevAction: 'loginFail'});
});

module.exports = router;
