const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
const http = require('http');
const {Server} = require('socket.io')
const errorHandler = require('./middlewares/errorHandler'); 
const sequelize = require("./config/db_config"); 
const router = require("./api"); 
const { error } = require('console');

require('dotenv').config();

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 8000;


/* const privateKey = fs.readFileSync('./server.key', 'utf-8');
const certificate = fs.readFileSync('./server.cert', 'utf-8');
const credentials = { key: privateKey, cert: certificate}; */

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://example.com"],
          styleSrc: ["'self'", "https://example.com"],
          imgSrc: ["'self'", "https://example.com"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      xFrameOptions: { action: "deny" },
    }),
);

app.use(helmet.xXssProtection())

// app.use((req, res, next) => {
//     if(req.secure){
//         return next();
//     }
//     res.redirect(`https://${req.headers.host}${req.url}`)
// })

app.use('/api', router); 

app.use(errorHandler);

require('./config/sockets/messageSocket')(io);

app.get("/", (req, res) => {
    res.send("Welcome to my web server, this is my X-clone");
});


/* sequelize.sync()
    .then(() => {
        const httpsServer = https.createServer(credentials, app);
        httpsServer.listen(PORT, () => {
            console.log(`Server is running securely on https://localhost:${PORT}`);
        });

        const httpApp = express();
        httpApp.use((req, res, next) => {
            res.redirect(`https://${req.headers.host}${req.url}`);
        });
        const httpServer = http.createServer(httpApp);
        httpServer.listen(8080, () => {
            console.log(`HTTP Server running on port 80 and redirecting to HTTPS`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    }); */


sequelize.sync()
    .then(() => {
        server.listen(PORT, () => {
                console.log(`Server is running on port http://localhost:${PORT}`);
        });
    })

    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    })
