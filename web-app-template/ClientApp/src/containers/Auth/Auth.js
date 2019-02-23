import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import firebaseAuth from '../../firebase/firebase-auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        uiConfig: {
            signInFlow: "popup",
            signInOptions: [
                firebaseAuth.auth.GoogleAuthProvider.PROVIDER_ID,
                firebaseAuth.auth.FacebookAuthProvider.PROVIDER_ID,
                firebaseAuth.auth.GithubAuthProvider.PROVIDER_ID,
                firebaseAuth.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccess: () => false
            }
        }
    }

    componentDidMount = () => {
        this.props.onAuthStateChanged();
    }

    onRegisterClickHandler = () => {
        this.props.history.push('/register');
    }

    render() {

        let register = null;

        if (this.props.loading === false) {
            register = (
                <div className={classes.Auth}>
                    <Button type="Success" clicked={this.onRegisterClickHandler}>CREATE NEW ACCOUNT</Button>
                </div>
            );
        }

        return (
            <React.Fragment>
                <StyledFirebaseAuth
                    uiConfig={this.state.uiConfig}
                    firebaseAuth={firebaseAuth.auth()} />
                {register}
            </React.Fragment>
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