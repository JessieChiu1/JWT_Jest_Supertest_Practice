const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// controller - code that is actually executed when we hit the route

// sign up
const signUp = async (req, res) => {
	try {
		// pull username/pw from req body
		const username = req.body.username;
		const password = req.body.password;
		// check if username/password exist from the request
		if (!username || !password) {
			return res.status(400).json({
				message: "missing username/password",
			});
		}
		// check DB if the user already exist with the username
		const foundUser = await User.findOne({
			username,
		});
		if (foundUser) {
			return res.status(400).json({
				message: "username already exist!",
			});
		}
		// if user doesn't already exist, encrypt password
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		// then create a user document in our DB
		const newUser = await User.create({
			username,
			password: hashedPassword,
		});
		// then we will generate the token, and include a user id in the token
		// the payload is the information stored in the JWT token
		const payload = { 
			username: newUser.username, 
			id: newUser._id.toString() 
		};
	
		// create token, and sign the token
		const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
			algorithm: "HS256",
			expiresIn: "6h",
		});
		// then respond with the token
		return res.status(200).json({
			token: authToken,
		});
	} catch(e) {
        console.log(e)
		return res.status(500).json({
			message: `Internal Service Error. Please try again. ${e}`
		})
	}
}
// login
const login = async (req, res) => {
	try {
		// pull username/pw from req body
		const username = req.body.username;
		const password = req.body.password;
		// check if username or password is missing from teh request
		if (!username || !password) {
			return res.status(400).json({
				message: "Missing Username or Password",
			})
		}
		// Find user and compare password
		// find user
		const foundUser = await User.findOne({
			username,
		})
		// if user doesn't exist
		if (!foundUser) {
			return res.status(400).json({
				message: "Incorrect Username or Password"
			})
		}
		// or else we are comparing the encoded password with the req's password
		// Note that the password in the DB is a hashed password

		// I was wondering why the compareSync method doesn't require the secret key to hash the password and compare, but it turns out the method will automatically used the secret_key (salt) that was originally used
		const correctPassword = bcrypt.compareSync(password, foundUser.password)
		if (!correctPassword) {
			return res.status(400).json({
				message: "Incorrect Username or Password"
			})
		}
		// scenario 3: everything is good so return the JWT token
		const payload = {
			username: foundUser.username,
			id: foundUser._id.toString()
		}
	
		const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
			algorithm: "HS256",
			expiresIn: "6h",
		})
	
		return res.status(200).json({
			token: authToken
		})
	} catch(e) {
		return res.status(500).json({
			message: `Internal Service Error. Please try again. ${e}`
		})
	}

}

// authenticate
const authenticate = async (req, res, next) => {
	// check if auth exist in the header
	const auth = req.headers.authorization
	if (!auth) {
		return res.status(400).json({
			message: "missing token",
		})
	}

	// find token and verify token for identity
	const token = auth.split(" ")[1]
	console.log(token)
	try {
		const tokenInfo = jwt.verify(token, process.env.JWT_SECRET)
		req.user = tokenInfo
		// next() -> tell express to trigger the next middleware
		next()
	} catch(e) {
		console.log(e)
		return res.status(401).json({
			message: "unauthorized"
		})
	}
}

module.exports = {
    signUp,
    login,
    authenticate,
}