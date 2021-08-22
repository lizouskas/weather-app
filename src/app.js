function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

function handleWeatherUpdate(response) {
  // handle date update
  let dateTimeElement = document.querySelector("#dateTime");

  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let day = days[now.getDay()];

  dateTimeElement.innerHTML = `${day} ${formatTwoDigits(
    hours
  )}:${formatTwoDigits(minutes)}`;

  // Update weather elements
  cityName = response.data.name;
  let cityNameElement = document.querySelector("#cityName");
  cityNameElement.innerHTML = capitalizeFirstLetter(cityName);

  let mainTempElement = document.querySelector("#mainTemperature");
  mainTempElement.innerHTML = Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)} %`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let weatherIconElement = document.querySelector("#weatherIcon");
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
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
  let cityName = document.querySelector("#enterCityInput").value;
  processCityWeather(cityName);
}

let submitForm = document.querySelector("#displayCity");
submitForm.addEventListener("submit", handleCitySubmit);

processCityWeather("Paris");
