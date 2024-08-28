const logOut = async (req, res) => {
    // Clear session
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error occurred during logout');
        }

        // Clear cookies if needed
        res.clearCookie('session'); // Replace 'session' with your cookie name

        // Redirect to home or login page
        res.redirect('/');  // or '/';
    });
}

module.exports = { logOut };