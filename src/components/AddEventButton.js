import React from 'react';
import {Link} from 'react-router-dom';

const AddEventButton = () => (
    <Link to={{pathname: '/addEvent'}}>
        <div className="add-task-button" title="Add New Event">
                &#65291; Add Event
            </div>
    </Link>
    );

export default AddEventButton;
