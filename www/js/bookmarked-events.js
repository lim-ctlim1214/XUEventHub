

async function addBookmarksToPrimaryList(id){
    const bmlist = document.getElementById("bookmarked-primary-list")
    const bmart = document.createElement("a")

    let details = await grabEventByID(id)

    bmart.classList.add("transparent-icon-button");
    bmart.innerHTML = `
        <div class="primary-event searchworthy" style="background-image:
        linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
        url('${details.banner_filename}');">
            <h1>${details.name}</h1>
            <p>${formatRange(details)}</p>
        </div>
    `;
    bmart.addEventListener("click", (event) => {
        localStorage.setItem('event_to_open', details.id)
        window.location.href = "event-description.html"
    })
    bmlist.appendChild(bmart)
    console.log("appended")
}

async function addBookmarksToSecondaryList(id){
    const selist = document.getElementById("bookmarked-secondary-list")
    const bmart = document.createElement("article")

    let details = await grabEventByID(id)

    bmart.classList.add("simple-event-display")
    bmart.innerHTML = `
        <div class="event-details">
            <h3>${details.name}</h3>
            <p>${formatRange(details)}</p>
        </div>
    `
    bmart.addEventListener("click", (event) => {
        localStorage.setItem('event_to_open', details.id)
        window.location.href = "event-description.html"
    })
    selist.appendChild(bmart)
}

async function setup(){
    setupBookmarks()
    bookmarks.forEach(bookmark => {
        if (bookmark.parentEventID !== null) {
            addBookmarksToSecondaryList(bookmark)
        } else {
            addBookmarksToPrimaryList(bookmark)
        }
    })
}

setup()
