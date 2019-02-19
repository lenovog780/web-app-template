import axios from 'axios';
import { baseURL } from '../../axios/axios-fetch-data';

import * as actionTypes from './actionTypes';

export const ping = () => {
    return {
        type: actionTypes.PING
    };
};

export const pingSuccess = () => {
    return {
        type: actionTypes.PING_SUCCESS
    };
};

export const pingFail = (error) => {
    return {
        type: actionTypes.PING_FAIL,
        error: error
    };
};

export const pingReset = () => {
    return {
        type: actionTypes.PING_RESET
    };
};

export const setPingTimeout = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(pingReset());
        }, 2500);
    };
};

export const getDataWithoutAuthorization = () => {
    return dispatch => {
        dispatch(ping());

        axios.post(`${baseURL}api/data/ping`)
            .then(res => {
                dispatch(pingSuccess(null));
                dispatch(setPingTimeout());
            })
            .catch(err => {
                dispatch(pingFail(err.message));
                dispatch(setPingTimeout());
            });
    };
};