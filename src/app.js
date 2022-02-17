const express = require("express");
const mysql = require("mysql");
const Router = require("../router/router.js")
const port = process.env.PORT || 8000;

app = express();


//use the router
app.use(Router)
app.use(express.json());

app.listen(port, () => {
    console.log(`listing to the port ${port}`);
 });
