
export const createTrip = tripObj => {
    return fetch("http://localhost:8088/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tripObj)
  
    })
        .then(response => response.json())
}