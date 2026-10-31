import {BackHandler, StatusBar, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';

// components
import AuthModal from '../../components/modals/AuthModal';
import Login from '../Auth/Login';
import EnterPassword from '../Auth/EnterPassword';
import ForgotPassword from '../Auth/ForgotPassword';
import ResetPassword from '../Auth/ResetPassword';
import SignUp from '../Auth/SignUp';
import OtpVerification from '../Auth/OtpVerification';
import SetPassword from '../Auth/SetPassword';
// theme
import TermsConditions from '../Auth/privacy/TermsConditions';
import WelcomeScreen from './Details/WelcomeScreen';

const Home = () => {
    const [showToast, setShowToast] = useState(false);
    const [modalScreens, setModalScreens] = useState('detail');
    const [emailF, setEmailF] = useState('');
    const [resetPasswordPk, setResetPasswordPk] = useState('');
    const [isOpen, setOpen] = useState(false);
    const [checkType, setCheckType] = useState('');
    const [routeDAta, setRouteData] = useState('');
    const [isPhone, setPhoneNumber] = useState(false);
    const [prevModal, setPrevModal] = useState('login');
    const [prevType, setPrevType] = useState('mail');
    const [onBack, setOnBack] = useState(false);
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

    useEffect(() => {
        if (modalScreens === 'login' && onBack) {
            const backHandler = BackHandler.exitApp();
            return () => backHandler.remove();
        }
        setOnBack(false);
    }, [onBack]);
    return (
        <View style={styles.container}>
            <AuthModal
                showToast={showToast}
                requestType="open"
                isVisible={isOpen}
                setVisible={setOpen}
                modalScreens={modalScreens}
                setOnBack={setOnBack}
                setPrevModal={setPrevModal}
                prevModal={prevModal}
                onBack={onBack}
                setModalScreens={setModalScreens}
                inner={
                    modalScreens === 'login' ? (
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
                    ) : (
                        modalScreens === 'detail' && (
                            <WelcomeScreen
                                setVisible={() => {
                                    setOpen(false);
                                }}
                                setModalScreens={setModalScreens}
                            />
                        )
                    )
                }
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
