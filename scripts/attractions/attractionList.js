
export const attractionList = (allAttractions) => {
    const attractionEl = document.querySelector(".attractionDropdownDiv")
	let attractionHTML = `<select name="attractionDD" id="attractionDropdown">`;
		for (const attractionObj of allAttractions) {

            attractionHTML += `<option value="${attractionObj.id}">${attractionObj.name}</option>`
		}
        attractionHTML += `</select>`
        attractionEl.innerHTML = attractionHTML
}