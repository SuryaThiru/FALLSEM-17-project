const express = require('express');
const router = express.Router();


// GET dash
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    }
    else {
        res.render('dash');
    }
});


module.exports = router;