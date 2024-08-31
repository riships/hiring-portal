const base64url = require('base64url');

const authMiddleware = async (req, res, next) => {
    res.cookie('lastActiveDate', new Date());
    const token = req.cookies.session || '';

    if (!token) {
        return next(); // No token, move to the next middleware
    }

    try {
        const decodedString = base64url.decode(token);
        const decoded = decodedString; // Parse the JSON string
        req.user = decoded;
        next();
    } catch (err) {
        // Handle token errors (e.g., invalid token)
        
        return res.redirect("/"); // Redirect to the homepage
    }
};

module.exports = { authMiddleware };
