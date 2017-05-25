import DATA_SET from '../utils/data';
import {ADD_EVENT, SET_DAY, CHANGE_DAY} from '../actions/actions';
import {MILLISECONDS_DAY} from '../utils/constants';

const DEFAULT_STATE = {
    events: DATA_SET,
    day: Date.now(),
    selectedEventId: undefined,
};

const event = (state, action) => {
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

const events = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ADD_EVENT:
            return {
                ...state,
                events: [...state.events, event(undefined, action)],
            };
        case SET_DAY:
            return {
                ...state,
                day: action.day,
            };
        case CHANGE_DAY:
            return {
                ...state,
                day: state.day + (MILLISECONDS_DAY * action.day),
            };
        default:
            return state;
    }
};

export default events;
