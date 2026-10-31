import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useRef, useState} from 'react';

//packages
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Modal from 'react-native-modal';
import {useToast} from 'react-native-toast-notifications';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';
import {usersConfig, usersConfigFireBaseLogin} from '../../../../axiosConfig';

//components
import BorderButton from '../../../components/buttons/BorderButton';

//images and logos
import PhoneIcon from '../../../assets/icons/phone-icon.svg';
import GoogleIcon from '../../../assets/icons/google-icon.svg';
import AppleIcon from '../../../assets/icons/apple-icon.svg';
import EmailIcon from '../../../assets/icons/email-icon.svg';

const SignUpOptions = ({
    setUserModal,
    setType,
    bookingPage,
    setScreen,
    is_Firbase,
    setIs_Firbase,
}) => {
    const toastRef = useRef();
    const toast = useToast();
    const {state, dispatch} = useContext(Context);
    const [activeTab, setActiveTab] = useState(1);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [buttonState, setButtonState] = useState([
        {
            id: 1,
            label: 'Sign Up With Email',
            icon: <EmailIcon width={'100%'} height={'100%'} />,
            toggleType: () => {
                toggleType(setIsPhone(true));
                setUserModal(true);
                setType('mail');
            },
            hidden: false,
        },
        {
            id: 2,
            label: 'Sign Up With Phone',
            icon: <PhoneIcon width={'100%'} height={'100%'} />,
            toggleType: () => {
                toggleType(setIsPhone(false));
                setUserModal(true);
                setType('phone');
            },
            hidden: false,
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
    const toggleType = () => {
        setIsPhone(prev => !prev);
    };

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
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
                        setTimeout(() => {
                            setUserModal(true);
                        }, 300);
                        setTimeout(() => {
                            setScreen('sign-up');
                        }, 400);
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
                            setScreen('SuccessfulPage');
                        }
                    }
                    setGoogleLoading(false);
                })
                .catch(error => {
                    setGoogleLoading(false);
                    console.log('Google Sign In Error', error);
                });
            return userInfo;
        } catch (error) {
            setGoogleLoading(false);
            console.log('=> Google Sign In NOOO', error);
            toast.show('Something Went Wrong Please Try Again', {
                type: 'danger',
            });
            return null;
        }
    };
    const appleLogin = async () => {
        console.log('Demo Apple');
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.mainHeadingContainer}>
                    <Text allowFontScaling={false} style={styles.headingOne}>
                        Login/Sign Up{' '}
                        <Text
                            allowFontScaling={false}
                            style={{color: '#232323'}}>
                            to Petme
                        </Text>
                    </Text>
                </View>
                <View style={styles.subHeadingContainer}>
                    <Text allowFontScaling={false} style={styles.subHeading}>
                        Please Enter Your Email to Continue
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    {buttonState.map((item, index) => (
                        <BorderButton
                            key={index}
                            id={item.id}
                            label={item.label}
                            icon={item.icon}
                            setActiveTab={setActiveTab}
                            activeTab={activeTab}
                            buttonDisabled={false}
                            onPress={() => {
                                item.toggleType();
                                setScreen('login');
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
                </View>
            </View>
        </View>
    );
};

export default SignUpOptions;

const styles = StyleSheet.create({
    mainContainer: {},
    subContainer: {},
    mainHeadingContainer: {
        marginBottom: SIZE(16),
    },
    headingOne: {
        color: '#009FD3',
        fontSize: SIZE(24),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    subHeadingContainer: {
        marginBottom: SIZE(16),
    },
    subHeading: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    buttonContainer: {},
});
