import {Linking, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// packages
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import notifee from '@notifee/react-native';
import Modal from 'react-native-modal';
import RNShake from 'react-native-shake';

//constants
import {Context} from '../contexts/Store';
import {DEMO_PROFILE} from '../demo/demoApi';

// components
import MainStack from './MainStack';
import NoInternet from '../screens/includes/NoInternet';
import RatingExample from '../screens/common/includes/AppReviewModal';
import {SIZE} from '../theme/theme';
import {View} from 'react-native';
import ShakeInfoModal from '../screens/common/includes/ShakeInfoModal';
import ShakeSupportModal from '../screens/common/includes/ShakeSupportModal';

const Navigation = ({isConnected}) => {
    const {state, dispatch} = useContext(Context);
    const toast = useToast();
    const [notificationData, setNotificationData] = useState({});
    const [reviewModal, setReviewModal] = useState(false);
    const [shakeInfoModal, setShakeInfoModal] = useState(false);
    const [shakeSupportModal, setShakeSupportModal] = useState(false);

    const config = {
        screens: {
            MainStackReturn: {
                path: 'place-to-stay/:pk',
            },
        },
    };

    const linking = {
        prefixes: [
            'PetToPlace://',
            'https://pet-to-place.talrop.works',
            'https://petme.alwafaagroup.com',
        ],
        config,
        async getInitialURL() {
            const url = await Linking.getInitialURL();
            if (typeof url === 'string') {
                return url;
            }

            const initialNotification = await notifee.getInitialNotification();
            setNotificationData(initialNotification);

            const initialURL = await Linking.getInitialURL();
            if (typeof initialURL === 'string') {
                return initialURL;
            }

            return null;
        },
        subscribe(listener) {
            const onReceiveURL = ({url}) => listener(url);

            const linkingSubscription = Linking.addEventListener(
                'url',
                onReceiveURL,
            );

            return () => {
                linkingSubscription.remove();
            };
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userData');
                const storedReadSection = await AsyncStorage.getItem(
                    'readSection',
                );
                const storedModalSection = await AsyncStorage.getItem(
                    'commonModal',
                );

                if (storedUserData) {
                    try {
                        const parsedUserData = JSON.parse(storedUserData);
                        dispatch({
                            type: 'UPDATE_USER_DATA',
                            userData: {
                                ...parsedUserData,
                                ...DEMO_PROFILE,
                                is_login: true,
                                is_service: parsedUserData.is_service || false,
                            },
                        });
                    } catch (error) {
                        console.log('Error parsing userData:', error);
                    }
                }

                if (storedReadSection) {
                    try {
                        const parsedReadSection = JSON.parse(storedReadSection);
                        dispatch({
                            type: 'UPDATE_READ_SECTION',
                            readSection: parsedReadSection,
                        });
                    } catch (error) {
                        console.log('Error parsing readSection:', error);
                    }
                }

                if (storedModalSection) {
                    try {
                        const parsedModalSection =
                            JSON.parse(storedModalSection);
                        dispatch({
                            type: 'UPDATE_MODAL_SECTION',
                            commonModal: parsedModalSection,
                        });
                    } catch (error) {
                        console.log('Error parsing readSection:', error);
                    }
                }
            } catch (error) {
                console.log('Error fetching data from AsyncStorage:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const subscription = RNShake.addListener(() => {
            if (state.commonModal.shakeInfoModal) {
                setShakeInfoModal(true);
            } else {
                setShakeSupportModal(true);
            }
        });
        return () => {
            subscription.remove();
        };
    }, [state.commonModal.shakeInfoModal]);

    useEffect(() => {
        if (state.commonModal.appRatingModal) {
            setReviewModal(true);
        } else {
            setReviewModal(false);
        }
    }, [state.commonModal.appRatingModal]);

    const backgroundStyle = {
        flex: 1,
        backgroundColor: !state.userData.is_service ? '#024474' : '#007EA7',
    };
    return (
        <NavigationContainer linking={linking}>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar barStyle={'light-content'} />
                <MainStack notificationData={notificationData} />
                {isConnected !== true && <NoInternet />}
                <Modal
                    isVisible={reviewModal}
                    style={{
                        height: '100%',
                        overflow: 'hidden',
                    }}>
                    <View
                        style={{
                            height: SIZE(500),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <RatingExample setReviewModal={setReviewModal} />
                    </View>
                </Modal>
                <Modal
                    isVisible={shakeInfoModal}
                    style={{
                        height: '100%',
                        overflow: 'hidden',
                    }}>
                    <View
                        style={{
                            height: SIZE(280),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <ShakeInfoModal setShakeInfoModal={setShakeInfoModal} />
                    </View>
                </Modal>
                <Modal
                    isVisible={shakeSupportModal}
                    style={{
                        height: '100%',
                        overflow: 'hidden',
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <ShakeSupportModal
                            setShakeSupportModal={setShakeSupportModal}
                        />
                    </View>
                </Modal>
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default Navigation;

const styles = StyleSheet.create({});
