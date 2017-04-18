import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import TimeSlot from '../components/TimeSlot';
import Calendar from '../components/Calendar';

import {filterEventsByHour} from '../utils';
import {HOURS_DAY} from '../utils/constants';
import {EVENTS_PROP_TYPE} from '../utils/proptypeConstants';
import getTimeSlotEventDimensions from '../utils/multiDayDisplayHelpers';
import '../components/Calendar.css';

class CalendarContainer extends PureComponent {
    static propTypes = {
        events: EVENTS_PROP_TYPE.isRequired,
    }

    state = {
        calendarHeight: 0,
    }

    componentDidMount() {
        this._getCalendarDimensions();
        window.addEventListener('resize', this._getCalendarDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._getCalendarDimensions);
    }

    _getCalendarDimensions() {
        let {top, bottom, width} = this.calenderEL.getBoundingClientRect();
        let calendarHeight = bottom - top;

        this.setState({calendarHeight});
        this.setState({calendarWidth: width});
    }

    _renderTimeSlots() {
        let {events} = this.props;


        return (
            new Array(HOURS_DAY)
            .fill(0)
            .map((item, index) => {
                let hour = index;
                let filteredEvents = getTimeSlotEventDimensions(filterEventsByHour(events, hour), this.state.calendarHeight, this.state.calendarWidth, this.props.day);

                return (
                    <TimeSlot
                        key={hour}
                        hour={hour}
                        events={filteredEvents}
                    />
                );
            })
        );
    }

    render() {
        return (
            <Calendar>
                <main className="calendar-wrapper" ref={(input) => this.calenderEL = input}>
                    {this._renderTimeSlots()}
                </main>
            </Calendar>
        );
    }
}

const mapStateToProps = (state) => ({day: state.day});

export default connect(mapStateToProps)(CalendarContainer);
