import { renderAttraction } from "./attractions/renderAttraction.js";
import { renderEatery } from "./eateries/renderEatery.js"
import { renderPark } from "./parks/renderParks.js";
import { renderWeather } from "./weather/renderWeather.js";
import { loadStates, useStates } from "./states/statesDataManager.js";
import { stateList } from "./states/stateList.js";
import { loadParks, useParks, getParkObj } from "./parks/ParkDataManager.js";
import { parkList } from "./parks/parkList.js";
import { loadEateries } from "./eateries/EateryDataManager.js";
import { eateryList } from "./eateries/eateryList.js";
import { loadAttractions } from "./attractions/AttractionDataManager.js";
import { attractionList } from "./attractions/attractionList.js"

const header = document.querySelector(".dropdownHeader")

header.addEventListener("change", event => {
    if (event.target.id === "stateDropdown") {
        loadParks(event.target.value).then(parkData => {
            // console.log(parkData);
            parkList(parkData.data)

            //listener for park selection
            document.addEventListener("change", event => {
            
                const parkDDEl = document.querySelector("#parkDropdown")
                if (event.target.id === "parkDropdown") {
                    const selectedPark = getParkObj(event.target.value)
                    renderPark(selectedPark)
                    
                    //set up event listener for modal selection
                    const parkModal = document.querySelector(".park__modal")
                    
                    document.addEventListener("click", event => {
                        if (event.target.id === 'show_park_amenities') {
                            parkModal.showModal()
                        }
                        if (event.target.id === 'close_park_amenities') {
                            parkModal.close()
                        }
                    })
                }
            })
        })
    }   
})

const startHolidayTrip = () => {
    loadStates().then(stateData => {
        // console.log(stateData);
        stateList(stateData)
    })

    loadEateries().then(eateryData => {
        // console.log(eateryData);
        eateryList(eateryData);
        // Listener for eatery selection
        const eateryDropdown = document.querySelector("#eateryDropdown");
        eateryDropdown.addEventListener("change", (event) => {
            renderEatery(parseInt(event.target.value));
        })
    });

    loadAttractions().then(attractionData => {
        // console.log(attractionData);
        attractionList(attractionData)

        // Listener for attraction selection
        const attractionDropdown = document.querySelector("#attractionDropdown");
        attractionDropdown.addEventListener("change", (event) => {
            renderAttraction(parseInt(event.target.value));
        })
    });

}
startHolidayTrip()
