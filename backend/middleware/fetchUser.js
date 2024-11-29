const jwt = require('jsonwebtoken');
const JWT_SECRET = "HarshWantsToBeWebDeveloper";

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    // while passing the request in Thunderclient pass header as auth-token and value as auth-token value recieved to the user when he/she login
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // Add id to request object
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchuser;