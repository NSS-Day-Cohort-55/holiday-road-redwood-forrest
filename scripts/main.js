import { renderAttraction } from "./attractions/renderAttraction.js";
import { renderEatery } from "./eateries/renderEatery.js"
import { renderEventsModal, renderPark } from "./parks/renderParks.js";
import { renderWeather } from "./weather/renderWeather.js";
import { loadStates } from "./states/statesDataManager.js";
import { stateList } from "./states/stateList.js";
import { loadParks, getParkObj, getEvents } from "./parks/ParkDataManager.js";
import { parkList } from "./parks/parkList.js";
import { loadEateries, useEateries } from "./eateries/EateryDataManager.js";
import { eateryList } from "./eateries/eateryList.js";
import { loadAttractions, useAttractions } from "./attractions/AttractionDataManager.js";
import { attractionList } from "./attractions/attractionList.js"
import { createTrip } from "./trips/TripDataManager.js";
import { renderTrips } from "./trips/renderTrips.js"

let parkDDSel = false;
let eateryDDSel = false;
let attractionDDSel = false;
let saveTripBtn = document.getElementById("saveTripBtn")
import { renderFooter } from "./footer/renderFooter.js";

const header = document.querySelector(".dropdownHeader")

<<<<<<< HEAD
//event listener for state dropdown, once state has been selected, we add listener for parks
=======
// populate parks in the dropdown
>>>>>>> main
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

const enableButton = () => {
    if (parkDDSel === true &&
        eateryDDSel === true &&
        attractionDDSel === true) {
        saveTripBtn.disabled = false
        saveTripBtn.style.backgroundColor = "#744838";
        saveTripBtn.style.color = 'white';
    }
}
// event listener for enabling save trip button
document.addEventListener("change", (event) => {
    enableButton()
})

const buildTripObj = () => {
    //collect the input values into an object to save in the DB
    const parkDDEl = document.getElementById("parkDropdown")
    const parkName = parkDDEl.options[parkDDEl.selectedIndex].text;
    const parkCode = parkDDEl.options[parkDDEl.selectedIndex].value

    const eateryDDEl = document.getElementById("eateryDropdown")
    const eateryName = eateryDDEl.options[eateryDDEl.selectedIndex].text;

    const attDDEl = document.getElementById("attractionDropdown")
    const attName = attDDEl.options[attDDEl.selectedIndex].text;

    console.log(parkName, eateryName, attName);
    const tripObject = {
        park: parkName,
        parkCode: parkCode,
        eatery: eateryName,
        attraction: attName,
        timestamp: Date.now()
    }
    return tripObject
}

// event listener for save trip button click
saveTripBtn.addEventListener("click", (event) => {

    if (event.target.id === "saveTripBtn") {

        const newTrip = buildTripObj()
        createTrip(newTrip)
        renderTrips(newTrip)

        // disable the buton after saving each trip
        if (saveTripBtn.disabled === false) {
            saveTripBtn.disabled = true
            saveTripBtn.style.color = "black"
            saveTripBtn.style.backgroundColor = "lightgrey"
        }
    }
})

const startHolidayTrip = () => {
    saveTripBtn.disabled = true;

    loadStates().then(stateData => {
        stateList(stateData)
    })

    loadEateries().then(eateryData => {
        eateryList(eateryData);

        // Listener for eatery selection
        const eateryDropdown = document.querySelector("#eateryDropdown");
        eateryDropdown.addEventListener("change", (event) => {
            eateryDDSel = true;
            renderEatery(parseInt(event.target.value));
        })
    });

    loadAttractions().then(attractionData => {
        attractionList(attractionData)

        // Listener for attraction selection
        const attractionDropdown = document.querySelector("#attractionDropdown");
        attractionDropdown.addEventListener("change", (event) => {
            attractionDDSel = true;
            renderAttraction(parseInt(event.target.value));
        })
    });
}
startHolidayTrip()
renderFooter()

getEvents('abli')
    .then(events => renderEventsModal(events))
    .then(() => { })


//listener for park selection
document.addEventListener("change", event => {

    const parkDDEl = document.querySelector("#parkDropdown")
    if (event.target.id === "parkDropdown") {
        parkDDSel = true;
        const selectedPark = getParkObj(event.target.value)
        renderPark(selectedPark)

        //set up event listener for modal selection
        const parkModal = document.querySelector(".park__modal")

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
    }
})