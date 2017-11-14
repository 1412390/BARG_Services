let express = require('express');
let router = express.Router();
let axios = require('axios');
//storage
let LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
let config = require('../config');
let socket = require('socket.io-client')(config.URL_SOCKET);

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/login', function (req, res, next) {

    let isLogin = localStorage.getItem('login');
    if(isLogin){
        return res.redirect('/users/profile');
    }
    return res.render('users/login', {
        title: "Login page",
        username: "",
        success: true,
        errors: "",
    });
});
router.post('/login', function (req, res, next) {

    let username = req.body.username;
    let password = req.body.password;
    req.checkBody('username', 'Username field is not empty').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 character long!').len(4, 15);
    req.checkBody('password', 'Password field is not empty').notEmpty();
    req.checkBody('password', 'Username must be between 8-64 character long!').len(8, 64);

    let errors = req.validationErrors();

    if (errors) {

        return res.render('users/login', {
            title: "Login Fail",
            username: username,
            success: false,
            errors: errors
        });
    }
    else {
        const data = {
            username: username.trim(),
            password: password.trim()
        };
        const url = config.URL_SERVER + '/users/login';
        axios.post(url, data).then(
            response => {

                let success = response.data.success;
                if (success) {

                    let token = response.data.token;
                    localStorage.setItem('token', token);
                    localStorage.setItem('login', true);
                    return res.redirect('/users/profile');
                }
                else {

                    let err = response.data.err;
                    return res.render('users/login', {
                        title: "Login Fail",
                        username: username,
                        success: false,
                        errors: [{msg: err}]
                    });
                }
            })
            .catch(function () {
                console.log();
            });
    }
});
router.get('/register', function (req, res, next) {

    res.render('users/register', {
        title: "Register Page",
        username: "",
        password: "",
        cfm_password: "",
        email: "",
        dob: "",
        name: "",
        success: true
    });
});
router.post('/register', function (req, res, next) {


    req.checkBody('username', 'Username field is not empty!').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long!').len(4, 15);
    req.checkBody('password', 'Password field is not empty').notEmpty();
    req.checkBody('password', 'Password must be between 8-64 characters long!').len(8, 64);
    req.checkBody('cfm_password', 'Confirm Password field is not empty').notEmpty();
    req.checkBody('cfm_password', 'Confirm Password must be between 8-64 characters long!').len(8, 64);
    req.checkBody('cfm_password', 'Confirm Password does not match!').equals(req.body.password);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email must be between 8-64 characters long!').len(8, 64);
    req.checkBody('name', 'Name field is not empty!').notEmpty();
    req.checkBody('name', 'Name must be less 64 characters long!').len(0, 64);

    let errors = req.validationErrors();

    if (errors) {
        return res.render('users/register', {
            title: "Register Fail",
            username: req.body.username,
            password: req.body.password,
            cfm_password: req.body.cfm_password,
            email: req.body.email,
            dob: req.body.dob,
            name: req.body.name,
            errors: errors,
            success: false
        });
    }
    else {

        let dob = new Date("'" +req.body.dob + "'").getTime()/1000;

        const data = {
            username: req.body.username.trim(),
            password: req.body.password.trim(),
            email: req.body.email.trim(),
            dob: dob,
            name: req.body.name.trim(),
        };

        const url = config.URL_SERVER + "/users/register";

        axios.post(url, data).then(
            response => {

                let success = response.data.success;

                if(success){
                    return res.redirect('/users/login');
                }
                else {
                    let err = response.data.err;
                    return res.render('users/register', {
                        title: "Register Fail",
                        username: req.body.username,
                        password: req.body.password,
                        cfm_password: req.body.cfm_password,
                        email: req.body.email,
                        dob: req.body.dob,
                        name: req.body.name,
                        errors: [{msg: err}],
                        success: false
                    });
                }
            }
        ).catch(function () {

        });
    }
});
router.get('/profile', function (req, res, next) {

    let login = localStorage.getItem('login');
    if(login){//true

        let token = localStorage.getItem('token');

        const data = {
            token: token
        };

        let url = config.URL_SERVER + "/users/get-information";
        axios.post(url, data).then(
            response => {

                let success = response.data.success;
                if(success){
                    let user = response.data.user;
                    localStorage.setItem('user_id', user.id);
                    return res.render('users/profile', {status: localStorage.getItem('login')});
                }
                else {
                    console.log(response.data.error);
                }
            }
        ).catch(function () {console.log("");});
        //console.log('token' + token);
    }
    else {
        return res.redirect('/users/login');
    }
});
router.get('/get-information', function (req, res, next) {

    let login = localStorage.getItem('login');

    if(login){//true

        let token = localStorage.getItem('token');

        const data = {
            token: token
        };

        let url = config.URL_SERVER + "/users/get-information";

        axios.post(url, data).then(
            response => {

                let success = response.data.success;
                if(success){

                    return res.render('users/helper/information', {user: response.data.user});
                }
                else {
                    console.log(response.data.error);
                }
            }
        ).catch(function () {

        })

    }
    else {
        return res.redirect('/users/login');
    }

});
router.get('/maps', function (req, res ,next) {

    let isLogin = localStorage.getItem('login');

    if(isLogin) {//true

        console.log(localStorage.getItem('user_id'));
        return res.render('users/maps', {user_id: localStorage.getItem('user_id')});
    }

    return res.redirect('/users/login');

});
router.get('/logout', function (req, res, next) {

    localStorage.removeItem('token');
    localStorage.removeItem('login');
    return res.redirect('/');

});
module.exports = router;
