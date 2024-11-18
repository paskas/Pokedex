let offsetPokemon = 30;
let limitPokemon = 0;
let allPokemon = 1302;
let quantityPerLoad = 100;
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
    let cardContent = "";
    for (let i = 0; i < pokemon.length; i++) {
        cardContent += createHtmlPokemonInfoCard(pokemon[i], i);
    }
    infoCard.innerHTML += cardContent;
}


function extractPokemonTypes() {
    pokemonTypes = [];
    for (let i = 0; i < pokemon.length; i++) {
        let { type1, type2 } = getPokemonTypeNames(pokemon[i]);
        pokemonTypes.push({ type1, type2 });
    }
}


function getPokemonTypeNames(pokemon) {
    let type1 = pokemon.types[0]?.type.name || "";
    let type2 = pokemon.types[1]?.type.name || "";
    return { type1, type2 };
}


function openPokemonOverlay(pokemonId) {
    const pokemonData = pokemon.find(p => p.id === pokemonId); // Überprüfen, ob Daten existieren
    const overlayContainer = document.getElementById('pokemon_info_overlay');
    overlayContainer.innerHTML = createHtmlPokemonInfoOverlay(pokemonData);
    overlayContainer.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}


function closeOverlay(event) {
    event.stopPropagation();
    const overlayContainer = document.getElementById('pokemon_info_overlay');
    overlayContainer.classList.add('d-none');
    overlayContainer.innerHTML = '';
    document.body.style.overflow = '';
}

