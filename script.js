// DATE
var date = moment();
$("#date").text(date.format("dddd, MMM Do YYYY"));

// Button & input field
var searchBtn = $("#search").on("click", newSearch);
var input = $("#input");

// use local storage to display city and weather data on main html page
if (localStorage.getItem("lastSearch")) {
	requestWeather(localStorage.getItem("lastSearch"))
}
// New search function takes city input to requestWeather
input.on("keypress", function (event) {
  if (event.keyCode === 13) {
    var city = input.val();
    localStorage.setItem("lastSearch", city)
	 requestWeather(city);
    input.val("");
	 document.location.href = "main.html";
  }
});

function newSearch(event) {
  event.preventDefault();
  var city = input.val();
  localStorage.setItem("lastSearch", city)
  requestWeather(city);
  input.val("");
  document.location.href = "main.html";
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
			printMainData(
				data.name,
				data.main.temp,
				data.main.humidity,
				data.wind.speed,
        data.weather
			 );
		console.log("Current Weather: ", data); // data holds today's weather object
		console.log("Current Weather: "); // data holds today's weather object
      // setTimeout("location.href = 'main.html';", 1500);
   });
}

function printMainData(name, temp, humidity, speed, weather) {
	$("#city").text(name);
	// $("section").attr("style", "display:inline");
	var tempF = Math.round((temp - 273.15) * 1.8 + 32);
	$("#temp").text(tempF + "°");
	var wind = Math.round(speed);
	$("#wind").text(wind + "mph");
	$("#humid").text(humidity + "%");
  var weather_status = JSON.stringify(weather[0].main);
  var weather_description = JSON.stringify(weather[0].description);
  weather_status = weather_status.replace("\"", "");
  weather_status = weather_status.replace("\"", "");
  weather_description = weather_status.replace("\"", "");
  weather_description = weather_status.replace("\"", "");
  if(weather_status == "Clear")
  {
    $("#weather_status").attr("src", "assets/gifs/sun.gif");
    console.log("Hi everybody")
  }
  else if(weather_status == "Clouds")
  {
    if(weather_description == "few clouds")
    $("#weather_status").attr("src", "assets/gifs/partly_cloud.gif");
    else
    {
      $("#weather_status").attr("src", "assets/gifs/cloud.gif");
    }
  }
  else if(weather_status == "Drizzle")
  {
    $("#weather_status").attr("src", "assets/gifs/partly_rain.gif");
  }
  else if(weather_status == "Rain")
  {
    $("weather_status").attr("src", "assets/gifs/rain.gif");
  }
  else if(weather == "Thunderstorm")
  {
    $("#weather_status").attr("src", "assets/gifs/storm.gif");
  }
  else if(weather == "Snow")
  {
    $("#weather_status").attr("src", "assets/gifs/snow.gif");
  }
 }

 // Weather Status

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

// function printCard(id, name, type) {
// for (var i=0; i < pokemonArray.length; i++) {
//   const attackValue = 75;
//   const defenseValue = 100;
//   const staminaValue = 30;
//   console.log(id);
//   console.log(name);
//   console.log(type);
//   const card = $("<div>").addClass("card");
//   const cardImage = $("<div>").addClass("card-image");
//   const figure = $("<figure>").addClass("image is-4by3");
//   const charImage = $("<img>").attr(
//     "src",
//     "./assets/character_images/" + id + ".png"
//   );
//   figure.append(charImage);
//   cardImage.append(figure);
//   const cardContent = $("<div>").addClass("card-content");
//   const media = $("<div>").addClass("media");
//   const mediaLeft = $("<div>").addClass("media-left");
//   const typeFigure = $("<figure>").addClass("image is-48x48");
//   const typeImage = $("<img>").attr(
//     "src",
//     "./assets/icons/" + type[0].toLowerCase() + ".png"
//   );
//   typeFigure.append(typeImage);
//   mediaLeft.append(typeFigure);
//   media.append(media);
//   const details = $("<div>").addClass("media-content");
//   const title = $("<p>").addClass("title is-4").text(name);
//   const subTitle = $("<p>").addClass("subtitle is-6").text("Boosted!");
//   details.append(title, subTitle);
//   media.append(media, details);
//   const attack = $("<div>").text("ATTACK");
//   const progress1 = $("<progress>")
//     .addClass("progress is-warning")
//     .attr("value", attackValue)
//     .attr("max", "100")
//     .text(attackValue + "%");
//   const defense = $("<div>").text("DEFENSE");
//   const progress2 = $("<progress>")
//     .addClass("progress is-success")
//     .attr("value", defenseValue)
//     .attr("max", "100")
//     .text(defenseValue + "%");
//   const stamina = $("<div>").text("STAMINA");
//   const progress3 = $("<progress>")
//     .addClass("progress is-info")
//     .attr("value", staminaValue)
//     .attr("max", "100")
//     .text(staminaValue + "%");
//   cardContent.append(attack, progress1, defense, progress2, stamina, progress3);
//   card.append(cardImage, cardContent);
//   $("main").append(card);
// }}
