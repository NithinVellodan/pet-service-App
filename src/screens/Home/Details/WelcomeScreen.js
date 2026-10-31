import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

// theme
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';

// components
import DoubleColorHeading from '../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../components/headings/DescriptionHeading';
import BorderButton from '../../../components/buttons/BorderButton';
import ModalBox from '../includes/ModalBox';
import ModalScreen from '../../Profile-related/ModalScreen';
import TermsConditions from '../../Auth/privacy/TermsConditions';
import AccessDenied from '../../detail/includes/AccessDenied';

// svg
import ContactIcon from '../../../assets/icons/contact-icon.svg';
import DeviceIcon from '../../../assets/icons/devices.svg';

export default function WelcomeScreen({
    setVisible,
    setModalScreens,
    setCalModalVisible,
}) {
    const {state, dispatch} = useContext(Context);

    const [isLoading, setIsLoading] = useState(false);
    const [geoAddressText, setGeoAddressText] = useState('');
    const [exactLocation, setExactLocation] = useState({});

    const handleProvider = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    const getExactLocation = (myLat, myLon) => {
        fetch(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                myLat +
                ',' +
                myLon +
                '&key=' +
                'AIzaSyBqJ4ZZH7Ieb7hiQCQpEg3I2zDFi_f7c-A',
        )
            .then(response => response.json())
            .then(responseJson => {
                const results = responseJson.results[0];
                const {lat, lng} = results.geometry.location;
                const geoAddress =
                    responseJson.results[0].address_components[1].short_name;

                setGeoAddressText(geoAddress);
                setExactLocation({
                    ...exactLocation,
                    latitude: lat,
                    longitude: lng,
                });
                const userData = {
                    ...state.userData,
                    geoAddressText: geoAddress,
                    exactLocation: {latitude: lat, longitude: lng},
                    locationAdded: true,
                };
                handleProvider(userData);
            })
            .catch(error => {
                console.log('Error fetching location:', error);
            });
    };

    const getLocation = async () => {
        setIsLoading(true);
        if (Platform.OS === 'ios') {
            Geolocation.getCurrentPosition(
                position => {
                    const {latitude, longitude} = position.coords;
                    getExactLocation(latitude, longitude);
                },
                error => {
                    console.log('GetCurrentPosition Error:', error);
                    if (error.code === 1) {
                        console.log('User denied access to location services.');
                    } else {
                        console.log('Error:', error.message);
                    }
                },
                {enableHighAccuracy: true},
            );
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        pos => {
                            const crd = pos.coords;
                            getExactLocation(crd.latitude, crd.longitude);
                            setIsLoading(false);
                        },
                        error => {
                            console.log(
                                'Android Location Error:',
                                error.code,
                                error.message,
                            );
                            setIsLoading(false);
                        },
                        {enableHighAccuracy: true},
                    );
                } else {
                    setIsLoading(false);
                }
            } catch (err) {
                console.log('Android Location Error:', err);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getLocation();
            } catch (error) {
                console.log('Error requesting location permission:', error);
            }
        };
        fetchData();
    }, []);

    const [termsModal, setTermsModal] = useState(false);
    const [notTermsModal, setNotTermsModal] = useState(false);

    const goLogin = async () => {
        try {
            await AsyncStorage.clear();
            handleProvider({
                accessToken: '',
                accountStatus: '',
                exactLocation: {},
                geoAddressText: '',
                isPetDetailsAdded: false,
                isTermsAndCondition: false,
                isVerified: false,
                is_Firbase: {
                    email: '',
                    google_id_token: '',
                    is_fireBase: false,
                },
                is_login: false,
                is_service: false,
                is_skip: false,
                is_temp: false,
                locationAdded: false,
                mailId: '',
                name: '',
                phone: '',
                photo: '',
                profileMail: '',
                profileName: '',
                profilePhone: '',
                role: '',
                tempPk: '',
                user: {},
                firebaseName: null,
                firebaseEmail: null,
                firebaseUid: null,
                google_encrypt: null,
                isRegistered: false,
                store_add: null,
                trainer_add: null,
                store_name: '',
                profileAdded: false,
                additionalDataPetWish: [],
                additionalData: [],
                wishList: [],
                cart: [],
                notified: false,
            });
            setModalScreens('login');
        } catch (error) {
            console.log('Error clearing AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            {state.userData.name ? (
                <DoubleColorHeading
                    firstTitle={'Welcome'}
                    secondTitle={state.userData.name}
                    isCenter={true}
                />
            ) : (
                <DoubleColorHeading
                    firstTitle={'Welcome'}
                    secondTitle={'As Guest'}
                    isCenter={true}
                />
            )}
            <DescriptionHeading text={'Select to Continue'} />
            {!state.userData.is_login ? (
                <>
                    <BorderButton
                        buttonBackgroundColor={true}
                        label={'Continue as a Service Provider'}
                        icon={<DeviceIcon width={'100%'} height={'100%'} />}
                        onPress={() => {
                            if (state.userData.isTermsAndCondition) {
                                setModalScreens('detail-pets');
                                handleProvider({
                                    ...state.userData,
                                });
                            } else if (
                                state.userData.isTermsAndCondition === false &&
                                state.userData.is_login === false
                            ) {
                                setTermsModal(true);
                            } else {
                                setNotTermsModal(true);
                            }
                        }}
                    />
                    <BorderButton
                        buttonBackgroundColor={true}
                        label={'Cancel'}
                        onPress={() => {
                            setCalModalVisible(false);
                            setVisible(false);
                        }}
                    />
                </>
            ) : (
                <>
                    {!state.userData.store_add &&
                    !state.userData.trainer_add &&
                    !state.userData.pet_add &&
                    !state.userData.place_add ? (
                        <></>
                    ) : (
                        <BorderButton
                            buttonBackgroundColor={true}
                            onPress={() => {
                                if (state.userData.is_service) {
                                    setVisible(false);
                                    handleProvider({
                                        ...state.userData,
                                        is_temp: true,
                                        is_service: false,
                                    });
                                    setCalModalVisible(false);
                                } else {
                                    if (
                                        state.userData.is_login &&
                                        state.userData.isTermsAndCondition
                                    ) {
                                        setVisible(false);
                                        handleProvider({
                                            ...state.userData,
                                            is_temp: true,
                                            is_service: true,
                                        });
                                    } else {
                                        setNotTermsModal(true);
                                    }
                                }
                            }}
                            label={
                                state.userData.is_service
                                    ? 'Continue as a Customer'
                                    : 'Continue as a Service Provider'
                            }
                            icon={
                                state.userData.is_service ? (
                                    <ContactIcon
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                ) : (
                                    <DeviceIcon
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                )
                            }
                        />
                    )}

                    {state.userData.store_add ||
                    state.userData.trainer_add ||
                    state.userData.pet_add ||
                    state.userData.place_add ? (
                        <BorderButton
                            buttonBackgroundColor={true}
                            label={'Cancel'}
                            onPress={() => {
                                setCalModalVisible(false);
                                setVisible(false);
                            }}
                        />
                    ) : (
                        <>
                            <BorderButton
                                buttonBackgroundColor={true}
                                onPress={() => {
                                    if (state.userData.is_service) {
                                        setVisible(false);
                                        handleProvider({
                                            ...state.userData,
                                            is_temp: true,
                                            is_service: false,
                                        });
                                        setCalModalVisible(false);
                                    } else {
                                        if (state.userData.is_login) {
                                            if (
                                                state.userData
                                                    .isTermsAndCondition
                                            ) {
                                                setModalScreens('detail-pets');
                                                handleProvider({
                                                    ...state.userData,
                                                });
                                            } else if (
                                                state.userData
                                                    .isTermsAndCondition ===
                                                    false &&
                                                state.userData.is_login ===
                                                    false
                                            ) {
                                                setTermsModal(true);
                                            } else if (
                                                state.userData
                                                    .isTermsAndCondition ===
                                                    false &&
                                                state.userData.is_login === true
                                            ) {
                                                setNotTermsModal(true);
                                                setVisible(false);
                                            }
                                        } else {
                                        }
                                    }
                                }}
                                label={
                                    state.userData.is_service
                                        ? 'Continue as a Customer'
                                        : 'Continue as a Service Provider'
                                }
                                icon={
                                    state.userData.is_service ? (
                                        <ContactIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <DeviceIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    )
                                }
                            />
                            <BorderButton
                                buttonBackgroundColor={true}
                                label={'Cancel'}
                                onPress={() => {
                                    setCalModalVisible(false);
                                    setVisible(false);
                                }}
                            />
                        </>
                    )}
                </>
            )}

            <ModalBox
                isVisible={termsModal}
                setVisible={setTermsModal}
                inner={
                    <View style={styles.termsContainer}>
                        <View style={styles.headText}>
                            <Text
                                allowFontScaling={false}
                                style={styles.headText}>
                                Terms and Conditions not
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.headText}>
                                Accepted..!
                            </Text>
                        </View>
                        <Text
                            allowFontScaling={false}
                            style={styles.description}>
                            Please choose an option
                        </Text>
                        <View style={styles.termsButton}>
                            <TouchableOpacity
                                style={styles.termsCancel}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setTermsModal(false);
                                }}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.termsCancelText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.termsLogin}
                                activeOpacity={0.8}
                                onPress={() => {
                                    goLogin();
                                }}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.termsLoginText}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
            <ModalScreen
                isVisible={notTermsModal}
                setVisible={setNotTermsModal}
                inner={
                    <TermsConditions
                        close={setNotTermsModal}
                        termsAccept={true}
                        setModalScreens={setModalScreens}
                    />
                }
            />
            {/* <ModalBox
                isVisible={termsModal}
                setVisible={setTermsModal}
                inner={<AccessDenied setTermsModal={setTermsModal} />}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(32),
        height: SIZES.height,
        justifyContent: 'center',
    },
    termsContainer: {
        paddingVertical: SIZE(40),
        paddingHorizontal: SIZE(32),
        width: SIZE(347),
    },
    headText: {
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: SIZE(20),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(25),
        color: '#242424',
    },
    description: {
        marginTop: SIZE(12),
        marginBottom: SIZE(32),
        alignSelf: 'center',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        lineHeight: SIZE(17.5),
        alignItems: 'center',
        color: '#686868',
    },
    termsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    termsCancel: {
        borderRadius: SIZE(6),
        paddingVertical: SIZE(10),
        width: SIZE(132),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#003459',
    },
    termsCancelText: {
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
        color: '#003459',
    },
    termsLogin: {
        borderRadius: SIZE(6),
        paddingVertical: SIZE(10),
        width: SIZE(132),
        alignItems: 'center',
        backgroundColor: '#009FD3',
    },
    termsLoginText: {
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
        color: '#FFF',
    },
});
