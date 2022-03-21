
export const stateList = (allStates) => {
    const stateEl = document.querySelector(".stateDropdownDiv")
	let stateHTML = `<select name="stateDD" id="stateDropdown">`;
		for (const stateObj of allStates) {
			stateHTML += `<option value="${stateObj.abbreviation}">${stateObj.name}</option>`
		}
        stateHTML += `</select>`
        stateEl.innerHTML = stateHTML
}