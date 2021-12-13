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
console.log('!success');
});

app.get('/api/customers',(req,res) => {
    connection.query(
        "SELECT * FROM management.customer",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port,() => console.log(`Listening on port ${port}`));