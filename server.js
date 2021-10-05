const express = require('express');
const app = express();
const request = require('request');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('build'));

app.get('/getMusicData', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        qs: { term: req.body.term, locale: 'en-US', offset: '0', limit: '5' },
        headers: {
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': 'd78b659621msh22ffdaa369a9cd9p123b29jsn8434a2c82d11',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body)
        res.send(body)
        res.end()
    });

})

app.listen(3000);
