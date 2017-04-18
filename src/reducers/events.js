import DATA_SET from '../utils/data';
import {ADD_EVENT} from '../actions/actions';

const event = (state={}, action) => {
    switch (action.type) {
        case ADD_EVENT:
            return {
                id: action.event.id,
                title: action.event.title,
                description: action.event.description,
                start: action.event.start,
                hours: action.event.hours,
                color: action.event.color,
            };
        default:
            return state;
    }
};

const events = (state=DATA_SET, action) => {
    switch (action.type) {
        case ADD_EVENT:
            return [
                ...state,
                event(undefined, action),
            ];
        default:
            return state;
    }
};

export default events;
