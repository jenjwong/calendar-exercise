import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CalendarContainer from '../containers/CalendarContainer';
import Button from './Button';

import './Page.css';

export default class Page extends PureComponent {

    static propTypes = {
        day: PropTypes.number.isRequired,
        events: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    render() {
        const {events} = this.props;

        return (
            <div className="page">
                <header className="page__header">
                    <h1 className="page__title">Daily Agenda</h1>
                    <span className="page__add-task-button">
                        <Button path={'/addEvent'} name={'Add Event'} />
                    </span>
                </header>
                <CalendarContainer events={events} />
            </div>
        );
    }
}
