let states = [];

export const useStates = () => {
  return [...states]
}

export const loadStates = () => {
  return fetch("https://gist.githubusercontent.com/DakotaLambert/112f2a451ab34f18be1de2c8be8655ff/raw/7cebd30fc8f64bd818f2d3d60e054256e0b7b332/US_States.json")
    .then(response => response.json())
    .then((statesArray) => {
      states = statesArray.states;
      return states;
    })
};