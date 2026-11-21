

async function addBookmarksToPrimaryList(id){
    const bmlist = document.getElementById("bookmarked-primary-list")
    const bmart = document.createElement("a")

    let details = await grabEventByID(id)
    if (details.parentEventID !== null){
        addBookmarksToSecondaryList(details)
        document.getElementById("bookmark-secondary-disclaimer").style.display = "none"
        return
    }

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
    document.getElementById("bookmark-primary-disclaimer").style.display = "none"
}

const selist = document.getElementById("bookmarked-secondary-list")
async function addBookmarksToSecondaryList(details){

    const bmart = document.createElement("article")

    bmart.classList.add("simple-event-display")
    bmart.innerHTML = `
        <div class="event-details">
            <h3>${details.name}</h3>
            <p>${formatRange(details)} @ ${formatTimeRange(details.start_time, details.finishing_time)}</p>
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
        addBookmarksToPrimaryList(bookmark)
    })

}

setup()
