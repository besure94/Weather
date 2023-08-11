import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    console.log(response);
    if (this.status === 200) {
      printElements(response, city);
    } else {
      printError(this, response, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, city) {
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%. The temperature is ${apiResponse.main.temp} degrees Fahrenheit. The temperature feels like ${apiResponse.main.feels_like} degrees. The low for today is ${apiResponse.main.temp_min} degrees, and the high for today is ${apiResponse.main.temp_max} degrees. The wind speed is ${apiResponse.wind.speed} miles per hour.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});