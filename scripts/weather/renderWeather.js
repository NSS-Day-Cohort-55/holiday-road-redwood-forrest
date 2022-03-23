import { getWeatherData, useWeather } from "./WeatherDataManager.js"

export const renderWeather = (park) => {
    //select weather element
    const weatherEl = document.querySelector('.weather__container')

    //fetch weather data based on park latitude and longitude, then build weather section
    getWeatherData(park.latitude, park.longitude)
    .then(() => weatherEl.innerHTML = buildWeather())
}

const buildWeather = () => {
    return `
    <h3> 5 day forecast for ${useWeather().city.name}</h3>
    <ul class="weather__forecast">
    ${weatherStats()}
    </ul>
    `
}

const weatherStats = () => {
    let htmlString = ''
    //park data comes with a forecast every 3 hours for 5 days (40 entries), so we skip 8 indexes (24hrs) each loop
    for (let i = 0; i < 40; i += 8) {
        let high = -999999
        let low = 9999999
        let feelsLike = 0

        //in order to calculate the average feels-like, high, and low temperatures, we loop through each day's worth 
        //of weather data and find highest high, lowest low, and running tally of feelsLike (to get average after looping)
        for (let j = i; j < i + 8; j++) {
            if (useWeather().list[j].main.temp_max > high) {
                high = useWeather().list[j].main.temp_max
            }
            if (useWeather().list[j].main.temp_min < low){
                low = useWeather().list[j].main.temp_min
            }
            feelsLike += useWeather().list[j].main.feels_like
        }
        //divide by 8 (24 hours) to get feelsLike average
        feelsLike /= 8
        htmlString += `
            <ul class="weather__list">
                <li class="weather__info">High: ${high}&deg;F</li>
                <li class="weather__info">Low: ${low}&deg;F</li>
                <li class="weather__info">Feels-like: ${feelsLike.toFixed(2)}&deg;F</li>
                <li class="weather__info">Forecast: ${useWeather().list[i].weather[0].description}</li>
                <br>
                <li class="weather__info">Date: ${useWeather().list[i].dt_txt.split(" ")[0]}</li>
            </ul>        
        `
    }
    return htmlString
}