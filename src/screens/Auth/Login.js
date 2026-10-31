import {
    StyleSheet,
    Text,
    View,
    Platform,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import NormalForm from '../../components/forms/NormalForm';
import ColoredButton from '../../components/buttons/ColoredButton';
import BorderButton from '../../components/buttons/BorderButton';

// svg
import PhoneIcon from '../../assets/icons/phone-icon.svg';
import GoogleIcon from '../../assets/icons/google-icon.svg';
import EmailIcon from '../../assets/icons/email-icon.svg';
import AppleIcon from '../../assets/icons/apple-icon.svg';
import {usersConfig, usersConfigFireBaseLogin} from '../../../axiosConfig';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

// Store
import {Context} from '../../contexts/Store';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({
    setModalScreens,
    setRouteData,
    setPhoneNumber,
    setCheckType,
    selectedCountry,
    setSelectedCountry,
    setPrevModal,
    setPrevType,
    isType,
    setIs_Firbase,
    bookingPage,
    close,
    toastRef,
}) => {
    const [isPhone, setIsPhone] = useState(
        isType === 'mail' ? false : isType === 'phone' ? true : false,
    );
    const {state, dispatch} = useContext(Context);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [buttonState, setButtonState] = useState([
        {
            id: 1,
            label: 'Sign Up With Phone',
            icon: <PhoneIcon width={'100%'} height={'100%'} />,
            toggleType: () => toggleType(setIsPhone(false)),
            hidden:
                isType === 'mail' ? false : isType === 'phone' ? true : false,
        },
        {
            id: 2,
            label: 'Sign Up With email',
            icon: <EmailIcon width={'100%'} height={'100%'} />,
            toggleType: () => toggleType(setIsPhone(true)),
            hidden:
                isType === 'mail' ? true : isType === 'phone' ? false : true,
        },
        {
            id: 3,
            label: 'Sign Up With Google',
            icon: <GoogleIcon width={'100%'} height={'100%'} />,
            toggleType: () => toggleType(setIsPhone(true)),
            fireBaseLogin: () => _signInWithGoogle(),
            hidden: false,
        },
    ]);

    useEffect(() => {
        const checkType = isPhone ? 'phone' : 'email';
        const phoneRegex = /^\d{7,}$/;
        if (checkType == 'phone') {
            setPhoneValid(phoneRegex.test(phone));
        }
    }, [phone]);

    const toggleType = () => {
        setIsPhone(prev => !prev);
        setPhoneNumber(prev => !prev);
        setLoginError('');
    };

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    useEffect(() => {
        const checkType = !isPhone ? 'email' : 'phone';
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (checkType == 'email') {
            setEmailValid(emailRegex.test(email));
        }
    }, [email]);

    const [loginError, setLoginError] = useState('');
    const checkAccount = () => {
        setIsLoading(true);
        const checkType = !isPhone ? 'email' : 'phone';
        setPrevType(!isPhone ? 'email' : 'phone');
        if (checkType == 'email' || checkType == 'phone') {
            if (emailValid || (checkType == 'phone' && phoneValid)) {
                usersConfig
                    .post('check-account/', {
                        check_type: checkType,
                        email: email,
                        phone: phone,
                        country_pk: selectedCountry.id,
                    })
                    .then(response => {
                        let {StatusCode, data} = response.data;
                        if (StatusCode === 6000) {
                            updateUserDate({
                                ...state.userData,
                                name: data.name,
                                photo: data.image,
                                mailId: data.email,
                            });
                            setIsLoading(false);
                            setCheckType(checkType);
                            setPrevModal('login');
                            setModalScreens('enter-password');
                            setRouteData(isPhone ? data.phone : email);
                            setLoginError('');
                        } else if (StatusCode === 6001) {
                            setPrevModal('login');
                            updateUserDate({
                                ...state.userData,
                                name: '',
                                phone: '',
                                mailId: '',
                                mailTrust: false,
                                phoneTrust: false,
                            });
                            setIsLoading(false);
                            setModalScreens('sign-up');
                            setRouteData(isPhone ? phone : email);
                            setLoginError('');
                        } else {
                            setLoginError(data.message);
                        }
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log('response error', error);
                        setIsLoading(false);
                    });
            } else if (checkType == 'email') {
                setLoginError('Email is invalid');
                setIsLoading(false);
            } else {
                setLoginError('Number is invalid');
                setIsLoading(false);
            }
        }
    };

    const handleButtonClick = buttonId => {
        setButtonState(prevButtonState =>
            prevButtonState.map(button => ({
                ...button,
                hidden: button.id === buttonId,
            })),
        );
    };

    const _signInWithGoogle = async () => {
        setGoogleLoading(true);
        let userFireBaseData = '';
        let webClientId;

        if (Platform.OS === 'android') {
            webClientId =
                '181768224345-8c1a8fb7u5aknndht5gd5d8uno81cjk9.apps.googleusercontent.com';
        } else if (Platform.OS === 'ios') {
            webClientId =
                '181768224345-ad6vejsmfmup6u7joh2hsh9pjokvkr09.apps.googleusercontent.com';
        } else {
            webClientId = 'fallback-client-id'; // Fallback in case the platform is neither Android nor iOS
        }
        try {
            GoogleSignin.configure({
                offlineAccess: false,
                webClientId: webClientId,
                scopes: ['profile', 'email'],
            });
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const {idToken} = userInfo;
            const googleCredentials =
                auth.GoogleAuthProvider.credential(idToken);
            // Firestore function call
            const querySnapshot = await firestore()
                .collection('users')
                .where('mail', '==', userInfo.user.email)
                .get();

            if (!querySnapshot.empty) {
                userFireBaseData = querySnapshot.docs[0].data();
            }
            await auth().signInWithCredential(googleCredentials);
            usersConfigFireBaseLogin
                .post('google/', {
                    idToken: userInfo.idToken,
                    os: Platform.OS,
                })
                .then(response => {
                    let {data} = response;

                    if (data.StatusCode == 6001) {
                        updateUserDate({
                            ...state.userData,
                            is_Firbase: {
                                is_fireBase: true,
                                email: data.email,
                                google_id_token: data.google_id_token,
                            },
                        });
                        setIs_Firbase(prevState => ({
                            ...prevState,
                            is_fireBase: true,
                            email: data.email,
                            google_id_token: data.google_id_token,
                        }));

                        updateUserDate({
                            ...state.userData,
                            google_encrypt: googleCredentials.token,
                        });
                        setGoogleLoading(false);
                        setModalScreens('sign-up');
                    } else if (data.StatusCode == 6000) {
                        updateUserDate({
                            ...state.userData,
                            accessToken: data.token.access,
                            name: data.data.name,
                            photo: data.data.image,
                            isTermsAndCondition: data.terms_agreed,
                            store_add: response.data.has_store,
                            trainer_add: response.data.trainer_profile_added,
                            store_name: response.data.store_name,
                            firebaseName: userFireBaseData.name,
                            firebaseEmail: userFireBaseData.mail,
                            mailId: userFireBaseData.mail,
                            firebaseUid: userFireBaseData.uid,
                            google_encrypt: googleCredentials.token,
                            isRegistered: false,
                        });
                        setGoogleLoading(false);
                        if (bookingPage) {
                            updateUserDate({
                                ...state.userData,
                                accessToken: data.token.access,
                                name: data.data.name,
                                photo: data.data.image,
                                isTermsAndCondition: data.terms_agreed,
                                store_add: response.data.has_store,
                                trainer_add:
                                    response.data.trainer_profile_added,
                                store_name: response.data.store_name,
                                firebaseName: userFireBaseData.name,
                                firebaseEmail: userFireBaseData.mail,
                                mailId: userFireBaseData.mail,
                                firebaseUid: userFireBaseData.uid,
                                google_encrypt: googleCredentials.token,
                                isRegistered: false,
                                is_login: true,
                            });
                            close(false);
                        } else {
                            setModalScreens('SuccessfulPage');
                        }
                    }
                    setGoogleLoading(false);
                })
                .catch(error => {
                    setGoogleLoading(false);
                });
            return userInfo;
        } catch (error) {
            setGoogleLoading(false);
            console.log('=> Google Sign In NOOO', error);
            toastRef.current.show('Something Went Wrong Please Try Again', {
                type: 'danger',
            });
            return null;
        }
    };
    const appleLogin = async () => {
        console.log('Demo Apple');
    };

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            bounces={false}
            style={styles.container}>
            <DoubleColorHeading
                firstTitle={'Login/Sign Up'}
                secondTitle={'to Pet to Place'}
            />
            <DescriptionHeading text={'Please enter your Email to continue'} />
            {!isPhone ? (
                <>
                    <NormalForm
                        label={'Email'}
                        type={'email'}
                        placeholder={'Enter your email'}
                        email={email}
                        setEmail={setEmail}
                        setError={setLoginError}
                        loginError={loginError}
                    />
                    <Text style={styles.errorMessage}>{loginError}</Text>
                </>
            ) : (
                <>
                    <NormalForm
                        label={'Phone Number'}
                        placeholder={'Enter your phone number'}
                        type={'phone'}
                        country={true}
                        phone={phone}
                        loginError={loginError}
                        setPhone={setPhone}
                        selectedCountry={selectedCountry}
                        setError={setLoginError}
                        setSelectedCountry={setSelectedCountry}
                    />
                    <Text style={styles.errorMessage}>{loginError}</Text>
                </>
            )}
            <ColoredButton
                label={'Continue'}
                buttonLoader={isLoading}
                buttonDisabled={isLoading === true ? true : false}
                onPress={() => {
                    checkAccount();
                }}
            />
            <View style={styles.seperateLine}>
                <Text style={styles.seperateText}>OR</Text>
            </View>
            {buttonState.map((item, index) => (
                <BorderButton
                    key={index}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                    onButtonHAndler={() => {
                        handleButtonClick(item.id);
                    }}
                    onPress={() => {
                        item.toggleType();
                    }}
                    hidden={item.hidden}
                    fireBaseLogin={item.fireBaseLogin}
                    loginSection={true}
                />
            ))}
            {Platform.OS === 'ios' ? (
                <BorderButton
                    label={'Sign Up With Apple'}
                    icon={<AppleIcon width={'100%'} height={'100%'} />}
                    setActiveTab={setActiveTab}
                    onButtonHAndler={() => {
                        // handleButtonClick(item.id);
                    }}
                    activeTab={activeTab}
                    onPress={() => {
                        appleLogin();
                    }}
                    loginSection={true}
                />
            ) : null}

            <Modal
                isVisible={googleLoading}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={{margin: 0}}>
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size="large"
                    color={'#003459'}
                />
            </Modal>
        </KeyboardAwareScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        height: SIZE(800),
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,

        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(32),
    },
    seperateLine: {
        width: '100%',
        borderWidth: 0.5,
        marginVertical: SIZE(32),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#E2E2E2',
    },
    seperateText: {
        position: 'absolute',
        width: SIZE(53),
        height: SIZE(18),
        backgroundColor: '#F7F7F7',

        textAlign: 'center',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#000',
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        marginTop: SIZE(5),
    },
});
