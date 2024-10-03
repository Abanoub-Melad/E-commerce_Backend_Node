const jwt = require('jsonwebtoken');

function verifyJWT (req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization  //Bearer token

    console.log(`authHeader: ${authHeader}`);
    if(!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized - invalid token" });
    }

    const token = authHeader.split(" ")[1];  // ["Bearer","token"]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        
        req.user = decoded.UserInfo.id;

        next();
    });

}

module.exports = verifyJWT

