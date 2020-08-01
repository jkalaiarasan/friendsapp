const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const router = express.Router();

const user = require('../models/users');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, "FLEKNNIRQSQ", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.get('/getAllUser', authenticateJWT, (req, res) =>{
    user.find(function(err, users){
        res.json(users);
    });
});

router.get('/getUserInfo/:id', (req, res, next) =>{
    user.find(function(err, users){
        res.json(users);
    });
});

router.post('/login', (req, res) =>{
    user.findOne({
        UserName:req.body.username
    })
    .then(user => {
        if(user){
            var userMatch = bcrypt.compareSync(req.body.password, user.Password);
            if(userMatch){
                const payload = {
                    _id : user._id,
                    Email: user.Email,
                    First_Name: user.First_Name
                }
                let token = jwt.sign(payload, "FLEKNNIRQSQ", {
                    expiresIn : "1h",
                })
                res.send(token);
            }
            else {
                res.send("Password Mismatch");
            }
        } else {
            res.send("User not found");
        }
    })
});

module.exports = router;