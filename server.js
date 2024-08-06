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

app.get("/api/customers", (req, res) => {
  conn.query(
    "SELECT * FROM customer",
    (err,rows,fields)=>{
      res.send(rows);
    }
  );
});

app.listen(port, () => console.log(`서버 동작중 ${port}`));

//http://localhost:5000/api/customers
