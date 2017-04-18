import React, {PureComponent} from 'react';
import {func} from 'prop-types';

import './AddEventForm.css';

export default class AddEventForm extends PureComponent {
    static propTypes = {
        onAddEventFormSubmit: func.isRequired,
        _handleInputChange: func.isRequired,
    }
    render() {
        let {title,
            description,
            date,
            startHour,
            color,
            message,
            onAddEventFormSubmit,
            _handleInputChange} = this.props;

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
                        />
                        <textarea
                            type="text"
                            name="description"
                            onChange={_handleInputChange}
                            value={description}
                            className="add-event-form__description"
                            placeholder="Describe your event"
                        />
                    </div>
                    <div className="add-event-form__date-container">
                        <input
                            name="date"
                            type="date"
                            value={date}
                            className="add-event-form__date"
                            onChange={_handleInputChange}
                        />
                        <input
                            name="startHour"
                            type="time"
                            value={startHour}
                            className="add-event-form__startHour"
                            onChange={_handleInputChange}
                        />
                        <select
                            name="color"
                            value={color}
                            onChange={_handleInputChange}
                        >
                            <option value="shamrock">Shamrock</option>
                            <option value="rose">Rose</option>
                            <option value="canary">Canary</option>
                            <option value="sea">Sea</option>
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
