import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Route} from 'react-router-dom';
import {changeDay, setColorFilter} from '../actions/actionCreators';
import Calendar from './Calendar';
import AddEventButton from './AddEventButton';
import DetailOverlay from './DetailOverlay';
import EventDetails from './EventDetails';
import AddEventForm from './AddEventForm';
import ColorFilter from '../containers/ColorFilter';
import {filterEventsByDay, getEventFromEvents, getDisplayDate} from '../utils';

import './Page.css';

const DayNavigator = ({dateDisplay, onPrev, onNext}) => (
    <nav className="page__nav">
        <button
            className="page__nav-button page__prev-day"
            title="Go to previous day"
            onClick={onPrev}
        />
        <h2 className="page__date">{dateDisplay}</h2>
        <nav className="page__nav">
            <button
                className="page__nav-button page__next-day"
                title="Go to next day"
                onClick={onNext}
            />
        </nav>
    </nav>
    );

export class Page extends PureComponent {

    static propTypes = {
        day: PropTypes.number.isRequired,
        events: PropTypes.arrayOf(PropTypes.object).isRequired,
        dispatch: PropTypes.func.isRequired
    }

    _handlePrev() {
        this.props.dispatch(changeDay(-1));
    }

    _handleNext() {
        this.props.dispatch(changeDay(+1));
    }

    _eventDetailOverlayRenderHelper() {
        return (
            <Route
                path="/details/:id"
                render={
                    ({match}) => {
                        const selectedEvent = getEventFromEvents(this.props.events, match.params.id);

                        return <DetailOverlay content={<EventDetails event={selectedEvent} {...this.props} />} />;
                    }
                }
            />
        );
    }

    _AddEventFormRenderHelper() {
        return <Route path="/addEvent" render={() => <DetailOverlay content={<AddEventForm />} />} />;
    }

    render() {
        let {events, day, colorFilter} = this.props;
        let filteredEvents = filterEventsByDay(events, day);

        return (
            <div className="page">
                <header className="page__header">
                    <h1 className="page__title">Daily Agenda</h1>
                    <span className="page__add-task-button">
                        <AddEventButton />
                    </span>
                </header>
                <DayNavigator
                    dateDisplay={getDisplayDate(day)}
                    onPrev={this._handlePrev.bind(this)}
                    onNext={this._handleNext.bind(this)}
                />
                <ColorFilter />
                <Calendar events={filteredEvents} colorFilter={colorFilter}/>
                {this._eventDetailOverlayRenderHelper()}
                {this._AddEventFormRenderHelper()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: state.events,
    day: state.day,
    colorFilter: state.colorFilter,
});

const mapDispatchToProps = (dispatch) => ({
    setColorFilter: bindActionCreators(setColorFilter, dispatch)
});


export default connect(mapStateToProps)(Page);
