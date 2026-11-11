const { createClient } = supabase;

let token = localStorage.getItem("app_token");

const db = createClient(
    "https://omrqbbiehkgqqgxqbtor.supabase.co",
    "sb_publishable_h_boC1E7aT-8eoV3I1GYCA_ed1V1Shp",
    {
        accessToken: async() => token
    }
);

async function login(username, password) {
    const res = await fetch(`https://omrqbbiehkgqqgxqbtor.supabase.co/functions/v1/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: "sb_publishable_h_boC1E7aT-8eoV3I1GYCA_ed1V1Shp" },
        body: JSON.stringify({ username, password }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error);
    token = body.access_token;
    localStorage.setItem("app_token", token);
}

function logout() {
    token = null;
    localStorage.removeItem("app_token");
}

function isLoggedIn() {
    return !!token;
}

function getPayload() {
    if (!token) return null;
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
}

function getUserId() {
    const p = getPayload();
    return p ? p.sub : null;
}

function getUsername() {
    const p = getPayload();
    return p ? p.username : null;
}

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
    return start === end ? start : `${start} - ${end}`;
}

async function searchEvents(query) {
    const {data, error} = await db
        .from('Events')
        .select('*').ilike('name', `%${query}%`)
        .order('start_date', {ascending: true})

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

async function grabAllEvents() {
    const { data, error } = await db
        .from('Events')
        .select('*')
        .order('start_date', { ascending: true });

    if (error) {
        console.error(error);
        return [];
    }
    return data;
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

async function grabChildEvents(parentID){
    const {data, error} = await db
    .from('Events')
    .select('*')
    .eq('parentEventID', parentID)
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

function formatTime(time) {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

function formatTimeRange(start, end) {
    const s = formatTime(start);
    const e = formatTime(end);

    if (s === "12:00 AM" && (e === "12:00 AM" || e === "11:59 PM")) {
        return "All Day";
    }
    return `${s} - ${e}`;
}

async function getAllEventsFromUser(user_id){
    const { data, error } = await db
        .from('Events')
        .select('*')
        .eq('event_owner', user_id)

    if (error) {
        console.error(error);
        return null;
    }
    return data;
}