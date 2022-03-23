import { renderWeather } from "../weather/renderWeather.js"

export const renderPark = (park) => {
    //select park element
    const parkEl = document.querySelector('.park')

    //build park section
    parkEl.innerHTML = buildPark(park)
    //renderWeather once park is complete
    renderWeather(park)
}

//build park section based on selected park
const buildPark = (park) => {
    let htmlString = `
    <h2>${park.fullName}</h2>
    <p>${park.description}</p>
    <p>${park.addresses[0].city}, ${park.addresses[0].stateCode}</p>
    <button id="show_park_amenities">Show Activities</button>
    <dialog class="park__modal">
        <ul>
            ${buildActivities(park)}
            <button class="button button--close" id="close_park_amenities">Close</button>
        </ul>
    </dialog>
    <section class="weather__container">
        <!-- weather data goes here -->
    </section> 
    `
    return htmlString
}

//helper function to build park activities modal
const buildActivities = (park) => {
    let activityString = ""
    park.activities.forEach(activity => activityString += `<li>${activity.name}</li>`)
    return activityString
}

//renders the events modal when show events button is clicked
export const renderEventsModal = (events) => {
    document.querySelector(".parkEventsModal").innerHTML = buildEventsModal(events)
}

//builds html string to return to renderEventsModal
const buildEventsModal = (events) => {
    return `
        ${buildEventsList(events)}
        <button class="button button--close" id="closeParkEvents">Close</button>
    `
}

//called in buildEventsModal, it loops through each event, builds an html string, and returns the string to buildEventsList
const buildEventsList = (events) => {
    let htmlString = ''
    events.data.forEach(event => {
        htmlString += `
            <ul><h4>${event.title}</h4>
                <li>Start Date: ${event.datestart}</li>
                <li>End Date: ${event.dateend}</li>
                <li>${event.description}</li>
                <li>Fee: ${event.feeinfo}</li>
            </ul>
        `
    })    
    return htmlString
}