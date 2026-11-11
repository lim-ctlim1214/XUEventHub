if (!isLoggedIn()) window.location.href = "admin-login.html";

async function addToPrimaryEventList(details){
    const pelist = document.getElementById('primary-event-list')

    const peArticle = document.createElement('article')
    peArticle.classList.add('primary-event')
    peArticle.classList.add('searchworthy')
    peArticle.innerHTML = `
        <h1>${details.name}</h1>
        <p>${formatRange(details)}</p>
    `
    pelist.appendChild(peArticle);
}

async function addToSecondaryEventList(details){
    const slist = document.getElementById('ev-list')

    const sArticle = document.createElement('article')
    slist.classList.add('simple-event-display')
    slist.innerHTML = `
        <div class="event-details">
            <h3>${details.name}</h3>
            <p>${formatRange(details)} @ ${formatTime(details.start_time)}</p>
        </div>
    `
    slist.appendChild(sArticle)
}

async function setup(){
    const userID = getUserId();
    let EventList = await getAllEventsFromUser(userID);

    EventList.forEach(event => {
        if (event.parentEventID === null){
            addToPrimaryEventList(event);
        } else {
            addToSecondaryEventList(event);
        }
    })
}

setup()