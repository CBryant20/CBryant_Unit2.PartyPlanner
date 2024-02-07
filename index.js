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

// const eventsList = document.querySelector("#events");

const $addEventForm = document.querySelector("#addEventButton");

$addEventForm.addEventListener("click", addEventButton);

// async function render() {
//   await getEvents();
//   renderEvents();
// }

// render();

// // Create function for selected Event
function selectedEvent(event) {
  state.selectedEvent = event;
  location.hash = event.id;
}

// // Create function to load the hash tags for the selected events
// function loadEventHash() {
//   const id = +location.hash.slice(1);
//   state.selectedEvent = state.events.find((event) => event.id === id);
// }

// Update state with an array of events objects from the API via the internet
async function getEvents() {
  try {
    const response = await fetch(BASE_URL + COHORT + endpoint);
    const jsonResponse = await response.json();
    state.events = jsonResponse.data;
  } catch (error) {
    console.error(error);
  }
}
function addEventButton(_event) {
  const inputEvent = document.querySelector("#name");
  const inputEvent2 = document.querySelector("#description");
  const inputEvent3 = document.querySelector("#date");
  const inputEvent4 = document.querySelector("#location");
  const inputEvent5 = document.querySelector("#cohortID");

  const eventsInput = document.querySelector("#events");
  state.events.push(inputEvent.value);
  state.events.push(inputEvent2.value);
  state.events.push(inputEvent3.value);
  state.events.push(inputEvent4.value);
  state.events.push(inputEvent5.value);

  let inputEventList = [];
  state.events.map((e) => {
    inputEventList.push(e);
  });
  eventsInput.innerHTML = inputEventList;
}

////////////// RENDER /////////////////////
function renderEvents() {
  const $ul = document.querySelector("#cohortUl");
  const $events = state.events.map((event) => {
    const $li = document.createElement("li");
    $li.innerHTML = `
    <h2>${event.name}</h2>`;

    $li.addEventListener("click", (_event) => {
      selectedEvent(event);
      renderSelectedEvent();
    });

    return $li;
  });
  $ul.replaceChildren(...$events);
}

function renderSelectedEvent() {
  const $event = document.querySelector("article.selected_event");
  if (state.events) {
    $event.innerHTML = `
  <h2>${state.selectedEvent.name}</h2>
  <p>${state.selectedRecipe.description}</p>
  <p>${state.selectedRecipe.date}</p>
  <p>${state.selectedRecipe.location}</p>
  <p>${state.selectedRecipe.cohortId}</p>
  `;
  } else {
    $event.innerHTML = `<p>No Event Selected!!!</p>`;
  }
}
/////////////// SCRIPT /////////////////////
async function init() {
  await getEvents();
  renderEvents();
  // loadEventHash();
  renderSelectedEvent();
}

window.addEventListener("load", init);
