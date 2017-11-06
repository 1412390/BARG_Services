const express = require('express');
const router = express.Router();
const config = require('../config');
const db = require(config.PATH_DB);
const jwt = require(config.JWT); // used to create, sign, and verify tokens
const secretOrPrivateKey = config.secretOrPrivateKey;
const bcrypt = require(config.Bcrypt);
const saltRounds = config.saltRounds;
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', function (req, res, next) {

  let username = req.body.username;
  let password = req.body.password;

  let sql = `select* from user where username = '${username}'`;
  //excute sql
  db.load(sql).then(
    data => {
      if (data.length == 0) {
        res.json({
          success: false,
          err: "User is not exist!",
        });
      }
      else {
        let hash = data[0].password;
        bcrypt.compare(password, hash).then(
          function (response) {
            console.log(response);
            if (response === true) {
              var payload = {
                user_id: data[0].id
              };
              var token = jwt.sign(payload, secretOrPrivateKey, {
                expiresIn: 1440 // expires in 24 hours
              });
              return res.json({
                success: true,
                msg: 'Enjoy your token!',
                token: token
              });
            }
            else {
              return res.json({
                success: false,
                err: "Please check your password again!",
              });
            }
          }
        )
      }
    },
    err => {
      console.log(err + "");
    });
});
router.post('/register', function (req, res, next) {

  let
    username = req.body.username,
    password = req.body.password,
    email = req.body.email,
    dob = req.body.dob,
    name = req.body.name;

  //if user exist
  let sql = `select* from user where username = '${username}'`;
  //excute sql
  db.load(sql).then(
    data => {
      if (data.length !== 0) {
        res.json({
          success: false,
          err: "User is exist!",
        });
      }
      else {
        bcrypt.hash(password, saltRounds).then(function (hash) {
          // Store hash in your password DB.
          const sql = `INSERT INTO user(username, password, name, email, dob) VALUES (
            '${username}',
            '${hash}',
            '${name}',
            '${email}',
            ${dob}
          )`;
          db.insert(sql).then(
            data => {
              return res.json({
                success: true
              });
            },
            err => {
              console.log(err + "");
            }
          )
        });
      }
    },
    err => {
      console.log(err + "");
    }
  );
});

module.exports = router;
