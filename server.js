const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: conf.host,
  port: conf.port,
  user: conf.user,
  password: conf.password,
  database: conf.database
});
conn.connect();

const multer = require('multer')
const upload =multer({dest:'./upload'})

app.get("/api/customers", (req, res) => {
  conn.query(
    "SELECT * FROM customer",
    (err,rows,fields)=>{
      res.send(rows);
    }
  );
});

app.use('/image',express.static('./upload'));

app.post('/api/customers',upload.single('image'),(req,res)=>{
  let sql ='INSERT INTO customer VALUES (null,?,?,?,?,?)';
  let image = 'http://localhost:5000/image/' + req.file.filename
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params =[image,name,birthday,gender,job];
  conn.query(sql, params, (err, rows, fields) => {
    if (err) {
      console.error("Error inserting customer", err);
      res.status(500).send("Database error");
      return;
    }
    res.send(rows);
  });
});
app.listen(port, () => console.log(`서버 동작중 ${port}`));

//http://localhost:5000/api/customers
