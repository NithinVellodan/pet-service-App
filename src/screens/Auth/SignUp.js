import {StyleSheet, Text, Animated, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// theme
import {SIZE} from '../../theme/theme';

// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import NormalForm from '../../components/forms/NormalForm';
import ColoredButton from '../../components/buttons/ColoredButton';
import CommonModal from '../../components/modals/CommonModal';
import OtpVerification from './OtpVerification';
import SuccessPage from '../common/SuccessPage';
import {usersConfig} from '../../../axiosConfig';

// Store
import {Context} from '../../contexts/Store';
import {FONTS} from '../../theme/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignUp = ({
    setModalScreens,
    routeDAta,
    setSelectedCountry,
    selectedCountry,
    setPrevModal,
    prevType,
    is_Firbase,
}) => {
    const {state, dispatch} = useContext(Context);

    // Animate
    const [animation] = useState(new Animated.Value(0));

    // Loader
    const [isLoading, setIsLoading] = useState(false);
    const [loadPhone, setLoadPhone] = useState(false);
    const [loadEmail, setLoadEmail] = useState(false);
    // Loader

    // common States //
    const [currentScreen, setCurrentScreen] = useState('otp-verification');
    const [isOpen, setOpen] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);
    const [sendVerification, setSendVerification] = useState('');
    const [phoneVerify, setPhoneVerify] = useState();
    const [error, setError] = useState({});
    const [status, setStatus] = useState('');
    const [name, setName] = useState(
        state.userData.name ? state.userData.name : '',
    );
    const [phoneNo, setPhoneNo] = useState(
        state.userData.phone ? state.userData.phone : '',
    );
    const [emailId, setEmailId] = useState(
        state.userData.mailId ? state.userData.mailId : '',
    );
    const [emailVerify, setEmailVerify] = useState(
        state.userData.mailTrust ? state.userData.mailTrust : false,
    );
    // common States //

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }).start();
    }, []);

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0],
    });

    const handleValidation = () => {
        const isValid = /^[a-zA-Z\s]+$/.test(name);
        if (isValid) {
            createProfile();
        } else {
            setError({name: 'Please enter a valid name'});
        }
    };

    // PhoneRegex
    useEffect(() => {
        const phoneRegex = /^\d{7,}$/;
        setPhoneValid(phoneRegex.test(phoneNo));
    }, [phoneNo]);

    // EmailRegex
    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setEmailValid(emailRegex.test(emailId));
    }, [emailId]);

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    // phone Verification
    const verifyPhone = () => {
        setLoadPhone(true);
        const passPhone = prevType === 'phone' ? routeDAta : phoneNo;
        if (phoneValid || prevType === 'phone') {
            usersConfig
                .post('check-phone/', {
                    phone: passPhone,
                    country_pk: selectedCountry.id,
                })
                .then(response => {
                    if (response.data.StatusCode === 6000) {
                        setOpen(true);
                        setSendVerification('phone-otp');
                        setError({});
                    } else {
                        setError({phone: response.data.message});
                    }
                    setLoadPhone(false);
                })
                .catch(error => {
                    if (error.response) {
                        console.log(
                            'Error Response Data:',
                            error.response.data,
                            setError({
                                phone: 'User With This Phone Already Exists',
                            }),
                        );
                    }
                    console.log('Error Message', error);
                    setLoadPhone(false);
                });
        } else {
            setError({phone: 'Number is invalid'});
            setLoadPhone(false);
        }
    };

    // Email Verification
    const verifyEmail = () => {
        setLoadEmail(true);
        if (emailValid || prevType === 'email') {
            usersConfig
                .post('check-email/', {
                    email: prevType === 'email' ? routeDAta : emailId,
                })
                .then(response => {
                    if (response.data.StatusCode === 6000) {
                        setOpen(true);
                        setSendVerification('mail-otp');
                        setError({});
                    } else {
                        setError({mail: response.data.message});
                    }
                    setLoadEmail(false);
                })
                .catch(error => {
                    if (error.response) {
                        console.log(
                            'Error Response Data:',
                            error.response.data,
                            setError({
                                mail: 'User With This Email Already Exists',
                            }),
                        );
                    }
                    console.log('Error Message', error);
                    setLoadEmail(false);
                });
        } else {
            setError({mail: 'Email is invalid'});
            setLoadEmail(false);
        }
    };

    // create Profile
    const createProfile = () => {
        usersConfig
            .post('register-account/', {
                name: name,
                phone: state.userData.phone,
                email:
                    is_Firbase?.is_fireBase == true
                        ? is_Firbase.email
                        : state.userData.mailId,
                country_pk: selectedCountry.id,
            })
            .then(response => {
                if (response.data.StatusCode === 6000) {
                    updateUserDate({
                        ...state.userData,
                        name: name,
                        tempPk: response.data.pk,
                        accountStatus: response.data.status,
                    });
                    setModalScreens('set-password');
                    setPrevModal('sign-up');
                } else {
                    console.log('response -> ', response.data);
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log('Error Response Data:', error.response.data);
                }
                setIsLoading(false);
            });
    };

    return (
        <>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps={'handled'}
                extraScrollHeight={SIZE(-200)}
                style={styles.container}>
                <Animated.View style={{transform: [{translateX}]}}>
                    <DoubleColorHeading
                        firstTitle={'Sign'}
                        secondTitle={'Up'}
                        isCenter={true}
                    />
                    <DescriptionHeading text={'Please enter your Details'} />
                    <>
                        <NormalForm
                            name={name}
                            setName={setName}
                            label={'Name'}
                            placeholder={'Enter your Name'}
                            setError={setError}
                        />
                        {error?.name && (
                            <Text style={styles.errorMessage}>
                                {error?.name}
                            </Text>
                        )}
                    </>
                    <>
                        <NormalForm
                            label={'Phone Number *'}
                            placeholder={'Enter your Phone Number'}
                            type={'phone'}
                            buttonLoader={loadPhone}
                            country={true}
                            value={phoneNo}
                            valueData={prevType === 'phone' ? routeDAta : ''}
                            marginTop={24}
                            setError={setError}
                            phoneNo={phoneNo}
                            trust={phoneVerify}
                            setPhoneNo={setPhoneNo}
                            verifyButton={true}
                            onPress={() => {
                                if (!state.userData.phone) {
                                    setCurrentScreen('otp-verification');
                                    verifyPhone();
                                    setStatus('phone');
                                } else {
                                    setCurrentScreen('success');
                                }
                            }}
                            setSelectedCountry={setSelectedCountry}
                            selectedCountry={selectedCountry}
                        />
                        {error?.phone && (
                            <Text style={styles.errorMessage}>
                                {error?.phone}
                            </Text>
                        )}
                    </>

                    {is_Firbase?.is_fireBase == true ? (
                        <NormalForm
                            label={'Email'}
                            placeholder={'Enter your Email'}
                            buttonLoader={loadEmail}
                            marginTop={24}
                            value={emailId}
                            type={'email'}
                            setError={setError}
                            emailId={is_Firbase.email}
                            trust={true}
                            setEmailId={setEmailId}
                            verifyButton={true}
                            valueData={prevType === 'email' ? routeDAta : ''}
                            onPress={() => {
                                if (state.userData.mailId) {
                                    setCurrentScreen('success');
                                } else {
                                    setCurrentScreen('otp-verification');
                                    verifyEmail();
                                    setStatus('email');
                                }
                            }}
                        />
                    ) : (
                        <>
                            <NormalForm
                                label={'Email'}
                                placeholder={'Enter your Email'}
                                buttonLoader={loadEmail}
                                marginTop={24}
                                value={emailId}
                                type={'email'}
                                setError={setError}
                                emailId={is_Firbase.email}
                                trust={emailVerify}
                                setEmailId={setEmailId}
                                verifyButton={true}
                                valueData={
                                    prevType === 'email' ? routeDAta : ''
                                }
                                onPress={() => {
                                    if (state.userData.mailId) {
                                        setCurrentScreen('success');
                                    } else {
                                        setCurrentScreen('otp-verification');
                                        verifyEmail();
                                        setStatus('email');
                                    }
                                }}
                            />
                            {error?.mail && (
                                <Text style={styles.errorMessage}>
                                    {error?.mail}
                                </Text>
                            )}
                        </>
                    )}
                    <View style={{marginBottom: SIZE(40)}}>
                        <ColoredButton
                            label={'Continue'}
                            marginTop={40}
                            buttonLoader={isLoading}
                            buttonDisabled={isLoading === true ? true : false}
                            onPress={() => {
                                if (
                                    (name && state.userData.mailId) ||
                                    (is_Firbase.email !== '' &&
                                        state.userData.phone)
                                ) {
                                    handleValidation();
                                } else {
                                    setError({
                                        name: name ? '' : 'Name is required',
                                        phone: phoneVerify
                                            ? ''
                                            : 'Please verify your phone number',
                                        mail: emailVerify
                                            ? ''
                                            : 'Please verify your email',
                                    });
                                }
                            }}
                        />
                    </View>
                </Animated.View>
            </KeyboardAwareScrollView>

            <CommonModal
                inner={
                    currentScreen === 'otp-verification' ? (
                        <OtpVerification
                            isSmall={true}
                            setCurrentScreen={setCurrentScreen}
                            sendVerification={sendVerification}
                            setSelectedCountry={setSelectedCountry}
                            selectedCountry={selectedCountry}
                            status={status}
                            setEmailVerify={setEmailVerify}
                            setPhoneVerify={setPhoneVerify}
                            setModalScreens={setModalScreens}
                            phoneNo={
                                phoneNo
                                    ? phoneNo
                                    : prevType === 'phone'
                                    ? routeDAta
                                    : ''
                            }
                            emailId={
                                emailId
                                    ? emailId
                                    : prevType === 'email'
                                    ? routeDAta
                                    : ''
                            }
                        />
                    ) : (
                        <SuccessPage
                            setOpen={setOpen}
                            isOpen={isOpen}
                            isSmall={true}
                        />
                    )
                }
                isVisible={isOpen}
                setVisible={setOpen}
                currentScreen={currentScreen}
            />
        </>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(32),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        marginTop: SIZE(5),
        textAlign: 'right',
    },
    labelText: {
        fontFamily: FONTS.medium,
        fontSize: SIZE(16),
        color: '#686868',
        marginBottom: SIZE(8),
        marginTop: SIZE(23),
    },
});
