import {MINUTES_HOUR, SECONDS_MINUTE, MILLISECONDS_SECOND} from './constants';

/**
 * Given a timestamp returns a date object instatiated with timestamp with hours set to 0
 * @param {Date} timestamp - The timestamp
 * @returns {object}
 */
export const dateAtMidnight = (timestamp) => new Date(timestamp).setHours(0, 0, 0, 0);

/**
 * Given a list of events and a date, filter the events down to those that
 * fall on the same day as the date
 * @param {array} events - List of event objects
 * @param {Date} timestamp - The timestamp representing the day to match
 * @returns {array}
 */
export const filterEventsByDay = (events, timestamp) => (
    events.filter((event) => {
        let milisecondEventDuration = event.hours * MINUTES_HOUR * SECONDS_MINUTE * MILLISECONDS_SECOND;

        return dateAtMidnight(timestamp) >= dateAtMidnight(event.start)
        && dateAtMidnight(timestamp) <= dateAtMidnight(event.start + milisecondEventDuration);
    })
);

/**
 * Given a list of events and an hour number, filter the events down to those that
 * start on the specified hour
 * @param {array} events - List of event objects
 * @param {number} hour - The hour to match (0 - 23)
 * @param {array}
 * @returns {array}
 */
export const filterEventsByHour = (events, hour) => (
     events.filter(({start}) => (
         new Date(start)).getHours() === hour
     )
 );

/**
 * Given a numerical timestamp, returns the formatted date string w/o time component
 * @param {number} timestamp - The date to format
 * @returns {string} The formatted date
 */
export const getDisplayDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    return date.toLocaleString('en-US', options);
};

/**
 * Given an hour number, returns a display string version
 * @param {number} hour - The hour
 * @returns {string}
 */
// TODO: Implement using a more programmatic approach instead of map
// export const getDisplayHour = hour => hour === 0 ? '12AM' : hour >= 12 ? `${hour - 11}PM` : `${hour}AM`;

export const getDisplayHour = (hour, minutes='00') => {
    let formatedMinutes = minutes;

    if (minutes === 0) {
        formatedMinutes = '00';
    }
    const _getAmPm = (h) => h >= 12 ? `${h % 12}:${formatedMinutes}PM` : `${h}:${formatedMinutes}AM`;

    if (hour % 12 !== 0) {
        return _getAmPm(hour);
    }
    return hour === 0 ? '12:00AM' : '12:00PM';
};


/**
 * Given a list of events, returns the event object whose id matches the specified eventId
 * @param {array} events - List of event objects
 * @param {number} eventId - ID of event to find
 * @returns {object}
 */
export const getEventFromEvents = (events, eventId) => (
    events.find(({id}) => id === parseInt(eventId, 10))
);

/**
 * Given a timestamp, returns a boolean indicating if the event has passed
 * @param {number} eventDate - The date of the event
 * @returns {boolean} - True if event has passed
 */
export const isEventPassed = (eventStart, eventDuration) => eventStart + eventDuration < Date.now();

/**
 * Converts hour value to miliseconds
 * @param {number} hour - Hour value to translate to miliseconds
 * @returns {number} - Input value in miliseconds
 */
export const hourToMiliseconds = (hour) => hour * MINUTES_HOUR * SECONDS_MINUTE * MILLISECONDS_SECOND;

/**
 * Converts minute value to miliseconds
 * @param {number} minute - Minute value to translate to miliseconds
 * @returns {number} - Input value in miliseconds
 */
export const minuteToMiliseconds = (minute) => minute * SECONDS_MINUTE * MILLISECONDS_SECOND;
