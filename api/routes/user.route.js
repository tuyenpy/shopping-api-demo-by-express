const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const secretKey = process.env.secretKey || "secretKey";

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(!user){
            res.send("User not already exits");
        }
        if (user.password === password){
            jwt.sign({
                name: user.name,
                email: user.email
            },secretKey, (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            });
        }
    });
});

router.post('/register', (req, res) => {
    const {name, phone, email, password} = req.body;
});


module.exports = router;