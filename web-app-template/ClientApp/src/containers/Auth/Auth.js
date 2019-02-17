import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        uiConfig: {
            signInFlow: "popup",
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccess: () => false
            }
        }
    }

    componentDidMount = () => {
        this.props.onAuthStateChanged();
    }

    render() {
        return (
            <StyledFirebaseAuth
                uiConfig={this.state.uiConfig}
                firebaseAuth={firebase.auth()} />
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
        onAuthStateChanged: () => dispatch(actions.authStateChanged())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);