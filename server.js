const express = require('express');
const { router } = require('./router/user.router');

const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render('index')
})

app.use("/api", router);


app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on port: , http://localhost:${PORT}/api`);
    }
});