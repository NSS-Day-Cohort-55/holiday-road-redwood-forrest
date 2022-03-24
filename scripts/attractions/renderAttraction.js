import * as renderHelpers from "../helpers/renderHelpers.js";
import { useAttractions } from "./AttractionDataManager.js";

export const renderAttraction = (attractionId) => {
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
                        ${renderHelpers.getAllAmenities(attractionObj.ameneties)}
                    </ul>
                    <button id="attractionsDialogCloseButton" class="button">Close</button>
                </dialog>
                <button type="button" id="attractionsAmenitiesButton" class="button button--light">Show Amenities</button>
            </div>
        </div>
        `
    }


    // Get data here
    let searchVar = useAttractions().find(element => element.id === attractionId);
    let attractionElement = document.querySelector(".attraction");
   
    // Insert attraction html at target element
    attractionElement.innerHTML = generateHTML(searchVar);

    let attractionsDialogElement = document.getElementById("attractionsDialog");

    // Setup event listener to show modal on click
    document.getElementById("attractionsAmenitiesButton").addEventListener("click", () => {
        attractionsDialogElement.showModal();
    })

    // Setup event lister to close modal
    document.getElementById("attractionsDialogCloseButton").addEventListener("click", () => {
        attractionsDialogElement.close();

    })
}