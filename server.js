const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const viewRouter = require('./router/view.routes');
const userApiRouter = require("./router/userApi.routes")
const jobApiRouter = require("./router/jobApi.routes");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(session({
    secret: 'rishiToken', // Used to sign the session ID cookie
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './public/views');
app.use(expressLayouts)
app.set('layout', 'layout');

app.get('/CSS/style.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'css/style.css'));
});

app.use(express.json());
const PORT = process.env.PORT || 3000;


app.use("/", viewRouter);

app.use("/", jobApiRouter);
app.use("/", userApiRouter);


app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on port: , http://localhost:${PORT}`);
    }
});