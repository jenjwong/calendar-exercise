import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {EVENTS_PROP_TYPE} from '../utils/proptypeConstants';
import {getDisplayHour} from '../utils';
import TimeSlotEvent from './TimeSlotEvent';

import './TimeSlot.css';

export default class TimeSlot extends PureComponent {
    static propTypes = {
        hour: PropTypes.number.isRequired,
        events: EVENTS_PROP_TYPE.isRequired,
    }

    _renderEvents() {
        let {events} = this.props;

        return events.map((event) => (
            <div key={event.id} className="time-slot__event">
                <TimeSlotEvent event={event} />
            </div>
        ));
    }

    render() {
        let {hour} = this.props;
        let displayHour = getDisplayHour(hour);

        return (
            <section className="time-slot">
                <span className="time-slot__hour-label">
                    {displayHour}
                </span>
                <div className="time-slot__events">
                    {this._renderEvents()}
                </div>
            </section>
        );
    }
}
