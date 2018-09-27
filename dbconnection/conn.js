var mysql = require('mysql');

var con = mysql.createConnection({
  host: "13.229.34.139",
  user: "root",
  password: "diracsoft",
  database: "repodata"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;
