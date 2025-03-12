require('dotenv').config();
const express = require('express');
const connect = require('./db/connectDB');
const router = require('./routers/country');
const cors = require('cors');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-middleware');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    method: 'GET, POST',
    allowedHeaders: 'Content-type, Authorization' 
};

app.use(cors(corsOptions));

app.use('/api/v1/countries', router);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const connectDB = async () => {
    try{
        await connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log("server listening on port : ", port);
        }); 
    } catch (err) {
        console.log(err);
    };
};

connectDB();