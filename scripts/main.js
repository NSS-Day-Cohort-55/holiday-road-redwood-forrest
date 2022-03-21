import { renderPark } from "./parks/renderParks.js";
import { renderWeather } from "./weather/renderWeather.js";
import { loadStates, useStates } from "./states/statesDataManager.js";
import { stateList } from "./states/stateList.js";
import { loadParks, useParks } from "./parks/ParkDataManager.js";
import { parkList } from "./parks/parkList.js";
import { loadEateries } from "./eateries/EateryDataManager.js";
import { eateryList } from "./eateries/eateryList.js";
import { loadAttractions } from "./attractions/AttractionDataManager.js";
import { attractionList } from "./attractions/attractionList.js"

const header = document.querySelector(".dropdownHeader")

header.addEventListener("change", event => {
    if (event.target.id === "stateDropdown") {
        loadParks(event.target.value).then(parkData => {
            console.log(parkData);
            parkList(parkData.data)
        });
    }   
})

const startHolidayTrip = () => {
    loadStates().then(stateData => {
        console.log(stateData);
        stateList(stateData)
    })
    
    loadEateries().then(eateryData => {
        console.log(eateryData);
        eateryList(eateryData)
    });
    
    loadAttractions().then(attractionData => {
        console.log(attractionData);
        attractionList(attractionData)
    
    });

}
startHolidayTrip()

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