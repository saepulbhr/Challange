var express = require('express');
var router = express.Router();

var moment = require('moment')
moment().format()
module.exports = function (pool) {


  // ================================= ROUTER HOME =================================
  router.get('/', function (req, res, next) {

    const { id, string, integer, float, date, boolean, nmId, nmString, nmInteger, nmFloat, nmDatestart, nmDateend, nmBoolean } = req.query;
    let result = [];
    let status = false

    if (id && nmId) {
      result.push(`id = ${nmId}`)
      status = true
    }
    if (string && nmString) {
      result.push(`kalimat = '${nmString}'`)
      status = true
    }
    if (integer && nmInteger) {
      result.push(`bilangan = ${nmInteger}`)
      status = true
    }
    if (float && nmFloat) {
      result.push(`pecahan = ${nmFloat}`)
      status = true
    }
    if (date && nmDatestart && nmDateend) {
      result.push(`waktu between '${nmDatestart}' and '${nmDateend}'`)
      status = true
    }
    if (boolean && nmBoolean) {
      result.push(`pilihan = '${nmBoolean}'`)
      status = true
    }

    let resultString = result.join('and');

    let sql = `SELECT count(*) as total FROM "tipeData"`;
    pool.query(sql, (err, count) => {
      if (err) { throw err }

      // let qty = count.rows[0].total;
      let page = req.query.page || 1;
      let limit = 3;
      let totalPage = Math.ceil(count.rows[0].total / limit);
      let pages = (page - 1) * limit
      let showQuery = req.query;
      let url = req.url === '/' ? '/page=1' : req.url

      let sql = `select * from "tipeData"`
      if (status == true) {
        sql += `where ${resultString}`
      }

      sql += ` LIMIT ${limit} OFFSET ${pages}`

      pool.query(sql, (err, row) => {
        // console.log(row.rows);

        res.render('index', { data: row.rows, pages: totalPage, current: page, url : url, show: showQuery, moment })
      })
    })

  });

  // ================================= ROUTER EDIT & UPDATE =================================

  router.get('/add', (req, res) => {
    res.render('add')
  });

  router.post('/save', (req, res) => {
    const str = req.body.string;
    const inte = parseInt(req.body.integer);
    const flot = parseFloat(req.body.float);
    const wkt = req.body.date;
    const bool = req.body.boolean;

    let sql = `INSERT INTO "tipeData"( kalimat, pecahan, bilangan, waktu, pilihan)VALUES ('${str}', ${flot}, ${inte}, '${wkt}', ${bool})`

    pool.query(sql, [], function (err) {
      if (err) { throw err }
      res.redirect('/')
    })
  });

  // =================================  ROUTER EDIT & UPDATE =================================
  router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    pool.query(`select * from "tipeData" where id = ${id}`, (err, row) => {
      if (err) { throw err }
      res.render('edit', { data: row.rows, moment })
    })
  });

  router.post('/update/:id', (req, res) => {
    const { id } = req.params;

    const stri = req.body.string;
    const int = parseInt(req.body.integer);
    const flt = parseFloat(req.body.float);
    const dt = req.body.date;
    const bool = req.body.boolean;

    if (bool === "true") {
      bool == true
    } else if (bool === "false") {
      bool == false
    }

    let sql = `UPDATE "tipeData" SET kalimat='${stri}',
                                     pecahan=${flt},
                                     bilangan=${int},
                                     waktu='${dt}',
                                     pilihan='${bool}' WHERE id = ${id}`;

    pool.query(sql, function (err) {
      if (err) { throw err }

      res.redirect('/');
    })

  })

  // ================================= DELETE =================================

  router.get('/delete/:id', (req, res) => {
    const { id } = req.params;

    pool.query(`DELETE FROM "tipeData" WHERE id = ${id}`, (err) => {
      if (err) { throw err }
      res.redirect('/')
    });
  })

  return router;
};