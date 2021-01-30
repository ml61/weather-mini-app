window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let icon = document.querySelector("img");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `http://api.weatherstack.com/current?access_key=1834df75898853aa90a398e38d879f26&query=${lat},${long}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const {
            temperature,
            weather_descriptions: weatherDescriptions,
            weather_icons: weatherIcons,
          } = data.current;
          const { country, name } = data.location;
          //set dom elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = weatherDescriptions[0];
          locationTimezone.textContent = `${country}, ${name}`;
          icon.src = weatherIcons[0];
        });
    });
  } else {
    h1.textContent = "Make able geolocation";
  }
});

// async function getWeather(lat, long) {
//   try {
//     let respond = await fetch(
//       `http://api.weatherstack.com/current?access_key=1834df75898853aa90a398e38d879f26&query=${lat},${long}`
//     );
//     let objWeather = await respond.json();
//     return objWeather;
//   } catch (err) {
//     console.error(err);
//   }
// }
