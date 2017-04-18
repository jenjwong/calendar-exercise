import {ADD_EVENT, CHANGE_DAY} from './actions';

export const addEvent = (event) => ({
    type: ADD_EVENT, event,
});

export const changeDay = (day) => ({
    type: CHANGE_DAY, day,
});
