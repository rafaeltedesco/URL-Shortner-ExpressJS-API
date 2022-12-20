const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome"
    })
})

app.post('/short-url', (req, res)=> {
    res.status(200).json({
        id: 1,
        shortned_url: 'http://localhost:3000/1234',
        original_url: 'https://www.google.com'
    })
})

module.exports = app;
