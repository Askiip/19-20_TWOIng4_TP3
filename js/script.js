
// Fonction appelée lors du click du bouton
function start(nom="") {
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(nom);
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);
      const city = data.name;
      

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      document.getElementById('cityName').innerHTML = `Aujourd'hui | ${city}`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

    //previsions for 3 days
    apiWeather.fetchThreeDayForecast()
        .then(function (response) {
            let data = response.data;

            for(let i=1;i<=3;i++){
              data.list[i - 1]['Index'] = i - 1;
              const main = data.list[i-1].weather[0].main;
              const description = data.list[i-1].weather[0].description;
              const temp = data.list[i-1].temp.day;
              const icon = apiWeather.getHTMLElementFromIcon(data.list[i-1].weather[0].icon);

                document.getElementById(`today-forecast-main-d${i}`).innerHTML=main;
                document.getElementById(`today-forecast-more-info-d${i}`).innerHTML=description;
                document.getElementById(`icon-weather-container-d${i}`).innerHTML=icon;
                document.getElementById(`today-forecast-temp-d${i}`).innerHTML=`${temp}°C`;
            }
            console.log(data);

        });
        return apiWeather;
}

//changement de la ville
function fetchSpecifyCity() {
    let city = " ";
    city = document.getElementById('city-input').value;
    city = null ? document.getElementById('city-input').value : start(city);

}

