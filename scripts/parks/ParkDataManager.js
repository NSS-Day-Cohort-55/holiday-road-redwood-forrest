import {settings} from "../Settings.js"

let apiParks;

export const useParks = () => {
  return {...apiParks}
}

export const loadParks = (stateCode) => {
  return fetch(`https://developer.nps.gov/api/v1/parks?api_key=${settings.npsKey}&stateCode=${stateCode}`)
    .then(response => response.json())
    .then((parksArray) => {
      apiParks = parksArray
      return parksArray
    })
};

//return parkobj from park dataset using parkID
export const getParkObj = (parkID) => {
  return useParks().data.find(element => element.parkCode === parkID)
}

//api call to fetch the upcoming events list given a specific 4-letter park code
export const getEvents = (parkCode) => {
  return fetch(`https://developer.nps.gov/api/v1/events?api_key=${settings.npsKey}&parkCode=${parkCode}&pageSize=2`)
    .then(response => response.json())
    .then(eventsArray => eventsArray)
}

export const searchParks = (userInput) => {
  return fetch(`https://developer.nps.gov/api/v1/parks?api_key=${settings.npsKey}&q=${userInput}`)
    .then(response => response.json())
    .then(dataFound => {return dataFound})
}