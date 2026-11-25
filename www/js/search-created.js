const searchInput = document.getElementById('searchcreated');

const SearchCreated = debounce(async () => {
    const query = searchInput.value.trim();
    const results = await searchEventsFromUser(query, getUserId());
    renderCreatedResults(results);
}, 300);

searchInput.focus();

searchInput.addEventListener('input', SearchCreated);

async function renderCreatedResults(data){
    secondaryEvents.innerHTML = ``
    searchResults.innerHTML = '';
    data.forEach(element => {

        if (element.parentEventID !== null) {
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

        eventArticle.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
        url("${element.banner_filename}")`;
        eventArticle.style.backgroundRepeat = 'no-repeat';
        eventArticle.style.backgroundSize = 'cover';
        eventArticle.style.backgroundPositionY = 'center';
        eventArticle.style.backgroundPositionX = 'center';


        eventArticle.addEventListener('click', (event) => {
            localStorage.setItem('event_to_manage', element.id);
            window.location.href = 'event-management.html'
        })
        searchResults.appendChild(eventArticle)

    })
}