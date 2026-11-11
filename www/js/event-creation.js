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
    await createEvent(details)
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

async function setup(){
    await addAllCategories();
}

setup()

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault()
    submitAll()
})