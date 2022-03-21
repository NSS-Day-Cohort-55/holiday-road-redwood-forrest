import { renderPark } from "./parks/renderParks.js";
import { renderWeather } from "./weather/renderWeather.js";


const lat = 36
const lon = -86
renderPark()
renderWeather()

const parkModal = document.querySelector(".park__modal")

document.addEventListener("click", event => {
    if (event.target.id === 'show_park_amenities') {
        parkModal.showModal()
    }
    if (event.target.id === 'close_park_amenities') {
        parkModal.close()
    }
})