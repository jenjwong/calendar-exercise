import React, {PureComponent} from 'react';
import {Route, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Page from '../components/Page';
import DayNavigator from '../components/DayNavigator';
import {changeDay} from '../actions/actionCreators';
import {getDisplayDate, getEventFromEvents, filterEventsByDay} from '../utils';
import DetailOverlay from '../components/DetailOverlay';
import EventDetails from '../components/EventDetails';
import AddEventFormContainer from './AddEventFormContainer';
import {MAINPATH} from '../utils/constants';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import './PageContainer.css';

class PageContainer extends PureComponent {
    _handlePrev() {
        this.props.changeDay(-1);
        // this.props.dispatch(setDay(this.props.day - MILLISECONDS_DAY));
    }

    _handleNext() {
        this.props.changeDay(+1);
        // this.props.dispatch(setDay(this.props.day + MILLISECONDS_DAY));
    }

    _eventDetailOverlayRenderHelper() {
        return (
            <Route
                path="/details/:id"
                key={this.props.location.pathname}
                render={
                    ({match}) => {
                        const selectedEvent = getEventFromEvents(this.props.events, match.params.id);

                        return (
                            <DetailOverlay onClose={MAINPATH}>
                                <EventDetails event={selectedEvent} {...this.props} />
                            </DetailOverlay>
                        );
                    }
                }
            />
        );
    }

    _AddEventFormRenderHelper() {
        return (
            <Route
                path="/addEvent"
                key={this.props.location.pathname}
                render={() => {
                    return (
                        <DetailOverlay onClose={MAINPATH}>
                            <AddEventFormContainer />
                        </DetailOverlay>
                    );
                }}
            />
        );
    }

    _handleClick() {
        this.props.history.push('/');
    }

    _handleKeyPress(e) {
        if (e.key === 'Escape') {
            this.props.history.push('/');
        }
    }

    _wrapperRenderHelper() {
        let {events, day} = this.props;
        let filteredEvents = filterEventsByDay(events, day);
        let path = this.props.location.pathname.split('/');

        if (path.find((item) => item === 'details' || item === 'addEvent')) {
            return (
                <div
                    className="wrapper wrapper-no-scroll"
                    onClick={this._handleClick.bind(this)}
                    onKeyDown={this._handleKeyPress.bind(this)}
                    role="button"
                >
                    <DayNavigator
                        dateDisplay={getDisplayDate(day)}
                        onPrev={this._handlePrev.bind(this)}
                        onNext={this._handleNext.bind(this)}
                    />
                    <Page day={day} events={filteredEvents} />
                    <Route
                        render={({location}) => (
                        <CSSTransitionGroup
                            transitionName="example"
                            transitionAppear={true}
                            transitionAppearTimeout={900}
                            transitionEnterTimeout={900}
                            transitionLeaveTimeout={900}
                        >
                        <Switch
                            key={location.key}
                            location={location}
                        >
                            {this._eventDetailOverlayRenderHelper()}
                            {this._AddEventFormRenderHelper()}
                        </Switch>
                        </CSSTransitionGroup>
                    )}
                    />
                </div>
            );
        }
        return (
            <div className="wrapper" >
                <DayNavigator
                    dateDisplay={getDisplayDate(day)}
                    onPrev={this._handlePrev.bind(this)}
                    onNext={this._handleNext.bind(this)}
                />
                <Page day={day} events={filteredEvents} />
                <Route
                    render={({location}) => (
                        <CSSTransitionGroup
                            transitionName="example"
                            transitionAppear={true}
                            transitionAppearTimeout={900}
                            transitionEnterTimeout={900}
                            transitionLeaveTimeout={900}
                        >
                        <Switch
                            key={location.key}
                            location={location}
                        >
                            {this._eventDetailOverlayRenderHelper()}
                            {this._AddEventFormRenderHelper()}
                        </Switch>
                        </CSSTransitionGroup>
                )}
                />
            </div>
        );

    }

    render() {
        return (
            <div>
                {this._wrapperRenderHelper()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: state.events,
    day: state.day
});

const mapDispatchToProps = (dispatch) => ({
    changeDay: bindActionCreators(changeDay, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
