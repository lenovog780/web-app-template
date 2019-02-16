import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

firebase.initializeApp({
    apiKey: "AIzaSyAbv228b_3iOQTQcELPRoDNV2hBQ-NJSLg",
    authDomain: "web-app-template-60da4.firebaseio.com"
})

class Auth extends Component {

    state = {
        isAuth: false
    };

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    };

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.props.onAuthenticate(user);
            console.log("user", user)
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={firebase.auth()} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (payload) => dispatch(actions.authenticate(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);