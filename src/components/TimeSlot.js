import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {EVENTS_PROP_TYPE} from './constants';
import {getDisplayHour} from '../utils';
import TimeSlotEvent from './TimeSlotEvent';
import {MINUTES_HOUR} from '../utils/constants';

import './TimeSlot.css';

const TimeLine = ({pixelTimeRatio}) => {
    let positionY = {top: `${pixelTimeRatio}px`};

    return (<hr className="time-line" style={positionY} />);
};

export default class TimeSlot extends PureComponent {
    static propTypes = {
        hour: PropTypes.number.isRequired,
        events: EVENTS_PROP_TYPE.isRequired,
    }

    state = {
        timeSlotHeight: 0,
    }

    componentDidMount() {
        let {height} = this.timeSlotEl.getBoundingClientRect();

        this.setState({timeSlotHeight: height});
    }

    _renderTimeLine(slotHour) {
        let milisecondsNow = Date.now();
        let currentHour = new Date(milisecondsNow).getHours();
        let currentMinute = new Date(milisecondsNow).getMinutes();

        if (currentHour === slotHour) {
            // 0.5 accounts for 1px TimeLine height and centers positioning from middle
            let pixelTimeRatio = (this.state.timeSlotHeight * (currentMinute / MINUTES_HOUR)) - 0.5;

            return (<TimeLine pixelTimeRatio={pixelTimeRatio} />);
        }
        return null;
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
                <div className="time-slot__events" ref={(input) => this.timeSlotEl = input}>
                    {this._renderTimeLine(hour)}
                    {this._renderEvents()}
                </div>
            </section>
        );
    }
}
