const express = require('express');
const router = express.Router();
const axios = require('axios');

// login page route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// signup page route
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// jobs page route
router.get("/jobs", async (req,res)=>{
    try {
        // Fetch data from APIs
        const jobsData = await axios.get("api/jobs")
        console.log(jobsData);        
        
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to load data');
    }
})

module.exports = router;
