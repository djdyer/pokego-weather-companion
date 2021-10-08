// DATE
var date = moment();
$("#date").text(date.format("dddd, MMM Do YYYY"));

// Button & input field
var searchBtn = $("#search").on("click", newSearch);
var input = $("#input");

var higlyScopedVariable;
// New search function takes city input to requestWeather

input.on("keypress", function (event) {
  if (event.keyCode === 13) {
    var city = input.val();
    requestWeather(city);
    input.val("");
  }
});

function newSearch(event) {
  event.preventDefault();
  var city = input.val();
  requestWeather(city);
  input.val("");
}

// WEATHER
function requestWeather(city) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=45ca50dc39eb346ed62587b3b0c97470";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Current Weather: ", data); // data holds today's weather object
      setTimeout("location.href = 'main.html';", 1500);
    });
}

// Summarized weather scenarios & ids
var storm = [200, 201, 202, 230, 231, 232, 233];
var rain = [302, 500, 502, 511, 521, 522];
var partlyRain = [501, 520, 300, 301];
var snow = [601, 602, 610, 611, 612, 622, 623, 600, 621];
var sun = 800;
var partlyCloud = [801, 802, 803];
var cloud = [804, 700, 711, 721, 731, 741, 751, 900];

// pokemon conditions:
// Sunny/Clear = Grass, Ground, and Fire
// Windy = Dragon, Flying, and Psychic
// Partially Cloudy = Normal and Rock
// Cloudy = Fairy, Fighting, and Poison
// Rainy = Water, Electric, and Bug
// Snow = Ice and Steel
// Fog = Ghost and Dark

//  TYPES
fetch("https://pokemon-go1.p.rapidapi.com/pokemon_types.json", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
    "x-rapidapi-key": "4be5ec2e63msh2818ea53452dcdcp12e586jsn7ea1810f83a2",
  },
})
  .then((response) => {
    return response.json();
  })
  .then(function (data) {
    var newArray = data
      .filter(function (pokemon) {
        return pokemon.form == "Normal";
      })
      .slice(0, 150);
    console.log("Types: ", newArray); // contains only 150 Normal pokemon
    // printCard(data.pokemon_id, data.pokemon_name, data.type);
  })
  .catch((err) => {
    console.error(err);
  });

// STATS
fetch("https://pokemon-go1.p.rapidapi.com/pokemon_stats.json", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
    "x-rapidapi-key": "4be5ec2e63msh2818ea53452dcdcp12e586jsn7ea1810f83a2",
  },
})
  .then((response) => {
    console.log("Stats: ", response.json());
  })
  .catch((err) => {
    console.error(err);
  });

var pokemonArray = [];
