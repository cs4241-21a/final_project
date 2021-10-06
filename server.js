const express = require('express'),
    expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('welcome')
})

app.get('/help', ((req, res) => {
    res.render('help')
}))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})