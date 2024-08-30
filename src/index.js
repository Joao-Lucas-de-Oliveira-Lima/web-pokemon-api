const express = require("express");
const connectToDatabase = require("./config/database");
const pokemonRouter = require("./router/pokemonRoutes");

const app = express();
app.use(express.json());
const port = process.env.SERVER_PORT;

async function startApplication(){

    const isConnected = await connectToDatabase();

    if(isConnected){

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        app.use("/api", pokemonRouter);
    }

}

startApplication();