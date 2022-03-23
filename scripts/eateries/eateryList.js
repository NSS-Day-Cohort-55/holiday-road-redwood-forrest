
export const eateryList = (allEateries) => {
    const eateryEl = document.querySelector(".eateryDropdownDiv")
	let eateryHTML = `<select name="eateryDD" id="eateryDropdown">
						<option value="">-- Please select eatery --</option>`;

		for (const eateryObj of allEateries) {
			eateryHTML += `<option value="${eateryObj.id}">${eateryObj.businessName}</option>`
		}
        eateryHTML += `</select>`
        eateryEl.innerHTML = eateryHTML
}