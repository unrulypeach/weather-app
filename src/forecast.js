export default async function populateForecast(tempArr) {
  const daysDiv = document.getElementsByClassName('forecast-day');
  const tempList = await tempArr;
  // set dates for forecast
  for (let i = 0; i < daysDiv.length; i += 1) {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = weekday[(new Date().getDay() + i + 1) % 7];
    daysDiv[i].innerHTML = `<h2>${day}</h2> <div class="forecast-temp"> ${tempList[i]}&#176; </div>`;
  }
}
