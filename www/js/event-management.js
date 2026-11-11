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
})

setup()

