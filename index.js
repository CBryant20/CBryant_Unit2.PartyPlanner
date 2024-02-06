const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2401-FSA-ET-WEB-FT";
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

// Update state with an array of recipe objects from the API via the internet
////////////// RENDER /////////////////////

/////////////// SCRIPT /////////////////////
