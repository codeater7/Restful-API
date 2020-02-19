const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
	//docode method will only decode the token but not verify, token is not encripted
	// decode is only useful if only we want to get into the internals of the token after having verified it

	//Rule of thumb is that first of all verify and decode

	try {
		// token generally comes from the headers.authorizarion so we dont send from the req.body  [ authorization  bearer ndkalfnakn]
        const token = req.headers.authorization.split(" ")[1];
        
		// console.log("token from check-auth",token);
		// console.log("jwt token", process.env.JWT_KEY)
		// const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);

		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.userData = decoded;
		next();

	} catch (error) {
		return res.status(401).json({
			message: 'Auth Failed',
		});
	}
};

//verify the incoming token
//the server can verify the token whoever is valid or not but need secret or Public Key on the server and we need the token



