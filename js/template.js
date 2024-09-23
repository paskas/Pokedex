function createHtmlPokemonInfoCard(pokemonData, i) {
    let { type1, type2 } = getPokemonTypeNames(pokemonData); // Typen abfragen
    return `
        <li id="ds" class="pokemon-card-outside">
            <div class="pokemon-card-inside">
                <div class="card-titel">
                    <h2>${capitalizeFirstLetter(pokemonData.name)}</h2>
                </div>
                <a href="#"><img src="${pokemon[i].sprites.other.dream_world.front_default}" alt="${pokemonData.name}" class="card-img"></a>
                <div class="card-infos">
                    <div class="card-id"><span>Nr.${pokemonData.id.toString().padStart(4, '0')}</span></div>
                    <hr>
                    <div class="card-types">
                        <div class="bg-${type1}"></div>
                        <div class="bg-${type2}"></div>
                    </div>
                </div>
            </div>
        </li>`;
}