const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const con = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true; // to make rendered html look good
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
})); 

con.connect();
console.log("Connected to database!");
    
    app.get('/', (req, res)=>{
        con.query('SELECT * FROM basic ORDER BY time DESC', (err, results)=>{
            if (err) throw err;
            res.render('index.pug', {
                dir: 'index',
                data: results.rows,
            });
            console.log("Someone visited the index page.");
        });
    });

    app.delete('/', (req, res)=>{
        console.log("Delete request received.");
        console.log(req.body);
        let sql = `DELETE FROM basic WHERE id = $1`
        console.log(sql);
        con.query(sql, [req.body.id], (err, results)=>{
            if (err) {
                res.sendStatus(500);
            } else if (results.rowCount===0) {
                res.sendStatus(410);
            } else {
                res.sendStatus(204);
            }
        });
    });

    app.put('/', (req, res)=>{
        console.log("Edit request received.");
        console.log(req.body);
        let sql = 'UPDATE basic SET title=$1, subtitle=$2, text=$3 WHERE id= $4'; // not best for more/variable field number, but works for now
        con.query(sql, [req.body.title, req.body.subtitle, req.body.text, req.body.id], (err, results)=>{
            if (err) {
                res.sendStatus(500);
            } else if (results.rowCount===0) {
                res.sendStatus(410);
            } else {
                res.sendStatus(204);
            }
        });
    });

    app.get('/post', (req, res)=>{
        res.render('post.pug', {
            dir: 'post'
        });
        console.log("Someone visited the post page.");
    });

    app.post('/post', (req, res)=>{
        console.log("Post received.");
        console.log(req.body);
        let sql = 'INSERT INTO basic VALUES ($1, $2, $3)' // currently only 3 fields
        console.log(sql);
        con.query(sql, [req.body.title, req.body.subtitle, req.body.text], (err, results)=>{
            if (err) {
                res.status(400);
                res.render('post.pug', {
                    dir: 'post',
                    failed: true,
                    failedContent: req.body
                });
                console.log(`Insert failed: ${err}`);
            } else {
                res.render('post.pug', {
                    dir: 'post',
                    posted: true 
                });
                console.log("Insert success!");
            }
        });
    });

    app.get('/*', (req, res)=>{
        res.redirect('/');
    });

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`My Simple Postboard listening on port ${port}!`))

