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
    // But we need to find the if the email already exists or not 
    User.find({email:req.body.email})
        .exec()
        // We do we get mail exists even if the mail does not exists?? 
        // In above case it is never going to be null so, it says mail exists
        // instead we need to check the length
        .then(user =>{
            console.log(user)
            if (user.length >=1){
                return res.status(409).json({ message: 'Mail exists'})
            }else{
                bcrypt.hash(req.body.email, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json ({error: err});
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
                            res.status(500).json({ error:err})
                        })
                            
                    }
                });
            };
            
        })
    })

router.post('/login', (req, res, next)=>{
    User.find({email:req.body.email})
        .exec()
        .then()
        .catch()

})

router.delete('/:userId', (req, res, next)=>{
    User.remove({_id:req.params.userId}) // What is encoded in url, so it is above userID
        .exec()
        .then(result =>{
            res.status(200).json({message: 'User Deleted'})
        })
        .catch(err =>{ 
            res.status(500).json({ error:err})
        })
})
        
	

module.exports = router;

// --save will add the entry to packagae.json
