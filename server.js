const express = require('express');

const port = 5000;
const dir = `${__dirname}/client/build`;

// server
const server = express();
server.listen(process.env.PORT || port);

// middleware
server.use(express.static(dir)); // server static client build files

// api routes
server.get("/api", (req, res) => {
    res.json({ express: "Hello from server!" });
});

// client routes
server.get('*', (req, res) => {
    res.sendFile(`${dir}/index.html`);
});
