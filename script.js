const pokedex = document.getElementById('pokedex');

let colorsArr = new Map([
  ["fire", "#FCC1A2"],
  ["fairy", "#FDD7E4"],
  ["grass", "#AEECB8"],
  ["bug", "#C2E184"],
  ["flying", "#E1D8FF"],
  ["ground", "#EAD7B7"],
  ["ghost", "ghostwhite"],
  ["ice", "#dcffff"],
  ["electric", "lemonchiffon"],
  ["water", "#A6D9FF"],
  ["poison", "#B3C1A5"],
  ["steel", "#EFEEEC"],
  ["dark", "#9C9AC3"],
  ["fighting", "#D1A3A3"],
  ["dragon", "thistle"],
  ["psychic", "#7BA6DD"],
  ["rock", "#BEAE9D"],
  ["normal", "#FFADAD"]
]);

const getPokemon = () => {

  const promises = [];
  for(let i = 1;i <= 200;i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

    Promise.all(promises).then((results) => {
      const Pokecolor = [];
       
      const Otherpokecolor = [];
      
      const PokeColors = results.map((result) => (result.types.map((poketype) => poketype.type.name)));
      
      PokeColors.forEach((c) => (
        Pokecolor.push(
          colorsArr.get(c[0].toString())
        )
      ));
      PokeColors.forEach((c) => (
        Otherpokecolor.push(
          colorsArr.get(typeof c[1] !== 'undefined'? c[1].toString():c[0].toString())
        )
      ));
      
      const pokemon = results.map((result) => ({
        name: result.name[0].toUpperCase() + result.name.slice(1),
        id: result.id,
        types: result.types.map((poketype) => poketype.type.name).join(', '),
        color: Pokecolor[result.id-1],
        secondColor : Otherpokecolor[result.id-1]
      }));
      
      displayPokemon(pokemon);
    })
};

const displayPokemon = (pokemon) => {

  const pokedexHtml = pokemon.map( poke =>
    `<div class="card" style="background-image:linear-gradient(to bottom, ${poke.color},${poke.secondColor});">
      <div class="poke-img">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png"/>
      </div>
      <div class="poke-info">
        <span class="poke-no">${poke.id}</span>
        <h3>${poke.name}</h3>
        <p>Type: ${poke.types}</p>
      </div>
    </div>`
    ).join('');
  pokedex.innerHTML = pokedexHtml;
}

getPokemon();