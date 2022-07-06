// import { format } from 'date-fns';

export default async function populateScreen(myObj) {
  const obj = await myObj;

  const tempDiv = document.getElementById('temp');
  tempDiv.innerHTML = obj.temp;

  const nameDiv = document.getElementById('city-name');
  nameDiv.innerHTML = obj.name;

  const descriptDiv = document.getElementById('descript');
  descriptDiv.innerHTML = obj.descript;

  const feelsLikeDiv = document.getElementById('feels-like');
  feelsLikeDiv.innerHTML = obj.feels;
}

// (function popDate() {
//   const dateDiv = document.getElementById('date');
//   dateDiv.innerText = format(new Date(), 'PP');
// })();
