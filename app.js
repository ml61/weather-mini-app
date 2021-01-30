let locationElement = document.querySelector(".location");
let locationTimezone = document.querySelector(".location-timezone");
let icon = document.querySelector("img");
let temperatureElement = document.querySelector(".temperature");
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");

window.addEventListener("load", getCoords);

async function getCoords() {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      requestWeather(lat, long);
    });
  } else {
    h1.textContent = "Make able geolocation";
  }
}

async function requestWeather(lat, long) {
  const api = `http://api.weatherstack.com/current?access_key=1834df75898853aa90a398e38d879f26&query=${lat},${long}`;
  let response = await fetch(api);
  console.log(response);
  let data = await response.json();
  console.log(data);
  const {
    temperature,
    weather_descriptions: weatherDescriptions,
    weather_icons: weatherIcons,
  } = data.current;
  const { country, name } = data.location;
  changeLocation(country, name, weatherIcons);
  changeTemperature(temperature, weatherDescriptions);
}

function changeLocation(country, name, weatherIcons) {
  locationTimezone.textContent = `${country}, ${name}`;
  icon.src = weatherIcons[0];
  locationElement.classList.remove("hidden");
}

function changeTemperature(temperature, weatherDescriptions) {
  temperatureDegree.textContent = temperature;
  temperatureDescription.textContent = weatherDescriptions[0];
  temperatureElement.classList.remove("hidden");
}
