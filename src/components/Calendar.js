import React, {PureComponent} from 'react';
import {node} from 'prop-types';

import './Calendar.css';

export default class Calendar extends PureComponent {
    static propTypes = {
        children: node.isRequired,
    }

    render() {
        return (
            <main className="calendar b-r-5">
                {this.props.children}
            </main>
        );
    }
}
