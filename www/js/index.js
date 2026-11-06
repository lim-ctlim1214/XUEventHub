document.addEventListener('deviceready', onDeviceReady, false);

const date_options = {
    "month": "long",
    "day": "numeric",
};

let happeningNow = 0;

let bookmarks = [];

function setupBookmarks(){

    if (localStorage.getItem("bookmarks")){
        let retreived_bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        retreived_bookmarks.forEach(bookmark => {
            add_bookmark(bookmark)
        })

        if (bookmarks.length !== 0){
            document.getElementById('bookmark-disclaimer').classList.add('hidden');
        }

        return;
    }

   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

async function add_bookmark(id){
    if (bookmarks.includes(id)){
        bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        console.log("through")
        return;
    }
    bookmarks.push(id)

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    let event = await grabEventByID(id)
    addBookmarkedEvent(event)
}

function addBookmarkedEvent(eventDetails){
    const bmevents = document.getElementById("bookmarkedEvents")

    const event = document.createElement("article")
    event.classList.add("simple-event-display");
    event.innerHTML = `
        <div class="event-details">
            <h3>${eventDetails.name}</h3>
            <p>${formatRange(eventDetails)}</p>
        </div>
    `

    bmevents.appendChild(event);
    if (bookmarks.length !== 0){
        document.getElementById('bookmark-disclaimer').classList.add('hidden');
    }
}

function formatRange(eventDetails) {
    const start = new Date(eventDetails.start_date).toLocaleDateString("en-US", date_options);
    const end = new Date(eventDetails.finishing_date).toLocaleDateString("en-US", date_options);
    return `${start} - ${end}`;
}

function addToHappeningNow(eventDetails) {
    happeningNow++;
    const happening_container = document.getElementById("happening-container");
    const event = document.createElement("a");
    event.classList.add("transparent-icon-button");
    event.innerHTML = `
        <div class="primary-event" style="background-image: none">
            <h1>${eventDetails.name}</h1>
            <p>${formatRange(eventDetails)}</p>
        </div>
    `;
    happening_container.appendChild(event);
}

function addEventToSimpleList(eventDetails) {
    const upcoming_events = document.getElementById("upcoming-events");
    const eventArticle = document.createElement("article");
    eventArticle.classList.add("simple-event-display");
    eventArticle.innerHTML = `
        <div class="event-details">
            <h3>${eventDetails.name}</h3>
            <p>${formatRange(eventDetails)}</p>
        </div>
    `;

    const bookmark_container = document.createElement("div")

    const bookmark = document.createElement("i");
    bookmark.classList.add("fa-regular", "fa-bookmark", "fa-lg");

    //TODO: FIX THIS, probably change the security policy and CDN, but im kinda lazy for now.

    bookmark_container.addEventListener("click", () => {
        bookmark.classList.remove("fa-bookmark");
        bookmark.classList.remove("fa-lg");
        bookmark.classList.toggle("fa-regular");
        bookmark.classList.toggle("fa-solid");

        bookmark.classList.add("fa-bookmark");
        bookmark.classList.add("fa-lg");

        add_bookmark(eventDetails.id)
    });

    bookmark_container.appendChild(bookmark);
    eventArticle.appendChild(bookmark_container);
    upcoming_events.appendChild(eventArticle);
}



async function loadHome() {
    const upcoming_events = await grabUpcomingEvents()

    const happening = await grabHappeningNow()

    upcoming_events.forEach((eventDetails) => addEventToSimpleList(eventDetails));
    happening.forEach(addToHappeningNow)

    setupBookmarks()
}

loadHome();

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}