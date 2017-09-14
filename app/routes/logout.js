"use strict"

const express = require('express');
const router = express.Router();


// GET logout
router.get('/', function (req, res, next) {
    if (req.session.user) {
        req.session.destroy();
        console.log('session destroyed');
        res.redirect('/login?logout=true');
    }
    else {
        res.redirect('/login');
    }
});


module.exports = router;