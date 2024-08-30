const mongoose = require("mongoose");
const POKEMON_TYPE = require("../enum/pokemonType");

const pokemonSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    number : {
        type: Number,
        required: true,
        unique: true,
        min: [1, "The number must be greater than or equal to one"],
        max: [1025, "The number must be less than or equal to 1025"],
        validate: {
            validator: Number.isInteger,
            message : "{VALUE} is not an integer value"
        }
    }, 
    type : {
        type: String,
        enum: Object.values(POKEMON_TYPE),
        required: true
    }, 
    image : {
        type: String
    }
})

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;