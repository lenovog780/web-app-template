import axios from '../../axios/axios-auth';
import * as actionTypes from './actionTypes';
import { apiKey } from '../../firebase/config';

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS
    };
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};

export const register = (payload) => {
    return dispatch => {
        dispatch(registerStart());

        const authData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }

        axios.post(`signupNewUser?key=${apiKey}`, authData)
            .then(() => {
                dispatch(registerSuccess());
            })
            .catch(err => {
                dispatch(registerFail(err.response.status));
            });
    }
};