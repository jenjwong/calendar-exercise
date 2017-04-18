import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {EVENT_PROP_TYPE} from '../utils/proptypeConstants';
import {isEventPassed, hourToMiliseconds} from '../utils/index';

import './TimeSlotEvent.css';

export default class TimeSlotEvent extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
    }

    render() {
        let {
            event: {
                title,
                start,
                color,
                id,
                height,
                startHeight,
                hours,
                width,
            }} = this.props;


        // zIndex to order shorter events in front and longer events in back
        let zIndex = 1000 - hours;

        let displayColor = isEventPassed(start, hourToMiliseconds(hours)) ? 'gray half-opacity' : color;

        const style = {
            height: `${height}px`,
            width: `${width}px`,
            top: `${startHeight}px`,
            padding: `0 ${10}px`,
            zIndex: `${zIndex}`
        };

        return (
            <Link className="time-slot-event--link" to={{pathname: `/details/${id}`}} style={style}>
                <div className={`time-slot-event b-r-5 ${displayColor}`}>
                {title}
                </div>
            </Link>
        );
    }
}
