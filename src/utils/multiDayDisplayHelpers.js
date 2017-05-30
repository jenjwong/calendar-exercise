import {MILLISECONDS_DAY} from './constants';
import {dateAtMidnight, hourToMiliseconds, minuteToMiliseconds} from './';


const _getStartHeight = (item, calendarHeight) => {
    let startTimeMiliseconds = hourToMiliseconds(new Date(item.start).getHours()) +
    minuteToMiliseconds(new Date(item.start).getMinutes());
    let startTimeDayRatio = startTimeMiliseconds / MILLISECONDS_DAY;
    let startHeightPixels = (startTimeDayRatio * calendarHeight);

    return Math.floor(startHeightPixels);
};

const _getEventDuration = (item, calendarHeight) => {
    let eventMilisecondDuration = hourToMiliseconds(item.hours);
    let eventDurationDayRatio = eventMilisecondDuration / MILLISECONDS_DAY;
    let eventDurationPixels = (eventDurationDayRatio * calendarHeight);

    return Math.floor(eventDurationPixels);
};

const getTimeSlotEventDimensions = (events, calendarHeight, calendarWidth, day) => (
    events.map((item) => {
        let eventMilisecondDuration = hourToMiliseconds(item.hours);
        let eventEndMiliseconds = item.start + eventMilisecondDuration;

        let eventDurationPixels = _getEventDuration(item, calendarHeight);
        let startHeightPixels = _getStartHeight(item, calendarHeight);

        // first day of event and event is longer than current day
        if (eventDurationPixels + startHeightPixels > calendarHeight) {
            eventDurationPixels = Math.floor(calendarHeight - startHeightPixels);
        }

        // middle days of multiday events
        if (dateAtMidnight(item.start) < dateAtMidnight(day) && dateAtMidnight(eventEndMiliseconds) !== dateAtMidnight(day)) {
            startHeightPixels = 0;
            eventDurationPixels = Math.floor(calendarHeight);
        }

        // last day of event
        if (dateAtMidnight(item.start) < dateAtMidnight(day) &&
        dateAtMidnight(eventEndMiliseconds) === dateAtMidnight(day)) {
            let dayRemainder = eventMilisecondDuration % MILLISECONDS_DAY;
            let lastDayHeight = dayRemainder + hourToMiliseconds(new Date(item.start).getHours());
            let eventLastDayHeightPixelRatio = (lastDayHeight / (MILLISECONDS_DAY)) * calendarHeight;

            startHeightPixels = 0;
            eventDurationPixels = Math.floor(eventLastDayHeightPixelRatio);
        }

        let height = {height: eventDurationPixels};
        let startHeight = {startHeight: startHeightPixels};
        let width = {width: calendarWidth / 4};

        return {...item, ...height, ...startHeight, ...width};
    })
);

export default getTimeSlotEventDimensions;
