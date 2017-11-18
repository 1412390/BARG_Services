var express = require('express');
var q = require('q');
var faker = require('faker');
var router = express.Router();
var db = require('../db/db')


var default_position = {
  lat: 10.7666851,
  lng: 106.641758
};

function generateDriver(pos) {
  const plate_id = faker.random.number(1000, 9999)
  return {
    name: faker.name.findName(),
    plate_id: plate_id,
    status: faker.random.boolean() ? "busy" : "free",
    lat: pos.lat,
    lng: pos.lng
  }
}

function sqlInserMany(table, data) {
  const d = q.defer()
  let string_data = ""
  for (let i = 0; i < 100; i++) {
    string_data += `('${data[i].name}','${data[i].plate_id}','${data[i].status}','${data[i].lat}','${data[i].lng}','${i}'),`
  }
  let format_values = string_data.slice(0, string_data.length - 1)
  const result = `INSERT INTO ${table} (name,plate_id,status,lat,lng,id) VALUES ${format_values}`
  d.resolve(result)
  return d.promise;
}

function generateMotoBikeLocation(location) {
  const d = q.defer()
  const position_arr = []
  for (let i = 0; i < 100; i++) {
    let fix_lat = i % 2 == 0 ? -1 : 1
    let fix_lng = i % 2 != 0 ? -1 : 1
    let pos = {
      lat: i * (Math.random()) / 500 * fix_lat + location.lat,
      lng: i * (Math.random()) / 500 * fix_lng + location.lng
    }
    let driver = generateDriver(pos)
    position_arr.push(driver)
  }
  d.resolve(position_arr)
  return d.promise;
}

function generateWorker(default_position) {
  generateMotoBikeLocation(default_position)
    .then(drivers => {
      return sqlInserMany("drivers", drivers)
    })
    .then(sql => {
      return db.insert(sql)
    })
    .then(status => {
      console.log("state", status)
    })
    .catch(err => {
      console.log("err", err)
    })
}
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.put('/point-status',(req,res,next)=>{
  let data = req.body
  console.log("server",data)
  let sql = `update point set status=${data.status} where id=${data.id}`
  db.update(sql)
  .then(result=>{
    res.send("OK");
  })
  .catch(err=>{ 
    console.log(err)
  })
})
router.get('/drivers',(req,res,next)=>{
  let filter = req.query.filter
  const sql = filter ? `select * from drivers where status='${filter}'` : `select * from drivers`
  db.load(sql)
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send(err)
  })
})
router.get('/point/:id',(req,res,next)=>{
  let sql = `select * from point where id=${req.params.id}`
  let result={}
  let distance
  db.load(sql)
  .then(response=>{
    let data = response[0]
    result.user={
      lat:data.lat,
      lng:data.lng   
    }
    distance = data.distance
    sql = `select * from drivers where id = ${data.driver_id}`
    return db.load(sql)
  })
  .then(response=>{
    let data = response[0]
    result.driver={
      lat:data.lat,
      lng:data.lng    
    }
    result.infor = {
      name:data.name,
      distance: data.value,
      plate_id: data.plate_id
    }
    res.json(result);
  })
  .catch(err=>{
    console.log(err)
  })
})
module.exports = router;