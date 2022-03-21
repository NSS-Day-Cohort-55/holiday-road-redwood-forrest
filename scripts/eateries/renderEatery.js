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
                <button type="button">Show Amenities</button>
            </div>
        </div>
        `
    }


    // Get data here

    // Hardcoded data for testing purposes
    fetch("http://holidayroad.nss.team/eateries")
    .then( data => data.json() )
    .then( dataJson => {
        let searchVar = dataJson.find(element => element.businessName === eateryName);

        // Maybe see if there is already one generated here?


        document.querySelector("body").insertAdjacentHTML('beforeend', generateHTML(searchVar));
    })
}