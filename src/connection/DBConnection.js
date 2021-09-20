
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "samer1",
  password: "123456sam",
  port:'3306',
  database:'ERC'
});

con.connect();

module.exports={con};