import {StyleSheet, Text, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';

//packages
import auth from '@react-native-firebase/auth';

// theme
import {SIZE} from '../../theme/theme';

// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import NormalForm from '../../components/forms/NormalForm';
import ColoredButton from '../../components/buttons/ColoredButton';
import {usersConfig} from '../../../axiosConfig';
import {FONTS} from '../../theme/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ResetPassword = ({
    setModalScreens,
    resetPasswordPk,
    emailF,
    setPrevModal,
}) => {
    const [resetPassword, setResetPassword] = useState('');
    const [reResetPassword, setReResetPassword] = useState('');
    const [resetPasswordError, setResetPasswordError] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);

    // Animate
    const [animation] = useState(new Animated.Value(0));
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
    // Animate

    const handleClick = () => {
        resetPassword.length > 1 && changePassword();
    };

    const changePassword = () => {
        setSubmitLoading(true);
        usersConfig
            .post('reset-password/', {
                email: emailF,
                token: resetPasswordPk,
                new_password: reResetPassword,
            })
            .then(response => {
                if (response.data.StatusCode === 6000) {
                    setSubmitLoading(false);
                    setPrevModal('reset-password');
                    setModalScreens('login');
                } else {
                    setSubmitLoading(false);
                    setPrevModal('reset-password');
                    setModalScreens('forgot-password');
                    setResetPasswordError(response.data.message);
                }
            })
            .catch(error => {
                setSubmitLoading(false);
                console.log('Error Message', error);
            });
    };

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps={'handled'}
            style={styles.container}>
            <Animated.View style={{transform: [{translateX}]}}>
                <DoubleColorHeading
                    firstTitle={'Reset'}
                    secondTitle={'Password'}
                    isCenter={true}
                />
                <DescriptionHeading
                    text={'The password must be different than before.'}
                />
                <NormalForm
                    label={'Password'}
                    resetPassword={resetPassword}
                    setResetPassword={setResetPassword}
                    placeholder={'Enter a Strong Password'}
                    type={'password'}
                    setError={setResetPasswordError}
                />
                <NormalForm
                    label={'Re - Enter Password'}
                    reResetPassword={reResetPassword}
                    setReResetPassword={setReResetPassword}
                    placeholder={'Re - Enter Password'}
                    setError={setResetPasswordError}
                    type={'password'}
                    marginTop={24}
                />
                <Text style={styles.errorMessage}>{resetPasswordError}</Text>
                <ColoredButton
                    buttonLoader={submitLoading}
                    onPress={() => {
                        const containsAlphabet = /[a-zA-Z]/.test(resetPassword);
                        const containsNumber = /\d/.test(resetPassword);
                        const containsSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(
                            resetPassword,
                        );

                        let errorMessage = '';

                        if (
                            resetPassword.length <= 7 ||
                            reResetPassword.length <= 7
                        ) {
                            errorMessage =
                                'Password must be at least 8 characters long.';
                        } else if (!containsAlphabet) {
                            errorMessage =
                                'Password must contain at least one alphabet.';
                        } else if (!containsNumber) {
                            errorMessage =
                                'Password must contain at least one number.';
                        } else if (!containsSymbol) {
                            errorMessage =
                                'Password must contain at least one symbol.';
                        } else if (resetPassword !== reResetPassword) {
                            errorMessage = 'Passwords do not match.';
                        }

                        if (errorMessage) {
                            setResetPasswordError(errorMessage);
                        } else {
                            handleClick();
                        }
                    }}
                    label={'Save'}
                />
            </Animated.View>
        </KeyboardAwareScrollView>
    );
};

export default ResetPassword;

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
    },
});
