const User = require('../model/user.model');


const userLogin = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find the user by email 
        let user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found!" })
        }

        // check if the user's password is correct or not
        let checkPass = user.password === password
        if (!checkPass) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // if everything ok return the user
        return res.status(200).json({ message: "Login successful." });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

const userSignup = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find the user by email 
        let user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found!" })
        }

        // check if the user's password is correct or not
        let checkPass = user.password === password
        if (!checkPass) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // if everything ok return the user
        res.coockie({ "lastVisted": Date().toLocalString() })
        return res.status(200).json({ message: "Login successful." });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}
const userLoginView = async function (req, res) {
    res.render("login")
}

const homePage = async function (req, res) {
    res.render("index")
}

module.exports = { userLogin, userSignup, userLoginView, homePage };