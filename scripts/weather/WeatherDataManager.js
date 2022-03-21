import { settings } from "../Settings.js"

let weatherData

export const useWeather = () => {
    return {...weatherData}
}

export const getWeatherData = (lat, lon) => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${settings.weatherKey}`)
    .then(response => response.json())
    .then(weatherArray => {
        weatherData = weatherArray
        return weatherArray
    })
}