const mysql = require('mysql');


var cn = mysql.createPool ({
  host: "proyectotalleraws.c8a9zfxwaehz.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "Diego2010002322$",
  database:"movieReviews"
});

module.exports = cn