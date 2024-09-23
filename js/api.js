const BASE_URL = "https://pokeapi.co/api/v2/";
const FULL_POKE_URL = "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0";


async function fetchPokemon(path = `pokemon?limit=${offsetPokemon}&offset=${limitPokemon}`) {
    try {
        let response = await fetch(BASE_URL + path);
        let responseAsJson = await response.json();
        let pokemonList = responseAsJson.results;
        await pushPokemonToArray(pokemonList);
    } catch (error) {
        console.error(error, "could not be loaded!");
    }
}


async function pushPokemonToArray(pokemonList) {
    try {
        for (let i = 0; i < pokemonList.length; i++) {
            let pokemonDetails = await fetchPokemonDetails(pokemonList[i].url);
            pokemon.push(pokemonDetails);
        }
    } catch (error) {
        console.error(error, "could not be pushed!");
    }
}


async function fetchPokemonDetails(url) {
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error, "Details could not be loaded!");
    }
}
