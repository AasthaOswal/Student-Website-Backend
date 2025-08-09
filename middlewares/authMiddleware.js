const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    try {
        
        const token =
            req.cookies?.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token." });
            }

            
            req.user = decoded;
            next();
        });

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(500).json({ message: "Server error in authentication" });
    }
};

module.exports = { authenticateToken };
