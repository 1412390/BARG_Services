let express = require('express');
let router = express.Router();
//storage
let LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('login' + localStorage.getItem('login'));
  res.render('index', { title: '', status: localStorage.getItem('login') });
});

module.exports = router;
