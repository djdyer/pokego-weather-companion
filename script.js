// Button & input field
var searchBtn = $("#search").on("click", newSearch);
var input = $("#input");

// New search function takes city input to requestWeather
input.on("keypress", function (event) {
  if (event.keyCode === 13) {
    var city = input.val();
    localStorage.setItem("city", city);
    redirect(city);
    input.val("");
  }
});

// Launches app with city input, saves to local, redirects to main
function newSearch(event) {
  event.preventDefault();
  var city = input.val();
  localStorage.setItem("city", city);
  redirect(city);
  input.val("");
}

// After redirect, call requestWeather and feed city parimeter
function redirect(city) {
  console.log(city);
  if (city !== null) {
    window.location.href = "main.html?city=" + city;
  }
}
