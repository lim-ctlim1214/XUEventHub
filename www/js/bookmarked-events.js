

async function addBookmarksToPrimaryList(id){
    const bmlist = document.getElementById("bookmarked-primary-list")
    const bmart = document.createElement("a")

    let details = await grabEventByID(id)

    bmart.classList.add("transparent-icon-button");
    bmart.innerHTML = `
        <div class="primary-event searchworthy">
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

async function setup(){
    setupBookmarks()
    bookmarks.forEach(bookmark => {
        addBookmarksToPrimaryList(bookmark)
    })
}

setup()
