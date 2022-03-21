import { renderWeather } from "../weather/renderWeather"

export const renderPark = (park) => {
    //select park element
    const parkEl = document.querySelector('.park')

    //build park section
    parkEl.innerHTML = buildPark(park)
    //renderWeather once park is complete
    renderWeather(park)
}

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

const buildActivities = (park) => {
    let activityString = ""
    park.forEach(activity => activityString += `<li>${activity.name}</li>`)
    return activityString
}