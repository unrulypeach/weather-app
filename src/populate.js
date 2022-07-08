// import { format } from 'date-fns';
function importAllImg(r) {
  const images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

export default async function populateWeather(myObj) {
  const obj = await myObj;
  const images = importAllImg(require.context('./images', false, /\.(png|jpe?g|svg)$/));

  const tempDiv = document.getElementById('temp');
  tempDiv.innerHTML = `${obj.temp}&#176;`;

  const nameDiv = document.getElementById('city-name');
  nameDiv.innerHTML = `${obj.name}, ${obj.country}`;

  const iconDiv = document.getElementById('icon');
  iconDiv.src = images[`${obj.icon}.png`];
  iconDiv.classList.add(obj.icon);

  const descriptDiv = document.getElementById('descript');
  descriptDiv.innerHTML = obj.descript;

  const feelsLikeDiv = document.getElementById('feels-like');
  feelsLikeDiv.innerHTML = `feels-like: ${obj.feels}&#176;`;

  const tempMinMaxDiv = document.getElementById('temp-min-max');
  tempMinMaxDiv.innerHTML = `Low:${obj.tempMin}&#176; High:${obj.tempMax}&#176;`;

  const humidityDiv = document.getElementById('humidity');
  humidityDiv.innerHTML = `humidity: ${obj.humidity}%`;

  const windDiv = document.getElementById('wind-speed');
  if (obj.unit === 'metric') {
    windDiv.innerHTML = `wind speed: ${obj.wind}m/s`;
  } else {
    windDiv.innerHTML = `wind speed: ${obj.wind}m/h`;
  }
}
