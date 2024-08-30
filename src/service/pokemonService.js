const pokemonRepository = require('../repository/pokemonRepository');
const notFoundError = require('../error/notFoundError');
const badRequestError = require('../error/badRequestError');
const internalServerError = require('../error/internalServerError');

const initialImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const finalImageUrl = ".png";

class PokemonService{

    async getAllPokemons() {
        try {
            return await pokemonRepository.getAllPokemons();
        } catch (error) {
            throw new internalServerError('An unexpected error occurred while fetching all Pokemons');
        }
    }

    async getPokemonById(id) {
        try {
            const pokemon = await pokemonRepository.getPokemonById(id);
            if (pokemon === undefined || pokemon === null) {
                throw new notFoundError(`Pokemon with id ${id} not found`);
            }
            return pokemon;
        } catch (error) {
            if (error instanceof notFoundError) {
                throw error;
            }
            throw new internalServerError('An unexpected error occurred while fetching the Pokemon');
        }
    }

    async getPokemonByNumber(number) {
        try {
            const pokemon = await pokemonRepository.getPokemonByNumber(number);
            if (!pokemon) {
                throw new notFoundError(`Pokemon with number ${number} not found`);
            }
            return pokemon;
        } catch (error) {
            if (error instanceof notFoundError) {
                throw error;
            }
            throw new internalServerError('An unexpected error occurred while fetching the Pokemon by number');
        }
    }

    async createPokemon (pokemonData) {
        try {
            const pokemon = new pokemon(pokemonData);
            const validationError = pokemon.validateSync();
            if (validationError) {
                throw new badRequestError(`Validation failed: ${validationError.message}`);
            }
            const savedPokemon = await pokemon.save();
            return savedPokemon;
        } catch (error) {
            if (error instanceof badRequestError) {
                throw error;
            }
            throw new internalServerError('An unexpected error occurred');
        }
    }

    async createPokemon(pokemonData) {
        try {
            const imageUrl = `${initialImageUrl}${pokemonData.number}${finalImageUrl}`;
            pokemonData.image = imageUrl;
            const pokemon = await pokemonRepository.createPokemon(pokemonData);
            return pokemon;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new badRequestError(`Validation failed: ${error.message}`);
            }
            throw new internalServerError('An unexpected error occurred while creating the Pokemon');
        }
    }

    async updatePokemon(id, pokemonData) {
        try {
            if(pokemonData.number !== undefined && pokemonData.number !== null) {
                const imageUrl = `${initialImageUrl}${pokemonData.number}${finalImageUrl}`;
                pokemonData.image = imageUrl;
            }
            const pokemon = await pokemonRepository.updatePokemon(id, pokemonData);
            if (!pokemon) {
                throw new notFoundError(`Pokemon with id ${id} not found`);
            }
            return pokemon;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new badRequestError(`Validation failed: ${error.message}`);
            }
            if (error instanceof notFoundError) {
                throw error;
            }
            throw new internalServerError('An unexpected error occurred while updating the Pokemon');
        }
    }

    async updatePokemonByNumber(number, pokemonData) {
        try {
            if (pokemonData.number !== undefined && pokemonData.number !== null) {
                const imageUrl = `${initialImageUrl}${pokemonData.number}${finalImageUrl}`;
                pokemonData.image = imageUrl;
            }
            const updatedPokemon = await pokemonRepository.updatePokemonByNumber(number, pokemonData);
            if (!updatedPokemon) {
                throw new notFoundError(`Pokemon with number ${number} not found`);
            }
            return updatedPokemon;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new badRequestError(`Validation failed: ${error.message}`);
            }
            if (error instanceof notFoundError) {
                throw error;
            }
            throw new internalServerError('An unexpected error occurred while updating the Pokemon');
        }
    }

    async deletePokemon(id) {
        try {
            const pokemon = await pokemonRepository.deletePokemon(id);
            if (!pokemon) {
                throw new notFoundError(`Pokemon with id ${id} not found`);
            }
            return pokemon;
        } catch (error) {
            if (error instanceof notFoundError) {
                throw error;
            }
            throw new internalServerError('An unexpected error occurred while deleting the Pokemon');
        }
    }

    async deletePokemonByNumber(number) {
        try {
            const pokemon = await pokemonRepository.deletePokemonByNumber(number);
            if (!pokemon) {
                throw new notFoundError(`Pokemon with number ${number} not found`);
            }
            return pokemon;
        } catch (error) {
            if (error instanceof notFoundError) {
                throw error;
            }
            throw new internalServerError('An unexpected error occurred while deleting the Pokemon by number');
        }
    }
}

module.exports = new PokemonService();