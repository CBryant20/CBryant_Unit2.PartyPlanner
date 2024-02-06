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


*/
