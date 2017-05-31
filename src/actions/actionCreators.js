import {ADD_EVENT, SET_COLOR_FILTER, CHANGE_DAY} from './actions';

export const addEvent = (event) => ({
    type: ADD_EVENT, event,
});

export const changeDay = (day) => ({
    type: CHANGE_DAY, day,
});

export const setColorFilter = (color) => ({
    type: SET_COLOR_FILTER, color,
});
