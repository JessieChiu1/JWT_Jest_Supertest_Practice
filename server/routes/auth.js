const router = require("express").Router()
const usersController = require("../controllers/auth")


// Note on why you need to add "Bearer" in the auth token
// https://security.stackexchange.com/questions/108662/why-is-bearer-required-before-the-token-in-authorization-header-in-a-http-re
router.post("/signup", usersController.signUp);

router.post("/login", usersController.login);

module.exports = router