const User = require('../model/user.model');


const userLogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log(email);
              
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

module.exports = { userLogin };