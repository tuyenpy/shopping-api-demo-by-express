const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const {isAuth} = require('../config/auth');
const secretKey = process.env.secretKey || "secretKey";

//Login
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

//Create user
router.post('/register', (req, res) => {
    const {name, phone, email, password, password1} = req.body;
    const errors = [];
    if (!name || !phone || !email || !password){
        errors.push({msg: "Please enter all fields"});
    }

    if (password !== password1){
        errors.push({msg: "Password do not match"});
    }

    if (errors.length > 0){
        res.json(errors);
    } else {
        User.findOne({email: email})
        .then(user => {
            if (user) {
                res.json({
                    msg: "User is already exits",
                    user: user
                });
            }
        })
        .catch(err => console.log(err));

        const newUser = new User({
            name,
            phone,
            email,
            password
        });

        newUser.save()
        .then(user => {
            res.json({
                msg: "User is created",
                user: user
            });
        })
        .catch(err => console.log(`POST /register: `, err));
    }

});

module.exports = router;