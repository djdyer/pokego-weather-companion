// DATE
var date = moment();
$("#date").text(date.format("dddd, MMM Do YYYY"));

// Boosted Types and Weather Id's

// Rainy = Water, Electric, and Bug
var storm = [200, 201, 202, 210, 211, 221, 230, 231, 232, 233];
var rain = [302, 310, 310, 311, 313, 314, 321, 502, 504, 511, 522, 531];
var partlyRain = [300, 301, 500, 501, 520, 521];

// Snow = Ice and Steel
var snow = [600, 601, 602, 610, 611, 612, 613, 615, 616, 620, 621, 622, 623];

// Sunny/Clear = Grass, Ground, and Fire
var sun = [800];

// Partially Cloudy = Normal and Rock
var partlyCloud = [801, 802, 803];

// Windy = Dragon, Flying, and Psychic
var windy = [700, 751, 771, 781];

// Cloudy = Fairy, Fighting, and Poison
var cloudy = [731, 761, 762, 804];

// Fog = Ghost and Dark
var foggy = [701, 711, 721, 741];

// WEATHER API pulls city from local storage
function requestWeather() {
  var city = localStorage.getItem("city");
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=45ca50dc39eb346ed62587b3b0c97470";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Current Weather: ", data); // data object holds current weather
      if (data.cod == 404) {
        document.location.href = "index.html";
      }
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
      console.log(data.weather[0].id);

      let weather = "";

      // Defining 7 different weather conditions
      if (
        storm.includes(data.weather[0].id) ||
        rain.includes(data.weather[0].id) ||
        partlyRain.includes(data.weather[0].id)
      ) {
        weather = "Rainy";
      } else if (snow.includes(data.weather[0].id)) {
        weather = "Snowy";
      } else if (sun.includes(data.weather[0].id)) {
        weather = "Sunny";
      } else if (partlyCloud.includes(data.weather[0].id)) {
        weather = "Partly Cloudy";
      } else if (windy.includes(data.weather[0].id)) {
        console.log(data.weather[0].id);
        weather = "Windy";
      } else if (cloudy.includes(data.weather[0].id)) {
        weather = "Cloudy";
      } else if (foggy.includes(data.weather[0].id)) {
        weather = "Foggy";
      }
      printGif(data.weather[0].id);
      getPokemonTypes(weather);
      printWeatherType(weather);
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

// Displays appropriate gif per weather id
function printGif(id) {
  if (storm.includes(id)) {
    $("#weather").attr("src", "../assets/gifs/storm.gif");
  } else if (rain.includes(id)) {
    $("#weather").attr("src", "../assets/gifs/rain.gif");
  } else if (partlyRain.includes(id)) {
    $("#weather").attr("src", "../assets/gifs/partly_rain.gif");
  } else if (snow.includes(id)) {
    $("#weather").attr("src", "../assets/gifs/snow.gif");
  } else if (sun == id) {
    $("#weather").attr("src", "../assets/gifs/sun.gif");
  } else if (partlyCloud.includes(id)) {
    $("#weather").attr("src", "../assets/gifs/partly_cloud.gif");
  } else if (windy.includes(id)) {
    $("#weather").attr("src", "../assets/gifs/cloud.gif");
  } else if (cloudy.includes(id)) {
    $("#weather").attr("src", "../assets/gifs/cloud.gif");
  } else if (foggy.includes(id)) {
    $("#weather").attr("src", "../assets/gifs/cloud.gif");
  }
  printTypes(id);
}

// Fills boosted types box with icons, titles, descriptions.
function printTypes(id) {
  var typeArray = [];
  if (storm.includes(id) || rain.includes(id) || partlyRain.includes(id)) {
    $("#icon1Title").replaceWith("<h3>WATER</h3>");
    $("#filterTitle1").replaceWith("<h3>WATER</h3>");
    $("#filterTitle1").attr("style:hover", "font-weight:bolder");
    $("#icon1Img").attr("src", "../assets/icons/water.png");
    $("#filterImg1").attr("src", "../assets/icons/water.png");
    $("#typeDesc1").replaceWith(
      "<h4>Based on creatures that live on water, or use water for their disposition. Attacks involve use of water, or can be done only by marine creatures.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>ELECTRIC</h3>");
    $("#filterTitle2").replaceWith("<h3>ELECTRIC</h3>");
    $("#filterTitle2").attr("style:hover", "font-weight:bolder");
    $("#icon2Img").attr("src", "../assets/icons/electric.png");
    $("#filterImg2").attr("src", "../assets/icons/electric.png");
    $("#typeDesc2").replaceWith(
      "<h4>Possess electro kinetic abilities, being able to control, store, or even produce electricity. Usually fast, with attacks that may paralyze their target.</h4>"
    );
    $("#icon3Title").replaceWith("<h3>BUG</h3>");
    $("#filterTitle3").replaceWith("<h3>BUG</h3>");
    $("#filterTitle3").attr("style:hover", "font-weight:bolder");
    $("#icon3Img").attr("src", "../assets/icons/bug.png");
    $("#filterImg3").attr("src", "../assets/icons/bug.png");
    $("#typeDesc3").replaceWith(
      "<h4>Characterized by rapid growth, not taking long to evolve. Based on real life invertebrates like spiders, scorpions, butterflies, and moths.</h4>"
    );
  } else if (snow.includes(id)) {
    $("#icon1Title").replaceWith("<h3>ICE</h3>");
    $("#filterTitle1").replaceWith("<h3>ICE</h3>");
    $("#filterTitle1").attr("style:hover", "font-weight:bolder");
    $("#icon1Img").attr("src", "../assets/icons/ice.png");
    $("#filterImg1").attr("src", "../assets/icons/ice.png");
    $("#typeDesc1").replaceWith(
      "<h4>Able to endure very low temperatures. Moves have chances of freezing the target, preventing counterattack until thawing.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>STEEL</h3>");
    $("#filterTitle2").replaceWith("<h3>STEEL</h3>");
    $("#filterTitle2").attr("style:hover", "font-weight:bolder");
    $("#icon2Img").attr("src", "../assets/icons/steel.png");
    $("#filterImg2").attr("src", "../assets/icons/steel.png");
    $("#typeDesc2").replaceWith(
      "<h4>Great defense against physical and special attacks, with large number of resistances. Heavy weight often lowers speed.</h4>"
    );
    $("#icon3Title").attr("style", "display:none");
    $("#icon3Img").attr("style", "display:none");
    $("#typeDesc3").attr("style", "display:none");
    $("#lastItem").attr("style", "display:none");
  } else if (sun == id) {
    $("#icon1Title").replaceWith("<h3>FIRE</h3>");
    $("#filterTitle1").replaceWith("<h3>FIRE</h3>");
    $("#filterTitle1").attr("style:hover", "font-weight:bolder");
    $("#icon1Img").attr("src", "../assets/icons/fire.png");
    $("#filterImg1").attr("src", "../assets/icons/fire.png");
    $("#typeDesc1").replaceWith(
      "<h4>Fire-type species are based on land animals known for their predatory instincts, such as Pyroar, Arcanine, and Heatmor.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>GRASS</h3>");
    $("#filterTitle2").replaceWith("<h3>GRASS</h3>");
    $("#filterTitle2").attr("style:hover", "font-weight:bolder");
    $("#icon2Img").attr("src", "../assets/icons/grass.png");
    $("#filterImg2").attr("src", "../assets/icons/grass.png");
    $("#typeDesc2").replaceWith(
      "<h4>Based on real-world plants and fungi, not necessarily grass. Often paired with poison to reflect the toxicity of several plants.</h4>"
    );
    $("#icon3Title").replaceWith("<h3>GROUND</h3>");
    $("#filterTitle3").replaceWith("<h3>GROUND</h3>");
    $("#filterTitle3").attr("style:hover", "font-weight:bolder");
    $("#icon3Img").attr("src", "../assets/icons/ground.png");
    $("#filterImg3").attr("src", "../assets/icons/ground.png");
    $("#typeDesc3").replaceWith(
      "<h4>Possess power and abilities related to control of ground and earth, normally found in caves or rocky terrain.</h4>"
    );
  } else if (partlyCloud.includes(id)) {
    $("#icon1Title").replaceWith("<h3>NORMAL</h3>");
    $("#filterTitle1").replaceWith("<h3>NORMAL</h3>");
    $("#filterTitle1").attr("style:hover", "font-weight:bolder");
    $("#icon1Img").attr("src", "../assets/icons/normal.png");
    $("#filterImg1").attr("src", "../assets/icons/normal.png");
    $("#typeDesc1").replaceWith(
      "<h4>Based on a variety of real-world animals. More moves than any other type, however many are status moves that don't inflict damage.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>ROCK</h3>");
    $("#filterTitle2").replaceWith("<h3>ROCK</h3>");
    $("#filterTitle2").attr("style:hover", "font-weight:bolder");
    $("#icon2Img").attr("src", "../assets/icons/rock.png");
    $("#filterImg2").attr("src", "../assets/icons/rock.png");
    $("#typeDesc2").replaceWith(
      "<h4>Most are biological organisms covered with armor made of minerals. Has the most weaknesses and are not very fast.</h4>"
    );
    $("#icon3Title").attr("style", "display:none");
    $("#icon3Img").attr("style", "display:none");
    $("#typeDesc3").attr("style", "display:none");
    $("#lastItem").attr("style", "display:none");
  } else if (windy.includes(id)) {
    $("#icon1Title").replaceWith("<h3>DRAGON</h3>");
    $("#filterTitle1").replaceWith("<h3>DRAGON</h3>");
    $("#filterTitle1").attr("style:hover", "font-weight:bolder");
    $("#icon1Img").attr("src", "../assets/icons/dragon.png");
    $("#filterImg1").attr("src", "../assets/icons/dragon.png");
    $("#typeDesc1").replaceWith(
      "<h4>Often considered an ancestral type, as many are revered as deities. Usually reptilian in appearance, with stats suprassing most.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>FLYING</h3>");
    $("#filterTitle2").replaceWith("<h3>FLYING</h3>");
    $("#filterTitle2").attr("style:hover", "font-weight:bolder");
    $("#icon2Img").attr("src", "../assets/icons/flying.png");
    $("#filterImg2").attr("src", "../assets/icons/flying.png");
    $("#typeDesc2").replaceWith(
      "<h4>Based on birds and insects, with power related to aerial and wind-related moves. Many have wings, but some float without.</h4>"
    );
    $("#icon3Title").replaceWith("<h3>PSYCHIC</h3>");
    $("#filterTitle3").replaceWith("<h3>PSYCHIC</h3>");
    $("#filterTitle3").attr("style:hover", "font-weight:bolder");
    $("#icon3Img").attr("src", "../assets/icons/psychic.png");
    $("#filterImg3").attr("src", "../assets/icons/psychic.png");
    $("#typeDesc3").replaceWith(
      "<h4>Considered the most powerful by most, posessing super intelligence. Many based on real scientific or mythological discoveries.</h4>"
    );
  } else if (cloudy.includes(id)) {
    $("#icon1Title").replaceWith("<h3>FAIRY</h3>");
    $("#filterTitle1").replaceWith("<h3>FAIRY</h3>");
    $("#filterTitle1").attr("style:hover", "font-weight:bolder");
    $("#icon1Img").attr("src", "../assets/icons/fairy.png");
    $("#filterImg1").attr("src", "../assets/icons/fairy.png");
    $("#typeDesc1").replaceWith(
      "<h4>Considered cute and elegant, tend to be pink in color and feminine in appearance. Do not underestimate, as they are often incredibly powerful.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>FIGHTING</h3>");
    $("#filterTitle2").replaceWith("<h3>FIGHTING</h3>");
    $("#filterTitle2").attr("style:hover", "font-weight:bolder");
    $("#icon2Img").attr("src", "../assets/icons/fighting.png");
    $("#filterImg2").attr("src", "../assets/icons/fighting.png");
    $("#typeDesc2").replaceWith(
      "<h4>Specialists in melee attachks such as punches and kicks. Most have human-like body because they represent practitioners of various martial arts.</h4>"
    );
    $("#icon3Title").replaceWith("<h3>POISON</h3>");
    $("#filterTitle3").replaceWith("<h3>POISON</h3>");
    $("#filterTitle3").attr("style:hover", "font-weight:bolder");
    $("#icon3Img").attr("src", "../assets/icons/poison.png");
    $("#filterImg3").attr("src", "../assets/icons/poison.png");
    $("#typeDesc3").replaceWith(
      "<h4>Having a natural toxic quality, some directly represent real-world species known for their venom, such as snakes or even pollution itself.</h4>"
    );
  } else if (foggy.includes(id)) {
    $("#icon1Title").replaceWith("<h3>GHOST</h3>");
    $("#filterTitle1").replaceWith("<h3>GHOST</h3>");
    $("#filterTitle1").attr("style:hover", "font-weight:bolder");
    $("#icon1Img").attr("src", "../assets/icons/ghost.png");
    $("#filterImg1").attr("src", "../assets/icons/ghost.png");
    $("#typeDesc1").replaceWith(
      "<h4>Usually connected to fear, the dark, and the afterlife. Tend to be extremely naughty, often pranking humans just to see their reactions.</h4>"
    );
    $("#icon2Title").replaceWith("<h3>DARK</h3>");
    $("#filterTitle2").replaceWith("<h3>DARK</h3>");
    $("#filterTitle2").attr("style:hover", "font-weight:bolder");
    $("#icon2Img").attr("src", "../assets/icons/dark.png");
    $("#filterImg2").attr("src", "../assets/icons/dark.png");
    $("#typeDesc2").replaceWith(
      "<h4>Represented from traits that evoke a negative leaning nature. Exhibits unusually cruel, crafty, and clever intelligence, and belligerent aggressiveness.</h4>"
    );
    $("#icon3Title").attr("style", "display:none");
    $("#icon3Img").attr("style", "display:none");
    $("#typeDesc3").attr("style", "display:none");
    $("#lastItem").attr("style", "display:none");
    
  }

}

// Changes boosted types box header to include current weather condition
function printWeatherType(weather) {
  var condition = weather.toUpperCase();
  $("#weatherType").text(condition);
  $("#weatherType").attr("style", "color:#ffcb05; font-size:20pt");
}

//  POKEMON TYPES API
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

    // passing data object to newArray, filtering for only 150 Normal Pokemon types
    .then(function (data) {
      var newArray = data
        .filter(function (pokemon) {
          return pokemon.form == "Normal";
        })
        .slice(0, 150);

      console.log("Types: ", newArray); // contains types for only 150 Normal Pokemon

      // Compare current weather to all Pokemon types, give boolean.
      return (newArray = newArray.filter(function (pokemon) {
        if (weather === "Rainy" && pokemon.type.includes("Water")) {
          return true;
        } else if (weather === "Rainy" && pokemon.type.includes("Electric")) {
          return true;
        } else if (weather === "Rainy" && pokemon.type.includes("Bug")) {
          return true;
        } else if (weather === "Snowy" && pokemon.type.includes("Ice")) {
          return true;
        } else if (weather === "Snowy" && pokemon.type.includes("Steel")) {
          return true;
        } else if (weather === "Sunny" && pokemon.type.includes("Grass")) {
          return true;
        } else if (weather === "Sunny" && pokemon.type.includes("Ground")) {
          return true;
        } else if (weather === "Sunny" && pokemon.type.includes("Fire")) {
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
        } else if (weather === "Foggy" && pokemon.type.includes("Ghost")) {
          return true;
        } else if (weather === "Foggy" && pokemon.type.includes("Dark")) {
          return true;
        }
      }));
    })

    // newArray now filtered for only matching Pokemon
    .then((newArray) => {
      console.log("Boosted Types: ", newArray); // The filtered list of boosted types
      fetch("https://pokemon-go1.p.rapidapi.com/pokemon_stats.json", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
          "x-rapidapi-key":
            "4be5ec2e63msh2818ea53452dcdcp12e586jsn7ea1810f83a2",
        },
      })
        .then((response) => {
          return response.json();
        })

        // Passing data to statsArray, filtering for the same 150 Normal Pokemon
        .then(function (data) {
          var statsArray = data
            .filter(function (pokemon) {
              return pokemon.form == "Normal";
            })
            .slice(0, 150);

          console.log("Stats: ", statsArray); // contains stats for only 150 Normal Pokemon

          printCard(newArray, statsArray);
          localStorage.setItem("boosted", JSON.stringify(newArray));

        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
// POKEMON STATS API
function getPokemonStats() {
  fetch("https://pokemon-go1.p.rapidapi.com/pokemon_stats.json", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
      "x-rapidapi-key": "4be5ec2e63msh2818ea53452dcdcp12e586jsn7ea1810f83a2",
    },
  })
    .then((response) => {
      return response.json();
    })

    // Passing data to statsArray, filtering for the same 150 Normal Pokemon
    .then(function (data) {
      var statsArray = data
        .filter(function (pokemon) {
          return pokemon.form == "Normal";
        })
        .slice(0, 150);

      console.log("Stats: ", statsArray); // contains only 150 Normal pokemon stats
    })
    .catch((err) => {
      console.log(err);
    });
}

function printCard(newArray, statsArray) {
  for (var i = 0; i < newArray.length; i++) {
    var attackValue = statsArray[i].base_attack;
    var defenseValue = statsArray[i].base_defense;
    var staminaValue = statsArray[i].base_stamina;

    // Creates card div, adds bulma classes, prints pokemon image
    const card = $("<div>").addClass("card").attr('id', newArray[i].pokemon_name.toUpperCase());
    const cardImage = $("<div>").addClass("card-image");
    const figure = $("<figure>").addClass("image is-4by3");
    const charImage = $("<img>").attr(
      "src",
      "../assets/character_images/" + newArray[i].pokemon_id + ".png"
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
      "../assets/icons/" + newArray[i].type[0].toLowerCase() + ".png"
    );
    typeFigure.append(typeImage);
    mediaLeft.append(typeFigure);
    flexDiv.append(mediaLeft);

    // If second type is available
    if (newArray[i].type[1]) {
      const mediaLeft2 = $("<div>").addClass("media-left");
      const typeFigure2 = $("<figure>").addClass("image is-48x48");
      const typeImage2 = $("<img>").attr(
        "src",
        "../assets/icons/" + newArray[i].type[1].toLowerCase() + ".png"
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
    const attack = $("<div>")
      .addClass(".attackStat")
      .text("ATTACK: " + attackValue);
    var progress1 = $("<progress>")
      .addClass("progress is-warning")
      .attr("value", attackValue)
      .attr("max", "300")
      .text(attackValue + "%");
    const defense = $("<div>")
      .addClass(".defenseStat")
      .text("DEFENSE: " + defenseValue);
    var progress2 = $("<progress>")
      .addClass("progress is-success")
      .attr("value", defenseValue)
      .attr("max", "300")
      .text(defenseValue + "%");
    const stamina = $("<div>")
      .addClass(".staminaStat")
      .text("STAMINA: " + staminaValue);
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

getPokemonStats();

var filterStatus = false;
$(".button").on("click", toggleFilter);

function toggleFilter() {
  filterStatus = !filterStatus;
  var element = $("#dropdown");
  element.removeClass("not-active");
  element.addClass("is-active");
  if (filterStatus) {
    element.removeClass("not-active");
    element.addClass("is-active");
  } else {
    element.removeClass("is-active");
    element.addClass("not-active");
  }
}

$("#type_buttonOne").on("click", filterFurther);
$("#type_buttonTwo").on("click", filterFurther);
$("#type_buttonThree").on("click", filterFurther);

function filterFurther() {
  $(".card").attr("style", "display: block;");
  var boosted = localStorage.getItem("boosted");
  var pokemonType = $(this).children().eq(0).children().eq(1).text();
  var boostedPokemon = JSON.parse(boosted);
   var pokemonfilterList = [];
  for(var i = 0; i < boostedPokemon.length; i++){
    for(var j = 0; j < boostedPokemon[i].type.length; j++){
      var boostedType = boostedPokemon[i].type[j].toUpperCase();
    if(boostedType === pokemonType) {
      pokemonfilterList.push(boostedPokemon[i].pokemon_name.toUpperCase());
    }
  }
  }
  for(var i = 0; i < boostedPokemon.length; i++){
    
    // var pokemonName = pokemonfilterList[i].includes($(".card .media .media-content").text())
    // // var pokemonNameOnly = pokemonName.replace("Boosted!", "");
    console.log(boostedPokemon[i].pokemon_name)
    if(!pokemonfilterList.includes(boostedPokemon[i].pokemon_name.toUpperCase())){
    $("#" + boostedPokemon[i].pokemon_name.toUpperCase()).attr("style","display: none;");
    }
  }
  
  
  var element = $("#dropdown");
  element.removeClass("is-active");
  element.addClass("not-active");
}
