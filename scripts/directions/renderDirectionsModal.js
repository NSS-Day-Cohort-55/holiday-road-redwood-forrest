// Get api keys
import { settings } from "../Settings.js";
import { loadEateries, useEateries } from "../eateries/EateryDataManager.js";
import { loadAttractions, useAttractions } from "../attractions/AttractionDataManager.js";


export const createDirectionsModal = (tripObj, tripEl) => {
    // This entire block of code is for converting trip locations into lat/long values and then getting directions.
    // This function calls the grasshopper api to generate directions list.
    // This function also handles creating and displaying one saved trip "directions" modal.
    // This function will be called when user clicks "Show Directions" button in the trips aside.
    // Trip will always start at Nashville.

    // Create lat/lon array
    let tripCoordinates = [];


    // Helper function for generating location lat/lon and adding to tripCoordinates.
    // Only works with eateries and attractions.
    const getLatLon = (queryString) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        return fetch(`https://graphhopper.com/api/1/geocode?q=${queryString}&debug=true&key=${settings.graphhopperKey}&limit=1`, requestOptions)
            .then(response => response.json())
            .then(json => {
                tripCoordinates.push([json.hits[0].point.lat, json.hits[0].point.lng]);
                return json;
            })
            .catch(error => console.log('error', error));
    }

    // This one should be the first element in tripCoordinates
    const getTripStartLatLon = (cityStateString) => {
        return getLatLon(cityStateString);
    }


    // Get park lat/lon
    // DO THIS ONE LAST
    const parkLatLon = () => {
        return fetch(`https://developer.nps.gov/api/v1/parks?api_key=${settings.npsKey}&parkCode=${tripObj.parkCode}`)
            .then(data => data.json())
            .then(json => {
                tripCoordinates.push([Number(json.data[0].latitude), Number(json.data[0].longitude)])
                return json;
            })
    }

    // Geocode eatery location to create lat/lon values
    const eateryLatLon = () => {
        return loadEateries()
            .then(data => {
                let foundEatery = useEateries().find(element => { return element.businessName === tripObj.eatery });
                let eateryQueryString = `${foundEatery.city}, ${foundEatery.state}`;
                return getLatLon(eateryQueryString);
            })
    }

    // Geocode attraction location to create lat/lon values
    const attractionLatLon = () => {
        return loadAttractions()
            .then(() => {
                let foundAttraction = useAttractions().find(element => { return element.name === tripObj.attraction });
                let attractionQueryString = `${foundAttraction.city}, ${foundAttraction.state}`;
                return getLatLon(attractionQueryString);
            })
    }

    const getDirections = (coordsArray) => {
        let coordsString = ``;
        for (let coord of coordsArray){
            coordsString += `point=${coord.join()}&`
        }

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        function parseJSON(response) {
            return new Promise((resolve) => response.json()
            .then((json) => resolve({
                status: response.status,
                ok: response.ok,
                json
            })));
        }

        return new Promise((resolve, reject) => {
            fetch(`https://graphhopper.com/api/1/route?${coordsString}profile=car&locale=en&key=${settings.graphhopperKey}`, requestOptions)
                .then(parseJSON)
                .then((response) => {
                    if (response.ok){
                        return resolve(response.json);
                    }
                    return reject({type: "graphhopper", message: response.json.message});
                })
                //.catch(error => console.log('error', error));
        })
    }

    const createModal = (directionsArray, coordsArray) => {
        return fetch("/scripts/directions/directionsModal.html")
        .then(response => response.text())
        .then(modalHTMLString => {
            let HTMLString = ``;
            let coordsGoogleString = `https://www.google.com/maps/dir/`;
            tripEl.insertAdjacentHTML('beforeend', modalHTMLString);
            // tripEl is passed in at the createDirectionsModal call
            let modalBodyEl = tripEl.querySelector(".modal__body");

            for (let i of directionsArray){
                HTMLString += `
                <p>${i.text}</p>
                `
            }
            for (let i of coordsArray){
                coordsGoogleString += `${i.join()}/`;
            }
            HTMLString += `<a target="_blank" href=${coordsGoogleString}>See another route on Google Maps</a>`;
            modalBodyEl.insertAdjacentHTML('afterbegin', HTMLString)

            tripEl.querySelector("dialog > button").addEventListener("click", () => {
                tripEl.querySelector("dialog").close();
            })
        })
    }


    // Start Location lat/lon added to array
    return getTripStartLatLon("Nashville, TN")
        // Eateries and Attractions lat/lon added to array
        .then(() => {return Promise.all([eateryLatLon(), attractionLatLon()])} )
        // Park Destination lat/lon added to array
        .then(() => parkLatLon())
        // Call graphhopper directions api with values from lat/lon array
        .then(() => getDirections(tripCoordinates))
        // Generate and populate modal
        .then((response) => { return createModal(response.paths[0].instructions, tripCoordinates);} )
        .catch (error => {
            console.log(error.message);
            if (error.type === "graphhopper")
                return createModal([{text: "No directions available"}], tripCoordinates)
        })
}