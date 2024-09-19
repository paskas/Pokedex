let pokemon = [];
let offsetPokemon = 20;
let limitPokemon = 151;


async function init() {
    await fetchPokemon()
    renderPokemonInfoCard()
}


function renderPokemonInfoCard() {
    let infoCard = document.getElementById('pokemon_info_card');
    infoCard.innerHTML = "";
    for (let i = 0; i < pokemon.length; i++) {
        infoCard.innerHTML += createHtmlPokemonInfoCard(pokemon[i], i);
    }
    console.log(pokemon);
}
