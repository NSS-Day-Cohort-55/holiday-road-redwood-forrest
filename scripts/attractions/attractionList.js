
export const attractionList = (allAttractions) => {
    const attractionEl = document.querySelector(".attractionDropdownDiv")
    let attractionHTML = `<select class="attractionDD" name="attractionDD" id="attractionDropdown">
                            <option value="">-- Please select attraction --</option>`;

		for (const attractionObj of allAttractions) {

            attractionHTML += `<option value="${attractionObj.id}">${attractionObj.name}</option>`
		}
        attractionHTML += `</select>`
        attractionEl.innerHTML = attractionHTML
}