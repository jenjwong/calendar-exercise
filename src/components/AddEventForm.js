import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEvent} from '../actions/actionCreators';
import sanitize from 'sanitize-caja';

import './AddEventForm.css';

export class AddEventForm extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            startHour: '09:00',
            date: '',
            hours: 1,
            color: 'shamrock',
            message: '',
        };
    }

    handleInputChange(e) {
        const sanitizedInput = sanitize(e.target.value);

        this.setState({[e.target.name]: sanitizedInput});
    }

    isValidSubmission(newEvent) {
        return Object.keys(newEvent).reduce((acc, item) => newEvent[item] && acc, true);
    }

    displayMessage(messageString) {
        this.setState({message: messageString});
        setTimeout(() => this.setState({message: ''}), 1500);
        return;
    }

    addEventFormSubmit(event) {
        event.preventDefault();
        const timestamp = new Date(`${this.state.date} ${this.state.startHour}`).getTime();
        const newEvent = {title: this.state.title,
            description: this.state.description,
            hours: this.state.hours,
            date: this.state.date,
            color: this.state.color,
            start: timestamp,
            id: Date.now(),
        };

        if (this.isValidSubmission(newEvent)) {
            this.props.dispatch(addEvent(newEvent));
            this.displayMessage('Event Created!');
            return;
        }
        this.displayMessage('Please Fill Out All Fields');
    }

    render() {
        return (
            <div>
                <h1 className="add-event-form__title">
                    Add an Event
                </h1>
                <form
                    className="add-event-form"
                    onSubmit={this.addEventFormSubmit.bind(this)}
                >
                    <div className="add-event-form__text-container">
                        <input
                            type="text"
                            name="title"
                            onChange={this.handleInputChange.bind(this)}
                            value={this.state.title}
                            className="add-event-form__title"
                            placeholder="Event name"
                        />
                        <textarea
                            type="text"
                            name="description"
                            onChange={this.handleInputChange.bind(this)}
                            value={this.state.description}
                            className="add-event-form__description"
                            placeholder="Describe your event"
                        />
                    </div>
                    <div className="add-event-form__date-container">
                        <input
                            name="date"
                            type="date"
                            value={this.state.date}
                            className="add-event-form__date"
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <input
                            name="startHour"
                            type="time"
                            value={this.state.startHour}
                            className="add-event-form__startHour"
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <select
                            name="color"
                            value={this.state.color}
                            onChange={this.handleInputChange.bind(this)}
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
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default connect(null)(AddEventForm);
