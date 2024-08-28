const express = require("express");
const connectToDatabase = require("./db/database");

const app = express();
const port = 3000;

async function startApplication(){

    const isConnected = await connectToDatabase();

    if(isConnected){

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });

        app.get("/", (req, res) => {
            res.send("Hello World");
        })
    }

}


startApplication();