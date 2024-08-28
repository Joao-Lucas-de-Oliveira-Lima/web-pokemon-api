const mongoose = require("mongoose");

require('dotenv').config();

const mongoURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lmlul.mongodb.net/web?retryWrites=true&w=majority&appName=Cluster0`;

async function connectToDatabase() {
    try{
        await mongoose.connect(mongoURL);
        console.log("Conectado com sucesso ao banco MongoDB");
        return true;
    }catch(error){
        console.error('Erro ao conectar ao MongoDB:', error.message);
        return false;
    }
}

module.exports = connectToDatabase;