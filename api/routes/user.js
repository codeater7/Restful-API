const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const User = require('../models/user');

// Create a new user using the post Route
// overall the user will be user/signup
// Load this route just like the other route from within app.js ans using certain prefixes and then pointing to the routes file
// router.post('/signup', (req, res, next)=>{
//     // import the User model and create the new user
//     const user = new User ({
//         _id: new mongoose.Types.ObjectId(),
// We will assume that we get this field from the incoming request, but has one flaw
// i.e we store raw password in the database which we dont want
// We need to hash that, using node.becrypt.js

// hash is one way. like a dictionary, since they are dictionary, it could still be possible to get their value

//To avoid that, we need to use salting, It means, adding random strings into that hashed
// later part 10  descibes the salting part
// then we have the callback

//         email: req.body.email,
//         password: bcrypt.hash(req.body.password, 10 (err,hash)=>{
//             if (err){
//                 return res.status(500).json({
//                     error:err,
//                 });

//             }else{
//                 //hashed password
//             }
//         })

//     };

// }

router.post('/signup', (req, res, next) => {
	bcrypt.hash(req.body.email, 10, (err, hash) => {
		if (err) {
			res.status(500).json({
				error: err,
			});
		} else {
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				email: req.body.email,
				password: hash,
			});
            user.save()
            .then(result=>{
                console.log(result)
                res.status(201).json({ message: 'USer Created'})
            })
            .catch( err =>{
                console.log(err)
                res.status(500).json({ error:err})
            })
                
		}
	});
});

module.exports = router;

// --save will add the entry to packagae.json
