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
    prepareAllPokemonNames(); // Alle Namen vorbereiten
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
    const pokemonData = pokemon.find(p => p.id === pokemonId); // Finde das aktuelle Pokémon
    const index = pokemon.findIndex(p => p.id === pokemonId); // Finde den Index des aktuellen Pokémon
    const overlayContainer = document.getElementById('pokemon_info_overlay');
    if (!pokemonData) return; // Falls kein Pokémon gefunden wird, abbrechen
    overlayContainer.innerHTML = createHtmlPokemonInfoOverlay(pokemonData, index);
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


function searchPokemon(inputEvent) {
    const query = inputEvent.target.value.toLowerCase().trim(); // Normalisiere die Eingabe
    const minLength = 3;

    if (query.length >= minLength) {
        const filteredPokemon = pokemon.filter(p => p.name.toLowerCase().includes(query));
        renderFilteredPokemon(filteredPokemon);
        hideMinLengthWarning(); // Warnung ausblenden, wenn 3 oder mehr Buchstaben eingegeben wurden
    } else if (query.length === 0) {
        renderPokemonInfoCard(); // Zeige alle Pokémon, wenn das Feld leer ist
        hideMinLengthWarning();
    } else {
        showMinLengthWarning(); // Zeige Warnung, wenn weniger als 3 Buchstaben eingegeben wurden
    }
}


function showMinLengthWarning() {
    const warningMessage = document.getElementById("warning-message");
    warningMessage.style.display = "block"; // Zeige die Warnung an
}


function hideMinLengthWarning() {
    const warningMessage = document.getElementById("warning-message");
    warningMessage.style.display = "none"; // Verstecke die Warnung
}


function renderFilteredPokemon(filteredPokemon) {
    let infoCard = document.getElementById('pokemon_info_card');
    infoCard.innerHTML = "";
    let cardContent = "";
    for (let i = 0; i < filteredPokemon.length; i++) {
        cardContent += createHtmlPokemonInfoCard(filteredPokemon[i], i);
    }
    infoCard.innerHTML += cardContent;
}

