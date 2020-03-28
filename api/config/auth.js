const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey || "secretKey";

module.exports.isAuth = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined'){
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        //req.token = bearerToken;
        jwt.verify(bearerToken, secretKey, (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                //res.json(data);
                // Next middleware
                next();
            }
        });

    } else {
    // Forbidden
    res.sendStatus(403);
    }
};