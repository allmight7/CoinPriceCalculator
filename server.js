const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.Port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect((err)=>{
     if (err){
    console.log('error connecting: ', err.stack);
    return;
    }
});
const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/coins',(req,res) => {
    connection.query(
        'SELECT * FROM coinInfo',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});


app.post('/api/coins', upload.single('monya'), (req,res) => {
    let sql = 'insert into coinInfo values (null, ?, ?, ?, ?, ?,?)';
    let coinSite =req.body.coinSite;
    let coinName =req.body.coinName;
    let buyPrice =req.body.buyPrice;
    let quantity =req.body.quantity;
    let amount =req.body.amount;
    let currentPrice =req.body.buyPrice;
    let params = [coinSite, coinName, buyPrice, quantity, amount, currentPrice];
    connection.query(sql, params,
            (err, rows, fields) => {
                res.send(rows);
            }
        )
});
app.post('/api/current', upload.single('monya'), (req,res) => {
    let sql = 'update coinInfo set currentPrice = ? where coinName = ?';
    let currentPrice = req.body.currentPrice;
    let coinName = req.body.coinName;
    let params = [ currentPrice,coinName];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});
app.delete('/api/coins/:id', (req, res) => {
    let sql = 'delete from coinInfo where id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port,() => console.log(`Listening on port ${port}`));