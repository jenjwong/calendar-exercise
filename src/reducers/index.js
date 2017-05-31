import {combineReducers} from 'redux';
import events from './events';
import day from './day';
import colorFilter from './colorFilter';

export default combineReducers({events, day, colorFilter});
