const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const viewRouter = require('./router/view.routes');
const userApiRouter = require("./router/userApi.routes")
const jobApiRouter = require("./router/jobApi.routes");
const applicantApiRouter = require("./router/applicantApi.routes");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const app = express();
app.use(cookieParser());


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    name: 'session.id',
    secret: 'rishiToken', // Used to sign the session ID cookie
    resave: false,
    saveUninitialized: true,
    sameSite: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));





app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts)
app.set('layout', 'layout');

app.use(methodOverride('_method'));


app.use(express.json());
const PORT = process.env.PORT || 3000;


app.use("/", viewRouter);

app.use("/", jobApiRouter);
app.use("/", userApiRouter);
app.use("/", applicantApiRouter);


app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on port: , http://localhost:${PORT}`);
    }
});