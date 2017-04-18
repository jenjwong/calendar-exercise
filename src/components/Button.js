import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {string} from 'prop-types';

import './Button.css';

export default class Button extends PureComponent {
    static propTypes = {
        path: string.isRequired,
        name: string.isRequired,
    }
    render() {
        let {path, name} = this.props;

        return (
            <Link to={{pathname: path}}>
                <div className="page__title" title={name}>
                    <p>&#65291; {name}</p>
                </div>
            </Link>
        );
    }

}
