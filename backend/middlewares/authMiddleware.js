const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
    // 1. Grab the token straight out of our parsed cookies
    const token = req.cookies.token;

    // 2. If the cookie doesn't exist, block the user immediately
    if (!token) {
        return res.status(401).json({ message: "No token provided, authentication denied." });
    }

    try {
        // 3. Verify the token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach the decoded object to req.user for down-stream routes
        req.user = decoded; 
        
        next();
    } catch (error) {
        console.error("Token invalid:", error.message);
        return res.status(401).json({ message: "Token is invalid or expired." });
    }
};

module.exports = protect;


/*const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
    //  Grab the Authorization header from the incoming request
    const authHeader = req.header('Authorization');

    //  Check if the header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided, authorization denied." });
    }

    try {
        //  Extract the raw token string (splitting "Bearer <token_string>")
        const token = authHeader.split(' ')[1];

        // Decrypt and verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //  Attach the user's details (id and role) directly to the request object
        req.user = decoded;

        //  Everything is valid! Call next() to pass control to the final controller
        next();

    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ message: "Token is invalid or expired." });
    }
};

module.exports = protect;*/


//we hid id and role in payload of the jwt token . When jwt.verify() successfully decrypts it, it returns that payload:
//{ "id": 4, "role": "student", "iat": 1711200000, "exp": 1713792000 }
//By saving this directly into req.user, you make this information instantly accessible to whichever controller runs next.
