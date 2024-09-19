const BASE_URL = "https://pokeapi.co/api/v2/";
const FULL_POKE_URL = "https://pokeapi.co/api/v2/pokemon?limit=252&offset=152";


async function fetchPokemons(path = `pokemon/ampharos`) {
    try {
        let response = await fetch(BASE_URL + path);
        let responseAsJson = await response.json();
        pokemons = responseAsJson;
    } catch (error) {
        console.error(error, "konnte nicht geladen werden!");
    }
    console.log(pokemons);
}
