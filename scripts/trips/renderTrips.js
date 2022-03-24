export const renderTrips = (tripObj) => {
    const tripEl = document.querySelector(".tripInfo")
	let tripHTML = `<section class="savedTrip">
                        <h3>${tripObj.park}</h3>
                        <p>Eatery: ${tripObj.eatery}</p>
                        <p>Attraction: ${tripObj.attraction}</p>
                        <div class="tripButtons">
                            <button type="button" id="getDirections--${tripObj.id}"class="directionsBtn button">Get Directions</button>
                            <button type="button" id="getEvents--${tripObj.id}"class="eventsBtn button">Show Events</button>  
                        </div>
                    </section>`
    tripEl.innerHTML += tripHTML
}
