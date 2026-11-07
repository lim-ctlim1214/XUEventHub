
const searchResults = document.getElementById('searches');
const secondaryEvents = document.getElementById('secondaryEvents')

function debounce (fn, delay = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

document.getElementById('searchbar').addEventListener('input', debounce(async (e) => {
    const query = e.target.value.trim();
    const results = query ? await searchEvents(query) : await grabAllEvents()
    renderResults(results);
}, 300));

async function addSecondEvent(data){
    const evtArticle = document.createElement('article');
    evtArticle.classList.add('simple-event-display')
    evtArticle.innerHTML = `
       <div class="event-details">
        <h3>${data.name}</h3>
        <p>${formatRange(data)} @ ${formatTime(data.start_time)}</p>
        </div>
        
    `
    evtArticle.addEventListener('click', () => {
        localStorage.setItem('event_to_open', data.id);
        window.location.href = 'event-description.html'
    })
    secondaryEvents.appendChild(evtArticle);
}

async function renderResults(data){
    searchResults.innerHTML = '';
    data.forEach(element => {

        if (element.parentEventID !== null) {
            secondaryEvents.innerHTML = ``
            addSecondEvent(element)
            return;
        }

        const eventArticle = document.createElement('article');
        eventArticle.classList.add('primary-event')
        eventArticle.classList.add('searchworthy')
        eventArticle.innerHTML = `
            <h1>${element.name}</h1>
            <p>${formatRange(element)}</p>
        `
        eventArticle.addEventListener('click', (event) => {
            localStorage.setItem('event_to_open', element.id);
            window.location.href = 'event-description.html'
        })
        searchResults.appendChild(eventArticle)

    })
}