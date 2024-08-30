const pokemonModel = require('../model/pokemonModel');

class PokemonRepository{
    
    async getAllPokemons(){
        return await pokemonModel.find();
    }

    async getPokemonById(id){
        const result = await pokemonModel.findById(id);
        return result;
    }

    async getPokemonByNumber(number) {
        const result = await pokemonModel.findOne({ number: number });
        return result;
    }

    async createPokemon(pokemon){
        return await pokemonModel.create(pokemon);
    }

    async updatePokemon(id, pokemonData) {
        return await pokemonModel.findByIdAndUpdate(
            id, 
            pokemonData, 
            { new: true, runValidators: true }
        );
    }

    async updatePokemonByNumber(number, pokemonData) {
        return await pokemonModel.findOneAndUpdate(
            { number },
            pokemonData,
            { new: true, runValidators: true }
        );
    }

    async deletePokemon(id){
        return await pokemonModel.findByIdAndDelete(id);
    }

    async deletePokemonByNumber(number) {
        return await pokemonModel.findOneAndDelete({ number });
    }
}


module.exports = new PokemonRepository();