import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    loading: false,
    success: false
};

const registerStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        success: false
    });
};

const registerSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        success: true
    });
};

const registerFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        success: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_START: return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        default: return state;
    }
};

export default reducer;