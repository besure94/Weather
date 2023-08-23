import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js';

async function getWeather(city) {
  const response = await WeatherService.getWeather(city);
  if (response.main) {
    printElements(response, city);
  } else {
    printError(response, city);
  }
}

function printElements(response, city) {
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${response.main.humidity}%. The temperature is ${response.main.temp} degrees Fahrenheit. The temperature feels like ${response.main.feels_like} degrees. The low for today is ${response.main.temp_min} degrees, and the high for today is ${response.main.temp_max} degrees. The wind speed is ${response.wind.speed} miles per hour.`;
}

function printError(error, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${error}.`;
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