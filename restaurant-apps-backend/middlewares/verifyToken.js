const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ success: false, message: 'No token provided.' });
    }

    jwt.verify(token, '98450', (err, decoded) => {
        if (err) {
            return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
        }

        req.decoded = decoded;
        next();
    });
}

module.exports = verifyToken;
