import {SET_COLOR_FILTER} from '../actions/actions';

const colorFilter = (state='', action) => {
    switch (action.type) {
        case SET_COLOR_FILTER:
            return action.color;
        default:
            return state;
    }
};

export default colorFilter;
