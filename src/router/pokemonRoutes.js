const express = require('express');

const {
    getAllPokemons,
    getPokemonById,
    getPokemonByNumber,
    createPokemon,
    updatePokemon,
    updatePokemonByNumber,
    deletePokemon,
    deletePokemonByNumber
} = require('../controller/pokemonController');

const router = express.Router();

router.get('/pokemons', (req, res) => {
    const { number } = req.query;
    if (number) {
        return getPokemonByNumber(req, res);
    } else {
        return getAllPokemons(req, res);
    }
});
router.get('/pokemons/:id', getPokemonById);
router.post('/pokemons', createPokemon);
router.put('/pokemons/:id', updatePokemon);
router.put('/pokemons', updatePokemonByNumber);
router.delete('/pokemons/:id', deletePokemon);
router.delete('/pokemons', deletePokemonByNumber);

module.exports = router;