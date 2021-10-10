const express = require('express'),
    expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true}, 
() => console.log("Connected to DB"))

//ejs
app.use(express.static("views"));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/help', ((req, res) => {
    res.render('help')
}))

app.get('/user', ((req, res) => {
    res.render('welcome')
}))

app.post('/login', ((req, res) => {
    res.render('welcome')
}))

app.post('/register', ((req, res) => {
    res.render('welcome')
}))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})