const apiKey = "8f27ae47e19977bcecf34477136ec6a5";
const weatherDataEl = document.getElementById("weather-data");
const cityInpuEl = document.getElementById("city-input");
const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    const cityValue = cityInpuEl.value;
    getWeatherData(cityValue)
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
         

    if(!response.ok){
        throw new Error("Network response was not ok")
    }
    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details =[
        `Feels like: ${Math.round(data.main.feels_like)}°C`,
        `Humidity: ${data.main.humidity} %`,
        `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherDataEl.querySelector(".temparature").textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details.map((details)=> `<div>${details}</div>`).join("");
    

    } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = ""
    weatherDataEl.querySelector(".temparature").textContent = ""
    weatherDataEl.querySelector(".description").textContent ="An error happened, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = ""
    
    }
};