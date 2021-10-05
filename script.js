// Button & input field
var searchBtn = $("#search").on("click", newSearch);
var input = $("#input");

input.on("keypress", function (event) {
  if (event.keyCode === 13) {
    var city = input.val();
    requestWeather(city);
    input.val("");
  }
});

// New search function takes city input to requestWeather
function newSearch(event) {
  event.preventDefault();
  var city = input.val();
  requestWeather(city);
  input.val("");
}

// Gets Weather
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
    });
}

//   PokemonGo - Weather Boost
fetch("https://pokemon-go1.p.rapidapi.com/weather_boosts.json", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
    "x-rapidapi-key": "4be5ec2e63msh2818ea53452dcdcp12e586jsn7ea1810f83a2",
  },
})
  .then((response) => {
    console.log("Weather Boost: ", response.json());
  })
  .catch((err) => {
    console.error(err);
  });

//   PokemonGo - Types
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
    console.log(newArray); // contains only Normal pokemon
  })
  .catch((err) => {
    console.error(err);
  });

//   PokemonGo - Stats
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
