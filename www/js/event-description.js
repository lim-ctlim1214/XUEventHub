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
    eventcard.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
        url("${eventTaken.banner_filename}")`;
    eventcard.style.backgroundRepeat = 'no-repeat';
    eventcard.style.backgroundSize = 'cover';
    eventcard.style.backgroundPositionY = 'center';
    eventcard.style.backgroundPositionX = 'center';


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

function ontop(){
    window.location.href = "#search-bar"
}

async function load_secondary_events(){
    let collection = await grabChildEvents(event_number)
    collection.forEach(evt => {
        addToSecondaryEvents(evt)
    })
}

let bookmarkArray
let isBookmarked = false;
let bmIcon = document.getElementById('bookmark-icon');

function bookmark(){
    if (isBookmarked){
        bookmarkArray = bookmarkArray.filter(bookmark => bookmark !== Number(event_number));
        isBookmarked = false;
        bmIcon.classList.remove('fa-solid');
        bmIcon.classList.add('fa-regular');
        console.log(bookmarkArray)
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray));
    }
    else {
        bookmarkArray.push(Number(event_number));
        isBookmarked = true;
        bmIcon.classList.remove('fa-regular');
        bmIcon.classList.add('fa-solid');
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray));
    }
}

function loadBookmarks(){
    bookmarkArray = JSON.parse(localStorage.getItem("bookmarks"));
    if (bookmarkArray.includes(Number(event_number))){
        isBookmarked = true;
        bmIcon.classList.remove('fa-regular');
        bmIcon.classList.add('fa-solid');
        console.log("bookmarked")
    }
}


load_event()
loadBookmarks();