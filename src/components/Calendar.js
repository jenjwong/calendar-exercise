import React, {PureComponent} from 'react';
import {filterEventsByHour, filterEventsByColor} from '../utils';
import {HOURS_DAY} from '../utils/constants';
import {EVENTS_PROP_TYPE} from './constants';

import TimeSlot from './TimeSlot';

import './Calendar.css';

export default class Calendar extends PureComponent {
    static propTypes = {
        events: EVENTS_PROP_TYPE.isRequired,
    }

    _renderTimeSlots() {
        let {events, colorFilter} = this.props;

        return new Array(HOURS_DAY)
            .fill(0)
            .map((item, index) => {
                let hour = index;
                let filteredEvents = filterEventsByHour(events, hour);
                
                if (colorFilter) {
                    filteredEvents = filterEventsByColor(filteredEvents, colorFilter);
                }

                return (
                    <TimeSlot
                        key={hour}
                        hour={hour}
                        events={filteredEvents}
                    />
                );
            });
    }

    render() {
        return (
            <main className="calendar b-r-5">
                {this._renderTimeSlots()}
            </main>
        );
    }
}
