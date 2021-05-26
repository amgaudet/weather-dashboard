// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var buttonEl = document.querySelector('button');
var inputEl = document.querySelector('input');
var sectionEl = document.querySelector('section');
var ulEl = document.querySelector('ul');

var getApi = function(city) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=640e0b3fa5888812105e65613290ab54"

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (weather) {
            console.log(weather);
        })
}

sectionEl.addEventListener("click", function() {
    var element = event.target;
    if (element.matches('button')) {
        event.preventDefault();
        
        var search = inputEl.value;
        var newLiEl = document.createElement('li');
        var searchHistory = document.createElement('button');
        searchHistory.textContent = search;

        ulEl.append(newLiEl);
        newLiEl.append(searchHistory);

        getApi(search);
    }
});

