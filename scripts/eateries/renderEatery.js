import * as renderHelpers from "../helpers/renderHelpers.js";

export const renderEatery = (eateryName) => {
    // HTML Generator Helper Function
    const generateHTML = (eateryObj) => {
        return `
        <div class="info__container eatery">
            <div class="info__banner">
                <h1>${eateryObj.businessName}<h1>
            </div>
            <div class="info__text">
                <p>${eateryObj.description}</p>
                <p>${eateryObj.city}, ${eateryObj.state}</p>
                <dialog id="eateryDialog">
                    <h2>Amenities</h2>
                    <ul>
                        ${renderHelpers.getAllAmenties(eateryObj.ameneties)}
                    </ul>
                    <button id="eateryDialogCloseButton">Close</button>
                </dialog>
                <button type="button" id="eateryAmenitiesButton">Show Amenities</button>
            </div>
        </div>
        `
    }


    // Get data here

    // Hardcoded data for testing purposes
    return fetch("http://holidayroad.nss.team/eateries")
    .then( data => data.json() )
    .then( dataJson => {
        let searchVar = dataJson.find(element => element.businessName === eateryName);
        // Maybe see if there is already eatery html generated in DOM?
        // Insert Eatery html into the DOM
        document.querySelector("body").insertAdjacentHTML('beforeend', generateHTML(searchVar));

        let eateryDialogElement = document.getElementById("eateryDialog");
        
        // Event listener to show amenities
        document.getElementById("eateryAmenitiesButton").addEventListener("click", () => {
            eateryDialogElement.showModal();
        })
        // Event listener for amenities close button
        document.getElementById("eateryDialogCloseButton").addEventListener("click", () => {
            eateryDialogElement.close();
        })
    })
}