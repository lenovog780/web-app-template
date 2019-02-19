import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    success: null,
    isLoading: null,
    error: null
};

const ping = (state, action) => {
    return updateObject(state, {
        success: null,
        isLoading: true,
        error: null
    });
};

const pingSuccess = (state, action) => {
    return updateObject(state, {
        success: true,
        isLoading: false,
        error: null
    });
};

const pingFail = (state, action) => {
    return updateObject(state, {
        success: false,
        isLoading: false,
        error: action.error
    });
};

const pingReset = (state, action) => {
    return updateObject(state, {
        success: null,
        isLoading: null,
        error: null
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PING: return ping(state, action);
        case actionTypes.PING_SUCCESS: return pingSuccess(state, action);
        case actionTypes.PING_FAIL: return pingFail(state, action);
        case actionTypes.PING_RESET: return pingReset(state, action);
        default: return state;
    }
};

export default reducer;