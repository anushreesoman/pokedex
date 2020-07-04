const pokedex = document.getElementById('pokedex')

const getPokemon = () => {

  const promises = [];
  for(let i = 1;i<=150;i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

    Promise.all(promises).then((results) => {
      const pokemon = results.map((result) => ({
        name: result.name,
        id: result.id,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', ')
      }));
      displayPokemon(pokemon);
    })
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);

  const pokedexHtml = pokemon.map( poke =>
    `<li>
      <img src="${poke.image}"
      <h2>${poke.id}. ${poke.name}</h2>
      <p>Type: ${poke.type}</p>
    </li>`
    )
  pokedex.innerHTML = pokedexHtml;
}

getPokemon();