import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    data: null,
    startDateIndex: 0,
    isLoading: true,
    error: null
};

const getDataFromServer = (state, action) => {
    return updateObject(state, {
        startDateIndex: action.startDateIndex,
        isLoading: true,
        error: null
    });
};

const getDataFromServerSuccess = (state, action) => {
    return updateObject(state, {
        data: action.data,
        isLoading: false,
        error: null
    });
};

const getDataFromServerFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_FROM_SERVER: return getDataFromServer(state, action);
        case actionTypes.GET_DATA_FROM_SERVER_SUCCESS: return getDataFromServerSuccess(state, action);
        case actionTypes.GET_DATA_FROM_SERVER_FAIL: return getDataFromServerFail(state, action);
        default: return state;
    }
};

export default reducer;