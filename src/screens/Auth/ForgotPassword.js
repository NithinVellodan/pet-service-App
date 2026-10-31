import {StyleSheet, Text, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
// userConfig
import {usersConfig} from '../../../axiosConfig';
// packages
import {useToast} from 'react-native-toast-notifications';
// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import NormalForm from '../../components/forms/NormalForm';
import ColoredButton from '../../components/buttons/ColoredButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword = ({
    setModalScreens,
    emailF,
    setEmailF,
    setPrevModal,
    setShowToast,
    toastRef,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
    //

    const forgetPassword = () => {
        usersConfig
            .post('send-reset-email/', {
                email: emailF,
            })
            .then(response => {
                if (response.data.StatusCode === 6000) {
                    setPrevModal('forgot-password');
                    toastRef.current.show('Please check your mail for OTP', {
                        type: 'success',
                    });
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                        setModalScreens('otp-verification');
                    }, 2000);
                } else {
                    setError(response.data.message);
                }
            })
            .catch(error => {
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
                    firstTitle={'Forgot'}
                    secondTitle={'Password ?'}
                    isCenter={true}
                />
                <DescriptionHeading
                    text={
                        'Please enter the email associated with your account.'
                    }
                    isCenter={true}
                />
                <NormalForm
                    emailF={emailF}
                    setEmailF={setEmailF}
                    label={'Email'}
                    placeholder={'Enter your email'}
                    setError={setError}
                />
                <ColoredButton
                    buttonLoader={isLoading}
                    label={'Continue'}
                    onPress={() => {
                        forgetPassword();
                    }}
                />
                <Text style={styles.errorMessage}>{error}</Text>
            </Animated.View>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPassword;

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
