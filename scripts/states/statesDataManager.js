let states = [];

export const useStates = () => {
  return [...states]
}

export const loadStates = () => {
  return fetch("http://localhost:8088/states")
    .then(response => response.json())
    .then((statesArray) => {
      states = statesArray
      return states
    })
};