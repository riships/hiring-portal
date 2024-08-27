const express = require('express');
const router = express.Router();
const axios = require('axios');

// Home page route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Login page route
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// signup page route
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'SignUp' });
});


// jobs page route
router.get("/jobs", async (req, res) => {
    try {
        // Fetch data from APIs
        const jobsData = await axios.get("http://localhost:3000/api/jobs")
        
        res.render("jobs", { title: 'Jobs', jobs: jobsData.data.data });

    } catch (error) {
        res.status(500).send('Failed to load data');
    }

})

module.exports = router;
