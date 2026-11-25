
if (!isLoggedIn()) window.location.href = "admin-login.html";

let eventID = localStorage.getItem('event_to_manage')

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
const managingHeader = document.getElementById('managing-header')
const imgDisclaimer = document.getElementById('img-disclaimer')

async function addAllDetails(){
    let event = await grabEventByID(eventID);
    let categoryType = await grabCategoryByID(event.categoryID);

    managingHeader.innerHTML = `Managing ${event.name}`
    eventName.value = event.name;
    eventDescription.value = event.description;
    startDate.value = createNewDate(event.start_date);
    endDate.value = createNewDate(event.finishing_date);
    startTime.value = createNewTime(event.start_time);
    endTime.value = createNewTime(event.finishing_time);
    category.value = categoryType.category_id;
    locationNode.value = event.location;
    attendance.value = event.attendance;
    incentives.value = event.incentives;
    organizers.value = event.organizers;

    if (!event.banner_filename){
        imgDisclaimer.innerText = 'No Banner Image was uploaded.'
    }

    if (event.parentEventID !== null){
        let parentEvent = await grabEventByID(event.parentEventID)
        const illusionOfChoice = document.getElementById('illusion-of-choice')

        illusionOfChoice.value = parentEvent.id
        illusionOfChoice.text = parentEvent.name;
    }
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

async function submitAllEntries(){
    const problem = validate()
    if (problem) {
        showError(problem)
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
        attendance: attendance.value
    }
    await update(details, eventID)
    if (bannerUploaded) await uploadImage(bannerUploaded, eventID)
    navigator.notification.alert(
        'Event Details Saved',
        () => { window.location.href = 'admin-homepage.html'; },
        'Success',
        'OK'
    );
}

async function setup(){
    await addAllCategories();
    await addAllDetails()
}

document.getElementById('save').addEventListener('click', function(){
    submitAllEntries();

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

function deleteEvent(){
    document.getElementById('overlay').classList.remove('hidden');

    navigator.notification.confirm(
        'Are you sure you want to delete this event?',
        (choice) => {
            if (choice === 1) confirmDeletion()
            else document.getElementById('overlay').classList.add('hidden');
        },
        'Delete Event?',
        ['Delete', 'Cancel']
    )
}

async function confirmDeletion(){
    const isDeleted = await deleteEventByID(eventID)
    if (isDeleted){
        navigator.notification.alert(
            'Event Successfully Deleted',
            () => { window.location.href = 'admin-homepage.html'; },
            'Success',
            'OK'
        );
    } else {
        navigator.notification.alert("Error deleting event, contact your administrator.", null, 'Error', 'OK')
    }

}

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

setup()

