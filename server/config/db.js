const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from the .env file in the server folder
dotenv.config({ path: path.join(__dirname, "../.env") });

// create the db
const db = mongoose.connection;

// connect the db
db.on("connected", () => {
    console.log("connected to MongoDB @" + db.host);
});

module.exports = mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});