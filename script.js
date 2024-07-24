const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 1025;

const colors = {
  fire: '#f18a41',
  grass: '#DEFDE0',
  electric: '#ffed4d',
  water: '#D1E4FF',
  ground: '#E0C068',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#B692C2',
  bug: '#A8B820',
  dragon: '#966bfa',
  psychic: '#F85888',
  flying: '#F5F5F5',
  fighting: '#FF4C4C',
  normal: '##FFFFFF'
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) { // Changed to <= to include all Pokémon
    await getPokemons(i);
  }
};

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`; // Template literal for URL
  const resp = await fetch(url);
  const data = await resp.json();
  createPokemonCard(data);
};

const createPokemonCard = (poke) => {
  const card = document.createElement('div');
  card.classList.add("pokemon");

  const name = poke.name[0].toUpperCase() + poke.name.slice(1);
  const id = poke.id.toString().padStart(3, '0');

  const pokeTypes = poke.types.map(type => type.type.name);
  const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
  const color = colors[type];

  card.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="imgContainer">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${type}</span></small>
    </div>
  `;

  card.innerHTML = pokemonInnerHTML; // Using innerHTML (not InnerHTML)

  pokeContainer.appendChild(card);
};

fetchPokemons();
