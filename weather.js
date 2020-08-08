const api = {
  key: "8a727ec93399a912f5f96c739b8f0453",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

window.onload = function() {
  getResults("Katowice");
};

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temperature = document.querySelector('.current .temp');
  temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_main = document.querySelector('.current .weather');
  weather_main.innerText = weather.weather[0].main;

  let weather_description = document.querySelector('.weather-desc');
  weather_description.innerText = weather.weather[0].description;

  let weather_icon = document.querySelector('.weather-icon');
  let icon = weather.weather[0].icon

  // let weather_icon_url = "https://openweathermap.org/img/wn/" + icon + "@4x.png";

  let icon_element
  console.log(icon)

  if (icon == "01d") {
    icon_element = '<i class="fa fa-4x fa-sun"></i>';
  } else if (icon == "02d") {
    icon_element = '<i class="fa fa-4x fa-sun-cloud"></i>';
  } else if (icon == "03d") {
    icon_element = '<i class="fa fa-4x fa-cloud"></i>';
  } else if (icon == "04d") {
    icon_element = '<i class="fa fa-4x fa-cloud"></i>';
  } else if (icon == "09d") {
    icon_element = '<i class="fa fa-4x fa-cloud-sun-rain"></i>';
  } else if (icon == "10d") {
    icon_element = '<i class="fa fa-4x fa-cloud-sun-rain"></i>';
  } else if (icon == "11d") {
    icon_element = '<i class="fa fa-4x fa-thunderstorm"></i>';
  } else if (icon == "13d") {
    icon_element = '<i class="fa fa-4x fa-cloud-snow"></i>';
  } else if (icon == "50d") {
    icon_element = '<i class="fa fa-4x fa-wind"></i>';
  } else if (icon == "01n") {
    icon_element = '<i class="fa fa-4x fa-moon black-icon"></i>';
  } else if (icon == "02n") {
    icon_element = '<i class="fa fa-4x fa-cloud-moon black-icon"></i>';
  } else if (icon == "03n") {
    icon_element = '<i class="fa fa-4x fa-cloud black-icon"></i>';
  } else if (icon == "04n") {
    icon_element = '<i class="fa fa-4x fa-cloud black-icon"></i>';
  } else if (icon == "09n") {
    icon_element = '<i class="fa fa-4x fa-cloud-moon-rain black-icon"></i>';
  } else if (icon == "10n") {
    icon_element = '<i class="fa fa-4x fa-cloud-moon-rain black-icon"></i>';
  } else if (icon == "11n") {
    icon_element = '<i class="fa fa-4x fa-thunderstorm black-icon"></i>';
  } else if (icon == "13n") {
    icon_element = '<i class="fa fa-4x fa-cloud-snow black-icon"></i>';
  } else if (icon == "50n") {
    icon_element = '<i class="fa fa-4x fa-wind black-icon"></i>';
  } else {
    icon_element = '<i class="wi-day-sunny"></i>';

  }
  console.log(icon_element)

  weather_icon.innerHTML = icon_element;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}