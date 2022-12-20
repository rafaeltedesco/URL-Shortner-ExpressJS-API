const express = require("express");

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome"
    })
})

app.post('/short-url', (req, res)=> {
    const { url } = req.body
    if (!url) {
        return res.status(400).json({
            message: '"url" field not found'
        })
    }
    try {
        const validUrl = new URL(url)
        res.status(200).json({
            id: 1,
            shortned_url: 'http://localhost:3000/1234',
            original_url: 'https://www.google.com'
        })
    }
    catch(err) {
        return res.status(422).json({
            message: 'Invalid "url"'
        })
    }
})

module.exports = app;
