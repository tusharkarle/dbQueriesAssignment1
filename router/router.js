const express = require("express");
const db=require("../connection/connection.js");
const Router = express.Router();
Router.use(express.json());

Router.get("/", async (req, res) => {
    try {
        res.send("homepage")
    } catch (error) {
        console.log(error);
    }
});

Router.get("/createdb", async (req, res) => {
        const createdbQuery = "CREATE DATABASE employeedata";
        db.query(createdbQuery, (err, result) => {
            if (err) {
                console.log(err);
                console.log(result);
                throw err;
            }
            else { 
                console.log(result);
                res.send("database created");
                console.log("database created");
            }

        });
    
});

Router.get("/createTable", async (req, res) => {
    const createTableQuery =" CREATE TABLE `employeedata`.`employeedetails` ( `id` INT NOT NULL AUTO_INCREMENT , `firstname` VARCHAR(255) NOT NULL , `lastname` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` INT(10) NOT NULL , `address` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;"; 
    db.query(createTableQuery, (err, result) => {
        if (err) {
            res.send(err);
            throw err;
        }
        else {
            res.send("Table Created")
        }
    });
});
 
Router.post("/employee", async (req, res) => { 
    const givenData = req.body;
    const addEmployeeQuery = "INSERT INTO `employeedetails` SET ?";
    db.query(addEmployeeQuery, givenData, (err, result) => {
        if (err) {
            res.send(err);
            throw err;
        }
        else {
            res.send("added to the table");
            res.send(result);
        }
     });

});

Router.get("/employee", async (req, res) => {
    const allEmployeeQuery = "SELECT * FROM `employeedetails` WHERE 1";
    db.query(allEmployeeQuery, (err, result) => { 
        if (err) {
            res.send(err);
            throw err;
        }
        else { 
            res.send(result);
        }
    });
});

Router.get("/employee/:id", async (req, res) => {
    const givenId = req.params.id;
    const employeeByIDquery = "SELECT * FROM `employeedetails` WHERE id = ?";
    db.query(employeeByIDquery,givenId, (err, result) => { 
        if (err) {
            res.send(err);
            throw err;
        }
        else { 
            res.send(result);
        }
    });
});

Router.patch("/employee/:id", async (req, res) => {
    const givenId = req.params.id;
    const data = req.body;
    const employeeByIDquery = "UPDATE `employeedetails` SET ?  WHERE id=?";
    db.query(employeeByIDquery,[data,givenId], (err, result) => { 
        if (err) {
            res.send(err);
            throw err;
        }
        else { 
            res.send(result);
        }
    });
});

Router.delete("/employee/:id", async (req, res) => {
    const givenId = req.params.id;
    const employeeByIDquery = "DELETE FROM `employeedetails` WHERE id= ?";
    db.query(employeeByIDquery,givenId, (err, result) => { 
        if (err) {
            res.send(err);
            throw err;
        }
        else { 
            res.send(result);
        }
    });
});


module.exports = Router;