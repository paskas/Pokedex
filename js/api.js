const BASE_URL = "https://pokeapi.co/api/v2/";


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
            // wenn das Pokemon noch nicht existiert wird es zum Array hinzugefügt
            if (!pokemonAlreadyExists(pokemonDetails.id)) {
                pokemon.push(pokemonDetails);
            }
        }
        sortPokemonArray();
    } catch (error) {
        console.error(error, "could not be pushed!");
    }
}

// überprüft ob das Pokemon bereits im Array vorhanden ist
function pokemonAlreadyExists(pokemonId) {
    for (let j = 0; j < pokemon.length; j++) {
        if (pokemon[j].id === pokemonId) {
            return true; // Pokemon existiert bereits
        }
    }
    return false; // Pokemon existiert nicht
}


async function fetchPokemonDetails(url) {
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error, "Details could not be loaded!");
    }
}


async function loadMorePokemon() {
    document.getElementById("load_more").disabled = true;
    document.getElementById("load_all").disabled = true;
    limitPokemon += offsetPokemon;
    showLoadingSpinner();
    await fetchPokemon(`pokemon?limit=${offsetPokemon}&offset=${limitPokemon}`);
    extractPokemonTypes();
    renderPokemonInfoCard();
    hideLoadingSpinner();
    document.getElementById("load_more").disabled = false;
    document.getElementById("load_all").disabled = false;
}


async function loadAllPokemon() {
    manageUIOnLoad();
    const promises = createFetchPromises(); // erstellt die Fetch-Promises
    await Promise.all(promises); // warte auf alle Fetch-Requests
    extractPokemonTypes();
    renderPokemonInfoCard(); // render Pokemon erst nach vollständigem Laden
    hideLoadingSpinner();
}


function createFetchPromises() {
    let promises = [];
    let totalLoaded = 0; // verwende einen Zähler statt eines Arrays
    for (let i = 0; i < allPokemon; i += quantityPerLoad) {
        let remainingPokemon = allPokemon - totalLoaded; // berechne die verbleibenden Pokemon
        let limit = remainingPokemon < quantityPerLoad ? remainingPokemon : quantityPerLoad; // Lade nur so viel wie nötig
        let promise = fetchPokemon(`pokemon?limit=${limit}&offset=${i}`);
        promises.push(promise);
        totalLoaded += limit; // verfolge die tatsächlich geladenen Pokemon
    }
    return promises; // Gib die Liste der Promises zurück
}

