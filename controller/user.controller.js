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
        return res.status(200).json({ message: "Login successful.", name: user.name });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

const userSignup = async function (req, res) {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Name, Email and password are required." });
        }

        // Create user 
        let user = await User.createUser(name, email, password);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found!" })
        }

        // if everything ok return the user created
        return res.status(201).json({ message: "User created successfully." });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}
module.exports = { userLogin, userSignup };