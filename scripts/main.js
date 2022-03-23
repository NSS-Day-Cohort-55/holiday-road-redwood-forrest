import { renderAttraction } from "./attractions/renderAttraction.js";
import { renderEatery } from "./eateries/renderEatery.js"
import { renderEventsModal, renderPark } from "./parks/renderParks.js";
import { renderWeather } from "./weather/renderWeather.js";
import { loadStates } from "./states/statesDataManager.js";
import { stateList } from "./states/stateList.js";
import { loadParks, getParkObj, getEvents } from "./parks/ParkDataManager.js";
import { parkList } from "./parks/parkList.js";
import { loadEateries } from "./eateries/EateryDataManager.js";
import { eateryList } from "./eateries/eateryList.js";
import { loadAttractions } from "./attractions/AttractionDataManager.js";
import { attractionList } from "./attractions/attractionList.js"

const header = document.querySelector(".dropdownHeader")

//event listener for state dropdown, once state has been selected, we add listener for parks
header.addEventListener("change", event => {
    if (event.target.id === "stateDropdown") {
        loadParks(event.target.value).then(parkData => {
            // console.log(parkData);
            parkList(parkData.data)

            //listener for park selection
            document.addEventListener("change", event => {

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


getEvents('abli')
    .then(events => renderEventsModal(events))
    .then(() => {
        document.addEventListener("click", event => {
            if (event.target.id === 'getEvents') {
                document.querySelector(".parkEventsModal").showModal()
            }

            document.addEventListener("click", event => {
                if (event.target.id === "closeParkEvents") {
                    document.querySelector(".parkEventsModal").close()
                }
            })
            return event
        })
    })