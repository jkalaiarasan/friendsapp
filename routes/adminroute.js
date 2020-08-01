const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const user = require('../models/users');

router.post('/createUser', (req, res, next) =>{
    
    var password = req.body.password;
    var hasedpassword;
    var saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {  
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                throw err
            } else {
                let newuser = new user({
                    Department:"ECE",
                    UserName:req.body.username,
                    Password:hash,
                    First_Name:req.body.fname,
                    Last_Name:req.body.lname,
                    Phone:req.body.phone,
                    DOB:req.body.dob,
                    Email:req.body.email
                });
                newuser.save((err, user) =>{
                    if(err){
                        res.json(err);
                    } else {
                        res.json({msg: "Contact added successfully"});
                    }
                });
            }
        });
    });
});

router.delete('/deleteUser/:id', (req, res, next) =>{
    user.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;