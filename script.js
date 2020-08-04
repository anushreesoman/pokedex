const pokedex = document.getElementById("pokedex");

const getPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 200; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name[0].toUpperCase() + result.name.slice(1),
      id: result.id,
      types: result.types.map((poketype) => poketype.type.name).join(", "),
    }));

    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  const pokedexHtml = pokemon
    .map(
      (poke) =>
        `<div class="card">
      <div class="poke-img">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png"/>
      </div>
      <div class="poke-info">
        <span class="poke-no">${poke.id}</span>
        <h3>${poke.name}</h3>
        <p>Type: ${poke.types}</p>
      </div>
    </div>`
    )
    .join("");
  pokedex.innerHTML = pokedexHtml;
};

getPokemon();
