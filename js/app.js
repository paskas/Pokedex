let offsetPokemon = 30;
let limitPokemon = 152;
let pokemon = [];
let pokemonTypes = [];

async function init() {
    showLoadingSpinner();
    await fetchPokemon();
    extractPokemonTypes();
    renderPokemonInfoCard();
    hideLoadingSpinner();

}


function renderPokemonInfoCard() {
    let infoCard = document.getElementById('pokemon_info_card');
    infoCard.innerHTML = "";
    for (let i = 0; i < pokemon.length; i++) {
        infoCard.innerHTML += createHtmlPokemonInfoCard(pokemon[i], i);
    }
    console.log(pokemon);
}


function extractPokemonTypes() {
    pokemonTypes = []; 
    for (let i = 0; i < pokemon.length; i++) {
        let { type1, type2 } = getPokemonTypeNames(pokemon[i]);
        pokemonTypes.push({ type1, type2 });
    }
    console.log(pokemonTypes);
}


function getPokemonTypeNames(pokemon) {
    let type1 = pokemon.types[0]?.type.name || "";
    let type2 = pokemon.types[1]?.type.name || "";
    return { type1, type2 };
}