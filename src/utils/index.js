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
export const filterEventsByDay = (events, timestamp) => events.filter((event) => dateAtMidnight(event.start) === dateAtMidnight(timestamp));

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
        new Date(start)).getHours() === hour,
    )
);

/**
 * Given a list of events and a color, filter the events down to those that
 * match the specified color
 * @param {array} events - List of event objects
 * @param {string} color - The color to match
 * @param {array}
 * @returns {array}
 */
export const filterEventsByColor = (events = [], filterColor = '') => (
    events.filter(({color}) => color === filterColor)
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

export const getDisplayHour = (hour) => {
    const _getAmPm = (h) => h >= 12 ? `${h % 12}PM` : `${h}AM`;

    if (hour % 12 !== 0) {
        return _getAmPm(hour);
    }
    return hour === 0 ? '12AM' : '12PM';
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
 * @param {number} timestamp - The date of the event
 * @returns {boolean} - True if event has passed
 */
export const isEventPassed = (timestamp) => timestamp < Date.now();
