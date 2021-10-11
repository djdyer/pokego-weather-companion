// DATE
var date = moment();
$("#date").text(date.format("dddd, MMM Do YYYY"));

// WEATHER (pass in city when fixed)
function requestWeather() {
  var city = localStorage.getItem("city");
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=45ca50dc39eb346ed62587b3b0c97470";
  // "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=45ca50dc39eb346ed62587b3b0c97470";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Current Weather: ", data); // data holds today's weather object
      printWeather(
        data.name,
        data.main.temp,
        data.main.humidity,
        data.wind.speed
      );
      console.log(data.name);
      console.log(data.main.temp);
      console.log(data.main.humidity);
      console.log(data.wind.speed);
      let weather = "";
      if (
        storm.includes(data.weather.id) ||
        rain.includes(data.weather.id) ||
        partlyRain.includes(data.weather.id)
      ) {
        weather = "Rainy";
      } else if (snow.includes(data.weather[0].id)) {
        weather = "Snow";
      } else if (sun == data.weather[0].id) {
        weather = "Sun";
      } else if (partlyCloud.includes(data.weather[0].id)) {
        weather = "Partly Cloudy";
      } else if (data.weather[0].id === 700 || 751 || 771 || 781) {
        weather = "Windy";
      } else if (data.weather[0].id === 731 || 761 || 762 || 804) {
        weather = "Cloudy";
      } else if ((data.weather[0].id === 701 || 711 || 721 || 741)) {
        weather = "Fog";
      }
      printGif(data.weather[0].id);
      getPokemonTypes(weather);
    });
}

requestWeather();

// Prints weather stats
function printWeather(name, temp, humidity, speed) {
  var str = name;
  var city = str.toUpperCase();
  $("#city").text(city);
  var tempF = Math.round((temp - 273.15) * 1.8 + 32);
  $("#temp").text(tempF + "°");
  var wind = Math.round(speed);
  $("#wind").text(wind + "MPH");
  $("#humid").text(humidity + "%");
}

// Summarized weather scenarios & ids

// Rainy = Water, Electric, and Bug
var storm = [200, 201, 202, 210, 211, 221, 230, 231, 232, 233];
var rain = [302, 310, 310, 311, 313, 314, 321, 502, 504, 511, 522, 531];
var partlyRain = [300, 301, 500, 501, 520, 521];

// Snow = Ice and Steel
var snow = [600, 601, 602, 610, 611, 612, 613, 615, 616, 620, 621, 622, 623];

// Sunny/Clear = Grass, Ground, and Fire
var sun = 800;

// Partially Cloudy = Normal and Rock
var partlyCloud = [801, 802, 803];

// Windy = Dragon, Flying, and Psychic
// Cloudy = Fairy, Fighting, and Poison
// Fog = Ghost and Dark
var cloud = [700, 701, 711, 721, 731, 741, 751, 761, 762, 771, 781, 804];

// Displays the appropriate gif per weather condition icon id
function printGif(id) {
  if (storm.includes(id)) {
    $("#weather").attr("src", "./assets/gifs/storm.gif");
  } else if (rain.includes(id)) {
    $("#weather").attr("src", "./assets/gifs/rain.gif");
  } else if (partlyRain.includes(id)) {
    $("#weather").attr("src", "./assets/gifs/partly_rain.gif");
  } else if (snow.includes(id)) {
    $("#weather").attr("src", "./assets/gifs/snow.gif");
  } else if (sun == id) {
    $("#weather").attr("src", "./assets/gifs/sun.gif");
  } else if (partlyCloud.includes(id)) {
    $("#weather").attr("src", "./assets/gifs/partly_cloud.gif");
  } else if (cloud.includes(id)) {
    $("#weather").attr("src", "./assets/gifs/cloud.gif");
  }
  printTypes(id);
}

// Fills the boosted types box with icons, titles, descriptions.
function printTypes(id) {
  console.log(id);
  if (storm.includes(id) || rain.includes(id) || partlyRain.includes(id)) {
    $("#icon1Title").replaceWith("<h3>WATER</h3>");
    $("#icon1Img").attr("src", "./assets/icons/Water.png");
    $("#typeDesc1").replaceWith(
      "<h4>Based on creatures that live on water, or use water for their disposition. Attacks involve use of water, or can be done only by marine creatures.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>ELECTRIC</h3>");
    $("#icon2Img").attr("src", "./assets/icons/Electric.png");
    $("#typeDesc2").replaceWith(
      "<h4>Possess electro kinetic abilities, being able to control, store, or even produce electricity. Usually fast, with attacks that may paralyze their target.</h4>"
    );
    $("#icon3Title").replaceWith("<h3>BUG</h3>");
    $("#icon3Img").attr("src", "./assets/icons/Bug.png");
    $("#typeDesc3").replaceWith(
      "<h4>Characterized by rapid growth, not taking long to evolve. Based on real life invertebrates like spiders, scorpions, butterflies, and moths.</h4>"
    );
  } else if (snow.includes(id)) {
    $("#icon1Title").replaceWith("<h3>ICE</h3>");
    $("#icon1Img").attr("src", "./assets/icons/Ice.png");
    $("#typeDesc1").replaceWith(
      "<h4>Able to endure very low temperatures. Moves have chances of freezing the target, preventing counterattack until thawing.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>STEEL</h3>");
    $("#icon2Img").attr("src", "./assets/icons/Steel.png");
    $("#typeDesc2").replaceWith(
      "<h4>Great defense against physical and special attacks, with large number of resistances. Heavy weight often lowers speed.</h4>"
    );
    $("#icon3Title").attr("style", "display:none");
    $("#icon3Img").attr("style", "display:none");
    $("#typeDesc3").attr("style", "display:none");
  } else if (sun == id) {
    $("#icon1Title").replaceWith("<h3>FIRE</h3>");
    $("#icon1Img").attr("src", "./assets/icons/Fire.png");
    $("#typeDesc1").replaceWith(
      "<h4>Fire-type species are based on land animals known for their predatory instincts, such as Pyroar, Arcanine, and Heatmor.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>GRASS</h3>");
    $("#icon2Img").attr("src", "./assets/icons/Grass.png");
    $("#typeDesc2").replaceWith(
      "<h4>Based on real-world plants and fungi, not necessarily grass. Often paired with poison to reflect the toxicity of several plants.</h4>"
    );
    $("#icon3Title").replaceWith("<h3>GROUND</h3>");
    $("#icon3Img").attr("src", "./assets/icons/Ground.png");
    $("#typeDesc3").replaceWith(
      "<h4>Possess power and abilities related to control of ground and earth, normally found in caves or rocky terrain.</h4>"
    );
  } else if (partlyCloud.includes(id)) {
    $("#icon1Title").replaceWith("<h3>NORMAL</h3>");
    $("#icon1Img").attr("src", "./assets/icons/Normal.png");
    $("#typeDesc1").replaceWith(
      "<h4>Based on a variety of real-world animals. More moves than any other type, however many are status moves that don't inflict damage.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>ROCK</h3>");
    $("#icon2Img").attr("src", "./assets/icons/Rock.png");
    $("#typeDesc2").replaceWith(
      "<h4>Most are biological organisms covered with armor made of minerals. Has the most weaknesses and are not very fast.</h4>"
    );
    $("#icon3Title").attr("style", "display:none");
    $("#icon3Img").attr("style", "display:none");
    $("#typeDesc3").attr("style", "display:none");
  } else if (id == 700 || 751 || 771 || 781) {
    $("#icon1Title").replaceWith("<h3>DRAGON</h3>");
    $("#icon1Img").attr("src", "./assets/icons/Dragon.png");
    $("#typeDesc1").replaceWith(
      "<h4>Often considered an ancestral type, as many are revered as deities. Usually reptilian in appearance, with stats suprassing most.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>FLYING</h3>");
    $("#icon2Img").attr("src", "./assets/icons/Flying.png");
    $("#typeDesc2").replaceWith(
      "<h4>Based on birds and insects, with power related to aerial and wind-related moves. Many have wings, but some float without.</h4>"
    );
    $("#icon3Title").replaceWith("<h3>PSYCHIC</h3>");
    $("#icon3Img").attr("src", "./assets/icons/Psychic.png");
    $("#typeDesc3").replaceWith(
      "<h4>Considered the most powerful by most, posessing super intelligence. Many based on real scientific or mythological discoveries.</h4>"
    );
  } else if (id == 731 || 761 || 762 || 804) {
    $("#icon1Title").replaceWith("<h3>FAIRY</h3>");
    $("#icon1Img").attr("src", "./assets/icons/Fairy.png");
    $("#typeDesc1").replaceWith(
      "<h4>Considered cute and elegant, tend to be pink in color and feminine in appearance. Do not underestimate, as they are often incredibly powerful.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>FIGHTING</h3>");
    $("#icon2Img").attr("src", "./assets/icons/Fighting.png");
    $("#typeDesc2").replaceWith(
      "<h4>Specialists in melee attachks such as punches and kicks. Most have human-like body because they represent practitioners of various martial arts.</h4>"
    );
    $("#icon3Title").replaceWith("<h3>POISON</h3>");
    $("#icon3Img").attr("src", "./assets/icons/Poison.png");
    $("#typeDesc3").replaceWith(
      "<h4>Having a natural toxic quality, some directly represent real-world species known for their venom, such as snakes or even pollution itself.</h4>"
    );
  } else if ((id = 701 || 711 || 721 || 741)) {
    $("#icon1Title").replaceWith("<h3>GHOST</h3>");
    $("#icon1Img").attr("src", "./assets/icons/Ghost.png");
    $("#typeDesc1").replaceWith(
      "<h4>Usually connected to fear, the dark, and the afterlife. Tend to be extremely naughty, often pranking humans just to see their reactions.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>DARK</h3>");
    $("#icon2Img").attr("src", "./assets/icons/Dark.png");
    $("#typeDesc2").replaceWith(
      "<h4>Represented from traits that evoke a negative leaning nature. Exhibits unusually cruel, crafty, and clever intelligence, and belligerent aggressiveness.</h4>"
    );
    $("#icon3Title").attr("style", "display:none");
    $("#icon3Img").attr("style", "display:none");
    $("#typeDesc3").attr("style", "display:none");
  }
}

//  TYPES
function getPokemonTypes(weather) {
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

      newArray = newArray.filter(function (pokemon) {
        if (weather === "Rainy" && pokemon.type.includes("Water")) {
          return true;
        } else if (weather === "Rainy" && pokemon.type.includes("Electric")) {
          return true;
        } else if (weather === "Rainy" && pokemon.type.includes("Bug")) {
          return true;
        } else if (weather === "Snow" && pokemon.type.includes("Ice")) {
          return true;
        } else if (weather === "Snow" && pokemon.type.includes("Steel")) {
          return true;
        } else if (weather === "Sun" && pokemon.type.includes("Grass")) {
          return true;
        } else if (weather === "Sun" && pokemon.type.includes("Ground")) {
          return true;
        } else if (weather === "Sun" && pokemon.type.includes("Fire")) {
          return true;
        } else if (
          weather === "Partly Cloudy" &&
          pokemon.type.includes("Normal")
        ) {
          return true;
        } else if (
          weather === "Partly Cloudy" &&
          pokemon.type.includes("Rock")
        ) {
          return true;
        } else if (weather === "Windy" && pokemon.type.includes("Dragon")) {
          return true;
        } else if (weather === "Windy" && pokemon.type.includes("Flying")) {
          return true;
        } else if (weather === "Windy" && pokemon.type.includes("Psychic")) {
          return true;
        } else if (weather === "Cloudy" && pokemon.type.includes("Fairy")) {
          return true;
        } else if (weather === "Cloudy" && pokemon.type.includes("Fighting")) {
          return true;
        } else if (weather === "Cloudy" && pokemon.type.includes("Poison")) {
          return true;
        } else if (weather === "Fog" && pokemon.type.includes("Ghost")) {
          return true;
        } else if (weather === "Fog" && pokemon.type.includes("Dark")) {
          return true;
        }
      });
      return fetch("https://pokemon-go1.p.rapidapi.com/pokemon_stats.json", {
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
          var statsArray = data
            .filter(function (pokemon) {
              return pokemon.form == "Normal";
            })
            .slice(0, 150);
          console.log("Stats: ", statsArray); 
          console.log("bulbasuar stats: ", statsArray[0].base_attack)
          // contains only 150 Normal pokemon stats
          printCard(newArray, statsArray); 
       })
           
    })
    .catch((err) => {
      console.error(err);
    });
}
// STATS
// function getPokemonStats() {
//   fetch("https://pokemon-go1.p.rapidapi.com/pokemon_stats.json", {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
//       "x-rapidapi-key": "4be5ec2e63msh2818ea53452dcdcp12e586jsn7ea1810f83a2",
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then(function (data) {
//       var statsArray = data
//         .filter(function (pokemon) {
//           return pokemon.form == "Normal";
//         })
//         .slice(0, 150);
//       console.log("Stats: ", statsArray); 
//       console.log("bulbasuar stats: ", statsArray[0].base_attack)
//       // contains only 150 Normal pokemon stats
//    getCardStats(statsArray);
//    })
        
//     .catch((err) => {
//       console.error(err);
//     });
// }

function printCard(newArray, statsArray) {
  for (var i = 0; i < newArray.length; i++) {
    var attackValue = statsArray[i].base_attack;
    var defenseValue = statsArray[i].base_defense;
    var staminaValue = statsArray[i].base_stamina;

    // Creates card div, adds bulma classes, prints pokemon image
    const card = $("<div>").addClass("card");
    const cardImage = $("<div>").addClass("card-image");
    const figure = $("<figure>").addClass("image is-4by3");
    const charImage = $("<img>").attr(
      "src",
      "./assets/character_images/" + newArray[i].pokemon_id + ".png"
    );
    const flexDiv = $("<div>");
    figure.append(charImage);
    cardImage.append(figure);

    // Creates card content div, prints type icon(s)
    const cardContent = $("<div>").addClass("card-content");
    const media = $("<div>").addClass("media");
    const mediaLeft = $("<div>").addClass("media-left");
    const typeFigure = $("<figure>").addClass("image is-48x48");
    const typeImage = $("<img>").attr(
      "src",
      "./assets/icons/" + newArray[i].type[0] + ".png"
    );
    typeFigure.append(typeImage);
    mediaLeft.append(typeFigure);
    flexDiv.append(mediaLeft);

    // If second type available
    if (newArray[i].type[1]) {
      const mediaLeft2 = $("<div>").addClass("media-left");
      const typeFigure2 = $("<figure>").addClass("image is-48x48");
      const typeImage2 = $("<img>").attr(
        "src",
        "./assets/icons/" + newArray[i].type[1] + ".png"
      );
      typeFigure2.append(typeImage2);
      mediaLeft2.append(typeFigure2);
      flexDiv.append(mediaLeft2);
    }
    media.append(flexDiv);
    // Creates card content div, to add title and subtitle
    const details = $("<div>").addClass("media-content");
    const title = $("<h1>")
      .addClass("title is-4")
      .text(newArray[i].pokemon_name.toUpperCase());
    const subTitle = $("<h1>").addClass("subtitle is-6").text("Boosted!");
    details.append(title, subTitle);
    media.append(media, details);

  
    // Creates card content div, to add pokemon stats
    const attack = $("<div>").addClass(".attackStat").text("ATTACK: " + attackValue);
    var progress1 = $("<progress>")
      .addClass("progress is-warning")
      .attr("value", attackValue)
      .attr("max", "300")
      .text(attackValue + "%");
    const defense = $("<div>").addClass(".defenseStat").text("DEFENSE: " + defenseValue);
    var progress2 = $("<progress>")
      .addClass("progress is-success")
      .attr("value", defenseValue)
      .attr("max", "300")
      .text(defenseValue + "%");
    const stamina = $("<div>").addClass(".staminaStat").text("STAMINA: " + staminaValue);
    var progress3 = $("<progress>")
      .addClass("progress is-info")
      .attr("value", staminaValue)
      .attr("max", "300")
      .text(staminaValue + "%");
    cardContent.append(
      attack,
      progress1,
      defense,
      progress2,
      stamina,
      progress3
    );
    card.append(cardImage, media, cardContent);
    $("main").append(card);
  }
}

// function getCardStats(statsArray)
//   {
//     for(var i = 0; i < statsArray.length; i++){

//       var attackValues = statsArray[i].base_attack; 
//       var defenseValues = statsArray[i].base_defense;
//       var staminaValues = statsArray[i].base_stamina;
//       var values = $("#allCards .card .card-content .progress is-warning").text();
//       if($(".title is-4").text() == statsArray[i].pokemon_name.toUpperCase())
//       var value = $(".progress is-warning").attr("value", attackValues).text(attackValues + "%");
//       $(".progress is-success").attr("value", defenseValues);
//       $(".progress is-info").attr("value", staminaValues);
//       $(".card-content").append(value);
//       console.log(attackValues);
//       console.log(value);
  
//     }
//     console.log(values)
  
// }


// getPokemonStats();
