import { getWeatherData, useWeather } from "./WeatherDataManager.js"

export const renderWeather = (park) => {
    //select weather element
    const weatherEl = document.querySelector('.weather__container')

    //fetch weather data based on park latitude and longitude, then build weather section
    getWeatherData(34, -86)
    .then(() => weatherEl.innerHTML = buildWeather())
}

const buildWeather = () => {
    let htmlString = `
    <h3> 5 day forecast for ${useWeather().city.name}</h3>
    <ul class="weather__forecast">
    `
    //park data comes with a forecast every 3 hours for 5 days (40 entries), so we skip 8 indexes (24hrs) each loop
    for (let i = 0; i < 40; i += 8) {
        htmlString += `
            <ul class="weather__list">
                <li class="weather__info">High: ${useWeather().list[i].main.temp_max}&deg;F</li>
                <li class="weather__info">Low: ${useWeather().list[i].main.temp_min}&deg;F</li>
                <li class="weather__info">Feels-like: ${useWeather().list[i].main.feels_like}&degF</li>
                <li class="weather__info">Forecast: ${useWeather().list[i].weather[0].description}</li>
                <br>
                <li class="weather__info">Date: ${useWeather().list[i].dt_txt.split(" ")[0]}</li>
            </ul>        
        `
    }
    htmlString += "</ul>"
    
    return htmlString
}