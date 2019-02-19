import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import classes from './Ping.module.css';

class Ping extends Component {

    onPingClickHandler = () => {
        this.props.onPing();
    }

    render() {

        let pingResult = null;
        if (this.props.isLoading === true) {
            pingResult = <p>LOADING</p>;
        } else {
            if (this.props.success === true) {
                pingResult = <p style={{ color: 'green' }}>SUCCESS</p>;
            } else if (this.props.success === false) {
                pingResult = <p style={{ color: 'red' }}>FAIL</p>;
            }
        }

        return (
            <div className={classes.Ping}>
                <Button clicked={this.onPingClickHandler}>PING</Button>
                {pingResult}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        success: state.ping.success,
        isLoading: state.ping.isLoading,
        error: state.ping.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPing: () => dispatch(actions.getDataWithoutAuthorization())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ping);