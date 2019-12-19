const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user');

// Json Wen token 
// it will do token generation and signing


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
        // below user wull be the array we get
        .then(user =>{
            
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

router.post("/login", (req, res, next)=>{
    console.log(req.body.password)
    User.find({ email:req.body.email })
        .exec()
        // users will be empty array
        // finding the user
        .then( user =>{
            
            
            if (user.length <1){
                
               
               // return res.status(404).json({ message: 'mail does not found, user does not exist'}) // brute force  so lets not do
               return res.status(401).json({message:'Auth Failed'})
            }
            //we see if the password that is  sent as the request,  matches the password in our database
            // documentation
            bcrypt.compare(req.body.password, user[0].password, (err,result) =>{
                if(err){
                    console.log("comes here")
                    return res.status(401).json({ message:'Auth failed'})}
                if (result){
                   
                  
                    return res.status(200).json({message: "Auth Successful"})

                    // // See documentation
                    // const token= jwt.sign({email:user[0].email, userId:user[0]._id},
                    //           process.env.JWT_KEY, {expiresIn:"1hr"} );
                    // return res.status(200).json({
                    //     message:'Auth Successful',
                    //     token:token})
                    
                }
            
                
                res.status(401).json({message:'Auth failed'})
            })
        })
        .catch(err =>{ 
              
            res.status(500).json({ error:err})
        })

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