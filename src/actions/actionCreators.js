import {ADD_EVENT, SET_DAY, CHANGE_DAY} from './actions';

export const addEvent = event => ({
    type: ADD_EVENT, event,
});

export const setDay = day => ({
    type: SET_DAY, day,
});

export const changeDay = day => ({
    type: CHANGE_DAY, day,
});
