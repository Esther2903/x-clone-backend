const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./api')

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000


app.use(express.json());
app.use(cors())

app.use(errorHandler)
app.get("/", (req, res) => {
        res.send("Welcome to my web server, this is my X- clone");
});

app.listen(PORT, () => console.log(`Listening on: ${PORT}`))