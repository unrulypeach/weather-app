// async function getWeather() {
//   const requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=london&appid=0f3a5e164aba8d9dfe1e3628c9d068e9&units=metric';
//   const request = new Request(requestURL);
//   const response = await fetch(request);
//   const weather = await response.json();

//   return weather;
// }
import './styles.css';
import { format } from 'date-fns';
import populateScreen from './populate';

async function getWeather(city, unit) {
  const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0f3a5e164aba8d9dfe1e3628c9d068e9&units=${unit}`;
  const request = new Request(requestURL);
  const response = await fetch(request);
  const weather = await response.json();

  return weather;
}
async function getForecast(city, unit) {
  const requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0f3a5e164aba8d9dfe1e3628c9d068e9&units=${unit}`;
  const request = new Request(requestURL);
  const response = await fetch(request);
  const weather = await response.json();

  return weather;
}
async function getName(cityObj) {
  const city = await cityObj;
  return city.name;
}
async function getCountry(cityObj) {
  const city = await cityObj;
  return city.sys.country;
}
async function getMain(cityObj) {
  const city = await cityObj;
  return city.weather[0].main;
}
async function getDescription(cityObj) {
  const city = await cityObj;
  return city.weather[0].description;
}
async function getTemp(cityObj) {
  const city = await cityObj;
  return city.main.temp;
}
async function getFeelsLike(cityObj) {
  const city = await cityObj;
  return city.main.feels_like;
}
async function getHumidity(cityObj) {
  const city = await cityObj;
  return city.main.humidity;
}
async function getIcon(cityObj) {
  const city = await cityObj;
  return city.weather[0].icon;
}
async function getAllMetric(city) {
  const cityObj = await getWeather(city, 'metric');

  return {
    name: await getName(cityObj),
    country: await getCountry(cityObj),
    main: await getMain(cityObj),
    descript: await getDescription(cityObj),
    temp: await getTemp(cityObj),
    feels: await getFeelsLike(cityObj),
    humidity: await getHumidity(cityObj),
    icon: await getIcon(cityObj),
  };
}
(function popDate() {
  const dateDiv = document.getElementById('date');
  dateDiv.innerText = format(new Date(), 'PP');
}());

populateScreen(getAllMetric('tokyo'));
