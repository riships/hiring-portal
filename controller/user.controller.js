const User = require('../model/user.model');
const base64url = require('base64url');


const userLogin = async function (req, res) {
    if (req.lastVisitDate) {
        lastActiveDate = req.lastVisitDate
    }
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("error", { 
                    titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
                    name: null, successMessage: 
                    false, 
                    message: "Email and password are required." 
                });
        }

        // Find the user by email 
        let user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(401).render("error", { 
                titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }], 
                name: null, 
                successMessage: false, 
                message: "User not found!" 
            })
        }

        // check if the user's password is correct or not
        let checkPass = user.password === password
        if (!checkPass) {
            return res.status(401).render("error", { 
                titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
                name: null, 
                successMessage: false, 
                message: "Invalid email or password." 
            });
        }

        // if everything ok return the user
        let sessionData = base64url.encode(JSON.stringify(user));

        // Set the cookie
        res.cookie('session', sessionData, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.cookie('lastActiveDate', new Date(), {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.redirect('/');

    } catch (error) {
        return res.status(500).render("error", { 
            titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
            name: null, 
            successMessage: false, 
            message: "Internal server error." 
        });
    }
}

const userSignup = async function (req, res) {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).render("error", { 
                titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }], 
                name: null, 
                successMessage: false, 
                message: "Name, Email and password are required." 
            });
        }

        // Create user 
        let user = await User.createUser(name, email, password);
        if (!user) {
            return res.render("error", { 
                titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }], 
                name: null, 
                successMessage: false, 
                message: "User not Created!" 
            })
        }

        // if everything ok return the user created
        return res.status(200).render("signup", { 
            titileActiveDate: [{ title: "Sign up", lastVisited: lastActiveDate }],
            name: null, 
            successMessage: true, 
            message: "Signup Successful!" 
        });

    } catch (error) {
        return res.status(500).render("error", { 
            titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
            name: null, 
            successMessage: false, 
            message: "Internal server error." 
        });
    }
}


const logOut = async (req, res) => {
    // Clear session
    req.session.destroy(err => {
        if (err) {
            return res.status(500).render("error", { 
                titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
                name: null, 
                successMessage: false, 
                message: 'Error occurred during logout' 
            });
        }

        // Clear cookies if needed
        res.clearCookie('session'); // Replace 'session' with your cookie name

        // Redirect to home or login page
        res.redirect('/');  // or '/';
    });
}
module.exports = { userLogin, userSignup, userlogOut: logOut };