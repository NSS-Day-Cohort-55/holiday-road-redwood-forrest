let apiAttractions = [];

export const useAttractions = () => {
  return [...apiAttractions]
}

export const loadAttractions = () => {
return fetch(`http://holidayroad.nss.team/bizarreries`)
    .then(response => response.json())
    .then((attractionArray) => {
      apiAttractions = attractionArray
      return attractionArray
    })
};

export const searchAttractions = (userInput) => {
  return fetch(`http://holidayroad.nss.team/bizarreries?q=${userInput}`)
    .then(response => response.json())
    .then(dataFound => {return dataFound})
}