function capitalizeFirstLetter(x) {
  return x.charAt(0).toUpperCase() + x.slice(1);
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatTwoDigits(digits) {
  let digitsFormatted = "";
  if (digits < 10) {
    digitsFormatted = `0${digits}`;
  } else {
    digitsFormatted = `${digits}`;
  }
  return digitsFormatted;
}

function formatDegrees(x) {
  return `${Math.round(x)}°C`;
}

function displayForecast(response) {
  let day_index = 1;

  let now = new Date();
  let today_day_of_week = now.getDay();

  document.querySelectorAll(".weather-preview").forEach((week_element) => {
    let day = response.data.daily[day_index];
    let day_of_week_index = (today_day_of_week + day_index) % 7;

    week_element.querySelector(".week p").innerHTML = days[
      day_of_week_index
    ].substring(0, 3);

    let max_span = week_element.querySelector(".temperature-max");
    max_span.innerHTML = formatDegrees(day.temp.max);

    let min_span = week_element.querySelector(".temperature-min");
    min_span.innerHTML = formatDegrees(day.temp.min);

    let weatherIconElement = week_element.querySelector("img");
    weatherIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
    );

    day_index += 1;
  });
}

function getForecast(coordinates) {
  let apiKey = "0c93923d688a9bbdec4391d2217c6127";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleWeatherUpdate(response) {
  // handle date update
  let dateTimeElement = document.querySelector("#date-time");

  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let day = days[now.getDay()];

  dateTimeElement.innerHTML = `${day} ${formatTwoDigits(
    hours
  )}:${formatTwoDigits(minutes)}`;

  // Update weather elements
  cityName = response.data.name;
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = capitalizeFirstLetter(cityName);

  let mainTempElement = document.querySelector("#main-temperature");
  mainTempElement.innerHTML = Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)} %`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  weatherIconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function handleRequestError() {
  alert("invalid city");
}

function processCityWeather(cityName) {
  let apiKey = "0c93923d688a9bbdec4391d2217c6127";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  // use city name for api call
  axios.get(apiUrl).then(handleWeatherUpdate).catch(handleRequestError);
}

function handleCitySubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#enter-city-input").value;
  processCityWeather(cityName);
}

let submitForm = document.querySelector("#display-city");
submitForm.addEventListener("submit", handleCitySubmit);

processCityWeather("Paris");
