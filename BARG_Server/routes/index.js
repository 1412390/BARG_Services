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
module.exports = router;