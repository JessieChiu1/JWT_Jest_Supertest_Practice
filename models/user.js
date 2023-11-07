const mongoose = require("mongoose")

// create schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
})

// export the schema
module.exports = mongoose.model("user", userSchema);