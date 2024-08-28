const base64url = require('base64url');



const authMiddleware = async (req, res, next) => {
    const token = req.cookies.session || '';

    if (!token) {
        return next();
    }
    try {
        const decoded = base64url.decode(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect("/")
    }
}

module.exports = { authMiddleware }