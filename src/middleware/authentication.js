const jwt = require("jsonwebtoken");
const { SecretKey } = require('../../config');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if ( authHeader ) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, Buffer.from(SecretKey, 'base64'), (err, user) => {
            if ( err ) {
                console.log(err);
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = authenticateJWT;
