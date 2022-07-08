import './styles.css';
import { format } from 'date-fns';
import populateWeather from './populate';
import populateForecast from './forecast';

async function getWeather(city, unit) {
  const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0f3a5e164aba8d9dfe1e3628c9d068e9&units=${unit}`;
  const request = new Request(requestURL);
  const response = await fetch(request);
  const weather = await response.json();

  return {
    name: weather.name,
    country: weather.sys.country,
    main: weather.weather[0].main,
    descript: weather.weather[0].description,
    temp: Math.floor(weather.main.temp),
    tempMin: Math.floor(weather.main.temp_min),
    tempMax: Math.floor(weather.main.temp_max),
    feels: Math.floor(weather.main.feels_like),
    humidity: weather.main.humidity,
    wind: weather.wind.speed,
    icon: weather.weather[0].icon,
    unit,
  };
}
async function getForecast(city, unit) {
  const requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0f3a5e164aba8d9dfe1e3628c9d068e9&units=${unit}`;
  const request = new Request(requestURL);
  const response = await fetch(request);
  const weather = await response.json();

  const days = [];
  for (let j = 0; j < weather.cnt; j += 1) {
    days.push({
      date: weather.list[j].dt_txt.slice(5, 10),
      temp: weather.list[j].main.temp,
    });
  }
  const dateList = [];
  // get a list of all the dates
  // eslint-disable-next-line no-restricted-syntax
  for (const item in days) {
    if (!dateList.includes(days[item].date)) {
      dateList.push(days[item].date);
    }
  }
  const final = [];
  for (let i = 0; i < 5; i += 1) {
    const day = days.filter((item) => item.date === dateList[i]);
    final.push(day);
  }
  const actualFinal = [];
  for (let i = 0; i < 5; i += 1) {
    const day = final[i].reduce(((p, n) => p + n.temp), 0) / final[i].length;
    actualFinal.push(Math.floor(day));
  }
  return actualFinal;
}

(function popDate() {
  const dateDiv = document.getElementById('date');
  dateDiv.innerText = format(new Date(), 'PPPP');
}());

setInterval(() => {
  const timeDiv = document.getElementById('time');
  timeDiv.innerText = (new Date().toLocaleTimeString());
}, 1000);

document.getElementById('search').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    if (document.getElementById('unit-select').checked === false) {
      populateWeather(getWeather(e.target.value, 'metric'));
      populateForecast(getForecast(e.target.value, 'metric'));
    } else if (document.getElementById('unit-select').checked === true) {
      populateWeather(getWeather(e.target.value, 'imperial'));
      populateForecast(getForecast(e.target.value, 'imperial'));
    }
  }
});

document.getElementById('unit-select').addEventListener('click', (e) => {
  if (e.target.checked === false) {
    populateWeather(getWeather(document.getElementById('city-name').innerText, 'metric'));
    populateForecast(getForecast(document.getElementById('city-name').innerText, 'metric'));
  } else if (e.target.checked === true) {
    populateWeather(getWeather(document.getElementById('city-name').innerText, 'imperial'));
    populateForecast(getForecast(document.getElementById('city-name').innerText, 'imperial'));
  }
});

(function setUnitFalse() {
  document.getElementById('unit-select').checked = false;
  populateWeather(getWeather('London', 'metric'));
  populateForecast(getForecast('London', 'metric'));
}());
