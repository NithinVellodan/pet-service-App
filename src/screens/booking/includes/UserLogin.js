import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// Icon
import CloseIcon from '../../../assets/icons/closedark.svg';
import CloseIconLight from '../../../assets/icons/close-icon-blue.svg';

// store
import {Context} from '../../../contexts/Store';

// theme
import {SIZE, SIZES} from '../../../theme/theme';
import Login from '../../Auth/Login';
import EnterPassword from '../../Auth/EnterPassword';
import SignUp from '../../Auth/SignUp';
import ForgotPassword from '../../Auth/ForgotPassword';
import OtpVerification from '../../Auth/OtpVerification';
import ResetPassword from '../../Auth/ResetPassword';
import SetPassword from '../../Auth/SetPassword';
import TermsConditions from '../../Auth/privacy/TermsConditions';

// components

const UserLogin = ({close, isType, screen, is_Firbase, setIs_Firbase}) => {
    const {state, dispatch} = useContext(Context);
    const [modalScreens, setModalScreens] = useState('login');
    const [routeDAta, setRouteData] = useState('');
    const [isPhone, setPhoneNumber] = useState(
        isType === 'mail' ? false : isType === 'phone' ? true : false,
    );
    const [checkType, setCheckType] = useState('');
    const [prevModal, setPrevModal] = useState('login');
    const [prevType, setPrevType] = useState(
        isType === 'mail' ? 'mail' : isType === 'phone' ? 'phone' : 'mail',
    );
    const [emailF, setEmailF] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [resetPasswordPk, setResetPasswordPk] = useState('');
    const [isOpen, setOpen] = useState(true);
    useEffect(() => {
        setModalScreens(screen);
    }, [screen]);
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

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.MainContainer}>
                <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={() => {
                        close(false);
                    }}>
                    {state.userData.is_service === true ? (
                        <CloseIcon width={SIZE(14)} height={SIZE(14)} />
                    ) : (
                        <CloseIconLight width={SIZE(14)} height={SIZE(14)} />
                    )}
                </TouchableOpacity>
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
                        isType={isType}
                        setIs_Firbase={setIs_Firbase}
                        bookingPage={true}
                        close={close}
                    />
                ) : modalScreens === 'enter-password' ? (
                    <EnterPassword
                        setModalScreens={setModalScreens}
                        routeDAta={routeDAta}
                        setPrevModal={setPrevModal}
                        checkType={checkType}
                        setRouteData={setRouteData}
                        setPrevType={setPrevType}
                        bookingPage={true}
                        close={close}
                        setVisible={setOpen}
                        setOpen={setOpen}
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
                        // setResetPasswordPk={setResetPasswordPk}
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
                ) : (
                    modalScreens === 'terms-and-conditions' && (
                        <TermsConditions
                            setPrevModal={setPrevModal}
                            setModalScreens={setModalScreens}
                            bookingPage={true}
                            close={close}
                            setVisible={() => {
                                setOpen(false);
                            }}
                        />
                    )
                )}
            </View>
        </ScrollView>
    );
};

export default UserLogin;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        width: SIZES.width,
    },
    closeIcon: {
        position: 'absolute',
        top: 25,
        right: 20,
        zIndex: 100,
    },
    MainContainer: {
        paddingTop: SIZE(20),
        flex: 1,
    },
});
