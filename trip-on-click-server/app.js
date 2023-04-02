// import fs from "fs"
// const fs = require('fs')
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session')
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const app = express();
const { checkUser } = require('./AuthMiddlewares');


const tripsRoutes = require("./routes/trip.routes");
const attractionsRoutes = require("./routes/attraction.routes");
const usersRoutes = require("./routes/user.routes");

const mongoURI = 'mongodb+srv://meytal106:5YLA9Q5yXnz7R5Z5@triponclickdb.kaks7p2.mongodb.net/TOCDB?retryWrites=true&w=majority';
// const NODE_ENV = development;
const SESS_NAME = 'sid';
const SESS_SECRET = 'secret!session';
const SESS_LIFETIME = 1000 * 60 * 60 * 2;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!');
});

// const store = new MongoDBSession({
//     uri: mongoURI,
//     collection: 'sessions',
//     ttl: parseInt(SESS_LIFETIME) / 1000
// })

// app.use(
//     session({
//         secret: 'key that will sign cookie',
//         resave: false,
//         saveUninitialized: false,
//         store: store,
//         cookie: {
//             sameSite: true,
//             secure: NODE_ENV === 'production',
//             maxAge: parseInt(SESS_LIFETIME)
//         }
//     }));


require('dotenv').config();
app.use(morgan("dev"));
// app.use(cors({}));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     if (req.method === "OPTIONS") {
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         return res.status(200).json({});
//     }
//     next();
// });
const corsOptions ={
    origin:['http://localhost:3000'], 
    methods: ["GET", "POST"],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(
//     cors({
//       origin: ["http://localhost:8080"],
//       methods: ["GET", "POST"],
//       credentials: true,
//     })
//   );
app.use(cookieParser());
app.use(express.json());//req.body.message
app.use(express.urlencoded({ extended: false }));



app.post("/", checkUser);



//Routes
app.use('/trips', tripsRoutes);
app.use('/users', usersRoutes);
app.use('/attractions', attractionsRoutes);


// app.use((req, res, next) => {
//     console.log("hii");
//     const error = new Error('Not Found router');
//     error.status = 404;
//     next(error);
// })

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// })

module.exports = app;