const router = require("express").Router()
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// we want some middleware to verify the token
router.get('/:id', async (req, res) => {
	// check if auth exist in the header
	const auth = req.headers.authorization
	if (!auth) {
		return res.status(400).json({
			message: "missing token",
		})
	}

	// find token and verify token for identity
	const token = auth.split(" ")[1]
	try {
		const tokenInfo = jwt.verify(token, process.env.JWT_SECRET)
		req.user = tokenInfo
		next()
	} catch(e) {
		return res.status(401).json({
			message: "unauthorized"
		})
	}
})

module.exports = router