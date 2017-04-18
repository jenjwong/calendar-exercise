import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addEvent} from '../actions/actionCreators';
import sanitize from 'sanitize-caja';
import AddEventForm from '../components/AddEventForm';

class AddEventFormContainer extends PureComponent {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            startHour: '09:00',
            date: '',
            hours: 24,
            color: 'shamrock',
            message: '',
        };
    }


    _handleInputChange(e) {
        const sanitizedInput = sanitize(e.target.value);

        this.setState({[e.target.name]: sanitizedInput});
    }

    _isValidSubmission(newEvent) {
        return Object.keys(newEvent).reduce((acc, item) => newEvent[item] && acc, true);
    }

    _displayMessage(messageString) {
        this.setState({message: messageString});
        setTimeout(() => this.setState({message: ''}), 1500);
        return;
    }

    _handleAddEventFormSubmit(event) {
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

        if (this._isValidSubmission(newEvent)) {
            this.props.addEvent(newEvent);
            this._displayMessage('Event Created!');
            return;
        }
        this._displayMessage('Please Fill Out All Fields');
    }

    render() {
        return (
            <AddEventForm
                _handleInputChange={this._handleInputChange.bind(this)} onAddEventFormSubmit={this._handleAddEventFormSubmit.bind(this)}
                {...this.props}
            />
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
    addEvent: bindActionCreators(addEvent, dispatch),
});

export default connect(null, mapDispatchToProps)(AddEventFormContainer);
