const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"employeedata"
});

db.connect((err) => {
    if (!err) {
        console.log("connection successful");
    }
    else { 
        console.log(err);
    }
});
 
module.exports = db;