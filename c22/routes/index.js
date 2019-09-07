var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

var moment = require('moment')
moment().format()

/* GET home page. */
module.exports = function (db) {

  const collection = db.collection('tipeData');

  router.get('/', function (req, res, next) {

    const { id, nmId, string, nmString, integer, nmInteger, float, nmFloat, idate, nmDatestart, nmDateend, boolean, nmBoolean } = req.query;
    let result = {}

    if (id && nmId) result._id = ObjectId(nmId)
    if (string && nmString) result.kalimat = nmString;
    if (integer && nmInteger) result.bilangan = nmInteger;
    if (float && nmFloat) result.pecahan = nmFloat;
    if (idate && nmDatestart) {
      result["waktu"] = {}
      result["waktu"].$gte = nmDatestart, result["waktu"].$lte = nmDateend
    }
    // if(idate && nmDateend)result["waktu"].$lte = nmDateend;
    if (boolean && nmBoolean) result.pilihan = nmBoolean;

    let query = req.query;
    let page = req.query.page || 1;
    let limit = 2;
    // let totalPage = Math.ceil(6 / limit);
    let url = req.url === '/' ? '/page=1' : req.url

    let pages = (page - 1) * limit;

    db.collection('tipeData').find(result).limit(limit).skip(pages).toArray().then(row => {
      db.collection('tipeData').find(result).count().then(count => {
        res.render('index', { data: row, current: page, pages: Math.ceil(count / limit), query: query, url: url });
      })
    })
      .catch(err => console.error(err))
  });

  router.get('/add', function (req, res, next) {
    res.render('add')
  });

  router.post('/save', function (req, res, next) {

    let str = req.body.string;
    let int = req.body.integer;
    let flt = req.body.float;
    let wkt = req.body.date;
    let bool = req.body.boolean;

    collection.insert([
      {
        kalimat: `${str}`,
        bilangan: `${int}`,
        pecahan: `${flt}`,
        waktu: `${wkt}`,
        pilihan: `${bool}`
      }
    ], function (err) {
      if (err) { throw err }
      res.redirect('/')
    })
  });

  router.get('/delete/:_id', function (req, res, next) {
    const id = req.params._id;
    collection.deleteOne({ _id: ObjectId(id) }, function (err) {
      if (err) { throw err }
      res.redirect('/')
    });
  });

  router.get('/edit/:_id', function (req, res, next) {
    const id = req.params._id;
    collection.find({ _id: ObjectId(id) }).toArray(function (err, docs) {
      res.render('edit', { data: docs, moment })
    })
  })

  router.post('/update/:_id', function (req, res, next) {
    const id = req.params._id;

    let str = req.body.string;
    let int = req.body.integer;
    let flt = req.body.float;
    let wkt = req.body.date;
    let bool = req.body.boolean;
    // let DataId = {_id : ObjectId(id)};
    // let UpdateData = { $set: { kalimat : str, bilangan : int, pecahan : flt, waktu : wkt, pilihan : bool } }


    collection.updateOne({ _id: ObjectId(id) },
      { $set: { kalimat: str, bilangan: int, pecahan: flt, waktu: wkt, pilihan: bool } }, function (err, result) {
        if (err) { throw err }
        res.redirect('/')
      });
  });

  return router;
}
