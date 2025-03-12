require('dotenv').config();
const CountrySchema = require("./models/country");
const data = require('../public/data.json');
const connect = require('./db/connectDB');

const populatedata = async () => {
    try{
        await connect(process.env.MONGO_URI);
        await CountrySchema.deleteMany();
        await CountrySchema.create(data);
        console.log('populated');
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    };
};

populatedata();
 