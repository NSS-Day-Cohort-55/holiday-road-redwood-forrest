import * as renderHelpers from "../helpers/renderHelpers.js";

export const renderAttraction = (attractionName) => {
    // HTML Generator Helper Function
    const generateHTML = (attractionObj) => {
        return `
        <div class="info__container attraction">
            <div class="info__banner">
                <h1>${attractionObj.name}<h1>
            </div>
            <div class="info__text">
                <p>${attractionObj.description}</p>
                <p>${attractionObj.city}, ${attractionObj.state}</p>
                <dialog id="attractionsDialog">
                    <h2>Amenities</h2>
                    <ul>
                        ${renderHelpers.getAllAmenties(attractionObj.ameneties)}
                    </ul>
                    <button id="attractionsDialogCloseButton">Close</button>
                </dialog>
                <button type="button" id="attractionsAmenitiesButton">Show Amenities</button>
            </div>
        </div>
        `
    }


    // Get data here

    // Hardcoded data for testing purposes
    return fetch("http://holidayroad.nss.team/bizarreries")
    .then( data => data.json() )
    .then( dataJson => {
        let searchVar = dataJson.find(element => element.name === attractionName);
        // Maybe see if there is already one generated here?
        // Insert attraction html into DOM
        document.querySelector("body").insertAdjacentHTML('beforeend', generateHTML(searchVar));

        let attractionsDialogElement = document.getElementById("attractionsDialog");

        // Setup event listener to show modal on click
        document.getElementById("attractionsAmenitiesButton").addEventListener("click", () => {
            attractionsDialogElement.showModal();
        })

        // Setup event lister to close modal
        document.getElementById("attractionsDialogCloseButton").addEventListener("click", () => {
            attractionsDialogElement.close();
        })
    })
}