import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js';


function getWeather(city) {
  let promise = WeatherService.getWeather(city);
  promise.then(function(weatherDataArray) {
    printElements(weatherDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function printElements(data) {
  document.querySelector('#showResponse').innerText = `The humidity in ${data[1]} is ${data[0].main.humidity}%. The temperature is ${data[0].main.temp} degrees Fahrenheit. The temperature feels like ${data[0].main.feels_like} degrees. The low for today is ${data[0].main.temp_min} degrees, and the high for today is ${data[0].main.temp_max} degrees. The wind speed is ${data[0].wind.speed} miles per hour.`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}`;
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