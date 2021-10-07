const eventName = document.getElementById('title');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const description = document.getElementById('description');
const eventLocation = document.getElementById('location');


async function submitHandler() {

    const json = {
            title: eventName.value,
            startDate: startDate.value,
            endDate: endDate.value,
            description: description.value,
            location: eventLocation.value
        },
        body = JSON.stringify(json);

    // submit new value
    await fetch('/createEvent', {
        method: 'POST',
        body,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            //return response.json();
        })
        .then(json => {

        })
}
