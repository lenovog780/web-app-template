import firebase from 'firebase';
import * as config from './config';

const instance = firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain
});

export default instance;