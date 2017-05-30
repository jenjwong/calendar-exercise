import React, {PureComponent} from 'react';
import {func} from 'prop-types';

import './AddEventForm.css';

export default class AddEventForm extends PureComponent {
    static propTypes = {
        onAddEventFormSubmit: func.isRequired,
        _handleInputChange: func.isRequired,
    }
    render() {
        let {onAddEventFormSubmit, _handleInputChange} = this.props;
        let {title,
            description,
            date,
            startHour,
            hours,
            color,
            message
        } = this.props.event;

        return (
            <div>
                <h1 className="add-event-form__title">
                    Add an Event
                </h1>
                <form
                    className="add-event-form"
                    onSubmit={onAddEventFormSubmit}
                >
                    <div className="add-event-form__text-container">
                        <input
                            type="text"
                            name="title"
                            onChange={_handleInputChange}
                            value={title}
                            className="add-event-form__title"
                            placeholder="Event name"
                            aria-required="true"
                        />
                        <textarea
                            type="text"
                            name="description"
                            onChange={_handleInputChange}
                            value={description}
                            className="add-event-form__description"
                            placeholder="Describe your event"
                            aria-required="true"
                        />
                    </div>
                    <div className="add-event-form__date-container">
                        <label htmlFor="date">Event Date</label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={date}
                            className="add-event-form__date"
                            onChange={_handleInputChange}
                            aria-required="true"
                        />
                        <label htmlFor="start">Start Time</label>
                        <input
                            id="start"
                            name="startHour"
                            type="time"
                            value={startHour}
                            className="add-event-form__startHour"
                            onChange={_handleInputChange}
                            aria-required="true"
                        />
                        <label htmlFor="hours">Hours</label>
                        <input
                            id="hours"
                            name="hours"
                            value={hours}
                            className="add-event-form__startHour"
                            onChange={_handleInputChange}
                            type="number"
                            placeholder="1.0"
                            step="0.5"
                            min="0"
                        />
                        <label htmlFor="color">Event Color</label>
                        <select
                            id="color"
                            name="color"
                            value={color}
                            onChange={_handleInputChange}
                            aria-live="assertive"
                            aria-required="true"
                        >
                            <option value="shamrock">Shamrock</option>
                            <option value="rose">Rose</option>
                            <option value="canary">Canary</option>
                            <option value="sky">Sky</option>
                        </select>
                        <button className="add-event-form__button">Create Event</button>
                    </div>
                </form>
                <div className="add-event-form-message">
                    {message}
                </div>
            </div>
        );
    }
}
