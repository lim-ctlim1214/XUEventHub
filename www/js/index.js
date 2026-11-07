document.addEventListener('deviceready', onDeviceReady, false);



let happeningNow = 0;

function getRidOfBookmark(id){
    document.getElementById(`bookmark-${id}`).remove();
    if (bookmarks.length <= 0){
        document.getElementById("bookmark-disclaimer").classList.remove("hidden");
    }
}

function addBookmarkedEvent(eventDetails){
    const bmevents = document.getElementById("bookmarkedEvents")

    const event = document.createElement("article")
    event.classList.add("simple-event-display");
    event.id = `bookmark-${eventDetails.id}`
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

    const isBookmarked = bookmarks.includes(eventDetails.id);

    const bookmark = document.createElement("i");
    bookmark.classList.add(isBookmarked ? "fa-solid" : "fa-regular", "fa-bookmark", "fa-lg");

    bookmark_container.appendChild(bookmark);

    bookmark_container.addEventListener("click", () => {
        bookmark.classList.toggle("fa-regular");
        bookmark.classList.toggle("fa-solid");
        add_bookmark(eventDetails.id, false, false);
    });

    bookmark_container.appendChild(bookmark);
    eventArticle.appendChild(bookmark_container);
    upcoming_events.appendChild(eventArticle);
}



async function loadHome() {
    const upcoming_events = await grabUpcomingEvents()

    const happening = await grabHappeningNow()

    setupBookmarks()
    bookmarks.forEach(bookmark => {
        add_bookmark(bookmark, true, true)
    })
    upcoming_events.forEach((eventDetails) => addEventToSimpleList(eventDetails));
    happening.forEach(addToHappeningNow)
}


loadHome();

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}