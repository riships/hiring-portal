const express = require('express');
const { router } = require('./router/user.router');
const path = require('path');

const app = express();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './public/views');

app.get('/CSS/style.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'css/style.css'));
});

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/login", (req, res) => {
    res.render('login')
})

app.use("/api", router);


app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on port: , http://localhost:${PORT}/api`);
    }
});