import React, {PureComponent} from 'react';

import './ColorFilter.css';

const ColorButton = ({title, handleClick}) => (
    <button
        className={`button__color-filter button__color-filter--${title}`}
        onClick={handleClick}
    >
        {title}
    </button>
);

export default class ColorFilter extends PureComponent {

    render() {
        let {setColorFilter, events} = this.props;
        let colors = new Set(events.map((event) => event.color));
        let colorButtons = [...colors].map((color) => (
            <ColorButton
                title={color}
                key={color}
                handleClick={setColorFilter.bind(null, color)}
            />
        ));

        return (
            <div className="button__color-filter--wrapper">
                {colorButtons}
                <ColorButton title="all events" key={'all'} handleClick={setColorFilter.bind(null, '')} />
            </div>
        );
    }
}
