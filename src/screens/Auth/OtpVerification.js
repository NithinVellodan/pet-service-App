import {StyleSheet, View, Text, Animated} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// theme
import {SIZE} from '../../theme/theme';
// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import ColoredButton from '../../components/buttons/ColoredButton';
import DoubleColouredButton from '../../components/buttons/DoubleColouredButton';
import OtpForm from '../../components/forms/OtpForm';
import {usersConfig} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';
import {FONTS} from '../../theme/fonts';

const OtpVerification = ({
    setModalScreens,
    setCurrentScreen,
    isSmall,
    setVisible,
    sendVerification,
    phoneNo,
    emailId,
    selectedCountry,
    emailF,
    setEmailF,
    setResetPasswordPk,
    setPrevModal,
    status,
    setEmailVerify,
    setPhoneVerify,
}) => {
    const [otp, setOtp] = useState('');
    const {state, dispatch} = useContext(Context);
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [disableButton, setDisableButton] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [resendOtpError, setResendOtpError] = useState('');
    const [animation] = useState(new Animated.Value(0));

    // Animate
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 350, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    }, []);

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0], // Adjust the starting and ending positions
    });
    // Animate

    useEffect(() => {
        if (timer > 0 && isResendDisabled) {
            const countdown = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => {
                clearInterval(countdown);
            };
        } else if (timer === 0) {
            setIsResendDisabled(false);
        }
    }, [timer, isResendDisabled]);

    const handleResendOTP = () => {
        setIsResendDisabled(true);
        setTimer(30);
    };

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    const verifyOtp = () => {
        setSubmitLoading(true);
        if (sendVerification === 'phone-otp') {
            url = 'verify-phone/';
        } else if (sendVerification === 'mail-otp') {
            url = 'verify-email/';
        } else {
            url = '';
        }
        usersConfig
            .post(url, {
                email: emailId,
                phone: selectedCountry.country_code + phoneNo,
                otp: otp,
            })
            .then(response => {
                if (response.data.StatusCode === 6000) {
                    if (sendVerification === 'mail-otp') {
                        updateUserDate({
                            ...state.userData,
                            mailId: emailId,
                            mailTrust: true,
                        });
                        setEmailVerify(true);
                    } else {
                        updateUserDate({
                            ...state.userData,
                            phone: phoneNo,
                            phoneTrust: true,
                        });
                        setPhoneVerify(true);
                    }
                    setCurrentScreen
                        ? setCurrentScreen('success-page')
                        : setVisible && setVisible();
                    setSubmitLoading(false);
                } else {
                    setSubmitLoading(false);
                    setResendOtpError(response.data.message);
                    console.log('why not 6000 verify otp', response.data);
                }
            })
            .catch(error => {
                console.log(error.message);
                console.log('Error Message', error);
            });
    };

    const resendOtp = () => {
        usersConfig
            .post('resend-otp/', {
                email: sendVerification === 'mail-otp' ? emailId : '',
                phone:
                    sendVerification === 'phone-otp'
                        ? selectedCountry.country_code + phoneNo
                        : '',
            })
            .then(response => {
                if (response.data.StatusCode === 6000) {
                    setResendOtpError('');
                    setTimer(30);
                } else {
                    setResendOtpError(response.data.message);
                    setTimer(0);
                    setDisableButton(true);
                }
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    const passwordChange = () => {
        usersConfig
            .post('verify-forgot-otp/', {
                email: emailF,
                otp: otp,
            })
            .then(response => {
                if (response.data.StatusCode === 6000) {
                    setEmailF(emailF);
                    setResetPasswordPk(response.data.token);
                    setPrevModal('login');
                    setModalScreens('reset-password');
                } else {
                    setResendOtpError(response.data.message);
                }
            });
    };

    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        paddingVertical: isSmall ? SIZE(40) : SIZE(32),
                        flex: !isSmall ? 1 : 0,
                    },
                ]}>
                <Animated.View style={{transform: [{translateX}]}}>
                    <DoubleColorHeading
                        isSmall={isSmall}
                        firstTitle={'OTP'}
                        secondTitle={'Verification'}
                        isCenter={true}
                    />
                    <DescriptionHeading
                        text={
                            status === 'email'
                                ? 'We have sent a code to your mail.'
                                : status === 'phone'
                                ? 'We have sent a code to your Phone.'
                                : 'We have sent a code to your mail.'
                        }
                        isSmall={isSmall}
                    />
                    <OtpForm
                        otp={otp}
                        setOtp={setOtp}
                        isSmall={isSmall}
                        setError={setResendOtpError}
                    />
                    <Text style={styles.errorMessage}>{resendOtpError}</Text>
                    <ColoredButton
                        buttonLoader={submitLoading}
                        label={'Verify'}
                        marginTop={40}
                        onPress={() => {
                            emailF ? passwordChange() : verifyOtp();
                        }}
                        isSmall={isSmall}
                    />
                    {isResendDisabled ? (
                        <DoubleColouredButton
                            isSmall={isSmall}
                            label={'Did’nt you receive any code? '}
                            timer={timer}
                            buttonLabel={`${timer} sec`}
                        />
                    ) : (
                        <DoubleColouredButton
                            disabled={disableButton}
                            isSmall={isSmall}
                            label={'Did’nt you receive any code? '}
                            buttonLabel={'Resend OTP'}
                            onPress={() => {
                                handleResendOTP();
                                resendOtp();
                            }}
                        />
                    )}
                </Animated.View>
            </View>
        </>
    );
};

export default OtpVerification;

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
});
