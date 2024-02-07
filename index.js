/* 
- User will find an event with names, dates, times, locations and descriptions

- Form to add info for a new party

- Each party will have a delete button
  - Delete will be selected to delete that particular event

1.  Which components can be created directly in the HTML? Which components need to be created in JavaScript?
2. Can you render mock data to the page?
3. Can you render real data to the page?
4. Are you able to fetch an array of all the parties from the API?
5. Is state correctly updated to match the data from the API?
6. Are you passing the correct arguments to fetch?
7. Does the API return an error? If so, what is the error message?
8. Is there an event listener on the form? Does it correctly add a new party to the list of parties?
9. Is there an event listener attached to each delete button? Does it correctly remove a party from the list of parties?
*/

const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2401-FSA-ET-WEB-FT";
const endpoint = "/events";

/**
 *
 * @typedef Event
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 * @property {number} cohortId
 */

/**
 *
 * @typedef State
 * @property {Event[]} events
 *
 */

//////////// STATE ////////////////////
/**
 * @typedef {State}
 */
const state = {
  events: [],
  selectedEvent: null,
};

const eventsList = document.querySelector("#events");

const $addEventForm = document.querySelector("#addEventButton");

$addEventForm.addEventListener("submit", addEvent);

async function render() {
  await getEvents();
  renderEvents();
}

render();

// // Create function for selected Event
function selectedEvent(event) {
  state.selectedEvent = event;
  location.hash = state.selectedEvent.id;
}

// // Create function to load the hash tags for the selected events
function loadEventHash() {
  const id = +location.hash.slice(1);
  state.selectedEvent = state.events.find((event) => event.id === id);
}

// Update state with an array of events objects from the API via the internet
async function getEvents() {
  try {
    const response = await fetch(BASE_URL + COHORT + endpoint);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    state.events = jsonResponse.data;
  } catch (error) {
    console.error(error);
  }
}

async function addEvent(event) {
  event.preventDefault();

  try {
    const date = new Date(addForm.date.value).toISOString();
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: state.events.name.value,
        description: state.events.description.value,
        date: state.events.date.value,
        location: state.events.location.value,
        cohortID: state.events.cohortID.value,
      }),
    });
    const eventResult = await response.json();
    console.log(eventResult);

    if (!response.ok) {
      throw new Error("Failed to create artist");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}
function addEventButton(_event) {
  const inputEvent = document.querySelector("#name");

  const eventsInput = document.querySelector("#events");
  state.events.push(inputEvent.value);

  let inputEventList = [];
  state.events.map((e) => {
    inputEventList.push(e);
  });
  eventsInput.innerHTML = inputEventList;
}

////////////// RENDER /////////////////////
async function renderEvents() {
  if (state.events.length === 0) {
    eventsList.innerHTML = "<li>No events.</li>";
    return;
  }

  // const $ul = document.querySelector("#cohortUl");
  const $ul = state.events.map((event) => {
    const $li = document.createElement("li");
    $li.innerHTML = `
    <h2>${event.name}</h2>`;

    $li.addEventListener("click", (_event) => {
      selectedEvent(event);
      renderSelectedEvent();
    });

    return $li;
  });
  eventsList.replaceChildren(...$ul);
}

async function deleteEvent(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    render();
  } catch (error) {
    console.log(error);
  }
}

function renderSelectedEvent() {
  const $event = document.querySelector("article.selected_event");
  if (state.events.length) {
    $event.innerHTML = `
  <h2>${state.selectedEvent.name}</h2>
  <p>${state.selectedEvent.description}</p>
  <p>${state.selectedEvent.date}</p>
  <p>${state.selectedEvent.location}</p>
  <p>${state.selectedEvent.cohortId}</p>
  `;
  } else {
    $event.innerHTML = `<p>No Event Selected!!!</p>`;
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", async () => {
    await deleteEvent(state.events);
    getEvents();
  });
  $event.append(deleteButton);
}
/////////////// SCRIPT /////////////////////
// Function to Initialize
async function init() {
  await getEvents();
  renderEvents();
  loadEventHash();
  selectedEvent();
}

window.addEventListener("load", init);
