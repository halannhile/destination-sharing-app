const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: false} ))

app.post('/user', (req, res, next) => {
    res.send('<h1>User: ' + req.body.username + '</h1>')
})

// app.use('/users')

app.get('/', (req, res, next) => {
    res.send(
        '<form action="/user" method="POST"><input type="text" name="username"><button>CREATE USER</button></form>'
        )
});

// with Express, no need to use createServer
app.listen(5000);