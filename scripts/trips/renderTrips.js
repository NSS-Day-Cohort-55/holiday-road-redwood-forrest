import { renderDirectionsModal } from "../directions/renderDirectionsModal.js"

export const renderTrips = (tripObj) => {
    const tripEl = document.querySelector(".tripInfo")
	let tripHTML = `<section class="savedTrip">
                        <h3>${tripObj.park}</h3>
                        <p>Eatery: ${tripObj.eatery}</p>
                        <p>Attraction: ${tripObj.attraction}</p>
                        <div class="tripButtons">
                            <button type="button" class="directionsBtn">Get Directions</button>
                            <button type="button" class="eventsBtn">Show Events</button>  
                        </div>
                    </section>`
    tripEl.innerHTML += tripHTML

    tripEl.querySelector(".savedTrip > .tripButtons > .directionsBtn").addEventListener("click", () => {
        renderDirectionsModal(tripObj)
    })
}