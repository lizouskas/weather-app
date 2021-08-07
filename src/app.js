function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
let dateTimeElement = document.querySelector("#dateTime");

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

function formatTwoDigits(digits) {
  let digitsFormatted = "";
  if (digits < 10) {
    digitsFormatted = `0${digits}`;
  } else {
    digitsFormatted = `${digits}`;
  }
  return digitsFormatted;
}

dateTimeElement.innerHTML = `${day} ${formatTwoDigits(hours)}:${formatTwoDigits(
  minutes
)}`;

function WeatherCondition(response) {
  let mainTemp = document.querySelector("#mainTemperature");
  mainTemp.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)} %`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

function changeName(event) {
  event.preventDefault();
  let cityNameElement = document.querySelector("#cityName");
  let cityName = document.querySelector("#enterCityInput").value;
  cityNameElement.innerHTML = cityName;

  let apiKey = "0c93923d688a9bbdec4391d2217c6127";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  // use city name for api call
  axios.get(apiUrl).then(WeatherCondition);
}

let submitForm = document.querySelector("#displayCity");
submitForm.addEventListener("submit", changeName);
