let event_number = localStorage.getItem('event_to_open')
let parentEvent

async function load_event(){
    let eventTaken = await grabEventByID(event_number)

    parentEvent = eventTaken

    const eventcard = document.getElementById('event-card')
    eventcard.innerHTML = `
        <h1>${eventTaken.name}</h1>
        <p>${formatRange(eventTaken)}</p>
    `

    const description = document.getElementById("description");
    description.innerText = eventTaken.description

    const quick_details = document.getElementById("quick-details");
    quick_details.innerHTML = `
        <h2>Quick Details</h2>
        <p><strong>Attendance:</strong> ${eventTaken.attendance}</p>
        <p><strong>Location:</strong> ${eventTaken.location}</p>
        <p><strong>Date:</strong> ${formatRange(eventTaken)}</p>
        <p><strong>Time:</strong> ${formatTimeRange(eventTaken.start_time, eventTaken.finishing_time)}</p>
        <p><strong>Incentives:</strong> ${eventTaken.incentives}</p>
        <p><strong>Organizers:</strong> ${eventTaken.organizers}</p>
    `

    load_secondary_events()
}

function addToSecondaryEvents(details){
    const secevtcont = document.getElementById('secondary-events')
    const eventArticle = document.createElement('article');
    eventArticle.classList.add('simple-event-display')

    eventArticle.innerHTML = `
        <div class="event-details">
            <h3>${details.name}</h3>
            <p>${parentEvent.name} - ${formatRange(details)} @ ${formatTime(details.start_time)}</p>
        </div>
    `
    eventArticle.addEventListener('click', (event) => {
        localStorage.setItem('event_to_open', details.id)
        window.location.reload()
    })
    secevtcont.appendChild(eventArticle)

}

async function load_secondary_events(){
    let collection = await grabChildEvents(event_number)
    collection.forEach(evt => {
        addToSecondaryEvents(evt)
    })
}

load_event()