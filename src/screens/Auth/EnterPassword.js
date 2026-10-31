import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    Animated,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
//packages
import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';
// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import NormalForm from '../../components/forms/NormalForm';
import BorderButton from '../../components/buttons/BorderButton';
import DoubleColouredButton from '../../components/buttons/DoubleColouredButton';
import {usersConfig} from '../../../axiosConfig';
//images and logos
import AvatarImage from '../../assets/icons/avatar-new.svg';

const EnterPassword = ({
    setModalScreens,
    routeDAta,
    setRouteData,
    setPrevType,
    checkType,
    setPrevModal,
    bookingPage,
    close,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {state, dispatch} = useContext(Context);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

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

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    const passwordLogin = async () => {
        setIsLoading(true);
        let userFireBaseData = '';
        try {
            const querySnapshot = await firestore()
                .collection('users')
                .where('mail', '==', state?.userData?.mailId)
                .get();

            if (!querySnapshot.empty) {
                userFireBaseData = querySnapshot.docs[0].data();
            }

            const response = await usersConfig.post('login/', {
                login_type: checkType,
                email: routeDAta,
                phone: routeDAta,
                password: password,
            });

            if (response.data.StatusCode === 6000) {
                if (!state.userData.isTermsAndCondition) {
                    if (bookingPage) {
                        if (response.data.terms_agreed === true) {
                            updateUserDate({
                                ...state.userData,
                                accessToken: response.data.token.access,
                                role: response.data.token.role,
                                isTermsAndCondition: response.data.terms_agreed,
                                is_login: true,
                                store_add: response.data.has_store,
                                trainer_add:
                                    response.data.trainer_profile_added,
                                store_name: response.data.store_name,
                                firebaseName: userFireBaseData.name,
                                firebaseEmail: userFireBaseData.mail,
                                firebaseUid: userFireBaseData.uid,
                            });
                            close(false);
                        } else {
                            updateUserDate({
                                ...state.userData,
                                accessToken: response.data.token.access,
                                store_add: response.data.has_store,
                                trainer_add:
                                    response.data.trainer_profile_added,
                                store_name: response.data.store_name,
                                firebaseName: userFireBaseData.name,
                                firebaseEmail: userFireBaseData.mail,
                                firebaseUid: userFireBaseData.uid,
                            });
                            setModalScreens('terms-and-conditions');
                        }
                    } else {
                        dispatch({
                            type: 'UPDATE_USER_DATA',
                            userData: {
                                ...state.userData,
                                isTermsAndCondition: response.data.terms_agreed,
                                accessToken: response.data.token.access,
                                store_add: response.data.has_store,
                                trainer_add:
                                    response.data.trainer_profile_added,
                                store_name: response.data.store_name,
                                firebaseName: userFireBaseData.name,
                                firebaseEmail: userFireBaseData.mail,
                                firebaseUid: userFireBaseData.uid,
                                isRegistered: false,
                            },
                        });
                        setModalScreens('SuccessfulPage');
                    }
                } else {
                    updateUserDate({
                        ...state.userData,
                        accessToken: response.data.token.access,
                        role: response.data.token.role,
                        is_login: true,
                        store_add: response.data.has_store,
                        trainer_add: response.data.trainer_profile_added,
                        store_name: response.data.store_name,
                        firebaseName: userFireBaseData.name,
                        firebaseEmail: userFireBaseData.mail,
                        firebaseUid: userFireBaseData.uid,
                    });
                }
                setPrevModal('login');
            } else {
                setPasswordError(response.data.message);
            }
        } catch (error) {
            console.log('Error Message', error);
            setPasswordError('An error occurred during login.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            style={styles.container}>
            <Animated.View style={{transform: [{translateX}]}}>
                <DoubleColorHeading
                    firstTitle={'Login'}
                    secondTitle={'to your Account'}
                    isCenter={true}
                />
                <DescriptionHeading text={'Please enter your Password'} />
                <NormalForm
                    label={'Password'}
                    placeholder={'Enter password'}
                    type={'password'}
                    password={password}
                    setPassword={setPassword}
                    setError={setPasswordError}
                    setPasswordError={setPasswordError}
                    loginError={passwordError}
                />
                {passwordError && (
                    <Text style={styles.errorMessage}>{passwordError}</Text>
                )}

                <TouchableOpacity
                    style={styles.forgPswdBtn}
                    onPress={() => {
                        setModalScreens('forgot-password');
                        setPrevModal('enter-password');
                    }}>
                    <Text style={styles.forgPswdBtnTxt}>Forgot Password?</Text>
                </TouchableOpacity>
                <BorderButton
                    lowLabel={'Login as '}
                    buttonLoader={isLoading}
                    buttonDisabled={isLoading === true ? true : false}
                    label={state.userData.name}
                    icon={
                        state.userData.photo ? (
                            <Image
                                style={styles.passwordImage}
                                source={{uri: state.userData.photo}}
                                borderRadius={100}
                            />
                        ) : (
                            <AvatarImage width={'100%'} height={'100%'} />
                        )
                    }
                    onPress={() => {
                        if (password) {
                            passwordLogin();
                        } else {
                            setPasswordError('Please enter your password');
                        }
                    }}
                />
                <DoubleColouredButton
                    buttonLabelDark={'dark'}
                    label={'Not your Account? '}
                    buttonLabel={'Sign Up'}
                    onPress={() => {
                        updateUserDate({
                            ...state.userData,
                            phone: '',
                            mailId: '',
                            name: '',
                            photo: '',
                            mailTrust: false,
                            phoneTrust: false,
                        });
                        setRouteData('');
                        setPrevType('');
                        setModalScreens('sign-up');
                        setPrevModal('login');
                    }}
                />
            </Animated.View>
        </KeyboardAwareScrollView>
    );
};

export default EnterPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',

        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(32),
    },
    forgPswdBtn: {
        marginTop: SIZE(8),
        alignSelf: 'flex-end',
    },
    forgPswdBtnTxt: {
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        color: '#009FD3',
    },
    avatarContainer: {
        width: SIZE(36),
        height: SIZE(36),
    },
    passwordImage: {
        width: '100%',
        height: '100%',
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        marginTop: SIZE(5),
    },
});
