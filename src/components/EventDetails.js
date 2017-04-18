import React, {PureComponent} from 'react';
import {EVENT_PROP_TYPE} from '../utils/proptypeConstants';
import {getDisplayDate, getDisplayHour} from '../utils';

import './EventDetails.css';

export default class EventDetails extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
    }

    render() {
        let {event} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();
        let startMinutes = (new Date(start)).getMinutes();
        let endHour = startHour + hours;

        // TODO: handle end hour less than hour display
        let startHourDisplay = getDisplayHour(startHour, startMinutes);
        let endHourDisplay = getDisplayHour(endHour);
        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`;

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
