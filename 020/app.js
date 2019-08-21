// config express
const express = require('express');
const app = express();
const port = 3001


// config body-parse
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

// config sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('challange.db');

// =========================== ROUTER HOME ===========================
app.get('/', (req, res) => {

    const { id, string, integer, float, date, boolean, nmId, nmString, nmInteger, nmFloat, nmDatestart, nmDateend, nmBoolean } = req.query;

    // data untuk menampung filter
    let temp = []

    let stat = false

    // ---------------------------- function filter ----------------------------
    if (id && nmId) {
        temp.push(`id = ${nmId}`)
        stat = true
    }

    if (string && nmString) {
        temp.push(`kata = '${nmString}'`)
        stat = true
    }

    if (integer && nmInteger) {
        temp.push(`bilanganBulat = ${nmInteger}`)
        stat = true
    }

    if (float && nmFloat) {
        temp.push(`pecahan = ${nmFloat}`)
        stat = true
    }

    if (date && nmDatestart && nmDateend) {
        temp.push(`waktu BETWEEN '${nmDatestart}' and '${nmDateend}'`)
        stat = true
    }

    if (boolean && nmBoolean) {
        temp.push(`pilihan = '${nmBoolean}'`)
        stat = true
    }
    //------------------------------------------------------------------------------------ 

    // conversi dari array ke string
    let joindata = temp.join(' and ');


    let sql = "SELECT count(*) as total FROM data";


    //kondisi ketika filter
    if (stat == true) {
        sql += ` where ${joindata} `
    }



    db.all(sql, [], (err, count) => {
        let rows = count[0].total //jumlah data dalam table
        let page = req.query.page || 1; // nilai awal page
        let limit = 2; // batas data yang di tampilkan 
        let totalPage = Math.ceil(rows / limit) // mencari jumlah data
        let pages = (page - 1) * limit
        let queries = req.url === '/' ? '/?page=1' : req.url;

        console.log(queries)

        sql = `select * from data`;
        if (stat == true) {
            sql += ` where ${joindata} `
        }

        sql += ` LIMIT ${limit} OFFSET ${pages}`
        console.log(sql)
        // menampilkan semua data yang ada di table data
        console.log(sql)
        db.all(sql, [], (err, row) => {

            res.render('index', { show: row, pages: totalPage, current: page, query: queries })
        })



    })
});

// =========================== ROUTER ADD SAVE ===========================
app.get('/add', (req, res) => {
    res.render('add')
});

app.post('/save', (req, res) => {
    const stri = req.body.string;
    const int = parseInt(req.body.integer);
    const flt = parseFloat(req.body.float);
    const date = req.body.date;
    const bool = req.body.boolean;

    db.run(`insert into data (kata, bilanganBulat, pecahan, waktu, pilihan) values (?,?,?,?,?)`, [stri, int, flt, date, bool], function (err) {
        if (err) { throw err; }
        res.redirect('/')
    })

    // console.log(req.body)
});

// =========================== ROUTER EDIT UPDATE ===========================
app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    db.all(`select * from data where id = ${id}`, (err, row) => {
        if (err) { throw err }
        res.render('edit', { data: row })

    })
});

app.post('/update/:id', (req, res) => {
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

    let sql = `update data set kata = '${stri}',
                               bilanganBulat = ${int},
                               pecahan = ${flt},
                               waktu = '${dt}',
                               pilihan = '${bool}'
                where id = ${id}`;
    console.log(sql)

    db.run(sql, function (err) {
        if (err) { throw err }

        res.redirect('/');
    })

})

// =========================== ROUTER DELETE ===========================
app.get('/delete/:id', (req, res) => {
    const { id } = req.params
    db.run(`delete from data where id = ?`, id, function (err) {
        if (err) { throw err }
        res.redirect('/');
    });
});

app.listen(port, () => console.log(`example app listening on port ${port}`))
