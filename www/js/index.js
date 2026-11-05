document.addEventListener('deviceready', onDeviceReady, false);


let db;

async function initialize(){
    const { createClient } = supabase;

    db = createClient(
        "https://omrqbbiehkgqqgxqbtor.supabase.co",
        "sb_publishable_h_boC1E7aT-8eoV3I1GYCA_ed1V1Shp"
    )
}
initialize();

async function grabEvent(eventName){
    const {data, error} = await db
        .from('Events')
        .select('*')
        .eq('name', eventName)
        .single();

    if (error) console.error(error);
    else return data;
}
function todayStr() {
    const d = new Date();
    const pad = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

async function grabHappeningNow() {
    const today = todayStr();

    const { data, error } = await db
        .from('Events')
        .select('*')
        .lte('start_date', today)
        .gte('finishing_date', today)
        .order('start_date', { ascending: true });

    if (error) {
        console.error(error);
        return [];
    }

    data.forEach(event => {
        addToHappeningNow(event);
    })
}

let happeningNow = 0;

function addToHappeningNow(eventDetails){
    happeningNow++;
    const happening_container = document.getElementById("happening-container")
    let event = document.createElement("a")
    event.classList.add("transparent-icon-button")
    event.innerHTML = `
        <div class="primary-event" style="background-image: none">
            <h1>${eventDetails.name}</h1>
            <p>${new Date(eventDetails.start_date).toLocaleDateString("en-US", date_options)} - ${new Date(eventDetails.finishing_date).toLocaleDateString("en-US", date_options)}</p>
        </div>
    `

    happening_container.appendChild(event);
}

grabEvent("The Xavier Cup").then(event => {
        addEventToSimpleList(event)
})

const date_options = {
    "month": "long",
    "day": "numeric",
}

async function addEventToSimpleList(eventDetails){
    const upcoming_events = document.getElementById("upcoming-events")

    let eventArticle = document.createElement("article");
    eventArticle.classList.add("simple-event-display")

    eventArticle.innerHTML = `
        <div class="event-details">
            <h3>${eventDetails.name}</h3>
            <p>${new Date(eventDetails.start_date).toLocaleDateString("en-US", date_options)} - ${new Date(eventDetails.finishing_date).toLocaleDateString("en-US", date_options)}</p>
        </div>
        <i class="fa-solid fa-bookmark fa-lg"></i>
    `

    upcoming_events.appendChild(eventArticle);
}

grabHappeningNow()

function onDeviceReady() {

    initialize();
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
