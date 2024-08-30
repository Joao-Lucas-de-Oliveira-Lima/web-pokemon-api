const pokemonService = require("../service/pokemonService")

async function getAllPokemons(req, res) {
    try{
        const pokemons = await pokemonService.getAllPokemons();
        res.status(200).json(pokemons);
    }catch(error){
        res.status(error.statusCode).json(error);
    }
}

async function getPokemonById(req, res) {
    try{
        const { id } = req.params;
        const pokemon = await pokemonService.getPokemonById(id);
        res.status(200).json(pokemon);
    }catch(error){
        res.status(error.statusCode).json(error);
    }
}

async function getPokemonByNumber(req, res) {
    try {
        const { number } = req.query;
        const pokemon = await pokemonService.getPokemonByNumber(number);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(error.statusCode).json(error);
    }
}

async function createPokemon(req, res) {
    try{
        const pokemonData = req.body;
        const pokemon = await pokemonService.createPokemon(pokemonData);
        res.status(201).json(pokemon);
    }catch(error){
        res.status(error.statusCode).json(error);
    }
}

async function updatePokemon(req, res) {
    try{
        const { id } = req.params;
        const pokemonData = req.body;
        const pokemon = await pokemonService.updatePokemon(id, pokemonData);
        res.status(200).json(pokemon);
    }catch(error){
        res.status(error.statusCode).json(error);
    }
}

async function updatePokemonByNumber(req, res) {
    try {
        const { number } = req.query; 
        const pokemonData = req.body;
        const updatedPokemon = await pokemonService.updatePokemonByNumber(number, pokemonData);
        res.status(200).json(updatedPokemon);
    } catch (error) {
        res.status(error.statusCode).json(error);
    }
}

async function deletePokemon(req, res) {
    const { id } = req.params;
    try{
        await pokemonService.deletePokemon(id);
        res.status(204).end();
    }catch(error){
        res.status(error.statusCode).json(error);
    }
}

async function deletePokemonByNumber(req, res) {
    const { number } = req.query; 
    try {
        await pokemonService.deletePokemonByNumber(number);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode).json(error);
    }
}

module.exports = {
    getAllPokemons,
    getPokemonById,
    getPokemonByNumber,
    createPokemon,
    updatePokemon,
    updatePokemonByNumber,
    deletePokemon,
    deletePokemonByNumber
}