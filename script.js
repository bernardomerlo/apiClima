const apiKey = "668e203b7441815d36bcd22a027d53c4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const units = "metric"; // Pode ser 'imperial' para Fahrenheit

function buscarPrevisaoTempo() {
    const city = document.getElementById("nome").value;
    const url = `${apiUrl}?q=${city}&units=${units}&lang=pt&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weather-info").style.display = "block";
            displayWeather(data);
        })
        .catch(error => {
            console.error("Erro ao obter dados da API", error);
        });
}

function displayWeather(data) {
    const weatherInfoElement = document.getElementById("weather-info");

    const cityName = data.name;
    const stateName = data.sys && data.sys.state ? data.sys.state : "";  
    const temperature = data.main.temp.toFixed(1);
    const feelsLike = data.main.feels_like.toFixed(1);
    const minTemperature = data.main.temp_min.toFixed(1);
    const maxTemperature = data.main.temp_max.toFixed(1);
    const clouds = data.clouds.all;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;

    const weatherHTML = `
        <p>Cidade: ${cityName} - ${stateName}</p>
        <p>Temperatura: ${temperature} °C</p>
        <p>Sensação: ${feelsLike} °C</p>
        <p>Temperatura Mínima: ${minTemperature} °C</p>
        <p>Temperatura Máxima: ${maxTemperature} °C</p>
        <p>Nebulosidade: ${clouds}% </p>
        <p>Umidade: ${humidity}%</p>
        <p>Velocidade do Vento: ${windSpeed} m/s</p>
        <p>Descrição: ${weatherDescription}</p>
    `;

    weatherInfoElement.innerHTML = weatherHTML;
}
