const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const viewRouter = require('./router/view.routes');
const apiRouter = require("./router/api.routes")

const app = express();

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

app.use("/api", apiRouter);


app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on port: , http://localhost:${PORT}`);
    }
});