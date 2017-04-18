import React from 'react';
import {Route} from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
// Not my idea, but it was so good it had to be implemented!
// https://github.com/ReactTraining/react-router/issues/4351

import '../containers/PageContainer.css';

const CSSTransitionRoute = ({transitionName, ...rest}) => (
    <Route
        render={({location}) => (
            <CSSTransitionGroup
                transitionName="example"
                // transitionAppear={true}
                // transitionAppearTimeout={900}
                transitionEnterTimeout={900}
                transitionLeaveTimeout={900}
            >
                <Route
                    location={location}
                    // key={location.key}
                    {...rest}
                />
            </CSSTransitionGroup>
        )}
    />
);

export default CSSTransitionRoute;
