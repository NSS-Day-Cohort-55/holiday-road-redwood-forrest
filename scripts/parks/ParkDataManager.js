let apiParks = [];

export const useParks = () => {
  return [...apiParks]
}

export const loadParks = (stateCode) => {
  return fetch(`https://developer.nps.gov/api/v1/parks?api_key=B4cW3plPKPMAhiuMqDV93NXIxaLH9eGkzeo8B8Bc&stateCode=${stateCode}`)
    .then(response => response.json())
    .then((parksArray) => {
      apiParks = parksArray
      return parksArray
    })
};