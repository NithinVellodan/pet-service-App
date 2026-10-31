import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// theme
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// store
import {Context} from '../../contexts/Store';

// Icon
import CloseIcon from '../../assets/icons/closedark.svg';
import CloseIconLight from '../../assets/icons/close-icon-blue.svg';

// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import NormalForm from '../../components/forms/NormalForm';
import OtpForm from '../../components/forms/OtpForm';
import DoubleColouredButton from '../../components/buttons/DoubleColouredButton';
import CommonModal from '../../components/modals/CommonModal';
import SuccessDel from './modaldelete/SuccessDel';
import {usersConfig} from '../../../axiosConfig';

const DeleteAccount = ({close, deleteModal, setDeleteModal}) => {
    const {state, dispatch} = useContext(Context);
    const [otp, setOtp] = useState('');
    const [isOpen, setOpen] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [otpError, setOtpError] = useState('');
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

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

    // Regex
    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setEmailValid(emailRegex.test(email));
    }, [email]);

    const createAccount = async () => {
        const accessToken = state.userData.accessToken;

        try {
            const response = await usersConfig.post(
                `send-delete-email/`,
                {
                    email: email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            let {StatusCode, message} = response.data;
            if (StatusCode === 6000) {
                setDeleteModal('otp-verification');
            } else {
                setEmailError('Email is invalid');
            }
        } catch (error) {
            console.log('Error:', error.message); // Log any errors
        }
    };

    const deleteUser = async () => {
        const user = auth().currentUser;

        if (user) {
            try {
                // Delete user from Firestore
                await firestore().collection('users').doc(user.uid).delete();
                console.log('User deleted from Firestore successfully.');

                // Delete user from Firebase Authentication
                await user.delete();
                console.log(
                    'User deleted from Firebase Authentication successfully.',
                );
            } catch (error) {
                console.log('Error deleting user:', error.message);
            }
        } else {
            console.log('No user is currently signed in.');
        }
    };

    const verifyOtp = async () => {
        const accessToken = state.userData.accessToken;

        try {
            const response = await usersConfig.post(
                `delete-account/`,
                {
                    email: email,
                    otp: otp,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            deleteUser();
        } catch (error) {
            console.log('Error:', error.message); // Log any errors
        }
    };
    return (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {deleteModal === 'delete-account' ? (
                    ''
                ) : (
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={() => {
                            close(false);
                            setDeleteModal('delete-account');
                        }}>
                        {state.userData.is_service === true ? (
                            <CloseIcon width={SIZE(14)} height={SIZE(14)} />
                        ) : (
                            <CloseIconLight
                                width={SIZE(14)}
                                height={SIZE(14)}
                            />
                        )}
                    </TouchableOpacity>
                )}

                {deleteModal === 'delete-account' ? (
                    <View style={styles.accountContainer}>
                        <View>
                            <DoubleColorHeading
                                firstTitle={'Delete'}
                                secondTitle={'Account'}
                                isCenter={true}
                            />
                        </View>
                        <View>
                            <DescriptionHeading
                                text={'Enter your registered mail here.'}
                                isCenter={true}
                            />
                        </View>
                        <View>
                            <NormalForm
                                label={'Mail'}
                                placeholder={'Enter your mail'}
                                type={'email'}
                                email={email}
                                setEmail={setEmail}
                                setError={setEmailError}
                                loginError={emailError}
                            />
                            <Text style={styles.errorMessage}>
                                {emailError}
                            </Text>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                onPress={() => {
                                    close(false);
                                }}
                                style={[
                                    styles.buttonsSkip,
                                    {
                                        borderColor:
                                            state.userData.is_service === true
                                                ? '#009FD3'
                                                : '#003459',
                                    },
                                ]}
                                activeOpacity={0.8}>
                                <Text
                                    style={[
                                        styles.buttonsSkipText,
                                        {
                                            color:
                                                state.userData.is_service ===
                                                true
                                                    ? '#009FD3'
                                                    : '#003459',
                                        },
                                    ]}>
                                    Skip
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    createAccount();
                                }}
                                style={[
                                    styles.buttonsNext,
                                    {
                                        backgroundColor:
                                            state.userData.is_service === true
                                                ? '#003459'
                                                : '#009FD3',
                                    },
                                ]}
                                activeOpacity={0.8}>
                                <Text style={styles.buttonsNextText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    deleteModal === 'otp-verification' && (
                        <View style={styles.otpContainer}>
                            <View>
                                <DoubleColorHeading
                                    firstTitle={'OTP'}
                                    secondTitle={'Verification'}
                                    isCenter={true}
                                />
                            </View>
                            <View>
                                <DescriptionHeading
                                    text={'We have sent a code to your mail.'}
                                />
                            </View>
                            <View>
                                <OtpForm
                                    darkTin={
                                        state.userData.is_service === true
                                            ? 'dark'
                                            : ''
                                    }
                                    otp={otp}
                                    setOtp={setOtp}
                                    setError={setOtpError}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    verifyOtp();
                                    setOpen(true);
                                }}
                                style={[
                                    styles.confirmButton,
                                    {
                                        backgroundColor:
                                            state.userData.is_service === true
                                                ? '#003459'
                                                : '#009FD3',
                                    },
                                ]}
                                activeOpacity={0.8}>
                                <Text style={styles.confirmText}>Confirm</Text>
                            </TouchableOpacity>
                            <View>
                                {isResendDisabled ? (
                                    <DoubleColouredButton
                                        label={'Did’nt you receive any code? '}
                                        timer={timer}
                                        buttonLabelDark={
                                            state.userData.is_service === true
                                                ? ''
                                                : 'dark'
                                        }
                                        buttonLabel={`${timer} sec`}
                                    />
                                ) : (
                                    <DoubleColouredButton
                                        label={'Did’nt you receive any code? '}
                                        buttonLabel={'Resend Code'}
                                        buttonLabelDark={
                                            state.userData.is_service === true
                                                ? ''
                                                : 'dark'
                                        }
                                        onPress={() => {
                                            handleResendOTP();
                                        }}
                                    />
                                )}
                            </View>
                            <CommonModal
                                isVisible={isOpen}
                                setVisible={setOpen}
                                inner={
                                    <SuccessDel
                                        darkTin={
                                            state.userData.is_service === true
                                                ? 'dark'
                                                : ''
                                        }
                                        setOpen={setOpen}
                                        isOpen={isOpen}
                                        isSmall={true}
                                        setDeleteModal={setDeleteModal}
                                        setDeleteModalMain={close}
                                        successLabel={'Account Deleted'}
                                        label={'Your account has been deleted.'}
                                    />
                                }
                            />
                        </View>
                    )
                )}
            </View>
        </ScrollView>
    );
};

export default DeleteAccount;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',

        height: SIZES.height - SIZE(60),
        width: SIZES.width,
        paddingTop: SIZE(64),
        paddingBottom: SIZE(40),
        paddingHorizontal: SIZE(32),
    },
    closeIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    accountContainer: {},
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        marginTop: SIZE(5),
    },
    buttons: {
        marginTop: SIZE(40),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonsSkip: {
        paddingVertical: SIZE(14),
        paddingHorizontal: SIZE(32),
        width: SIZE(170),
        borderWidth: 1,

        alignItems: 'center',
        borderRadius: SIZE(8),
    },
    buttonsSkipText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: 0.5,
    },
    buttonsNext: {
        paddingVertical: SIZE(14),
        paddingHorizontal: SIZE(32),
        width: SIZE(170),
        borderRadius: SIZE(8),
        alignItems: 'center',
    },
    buttonsNextText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: 0.5,
        color: '#FFFFFF',
    },
    otpContainer: {},
    confirmButton: {
        marginTop: SIZE(48),

        paddingVertical: SIZE(10),
        borderRadius: SIZE(6),
        alignItems: 'center',
    },
    confirmText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: SIZE(14),
        lineHeight: SIZE(22),
        fontFamily: FONTS.bold,
    },
});
