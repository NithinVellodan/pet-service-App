import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import {Platform, Alert, AppState} from 'react-native';
// import NavigationService from '../Navigation/NavigationService';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {usersConfigGeneral} from '../../axiosConfig';

export async function requestUserPermission(state) {
    const name = state.userData.name;

    if (Platform.OS === 'ios') {
        await notifee.requestPermission();
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        // console.log('Authorization status:', authStatus);
        // getFcmToken();
        const fcmToken = await getFcmToken();
        if (fcmToken !== '' && name !== '') {
            await sendDeviceRegistrationToBackend(fcmToken, name, state);
            await saveTokenToFirestore(fcmToken, state);
        } else {
        }

        // console.log(fcmToken, 'fcmTokenfcmTokenfcmToken');
    }
}

const getFcmToken = async () => {
    try {
        const token = await messaging().getToken();
        // console.log('fcm token:', token);
        return token;
    } catch (error) {
        console.log('error in creating token');
        throw error;
    }
};

async function sendDeviceRegistrationToBackend(token, name, state) {
    try {
        const config = {
            headers: {},
        };
        if (state.userData.is_login) {
            config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
        }
        const response = await usersConfigGeneral.post(
            'create-fcm-device/',
            {
                registration_id: token,
                name: name,
                type: Platform.OS,
            },
            config,
        );
        console.log('Device registration response:', response.data);
        // return response.data;
    } catch (error) {
        console.log('Error registering device with backend:', error);
        throw error;
    }
}
const saveTokenToFirestore = async (token, state) => {
    try {
        const userId = state?.userData?.firebaseUid;
        if (userId) {
            await firestore()
                .collection('users')
                .doc(userId)
                .update({fcmToken: token});
        }
    } catch (error) {
        console.log('Error saving FCM token to Firestore:', error);
        throw error;
    }
};
