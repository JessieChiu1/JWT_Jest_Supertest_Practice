const express = require("express");
const morgan = require("morgan")

// init the app
const app = express();
// morgan is for logging all incoming requests
app.use(morgan("dev"))

// CORS policy - front end issue with browser not backend but fix on backend
// read up on headers
// middleware REMEMBER NEXT()
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Methods", "POST,GET");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});


// middleware to parse the string request to json
// 1 way client to server
app.use(express.json());

// mount router
app.use("/api/v1/auth", require("./routes/auth"))
app.use("/api/v1/users", require("./routes/users"))

// home page route
app.get("/", (req, res) => res.send("okay"));

module.exports = app