//renders the events modal when show events button is clicked
export const renderEventsModal = (events) => {
    document.querySelector(".parkEventsModal").innerHTML = buildEventsModal(events)
}

//builds html string to return to renderEventsModal
const buildEventsModal = (events) => {
    let htmlString = ''
    if (events.data.length === 0) {
        htmlString = `
        <h4>Sorry, no events are scheduled for the chosen park. Try again later...</h4>
        <button class="button button--close" id="closeParkEvents">Close</button>
    `
    } else {
        htmlString = `
           ${buildEventsList(events)}
           <button class="button button--close" id="closeParkEvents">Close</button>
       `
    }

    return htmlString
}

//called in buildEventsModal, it loops through each event, builds an html string, and returns the string to buildEventsList
const buildEventsList = (events) => {
    let htmlString = ''
    events.data.forEach(event => {
        htmlString += `
            <ul><h4>${event.title}</h4>
                <li>Start Date: ${event.datestart}</li>
                <li>End Date: ${event.dateend}</li>
                <li>${event.description}</li>
                <li>Fee: ${event.feeinfo}</li>
            </ul>
        `
    })    
    return htmlString
}