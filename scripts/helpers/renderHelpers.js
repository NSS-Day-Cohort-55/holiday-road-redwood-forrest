export const getAllAmenties = (amenitiesObj) => {
    let amenitiesHTML = ``;
    for (const [key, value] of Object.entries(amenitiesObj)) {
        if (value) {
            amenitiesHTML += `<li>${key}</li>`
        }
    }
    return amenitiesHTML;
}