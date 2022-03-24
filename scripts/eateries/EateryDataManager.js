let apiEateries = [];

export const useEateries = () => {
  return [...apiEateries]
}

export const loadEateries = () => {
return fetch(`http://holidayroad.nss.team/eateries`)
    .then(response => response.json())
    .then((eateryArray) => {
      apiEateries = eateryArray
      return eateryArray
    })
};

export const searchEateries = (userInput) => {
  return fetch(`http://holidayroad.nss.team/eateries?q=${userInput}`)
    .then(response => response.json())
    .then(dataFound => {return dataFound})
}