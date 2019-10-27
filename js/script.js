
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
    apiWeather
        .fetchThreeDayForecast()
        .then(function (response) {
            const data = response.data;
            let tempo;
            let maintwo = document.getElementsByClassName("tomorrow-forecast-main");
            let descriptiontwo = document.getElementsByClassName("tomorrow-forecast-more-info");
            let icontwo = document.getElementsByClassName("tomorrow-icon-weather-container");
            let temptwo = document.getElementsByClassName("tomorrow-forecast-temp");

            for(let i=0;i<=3;i++){
                tempo = data.list[i+1].temp.day;
                maintwo[i].innerHTML = data.list[i+1].weather[0].main;
                temptwo[i].innerHTML = `${tempo}°C`;
                icontwo[i].innerHTML = apiWeather.getHTMLElementFromIcon(data.list[i+1].weather[0].icon);
                descriptiontwo[i].innerHTML = data.list[i+1].weather[0].description;
            }
        })
        .catch(function(error){
          console.log(error);
        })       
}

//changement de la ville
function fetchSpecifyCity() {
    let city = " ";
    city = document.getElementById('city-input').value;
    city = null ? document.getElementById('city-input').value : start(city);

}

