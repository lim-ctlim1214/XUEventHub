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
    peArticle.addEventListener('click', (e) => {
        localStorage.setItem('event_to_manage', details.id)
        window.location.href='event-management.html'
    })
    pelist.appendChild(peArticle);
}

async function addToSecondaryEventList(details){
    const slist = document.getElementById('ev-list')

    const sArticle = document.createElement('article')
    sArticle.classList.add('simple-event-display')
    sArticle.innerHTML = `
        <div class="event-details">
            <h3>${details.name}</h3>
            <p>${formatRange(details)} @ ${formatTime(details.start_time)}</p>
        </div>
    `
    sArticle.addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.setItem('event_to_manage', details.id)
        window.location.href='event-management.html'
    })

    slist.appendChild(sArticle)
}

async function setup(){
    try {
        const userID = getUserId();
        let EventList = await getAllEventsFromUser(userID);
        EventList.forEach(event => {
            if (event.parentEventID === null) {
                addToPrimaryEventList(event);
            } else {
                addToSecondaryEventList(event);
            }
        })
    }
    catch(error){
        window.location.href = "admin-login.js"
    }
}

setup()