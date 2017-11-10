const express = require('express');
const router = express.Router();
//storage
let LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
/* GET home page. */
router.get('/', function(req, res, next) {
    let isLogin = localStorage.getItem('login');
    return res.render('index', {title: '', isLogin: isLogin});
});

module.exports = router;
