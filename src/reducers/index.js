import {combineReducers} from 'redux';
import events from './events';
import day from './day';

export default combineReducers({events, day});
