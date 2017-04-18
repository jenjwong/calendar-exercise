import React, {PureComponent} from 'react';
import {func, string} from 'prop-types';

export default class DayNavigator extends PureComponent {
    static propTypes = {
        dateDisplay: string.isRequired,
        onPrev: func.isRequired,
        onNext: func.isRequired,
    }

    render() {
        let {dateDisplay, onPrev, onNext} = this.props;

        return (
            <nav className="page__nav">
                <button
                    className="page__nav-button page__prev-day"
                    title="Go to previous day"
                    onClick={onPrev}
                />
                <h2 className="page__date">{dateDisplay}</h2>
                <nav className="page__nav">
                    <button
                        className="page__nav-button page__next-day"
                        title="Go to next day"
                        onClick={onNext}
                    />
                </nav>
            </nav>
        );
    }
}
