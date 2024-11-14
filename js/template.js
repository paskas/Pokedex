function createHtmlPokemonInfoCard(pokemonData, i) {
    let { type1, type2 } = getPokemonTypeNames(pokemonData);
    return `
    <li id="ds" class="pokemon-card-outside">
        <div class="pokemon-card-inside bg-${type1}">
            <div class="card-titel">
                <h2>${insertLineBreaks(capitalizeFirstLetter(pokemonData.name))}</h2>
            </div>
            <a href="#"><img src="${pokemon[i].sprites.other.home.front_default}" alt="${pokemonData.name}"
                    class="card-img"></a>
            <div class="card-infos">
                <div class="card-id"><span>Nr. ${pokemonData.id.toString().padStart(4, '0')}</span></div>
                <hr>
                <div class="card-types-container">
                    <div class="card-types">
                        <span class="type img-bg-${type1} bg-${type1}"></span>
                        <span class="type img-bg-${type2} bg-${type2}"></span>
                    </div>
                </div>
            </div>
        </div>
    </li>`;
}