import { renderAttraction } from "./attractions/renderAttraction.js";
import { renderEatery } from "./eateries/renderEatery.js"
import { renderPark } from "./parks/renderParks.js";
import { renderEventsModal } from "./parks/parkEvents.js";
import { loadStates } from "./states/statesDataManager.js";
import { stateList } from "./states/stateList.js";
import { loadParks, getParkObj, getEvents, searchParks } from "./parks/ParkDataManager.js";
import { parkList } from "./parks/parkList.js";
import { loadEateries, useEateries, searchEateries } from "./eateries/EateryDataManager.js";
import { eateryList } from "./eateries/eateryList.js";
import { loadAttractions, useAttractions, searchAttractions } from "./attractions/AttractionDataManager.js";
import { attractionList } from "./attractions/attractionList.js"
import { createTrip, getTrips, useTrips } from "./trips/TripDataManager.js";
import { renderTrips } from "./trips/renderTrips.js"
import { renderFooter } from "./footer/renderFooter.js";

//state variables for DD selections
let parkDDSel = false;
let eateryDDSel = false;
let attractionDDSel = false;

const saveTripBtn = document.getElementById("saveTripBtn")
const header = document.querySelector(".dropdownHeader")

//event listener for state dropdown
header.addEventListener("change", event => {
    if (event.target.id === "stateDropdown") {
        loadParks(event.target.value).then(parkData => {
            parkList(parkData.data)

        })
    }
})

//listener for park selection
document.addEventListener("change", event => {

    if (event.target.id === "parkDropdown") {
        parkDDSel = true;

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
            return event
        })
    }
})

//listener for show park events buttons
document.addEventListener("click", event => {
    if (event.target.id.split("--")[0] === "getEvents") {
        let foundTrip = useTrips().filter(element => element.id === parseInt(event.target.id.split("--")[1]))
        getEvents(foundTrip[0].parkCode)
            .then(events => {
                renderEventsModal(events)
            })
        document.querySelector(".parkEventsModal").showModal()
    }
    if (event.target.id === 'closeParkEvents') {
        document.querySelector(".parkEventsModal").close()
    }
})

//logic for when saveTrip is active
const enableButton = () => {
    if (parkDDSel === true &&
        eateryDDSel === true &&
        attractionDDSel === true) {
        saveTripBtn.disabled = false
        saveTripBtn.style.backgroundColor = "#DFA408";
        saveTripBtn.style.color = 'black';
    }
}

// event listener for enabling save trip button
document.addEventListener("change", (event) => {
    enableButton()
})

//once the save trip button is clicked the trip object is built
const buildTripObj = () => {
    //collect the input values into an object to save in the DB
    const parkDDEl = document.getElementById("parkDropdown")
    const parkName = parkDDEl.options[parkDDEl.selectedIndex].text;
    const parkCode = parkDDEl.options[parkDDEl.selectedIndex].value

    const eateryDDEl = document.getElementById("eateryDropdown")
    const eateryName = eateryDDEl.options[eateryDDEl.selectedIndex].text;

    const attDDEl = document.getElementById("attractionDropdown")
    const attName = attDDEl.options[attDDEl.selectedIndex].text;

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
            .then(response => renderTrips(response))

        // disable the button after saving each trip
        if (saveTripBtn.disabled === false) {
            saveTripBtn.disabled = true
            saveTripBtn.style.color = "black"
            saveTripBtn.style.backgroundColor = "lightgrey"
        }

        //reset the website state after click
        resetTrip()
    }
})

const resetTrip = () => {
    const stateDD = document.querySelector(".stateDD")
    const eateryDD = document.querySelector(".eateryDD")
    const attractionDD = document.querySelector(".attractionDD")
    const parkDiv = document.querySelector(".parkDropdownDiv")
    const tripPreview = document.querySelector(".mainPreview")

    //reset dropdowns to top selection
    for (let dropdown of [stateDD, eateryDD, attractionDD]) {
        dropdown.selectedIndex = 0
    }
    //remove parkselection, since state is no longer selected
    parkDiv.innerHTML = ''

    //reset trip preview section
    tripPreview.innerHTML = `
            <section class="park">
            
                <!-- park info here -->
            
                <section class="weather__container">
                    <!-- weather data goes here -->
                </section> 
            
            </section>
        
            <div class="eatery"></div> 
            <div class="attraction"></div>
    `
    // reset selection states
    parkDDSel = false;
    eateryDDSel = false;
    attractionDDSel = false;
}

// search the input string in parks, eateries and attractions API
document.querySelector("#searchInput").addEventListener("keypress", keyPressEvent => {
    if (keyPressEvent.charCode === 13) {

        // Render the search result in a dialog box
        let searchHTML = '<dialog class="search__modal"><h2>Look what we found</h2>';

        const promisePark = new Promise((resolve, reject) => {
            resolve(searchParks(keyPressEvent.target.value)
            .then(foundParks => {
                if (foundParks && foundParks.data.length !== 0) {
                    const foundPark = foundParks.data.find(fp => {
                        // return fp.fullName.includes(keyPressEvent.target.value)
                        return fp.fullName === keyPressEvent.target.value
                    })
                    if (foundPark) {
                        searchHTML += `<p>Park: ${foundPark.fullName}</p>
                                         <p style="width: 400px;">Description: ${foundPark.description}</p>
                                         <ul>Activities: 
                                            <li>${foundPark.activities[0].name}</li>
                                            <li>${foundPark.activities[1].name}</li>
                                         </ul>
                                         <br>
                                        `; 
                    }    
                }
                return foundParks        
            }))
        });

        const promiseEatery = new Promise((resolve, reject) => {
            resolve(searchEateries(keyPressEvent.target.value)
            .then(foundEatery => {
                if (foundEatery.length !== 0) {
                    searchHTML += `<p>Eatery: ${foundEatery[0].businessName}</p>
                                    <p>${foundEatery[0].city}, ${foundEatery[0].state}</p>
                                    <p style="width: 400px;">${foundEatery[0].description}</p>
                                    `;
                } 
                return foundEatery   
            })
        )})

        const promiseAtt = new Promise((resolve, reject) => {
            resolve(searchAttractions(keyPressEvent.target.value)
            .then(foundAtt => {     
                if (foundAtt.length !== 0) {
                    searchHTML += `<p>Attraction: ${foundAtt[0].name}</p>
                                    <p>${foundAtt[0].city}, ${foundAtt[0].state}</p>
                                    <p style="width: 400px;">${foundAtt[0].description}</p>
                                    `;
                }
                return foundAtt
            })
        )})

        Promise.all([promisePark, promiseEatery, promiseAtt]).then(results => {
            promisePark.then(value1 => {
                promiseEatery.then(value2 => {
                    promiseAtt.then(value3 => {
                        searchHTML += '<button class="button button--close" id="close_search_results">Close</button></dialog>';
                        document.getElementById('searchResults').innerHTML = searchHTML;
                            document.querySelector(".search__modal").showModal()

                        document.getElementById("close_search_results").addEventListener("click", event => {
                            document.querySelector(".search__modal").close()
                        });
                    })
                })
            });
        })
    }
});

//app startup
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
    //populate trips in the aside
    getTrips()
        .then(response => response.forEach(trip => renderTrips(trip)))
    //build footer
    renderFooter()
}
startHolidayTrip()