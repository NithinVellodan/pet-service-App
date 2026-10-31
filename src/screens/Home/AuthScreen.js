import {BackHandler, StyleSheet, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

// components
import Login from '../Auth/Login';
import EnterPassword from '../Auth/EnterPassword';
import ForgotPassword from '../Auth/ForgotPassword';
import ResetPassword from '../Auth/ResetPassword';
import SignUp from '../Auth/SignUp';
import OtpVerification from '../Auth/OtpVerification';
import SetPassword from '../Auth/SetPassword';
import DetailsPet from '../detail/DetailsPet';

// theme
import {SIZE} from '../../theme/theme';
import TermsConditions from '../Auth/privacy/TermsConditions';
import WelcomeScreen from './Details/WelcomeScreen';
import {Context} from '../../contexts/Store';
import SuccessfulPage from '../successScreen/SuccessfulPage';
import LocationPage from './Details/LocationPage';

const AuthScreen = ({
    setCalModalVisible,
    modalScreens,
    setModalScreens,
    toastRef,
}) => {
    const {state, dispatch} = useContext(Context);
    const [showToast, setShowToast] = useState(false);
    const [emailF, setEmailF] = useState('');
    const [resetPasswordPk, setResetPasswordPk] = useState('');
    const [isOpen, setOpen] = useState(true);
    const [checkType, setCheckType] = useState('');
    const [routeDAta, setRouteData] = useState('');
    const [isPhone, setPhoneNumber] = useState(false);
    const [prevModal, setPrevModal] = useState('login');
    const [prevType, setPrevType] = useState('mail');
    const [onBack, setOnBack] = useState(false);
    const [currentLocation, setCurrentLocation] = useState();
    const [addressText, setAddressText] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [exactLocation, setExactLocation] = useState({
        latitude: '',
        longitude: '',
    });
    const [selectedCountry, setSelectedCountry] = useState({
        alpha2code: 'AE',
        alpha3code: 'ARE',
        country_code: '+971',
        flag_url:
            'https://pet-to-place.talrop.works/media/countries/flags/Flag_0f_United_Arab_Emirates.png',
        id: '238',
        name: 'United Arab Emirates',
        phone_number_length: 9,
    });

    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    // location
    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    const handleLocationSubmit = () => {
        setErrorMessage('');
        updateUserDate({
            ...state.userData,
            geoAddressText: currentLocation,
            exactLocation: exactLocation,
            locationAdded: true,
        });
        setModalScreens('detail');
    };

    // Auth and onboarding sheets stay closed so the main screens can be reviewed.
    // useEffect(() => {
    //     if (!state.userData.is_login && !state.userData.is_skip) {
    //         // setCalModalVisible(true);
    //     } else if (
    //         state.userData.is_login &&
    //         !state.userData.isPetDetailsAdded
    //     ) {
    //         setModalScreens('detail');
    //         setCalModalVisible(true);
    //     } else if (!state.userData.is_login && state.userData.is_skip) {
    //         setIs_Firbase({});
    //         setModalScreens('detail');
    //         setCalModalVisible(true);
    //     } else if (
    //         state.userData.is_login &&
    //         state.userData.isPetDetailsAdded
    //     ) {
    //         // setCalModalVisible(false);
    //     }
    // }, [
    //     state.userData.is_login,
    //     state.userData.is_skip,
    //     state.userData.isPetDetailsAdded,
    // ]);

    useEffect(() => {
        if (modalScreens === 'login' && onBack) {
            const backHandler = BackHandler.exitApp();
            return () => backHandler.remove();
        }
        setOnBack(false);
    }, [onBack]);

    return (
        <View
            style={{
                backgroundColor: '#f7f7f7',
                borderTopRightRadius: SIZE(32),
                borderTopLeftRadius: SIZE(32),
                flex: 1,
                paddingTop: SIZE(30),
            }}>
            {modalScreens === 'login' ? (
                <Login
                    setModalScreens={setModalScreens}
                    setRouteData={setRouteData}
                    setPhoneNumber={setPhoneNumber}
                    setCheckType={setCheckType}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    setPrevModal={setPrevModal}
                    setPrevType={setPrevType}
                    setIs_Firbase={setIs_Firbase}
                    toastRef={toastRef}
                />
            ) : modalScreens === 'enter-password' ? (
                <EnterPassword
                    setModalScreens={setModalScreens}
                    setVisible={setOpen}
                    routeDAta={routeDAta}
                    setOpen={setOpen}
                    setPrevModal={setPrevModal}
                    checkType={checkType}
                    setRouteData={setRouteData}
                    setPrevType={setPrevType}
                    is_Firbase={is_Firbase}
                />
            ) : modalScreens === 'sign-up' ? (
                <SignUp
                    prevType={prevType}
                    setModalScreens={setModalScreens}
                    routeDAta={routeDAta}
                    isPhone={isPhone}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    setPrevModal={setPrevModal}
                    is_Firbase={is_Firbase}
                />
            ) : modalScreens === 'forgot-password' ? (
                <ForgotPassword
                    emailF={emailF}
                    setEmailF={setEmailF}
                    setPrevModal={setPrevModal}
                    setModalScreens={setModalScreens}
                    setShowToast={setShowToast}
                    toastRef={toastRef}
                />
            ) : modalScreens === 'otp-verification' ? (
                <OtpVerification
                    setModalScreens={setModalScreens}
                    emailF={emailF}
                    setEmailF={setEmailF}
                    setPrevModal={setPrevModal}
                    setResetPasswordPk={setResetPasswordPk}
                    setVisible={() => {
                        setOpen(false);
                    }}
                />
            ) : modalScreens === 'reset-password' ? (
                <ResetPassword
                    emailF={emailF}
                    resetPasswordPk={resetPasswordPk}
                    setPrevModal={setPrevModal}
                    setModalScreens={setModalScreens}
                />
            ) : modalScreens === 'set-password' ? (
                <SetPassword
                    setPrevModal={setPrevModal}
                    setModalScreens={setModalScreens}
                    setVisible={() => {
                        setOpen(false);
                    }}
                    is_Firbase={is_Firbase}
                />
            ) : modalScreens === 'terms-and-conditions' ? (
                <TermsConditions
                    setPrevModal={setPrevModal}
                    setModalScreens={setModalScreens}
                    setVisible={() => {
                        setOpen(false);
                    }}
                />
            ) : modalScreens === 'detail' ? (
                <WelcomeScreen
                    setVisible={() => {
                        setOpen(false);
                    }}
                    setModalScreens={setModalScreens}
                    setCalModalVisible={setCalModalVisible}
                />
            ) : modalScreens === 'detail-pets' ? (
                <DetailsPet
                    setCalModalVisible={setCalModalVisible}
                    toastRef={toastRef}
                />
            ) : modalScreens === 'SuccessfulPage' ? (
                <SuccessfulPage setModalScreens={setModalScreens} />
            ) : null}
        </View>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {},
});
