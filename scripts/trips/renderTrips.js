import { createDirectionsModal } from "../directions/renderDirectionsModal.js"

export const renderTrips = (tripObj) => {
    const tripEl = document.querySelector(".tripInfo")
	let tripHTML = `<section class="savedTrip" id="trip--${tripObj.id}">
                        <h3>${tripObj.park}</h3>
                        <p>Eatery: ${tripObj.eatery}</p>
                        <p>Attraction: ${tripObj.attraction}</p>
                        <div class="tripButtons">
                            <button type="button" id="getDirections--${tripObj.id}"class="directionsBtn button">Get Directions</button>
                            <button type="button" id="getEvents--${tripObj.id}"class="eventsBtn button">Show Events</button>  
                        </div>
                    </section>`
    tripEl.insertAdjacentHTML('beforeend', tripHTML);

    let thisTripEl = tripEl.querySelector(`#trip--${tripObj.id}`);
    let buttonEl = thisTripEl.querySelector(`#getDirections--${tripObj.id}`);
    thisTripEl.querySelector(`#getDirections--${tripObj.id}`).addEventListener("click", () => {
        if (!thisTripEl.querySelector("dialog")) {
            createDirectionsModal(tripObj, thisTripEl)
            .then(() => {
                thisTripEl.querySelector("dialog").showModal();
            })
        } else {
            thisTripEl.querySelector("dialog").showModal();
        }
    })
}
