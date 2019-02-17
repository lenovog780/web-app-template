import firebaseAuth from '../../firebase/firebase-auth';
import axios from '../../axios/axios-fetch-data';
import AuthStore from '../localStorage/auth';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: payload.token,
        userId: payload.userId,
        userName: payload.userName,
        userEmail: payload.userEmail,
        userPhoto: payload.userPhoto,
        provider: payload.provider
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const setAuthTimeout = (expirationDate) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationDate.getTime() - new Date().getTime());
    };
};

export const authStateChanged = () => {
    return dispatch => {
        firebaseAuth.auth().onAuthStateChanged(user => {
            if (user) {
                user.getIdTokenResult()
                    .then(response => {
                        const userAuthObj = {
                            token: response.token,
                            expirationDate: new Date(response.expirationTime),
                            userId: user.uid,
                            userName: user.displayName ? user.displayName : user.email,
                            userEmail: user.email,
                            userPhoto: user.photoURL,
                            provider: response.signInProvider === "password" ? "email" : response.signInProvider
                        };
                        AuthStore.setUserAuthObj(userAuthObj);
                        dispatch(authSuccess(userAuthObj));
                        dispatch(storeUser(userAuthObj));
                    }).catch(err => {
                        dispatch(authFail(err));
                    });

            } else {
                dispatch(logout());
            }
        });
    }
};

const storeUser = (userAuthObj) => {
    axios.post('/api/user/storeUser',
        {
            UId: userAuthObj.userId,
            DisplayName: userAuthObj.userName,
            Email: userAuthObj.userEmail,
            Provider: userAuthObj.provider
        })
        .then(() => {

        })
        .catch(err => {

        });
};

export const autoLogin = () => {
    return dispatch => {
        const userAuthObj = AuthStore.getUserAuthObj();
        if (userAuthObj) {
            const expisrationDate = new Date(userAuthObj.expirationDate);
            if (expisrationDate > new Date()) {
                dispatch(authSuccess(userAuthObj));
                dispatch(setAuthTimeout(expisrationDate));
            } else {
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
    };
};

export const logout = () => {
    AuthStore.removeUserAuthObj();

    firebaseAuth.auth().signOut()
        .then(() => {
            // Sign-out successful.
        }).catch(err => {
            // An error happened.
        });

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};