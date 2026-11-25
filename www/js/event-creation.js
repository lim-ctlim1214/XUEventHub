if (!isLoggedIn()) window.location.href = "admin-login.html";

const eventName = document.getElementById('event-name')
const eventDescription = document.getElementById('event-description')
const startDate = document.getElementById('start-date')
const endDate = document.getElementById('end-date')
const startTime = document.getElementById('start-time')
const endTime = document.getElementById('end-time')
const category = document.getElementById('event-type')
const locationNode = document.getElementById('location')
const attendance = document.getElementById('attendance')
const incentives = document.getElementById('incentives')
const organizers = document.getElementById('organizers')
const primaryEvent = document.getElementById('primary')


async function submitAll() {
    document.getElementById('overlay').classList.remove('hidden')
    const problem = validate()
    if (problem) {
        showError(problem)
        document.getElementById('overlay').classList.add('hidden')
        return;
    }

    let details = {
        name: eventName.value,
        description: eventDescription.value,
        start_date: startDate.value,
        finishing_date: endDate.value,
        categoryID: category.value,
        start_time: startTime.value,
        finishing_time: endTime.value,
        location: locationNode.value,
        organizers: organizers.value,
        incentives: incentives.value,
        attendance: attendance.value,
        event_owner: getUserId(),
        parentEventID: primaryEvent.value ? Number(primaryEvent.value) : null
    }
    let event_id = await createEvent(details)
    if (!event_id) return
    if (bannerUploaded) await uploadImage(bannerUploaded, event_id)
    navigator.notification.alert(
        'Event Successfully Created',
        () => { window.location.href = 'admin-homepage.html'; },
        'Success',
        'OK'
    );
}

async function addAllCategories(){
    let categories = await grabAllCategories()

    categories.forEach(cat => {
        let option = document.createElement('option');
        option.value = cat.category_id;
        option.text = cat.category_name;
        category.appendChild(option)
    })
}

async function addAllOwnedPrimaryEvents(){
    let events = await getAllEventsFromUser(getUserId())
    events.forEach(event => {
        if (event.parentEventID == null){
            let option = document.createElement('option');
            option.value = event.id;
            option.text = event.name;
            primaryEvent.appendChild(option)
        }
    })
}

async function setup(){
    await addAllOwnedPrimaryEvents();
    await addAllCategories();
}

setup()

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault()
    submitAll()
})

let bannerUploaded;

document.getElementById('img-selector').addEventListener('change', async (e) => {
    if (!e.target.files[0]) return;
    bannerUploaded = e.target.files[0]
    navigator.notification.alert(
        'You have successfully uploaded an image!',
        () => {},
        'Success',
        'OK'
    );
})

function showError(message) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, 'Check your input', 'OK');
    } else {
        alert(message);
    }
}

function validate() {
    if (!eventName.value.trim()) return 'Event name is required.';
    if (eventName.value.trim().length > 100) return 'Event name is too long (max 100 characters).';
    if (!eventDescription.value.trim()) return 'Description is required.';

    if (!startDate.value || !endDate.value) return 'Please pick a start and end date.';
    if (endDate.value < startDate.value) return 'End date cannot be before the start date.';

    if (!startTime.value || !endTime.value) return 'Please pick a start and end time.';
    if (startDate.value === endDate.value && endTime.value <= startTime.value) {
        return 'End time must be after the start time on a single-day event.';
    }

    if (!category.value) return 'Please choose a category.';
    if (!locationNode.value.trim()) return 'Location is required.';

    return null;
}