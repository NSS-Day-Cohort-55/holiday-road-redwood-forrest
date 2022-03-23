// Get api keys
import { settings } from "../Settings.js";
import { loadEateries, useEateries } from "../eateries/EateryDataManager.js";
import { loadAttractions, useAttractions } from "../attractions/AttractionDataManager.js";


export const renderDirectionsModal = (tripObj) => {
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

    // Get park lat/lon
    // DO THIS ONE LAST
    const parkLatLon = () => {
        return fetch(`https://developer.nps.gov/api/v1/parks?api_key=${settings.npsKey}&parkCode=${tripObj.parkCode}`)
            .then(data => data.json())
            .then(json => {
                tripCoordinates.push([json.latitude, json.longitude])
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

    Promise.all([eateryLatLon(), attractionLatLon()])
        .then(values => {
            console.log(values);
            console.log(tripCoordinates);
        })
    console.log(tripCoordinates[0]);
    // Call graphhopper api with values from lat/lon array

    // Generate and populate Modal

    // Show Modal
}