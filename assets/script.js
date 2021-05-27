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
var sectionEl = document.querySelector('.search-bar');
var ulEl = document.querySelector('.history');
var resultsEl = document.querySelector('.results');
var detailsEl = document.querySelector('.details');
var weatherIcon = document.querySelector('#icon');
var weekForecast = document.querySelector('h3');

var getApi = function(city) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=640e0b3fa5888812105e65613290ab54"

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (weather) {
            renderWeather(weather);
            getForecast(weather.coord.lon, weather.coord.lat) 
        })
        
}

var getForecast = function(lon, lat) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + lon + '&appid=640e0b3fa5888812105e65613290ab54'
    console.log(requestUrl);

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (weather) {
            renderWeekForecast(weather);
        })


}

var renderWeather = function(weather){
    console.log(weather);
    var icon = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
    var date = new Date (weather.dt * 1000);
    weatherIcon.setAttribute("src", icon);
    resultsEl.textContent = weather.name + " " + date.toDateString(); 

    var temp = document.createElement('li');
    temp.textContent = "Temp: " + weather.main.temp;
    var wind = document.createElement('li');
    wind.textContent = "Wind: " + weather.wind.speed + " MPH";
    var humidity = document.createElement('li');
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
 
    detailsEl.appendChild(temp);
    detailsEl.appendChild(wind);
    detailsEl.appendChild(humidity);
}

var renderWeekForecast = function(forecast) {
    var uvi = document.createElement('li');
    uvi.textContent = "UV Index: " + forecast.current.uvi;
    detailsEl.appendChild(uvi);
    weekForecast.textContent = "Five-Day Forecast";

    



}

sectionEl.addEventListener("click", function(event) {
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


