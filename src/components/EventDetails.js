import React, {PureComponent} from 'react';
import {EVENT_PROP_TYPE} from '../utils/proptypeConstants';
import {getDisplayDate, getDisplayHour, hourToMiliseconds} from '../utils';

import './EventDetails.css';

export default class EventDetails extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
    }

    render() {
        // TODO: factor out functionality into helper function
        let {event} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDateStart = getDisplayDate(start);
        let startDateObj = new Date(start);
        let startHour = startDateObj.getHours();
        let startMinutes = startDateObj.getMinutes();

        let endMiliseconds = start + hourToMiliseconds(hours);
        let displayDateEnd = getDisplayDate(endMiliseconds);
        let endDateObj = new Date(endMiliseconds);
        let endHour = endDateObj.getHours();
        let endMinutes = endDateObj.getMinutes();

        let startHourDisplay = getDisplayHour(startHour, startMinutes);
        let endHourDisplay = getDisplayHour(endHour, endMinutes);
        let displayDateTime = `${displayDateStart} ${startHourDisplay} - ${endHourDisplay}`;

        if (displayDateStart !== displayDateEnd) {
            displayDateTime = `${displayDateStart} ${startHourDisplay} - ${displayDateEnd} ${endHourDisplay}`;
        }

        return (
            <div>
                <div>
                    {displayDateTime}
                    <span
                        className={`event-detail-overlay__color ${color}`}
                    />
                </div>
                <h1 className="event-detail-overlay__title">
                    {title}
                </h1>
                <p>{description}</p>
            </div>
        );
    }
}
