const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler'); 
const sequelize = require("./config/db_config"); 
const userRoute = require("./feature/users/userRoute"); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cors());


app.use('/api/users', userRoute); 


app.use(errorHandler);


app.get("/", (req, res) => {
    res.send("Welcome to my web server, this is my X-clone");
});


sequelize.sync()
    .then(() => {
        console.log('Database synchronized'); 

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });