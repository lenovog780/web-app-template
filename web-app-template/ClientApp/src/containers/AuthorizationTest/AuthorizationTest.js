import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

class AuthorizationTest extends Component {

    componentDidMount() {
        this.props.onGetData({
            startDateIndex: 0,
            token: this.props.token
        });
    }

    onButtonClickHandler = (index) => {
        this.props.onGetData({
            startDateIndex: index,
            token: this.props.token
        });
    }

    render() {

        let data = <Spinner />;
        if (this.props.isLoading === false) {
            if (this.props.forecasts) {
                data = (
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Temp. (C)</th>
                                <th>Temp. (F)</th>
                                <th>Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.forecasts.map(forecast =>
                                <tr key={forecast.dateFormatted}>
                                    <td>{forecast.dateFormatted}</td>
                                    <td>{forecast.temperatureC}</td>
                                    <td>{forecast.temperatureF}</td>
                                    <td>{forecast.summary}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                );
            }
            else {
                data = <p>ERROR {this.props.error}</p>;
            }
        }

        return (
            <div>
                <h1>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {data}
                <p className='clearfix text-center'>
                    <Button clicked={() => this.onButtonClickHandler(this.props.startDateIndex - 5)}>Previous</Button>
                    <Button clicked={() => this.onButtonClickHandler(this.props.startDateIndex + 5)}>Next</Button>
                    {this.props.isLoading ? <span>Loading...</span> : null}
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        forecasts: state.serverData.data,
        startDateIndex: state.serverData.startDateIndex,
        isLoading: state.serverData.isLoading,
        error: state.serverData.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetData: (payload) => dispatch(actions.getDataWithAuthorization(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationTest);