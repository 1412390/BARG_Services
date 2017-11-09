const express = require('express');
const router = express.Router();
const config = require('../config');
const db = require(config.PATH_DB);
const jwt = require(config.JWT); // used to create, sign, and verify tokens
const secretOrPrivateKey = config.secretOrPrivateKey;
const bcrypt = require(config.Bcrypt);
const saltRounds = config.saltRounds;
const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');



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
            if (response === true) {
              let payload = {
                user_id: data[0].id
              };
              let token = jwt.sign(payload, secretOrPrivateKey);
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
          const sql = `INSERT INTO user(username, password, name, email, dob, role) VALUES (
            '${username}',
            '${hash}',
            '${name}',
            '${email}',
            ${dob},
            -1
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
router.post('/get-information', function (req, res, next) {

  let token = req.body.token;

  jwt.verify(token, secretOrPrivateKey, function (error, decoded) {

    if (error)
      return res.json({ success: false, error: error });

    let user_id = decoded.user_id;

    const sql = `select* from user where id = ${user_id}`;

    let get_data = db.load(sql).then(
      data => {

        let dob = new Date(data[0].dob * 1000);
        data[0].dob = dob.getDate() + "-" + (dob.getMonth() + 1) + "-" + dob.getFullYear();
        return res.json({
          success: true,
          user: data[0]
        });
      },
      err => {
        console.log(err + "");
      }
    );
  });
});

module.exports = router;
