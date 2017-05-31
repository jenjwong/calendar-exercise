import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {setColorFilter} from '../actions/actionCreators';
import {bindActionCreators} from 'redux';
import ColorFilter from '../components/ColorFilter';

class ColorFilterContainer extends PureComponent {
    render() {
        return (
            <ColorFilter {...this.props} />
        );
    }
}

const mapStateToProps = (state) => ({events: state.events});

const mapDispatchToProps = (dispatch) => ({
    setColorFilter: bindActionCreators(setColorFilter, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorFilterContainer);
