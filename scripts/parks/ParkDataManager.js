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
  return useParks().data.find(element => element.id === parkID)
}