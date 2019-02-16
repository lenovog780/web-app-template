import axios from '../../axios/axios-auth';
import * as config from '../../axios/config';
import * as actionTypes from './actionTypes';
import AuthStore from '../localStorage/auth';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: payload.token,
        userId: payload.userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    AuthStore.removeUserAuthObj();
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const setAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const autoLogin = () => {
    return dispatch => {
        const userAuthObj = AuthStore.getUserAuthObj();
        if (userAuthObj) {
            if (new Date(userAuthObj.expirationDate) > new Date()) {
                dispatch(authSuccess(userAuthObj));
                dispatch(setAuthTimeout((new Date(userAuthObj.expirationDate).getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
    };
};

export const authenticate = (payload) => {
    return dispatch => {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        const userAuthObj = {
            token: payload.ra,
            userId: payload.email,
            expirationDate: expirationDate
        };
        AuthStore.setUserAuthObj(userAuthObj);

        dispatch(authSuccess(userAuthObj));
    };
};