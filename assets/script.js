var buttonEl = document.querySelector('button');
var inputEl = document.querySelector('input');
var sectionEl = document.querySelector('.search-bar');
var ulEl = document.querySelector('.history');
var resultsEl = document.querySelector('.results');
var detailsEl = document.querySelector('.details');
var weatherIcon = document.querySelector('#icon');
var weekForecast = document.querySelector('.week-forecast');
var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
var containerEl = document.querySelector('.container');
var entryEl = document.querySelector('#entry');

var getApi = function (city) {
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

var getForecast = function (lon, lat) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=640e0b3fa5888812105e65613290ab54'

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (weather) {
            renderWeekForecast(weather);
        })
}

var clearHistory = function (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    return;
};

var renderWeather = function (weather) {
    clearHistory(detailsEl);
    var icon = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
    var date = new Date(weather.dt * 1000);
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
};

var renderWeekForecast = function (forecast) {
    clearHistory(weekForecast);

    var forecastContainer = document.createElement('span');
    forecastContainer.setAttribute("class", "week-forecast");
    var uvi = document.createElement('li');
    uvi.textContent = "UV Index: " + forecast.current.uvi;
    uvValue = parseInt(forecast.current.uvi);
    if (uvValue < 3) {
        uvi.setAttribute("class", "green");
    } else if (uvValue < 6) {
        uvi.setAttribute("class", "yellow");
    } else {
        uvi.setAttribute("class", "red");
    }

    detailsEl.appendChild(uvi);

    var fiveDayForecast = document.createElement('h3');
    fiveDayForecast.textContent = "Five-Day Forecast";
    weekForecast.appendChild(fiveDayForecast);
    weekForecast.appendChild(forecastContainer);


    for (var i = 0; i < 5; i++) {
        var dayCast = document.createElement('div');
        var forecastList = document.createElement('ul');

        forecastContainer.append(dayCast);
        dayCast.appendChild(forecastList);

        var dateEl = document.createElement('li');
        var date = new Date(forecast.daily[i].dt * 1000);
        dateEl.textContent = date.toDateString();

        var icon = "https://openweathermap.org/img/w/" + forecast.daily[i].weather[0].icon + ".png"
        var iconHolder = document.createElement('li');
        var iconEl = document.createElement('img');
        iconEl.setAttribute("src", icon);

        var temp = document.createElement('li');
        temp.textContent = "Temp: " + forecast.daily[i].temp.day;
        var wind = document.createElement('li');
        wind.textContent = "Wind: " + forecast.daily[i].wind_speed + " MPH";
        var humidity = document.createElement('li');
        humidity.textContent = "Humidity: " + forecast.daily[i].humidity + " %";

        dayCast.appendChild(iconHolder);
        iconHolder.appendChild(iconEl);
        dayCast.appendChild(dateEl);
        dayCast.appendChild(temp);
        dayCast.appendChild(wind);
        dayCast.appendChild(humidity);
    }
};

entryEl.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches('button')) {
        event.preventDefault();

        var search = inputEl.value;
        var newLiEl = document.createElement('li');
        var searchBtnEl = document.createElement('button');
        searchBtnEl.textContent = search;

        if (!searchHistory.includes(search)) {
            searchHistory = searchHistory.concat(search);
            localStorage.setItem("history", JSON.stringify(searchHistory));

            ulEl.append(newLiEl);
            newLiEl.append(searchBtnEl);
        }

        getApi(search);
    }
});

ulEl.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches('button')) {
        var search = element.textContent;
        getApi(search);
    }
});



var init = function () {
    for (var i = 0; i < searchHistory.length; i++) {
        var search = searchHistory[i];
        var newLiEl = document.createElement('li');
        var searchBtnEl = document.createElement('button');
        searchBtnEl.textContent = search;

        ulEl.append(newLiEl);
        newLiEl.append(searchBtnEl);
    }
};

init();