import firebase from 'firebase';
import * as config from './config';

firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain
});

export default firebase;