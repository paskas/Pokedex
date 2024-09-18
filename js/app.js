let offsetPokemons = [];
let pokemons = [];

async function init() {
    fetchPokemons()
}

function renderPokemonInfoCard() {
    let infoCard = document.getElementById('pokemon_info_card');
    infoCard.innerHTML = "";
    for (let i = 0; i < offsetPokemons.length; i++) {
        infoCard.innerHTML += createHtmlPokemonInfoCard();
    }
}
