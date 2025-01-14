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
            if (!pokemonAlreadyExists(pokemonDetails.id)) {
                pokemon.push(pokemonDetails);
            }
        }
        sortPokemonArray();
    } catch (error) {
        console.error(error, "could not be pushed!");
    }
}


function pokemonAlreadyExists(pokemonId) {
    for (let j = 0; j < pokemon.length; j++) {
        if (pokemon[j].id === pokemonId) {
            return true;
        }
    }
    return false;
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
    const promises = createFetchPromises();
    await Promise.all(promises);
    extractPokemonTypes();
    renderPokemonInfoCard();
    hideLoadingSpinner();
}


function createFetchPromises() {
    let promises = [];
    let totalLoaded = 0;
    for (let i = 0; i < allPokemon; i += quantityPerLoad) {
        let remainingPokemon = allPokemon - totalLoaded;
        let limit = remainingPokemon < quantityPerLoad ? remainingPokemon : quantityPerLoad;
        let promise = fetchPokemon(`pokemon?limit=${limit}&offset=${i}`);
        promises.push(promise);
        totalLoaded += limit;
    }
    return promises;
}


async function navigateFullscreen(index) {
    if (index < 0) return;
    if (index >= pokemon.length) {
        await loadMorePokemon();
        if (index >= pokemon.length) return;
    }
    openPokemonOverlay(pokemon[index].id);
}


