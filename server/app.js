const express = require("express");
require("dotenv").config();
require("../config/db");

// init the app
const app = express();

// middleware to parse the string request to json
// 1 way client to server
app.use(express.json());

// mount router
app.use("/auth", require("./auth"))
app.use("/user", require("./user"))

// home page route
app.get("/", (req, res) => res.send("okay"));

app.listen((PORT = 3001), () => {
	console.log("listening");
});


module.exports = app