const router = require("express").Router()
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth")
const usersController = require("../controllers/users")

// we want some middleware to verify the token
router.get('/:id', authController.authenticate, usersController.getUser)

module.exports = router