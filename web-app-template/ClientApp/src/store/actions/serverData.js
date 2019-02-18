import axios from '../../axios/axios-fetch-data';

import * as actionTypes from './actionTypes';

export const getData = (startDateIndex) => {
    return {
        type: actionTypes.GET_DATA_FROM_SERVER,
        startDateIndex: startDateIndex
    };
};

export const getDataSuccess = (payload) => {
    return {
        type: actionTypes.GET_DATA_FROM_SERVER_SUCCESS,
        data: payload
    };
};

export const getDataFail = (error) => {
    return {
        type: actionTypes.GET_DATA_FROM_SERVER_FAIL,
        error: error
    };
};

export const getDataWithAuthorization = (payload) => {
    return dispatch => {

        dispatch(getData(payload.startDateIndex));

        axios.post('api/data/getData?startDateIndex=' + payload.startDateIndex)
            .then(response => {
                dispatch(getDataSuccess(response.data));
            })
            .catch(err => {
                dispatch(getDataFail(err.response.status));
            });
    };
};