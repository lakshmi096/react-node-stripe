const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config()

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
    res.send("Hello")
})
app.use(require('./route'));

//listen
app.listen(8282, () => console.log('Listening At port 8282'))