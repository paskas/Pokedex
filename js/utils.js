function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function insertLineBreaks(text) {
    return text.split('-').join('-<br>');
}


function showLoadingSpinner() {
    let show = document.getElementById('loading_spinner').classList;
    show.remove('d-none');
}


function hideLoadingSpinner() {
    let show = document.getElementById('loading_spinner').classList;
    show.add('d-none');
}


function manageUIOnLoad() {
    document.getElementById("load_more").classList.add('d-none');
    document.getElementById("load_all").classList.add('d-none');
    showLoadingSpinner();
}


function sortPokemonArray() {
    pokemon.sort(comparePokemonById);
}


function comparePokemonById(pokemonA, pokemonB) {
    if (pokemonA.id < pokemonB.id) {
        return -1; // pokemon A kommt vor pokemon B
    } else if (pokemonA.id > pokemonB.id) {
        return 1; // pokemon B kommt vor pokemon A
    } else {
        return 0; // Beide sind gleich
    }
}