const { createClient } = supabase;

const db = createClient(
    "https://omrqbbiehkgqqgxqbtor.supabase.co",
    "sb_publishable_h_boC1E7aT-8eoV3I1GYCA_ed1V1Shp"
);

const date_options = {
    "month": "long",
    "day": "numeric",
};

function todayStr() {
    const d = new Date();
    const pad = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatRange(eventDetails) {
    const start = new Date(eventDetails.start_date).toLocaleDateString("en-US", date_options);
    const end = new Date(eventDetails.finishing_date).toLocaleDateString("en-US", date_options);
    return `${start} - ${end}`;
}

async function grabEvent(eventName) {
    const { data, error } = await db
        .from('Events')
        .select('*')
        .eq('name', eventName)
        .single();

    if (error) {
        console.error(error);
        return null;
    }
    return data;
}

let bookmarks = [];

function setupBookmarks(){
    if (localStorage.getItem("bookmarks")){
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        if (bookmarks.length !== 0){
            document.getElementById('bookmark-disclaimer').classList.add('hidden');
        }
        return;
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

async function add_bookmark(id, avoid = true, firstTimeSetup = false){
    if (bookmarks.includes(id) && !avoid){
        bookmarks = bookmarks.filter(bookmark => bookmark !== id);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        getRidOfBookmark(id);
        return;
    }
    if (!firstTimeSetup){
        bookmarks.push(id)
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    let event = await grabEventByID(id)
    addBookmarkedEvent(event)
}

async function grabEventByID(eventID) {
    const { data, error } = await db
        .from('Events')
        .select('*')
        .eq('id', eventID)
        .single();

    if (error) {
        console.error(error);
        return null;
    }
    return data;
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
    return data;
}

async function grabUpcomingEvents(){
    const today = todayStr();

    const { data, error } = await db
    .from('Events')
    .select('*')
    .gt('start_date', today)
    .order('start_date', { ascending: true })
    .limit(5);


    if (error) {
        console.error(error);
        return [];
    }
    return data;
}