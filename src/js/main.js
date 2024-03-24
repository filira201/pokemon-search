import "../css/style.css";

const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weightInfo = document.getElementById("weight");
const heightInfo = document.getElementById("height");
const imageContainer = document.getElementById("image");
const typesContainer = document.getElementById("types");
const trStats = document.getElementsByTagName("tr");

const urlAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const fetchData = async () => {
  try {
    const strSearch = searchInput.value.toLowerCase();
    const res = await fetch(`${urlAPI}/${strSearch}`);
    const data = await res.json();
    showResult(data);
  } catch (err) {
    alert("Pokémon not found");
    console.log(`Pokémon not found ${err}`);
    reset();
  }
};

const showResult = (data) => {
  const { height, weight, id, name, stats, types, sprites } = data;

  typesContainer.innerHTML = ``;

  pokemonName.textContent = `${name}`;
  pokemonId.textContent = `#${id}`;
  weightInfo.textContent = `Weight: ${weight}`;
  heightInfo.textContent = `Height: ${height}`;
  imageContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}"/>`;
  stats.forEach((pokemonStat) => {
    document.getElementById(pokemonStat.stat.name).textContent =
      pokemonStat.base_stat;
  });
  types.forEach((pokemonType) => {
    typesContainer.innerHTML += `<span 
    class="${pokemonType.type.name}">${pokemonType.type.name}
    </span>`;
  });
};

const reset = () => {
  typesContainer.innerHTML = ``;

  pokemonName.textContent = ``;
  pokemonId.textContent = ``;
  weightInfo.textContent = ``;
  heightInfo.textContent = ``;
  imageContainer.innerHTML = ``;
  for (let i = 1; i < trStats.length; i++) {
    trStats[i].children[1].textContent = "";
  }
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData();
});