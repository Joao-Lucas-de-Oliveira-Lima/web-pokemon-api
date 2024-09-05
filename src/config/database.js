const mongoose = require("mongoose");

require('dotenv').config();

const mongoURL = process.env.DB_URL;

async function connectToDatabase() {
    try{
        await mongoose.connect(mongoURL);
        console.log("Successfully connected to the database MongoDB");
        return true;
    }catch(error){
        console.error('Error connecting to MongoDB:', error.message);
        return false;
    }
}

module.exports = connectToDatabase;