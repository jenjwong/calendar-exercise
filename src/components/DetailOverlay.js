import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

import './DetailOverlay.css';

export default class DetailOverlay extends PureComponent {
    _handleClick(e) {
        e.stopPropagation();
    }

    render() {
        return (
            <section
                className="event-detail-overlay"
                onClick={this._handleClick}
                role="button"
                tabIndex="0"
            >
                <div className="event-detail-overlay__container b-r-5">
                    <Link to={{pathname: this.props.onClose}}>
                        <div className="event-detail-overlay__close" title="Close detail view" />
                    </Link>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </section>
        );
    }
}
