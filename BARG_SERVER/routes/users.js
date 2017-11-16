const express = require('express');
const multiparty = require('multiparty')
const router = express.Router();
const config = require('../config');
const db = require(config.PATH_DB);
const jwt = require(config.JWT); // used to create, sign, and verify tokens
const secretOrPrivateKey = config.secretOrPrivateKey;
const bcrypt = require(config.Bcrypt);
const saltRounds = config.saltRounds;
const q = require('q');

function getPoint(status) {
  d = q.defer()
  const sql = `select* from point where stats = ${status}`;
  db.load(sql)
    .then(
    data => {
      if (data.length > 0) {
        d.resolve({ success: true, point: data[0] });
      }
      else {
        d.resolve({ success: false });
      }
    }
    )
    .catch(err => d.resolve({ success: false }));
  return d.promise;
}
function decodedToken(token) {
  let d = q.defer();
  jwt.verify(token, secretOrPrivateKey, function (err, decoded) {
    if (err) {
      d.resolve({ success: false });
    }
    else {
      d.resolve({ success: true, user_id: decoded.user_id });
    }
  });
  return d.promise;
}
function bcryptHash(password) {
  let d = q.defer();
  bcrypt.hash(password, saltRounds)
    .then(
    hash => {
      d.resolve({ success: true, getHash: hash });
    })
    .catch(err => { d.resolve({ success: false }) });
  return d.promise;
}
function bcryptCompare(password, hash) {
  let d = q.defer();
  bcrypt.compare(password, hash)
    .then(response => { d.resolve(response); })
    .catch(err => { d.resolve(false); });
  return d.promise;
}
function userExist(username) {
  let d = q.defer();
  let sql = `select* from user where username = '${username}'`;
  db.load(sql)
    .then(data => {
      data.length === 0 ? d.resolve({ success: false }) : d.resolve({ user: data[0], success: true });
    })
    .catch(err => { d.resolve({ success: false }); });
  return d.promise;
}

/* GET users listing. */
router.put('/send_to_driver',function(req,res,next){
  const data = req.body
  const sql = `UPDATE point SET status = 1 , driver_id=${data.driver.id}, lat = ${data.lat}, lng=${data.lng}  WHERE id=${data.point_id}`;
  const sql_driver = `UPDATE drivers SET status="busy" WHERE id=${data.driver.id}`;

  db.update(sql_driver)
  .then(result=>{
    return db.update(sql)
  })
  .then(result=>{
    res.json({
      message:"updated success",
      status:"OK"
    })
  })
  .catch(err=>{
    console.log("err",err)
  })
})
router.get('/', function (req, res, next) {res.send('respond with a resource');});
router.get('/', function (req, res, next) { res.send('respond with a resource'); });
router.post('/login', function (req, res, next) {

  let username = req.body.username;
  let password = req.body.password;
  let payload = { user_id: null };
  userExist(username)
    .then(//check user is exist  
    data => {
      if (data.success) {
        let hash = data.user.password;
        payload.user_id = data.user.id;
        return bcryptCompare(password, hash);
      }
      else {//user is not exist
        res.json({
          success: false,
          err: "User is not exist!",
        });
      }
    }
    )
    .then(//check password
    check => {
      if (check) {//true
        let token = jwt.sign(payload, secretOrPrivateKey);
        return res.json({
          success: true,
          msg: 'Enjoy your token!',
          token: token
        });
      }
      else {//false
        return res.json({
          success: false,
          err: "Please check your password again!",
        });
      }
    }
    )
    .catch(err => { console.log(err + "") });
});
router.post('/register', function (req, res, next) {

  let username = req.body.username,
    password = req.body.password,
    email = req.body.email,
    dob = req.body.dob,
    name = req.body.name;

  //if user exist
  userExist(username)
    .then(
    data => {
      if (data.success) {//if user exist
        return res.json({
          success: false,
          err: "User is exist!",
        });
      }
      else {
        return bcryptHash(password);//hash pasword by bcrypt
      }
    }
    )
    .then(
    hash => {
      if (hash.success) {//hash password success
        let sql = `INSERT INTO user(username, password, name, email, dob, role) VALUES (
            '${username}',
            '${hash.getHash}',
            '${name}',
            '${email}',
            ${dob},
            -1
          )`;
        return db.insert(sql);
      }
    }
    )
    .then(//insert user
    data => {
      return res.json({
        success: true
      });
    }
    )
    .catch(err => console.log(err + ""));
});
router.post('/get-information', function (req, res, next) {

  let token = req.body.token;
  decodedToken(token)
    .then(
    decoded => {
      if (decoded.success) {
        let user_id = decoded.user_id;
        const sql = `select* from user where id = ${user_id}`;
        return db.load(sql);
      }
    }
    )
    .then(
    data => {
      console.log("data150",data)
      let dob = new Date(data[0].dob * 1000);
      data[0].dob = dob.getDate() + "-" + (dob.getMonth() + 1) + "-" + dob.getFullYear();
      return res.json({
        success: true,
        user: data[0]
      });
    }
    )
    .catch(err => console.log(err + ""));
});
router.post('/set-point', function (req, res, next) {

  let address = req.body.address,
    type = req.body.type,
    note = req.body.note,
    status = req.body.status,
    user_id = req.body.user_id;
  const sql = `INSERT INTO point(address, type, note, status, user_id, driver_id, lat, lng) VALUES (
    '${address}',
    ${type},
    '${note}',
    ${status},
    ${user_id},
    -1,
    -1,
    -1    
  )`;
  db.insert(sql)
    .then(
    data => {
      res.json({
        success: true,
        id: data
      });
    })
    .catch(err => console.log(err + ""));
});
router.post('/get-point-locating', function (req, res, next) {

  const user_id = req.body.user_id;
  const sql = `SELECT* FROM point where user_id = ${user_id} and status=0 LIMIT 1`;
  db.load(sql)
    .then(
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
    })
    .catch(err => console.log(err + ""));
});
router.get('/get-point-not-locate', function (req, res, next) {
  const sql = `SELECT* FROM point where status = -1 LIMIT 1`;
  db.load(sql)
    .then(
    data => {
      if (data.length > 0) {
        res.json({
          success: true,
          point: data[0]
        });
      }
      else {
        res.json({
          success: false
        });
      }
    })
    .catch(err => console.log(err + ""));
});
router.get('/get-all-point-not-locate', function (req, res, next) {
  const sql = `SELECT* FROM point where status = -1 ORDER BY id DESC`;
  db.load(sql)
    .then(
    list => {
      if (list.length > 0) {
        return res.json({
          success: true,
          ls_point: list
        });
      }
      else {
        return res.json({
          success: false,
        });
      }
    })
    .catch(err => console.log(err + ""));
});
router.get('/get-all-point-is-locating', function (req, res, next) {
  const sql = `SELECT* FROM point where status = 0 ORDER BY id DESC`;
  db.load(sql)
    .then(
    list => {
      if (list.length > 0) {
        return res.json({
          success: true,
          ls_point: list
        });
      }
      else {
        return res.json({
          success: false,
        });
      }
    })
    .catch(err => console.log(err + ""));
});
router.get('/get-all-point-located', function (req, res, next) {
  const sql = `SELECT* FROM point where status = 1 ORDER BY id DESC`;
  db.load(sql)
    .then(
    list => {
      if (list.length > 0) {
        return res.json({
          success: true,
          ls_point: list
        });
      }
      else {
        return res.json({
          success: false,
        });
      }
    })
    .catch(err => console.log(err + ""));
});
router.post('/set-confirm-locater-locating-point', function (req, res, next) {

  let user_id = req.body.user_id;
  let point_id = req.body.point_id;
  let status = req.body.status;

  const sql = `UPDATE point SET status=${status},user_id=${user_id} WHERE id = ${point_id}`;
  db.load(sql)
    .then(
    data => {
      res.json({
        success: true
      });
    })
    .catch(err => console.log(err + ""));
});
router.post('/set-confirm-driver-recived-point', function(req, res, next){
  let point_id = req.body.point_id;
  let driver_id = req.body.driver_id;
  let status = req.body.status;
  const sql = `UPDATE point SET status=${status},driver_id=${driver_id} WHERE id = ${point_id}`;
  db.load(sql)
    .then(
    data => {
      res.json({
        success: true
      });
    })
    .catch(err => console.log(err + ""));
});
module.exports = router;
