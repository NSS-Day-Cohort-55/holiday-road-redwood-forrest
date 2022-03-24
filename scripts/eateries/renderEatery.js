import * as renderHelpers from "../helpers/renderHelpers.js";
import { useEateries } from "./EateryDataManager.js";

export const renderEatery = (eateryId) => {
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
                        ${renderHelpers.getAllAmenities(eateryObj.ameneties)}
                    </ul>
                    <button id="eateryDialogCloseButton" class="button">Close</button>
                </dialog>
                <button type="button" id="eateryAmenitiesButton" class="button">Show Amenities</button>
            </div>
        </div>
        `
    }


    // Get data here
    let searchVar = useEateries().find(element => element.id === eateryId);
    let eateryElement = document.querySelector(".eatery");

    // Insert eatery info
    eateryElement.innerHTML = generateHTML(searchVar);

    let eateryDialogElement = document.getElementById("eateryDialog");
    
    // Event listener to show amenities
    document.getElementById("eateryAmenitiesButton").addEventListener("click", () => {
        eateryDialogElement.showModal();
    })
    // Event listener for amenities close button
    document.getElementById("eateryDialogCloseButton").addEventListener("click", () => {
        eateryDialogElement.close();
    })


    // // Hardcoded data for testing purposes
    // return fetch("http://holidayroad.nss.team/eateries")
    // .then( data => data.json() )
    // .then( dataJson => {
    // })
}