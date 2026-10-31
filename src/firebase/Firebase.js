import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyApkC446G90Esu3x2vMvMW-_xTRmegYyhc',
    authDomain: 'pet2place.firebaseapp.com',
    projectId: 'pet2place',
    storageBucket: 'pet2place.appspot.com',
    messagingSenderId: '181768224345',
    appId: '1:181768224345:android:44fd84cf389d4701c43b48',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default {firebase, auth};
