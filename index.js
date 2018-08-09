const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('./config.js');

const app = express();
const con = mysql.createConnection(config);

app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true; // to make rendered html look good
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
})); 

con.connect((err)=>{
    if (err) throw err;
    console.log("Connected to database!");
    
    app.get('/', (req, res)=>{
        con.query('SELECT * FROM basic ORDER BY time DESC', (err, rows, fields)=>{
            if (err) throw err;
            res.render('index.pug', {
                dir: 'index',
                data: rows,
            });
            console.log("Someone visited the index page.");
        });
    });

    app.delete('/', (req, res)=>{
        console.log("Delete request received.");
        console.log(req.body);
        let sql = `DELETE FROM basic WHERE id = ${con.escape(req.body.id)}`
        console.log(sql);
        con.query(sql, (err, results, fields)=>{
            if (err) {
                res.sendStatus(500);
            } else if (results.affectedRows===0) {
                res.sendStatus(410);
            } else {
                res.sendStatus(204);
            }
        });
    });

    app.put('/', (req, res)=>{
        console.log("Edit request received.");
        console.log(req.body);
        let sql = 'UPDATE basic SET ? WHERE id= ?';
        con.query(sql, [req.body, req.body.id],(err, results, fields)=>{
            if (err) {
                res.sendStatus(500);
            } else if (results.affectedRows===0) {
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
        let sql = `INSERT INTO basic (${con.escape(Object.keys(req.body)).replace(new RegExp('\'', 'g'),'')}) VALUES (${con.escape(Object.values(req.body))})`
        console.log(sql);
        con.query(sql, (err, rows, fields)=>{
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
});

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`My Simple Postboard listening on port ${port}!`))

