export const parkList = (allParks) => {
    const parkEl = document.querySelector(".parkDropdownDiv")
	let parkHTML = `<select name="parkDD" id="parkDropdown">`;
		for (const parkObj of allParks) {
			parkHTML += `<option value="${parkObj.parkCode}">${parkObj.fullName}</option>`
		}
        parkHTML += `</select>`
        parkEl.innerHTML = parkHTML
}