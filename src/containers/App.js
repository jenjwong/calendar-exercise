import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Page from './PageContainer';
import store from '../store';

const App = () => (
    <Router>
        <Provider store={store}>
            <div>
                <Route path="/" component={Page} />
            </div>
        </Provider>
    </Router>
);

const event = {
        color:"shamrock",
        date:"2017-05-27",
        description:"test Event!!!!",
        hours:36,
        id:1495918103746,
        start:1495911600000,
        title:"TEST EVENT!!!!"
}

store.dispatch({type: 'ADD_EVENT', event});

export default App;
