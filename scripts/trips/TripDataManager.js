let savedTrips = [];

// Get trips function
export const getTrips = () => {
    return [...savedTrips];
}

export const loadTrips = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var raw = "";

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch("http://localhost:8088/trips", requestOptions)
        .then(response => response.json())
        .then(result => {
            savedTrips = result;
            return result;
        })
        .catch(error => console.log('error', error));
}

export const createTrip = tripObj => {
    return fetch("http://localhost:8088/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tripObj)

    })
        .then(response => response.json())
        .then(parsedResponse => {
            trips.push(parsedResponse)
            return parsedResponse
        })
}