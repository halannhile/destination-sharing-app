const express = require('express');

const app = express();

app.use((req, res, next) => {
    let body = '';
    // end listener: execute once we're done parsing the req's body
    req.on('end', () => {
        const userName = body.split('=')[1]
        if (userName) {
        // add a body property to the documentation of the req object 
        req.body = {name: userName};}
        // adding next() inside 'end' listener so we'll only move on to the next one once finish parsing the body
        next();
    });
    req.on('data', chunk => {
        body += chunk;
    });
});

app.use((req, res, next) => {
    if (req.body) {
        // return here so we won't render the form if req.body is available
        return res.send('<h1>' + req.body.name + '</h1>')
    }
    res.send('<form method="POST"><input type="text" name="username"><button>CREATE USER</button></form>')
});

// with Express, no need to use createServer
app.listen(5000);