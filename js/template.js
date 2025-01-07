function createHtmlPokemonInfoCard(pokemonData, i) {
    let { type1, type2 } = getPokemonTypeNames(pokemonData);
    return `
    <li id="ds" class="pokemon-card-outside">
        <div class="pokemon-card-inside bg-${type1}">
            <div class="card-titel">
                <h2>${insertLineBreaks(capitalizeFirstLetter(pokemonData.name))}</h2>
            </div>
            <img src="${pokemon[i].sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}"
                    class="card-img" onclick="openPokemonOverlay(${pokemonData.id})">
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

function createHtmlPokemonInfoOverlay(pokemonData) {
    const hp = pokemonData.stats.find(stat => stat.stat.name === "hp").base_stat;
    const attack = pokemonData.stats.find(stat => stat.stat.name === "attack").base_stat;
    const defense = pokemonData.stats.find(stat => stat.stat.name === "defense").base_stat;
    return `
    <div class="outside-overlay-container">
        <div class="inside-overlay-container" onclick="event.stopPropagation()">
            <div class="top-inside-overlay">
                <div class="top-inside">
                    <div class="dialog-title-container">
                        <h2 class="c-white">${insertLineBreaks(capitalizeFirstLetter(pokemonData.name))}</h2>
                        <span class="c-white">Nr. ${pokemonData.id}</span>
                    </div>
                    <div class="dialog-info-container">
                        <div class="dialog-info">
                            <div class="dialog-type c-white">
                                ${pokemonData.types.map(type => `<span>${type.type.name}</span>`).join('')}
                            </div>
                        </div>
                        <div class="dialog-image">
                            <img src="${pokemonData.sprites.other.showdown.front_default}" alt="${pokemonData.name}">
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-inside-overlay">
                <div class="dialog-poke-stats-container">
                    <div class="dialog-pokeinfo">
                        <table>
                            <tr>
                                <th>Größe</th>
                                <td>${(pokemonData.height / 10).toFixed(1)} m</td>
                            </tr>
                            <tr>
                                <th>Gewicht</th>
                                <td>${(pokemonData.weight / 10).toFixed(1)} kg</td>
                            </tr>
                            <tr>
                                <th>Geschlecht</th>
                                <td>männlich/weiblich</td>
                            </tr>
                        </table>
                    </div>
                    <div class="dialog-stats">
                        <table>
                            <tr>
                                <th>Leben</th>
                                <td>${hp}</td>
                            </tr>
                            <tr>
                                <th>Angriff</th>
                                <td>${attack}</td>
                            </tr>
                            <tr>
                                <th>Verteidigung</th>
                                <td>${defense}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="dialog-evo-container"></div>
                <div class="dialog-next-arrows"></div>
            </div>
            <button class="close-overlay-btn" onclick="closeOverlay(event)">X</button>
        </div>
    </div>
    `;
}
