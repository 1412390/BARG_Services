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
router.post('/set-point', function (req, res, next) {

  let address = req.body.address,
    type = req.body.type,
    note = req.body.note,
    status = req.body.status,
    user_id = req.body.user_id;

  const sql = `INSERT INTO point(address, type, note, status, user_id) VALUES (
    '${address}',
    ${type},
    '${note}',
    ${status},
    ${user_id}    
  )`;
  db.insert(sql).then(
    data => {
      res.json({
        success: true,
        id: data
      });
    },
    err => {
      console.log(err + "");
    }
  )
});
router.post('/get-point-locating', function (req, res, next) {

  const user_id = req.body.user_id;
  const sql = `SELECT* FROM point where user_id = ${user_id} LIMIT 1`;
  db.load(sql).then(
    data => {
      if (data.length > 0) {
        res.json({
          success: true,
          point: data[0]
        });
      }
      else {
        return res.json({
          success: false,
          point: null
        });
      }
    },
    err => {
      console.log(err + "");
    }
  )
});

router.get('/get-point-not-locate', function (req, res, next) {
  
    const sql = `SELECT* FROM point where status = -1 LIMIT 1`;
    db.load(sql).then(
      data => {
        if (data.length > 0) {
          res.json({
            success: true,
            point: data[0]
          });
        }
        else {
          return res.json({
            success: false,
            point: null
          });
        }
      },
      err => {
        console.log(err + "");
      }
    )
  });

router.post('/set-confirm-locater-locating-point', function (req, res, next) {

  let user_id = req.body.user_id;
  let point_id = req.body.point_id;
  let status = req.body.status;

  const sql = `UPDATE point SET status=${status},user_id=${user_id} WHERE id = ${point_id}`;
  
  db.load(sql).then(
    data => {
      console.log('update successful');
      res.json({
        success: true
      });
    },
    err => {
      console.log(err + "");
    }
  )

});
module.exports = router;
