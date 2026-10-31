import {StyleSheet, Animated, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// theme
import {SIZE} from '../../theme/theme';

// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import NormalForm from '../../components/forms/NormalForm';
import ColoredButton from '../../components/buttons/ColoredButton';

// Store
import {Context} from '../../contexts/Store';
import {usersConfig} from '../../../axiosConfig';
import {FONTS} from '../../theme/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SetPassword = ({
    setVisible,
    setModalScreens,
    setPrevModal,
    is_Firbase,
}) => {
    // Animate
    const {state, dispatch} = useContext(Context);
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

    const [isLoading, setIsLoading] = useState(false);
    const [addPassword, setAddPassword] = useState('');
    const [clint, setClint] = useState(is_Firbase?.google_id_token);
    const [addRePassword, setAddRePassword] = useState('');
    const [error, setError] = useState('');

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    const createAccount = async () => {
        setIsLoading(true);
        const pk = state.userData.tempPk;
        let firebaseEmail = '';
        let firebaseUid = '';
        let firebaseName = '';
        try {
            const response = await usersConfig.post(`signup/${pk}/`, {
                password: addRePassword,
                google_id_token: clint,
            });
            if (response.data.StatusCode === 6000) {
                try {
                    if (is_Firbase?.is_fireBase === false) {
                        const userCredential =
                            await auth().createUserWithEmailAndPassword(
                                response.data.data.email,
                                addRePassword,
                            );
                        const user = userCredential.user;
                        await firestore()
                            .collection('users')
                            .doc(user.uid)
                            .set({
                                uid: user.uid,
                                name: response.data.data.name,
                                mail: response.data.data.email,
                            });

                        firebaseName = response.data.data.name;
                        firebaseEmail = response.data.data.email;
                        firebaseUid = user.uid;
                    } else {
                        const {email} = response.data.data;
                        const userExists =
                            await auth().fetchSignInMethodsForEmail(email);

                        if (
                            userExists &&
                            userExists.length > 0 &&
                            userExists.includes('password')
                        ) {
                            setError(
                                'An account with this email already exists.',
                            );
                            setIsLoading(false);
                        } else {
                            const googleCredential =
                                auth.GoogleAuthProvider.credential(
                                    state.userData.google_encrypt,
                                );

                            const userCredential =
                                await auth().signInWithCredential(
                                    googleCredential,
                                );

                            const user = userCredential.user;
                            await firestore()
                                .collection('users')
                                .doc(user.uid)
                                .set({
                                    uid: user.uid,
                                    name: response.data.data.name,
                                    mail: response.data.data.email,
                                });

                            firebaseName = response.data.data.name;
                            firebaseEmail = response.data.data.email;
                            firebaseUid = user.uid;
                        }
                    }
                    // Update user data here
                    updateUserDate({
                        ...state.userData,
                        accessToken: response.data.token.access,
                        name: response.data.data.name,
                        phone: response.data.data.phone,
                        mailId: response.data.data.email,
                        image: response.data.data.image,
                        isRegistered: true,
                        firebaseName: firebaseName,
                        firebaseEmail: firebaseEmail,
                        firebaseUid: firebaseUid,
                    });
                    setPrevModal('set-password');
                    setModalScreens('terms-and-conditions');
                } catch (error) {
                    console.log('Error registering user:', error.message);
                }
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
        setIsLoading(false);
    };

    // const createAccount = async () => {
    //     setIsLoading(true);
    //     const pk = state.userData.tempPk;
    //     let firebaseEmail = '';
    //     let firebaseUid = '';
    //     let firebaseName = '';

    //     try {
    //         // Create Firebase account first
    //         if (is_Firbase?.is_fireBase === false) {
    //             const userCredential =
    //                 await auth().createUserWithEmailAndPassword(
    //                     state.userData.mailId,
    //                     addRePassword,
    //                 );
    //             const user = userCredential.user;
    //             await firestore().collection('users').doc(user.uid).set({
    //                 uid: user.uid,
    //                 name: state.userData.name,
    //                 mail: state.userData.mailId,
    //             });

    //             console.log('Firebase account created successfully:', user.uid);

    //             firebaseName = state.userData.name;
    //             firebaseEmail = state.userData.mailId;
    //             firebaseUid = user.uid;
    //         } else {
    //             const {mailId} = state.userData;
    //             const userExists = await auth().fetchSignInMethodsForEmail(
    //                 mailId,
    //             );

    //             if (
    //                 userExists &&
    //                 userExists.length > 0 &&
    //                 userExists.includes('password')
    //             ) {
    //                 setError('An account with this email already exists.');
    //                 setIsLoading(false);
    //                 return;
    //             } else {
    //                 const googleCredential = auth.GoogleAuthProvider.credential(
    //                     state.userData.google_encrypt,
    //                 );
    //                 const userCredential = await auth().signInWithCredential(
    //                     googleCredential,
    //                 );
    //                 const user = userCredential.user;
    //                 await firestore().collection('users').doc(user.uid).set({
    //                     uid: user.uid,
    //                     name: state.userData.name,
    //                     mail: state.userData.mailId,
    //                 });

    //                 firebaseName = state.userData.name;
    //                 firebaseEmail = state.userData.mailId;
    //                 firebaseUid = user.uid;
    //             }
    //         }

    //         // Call backend API after successful Firebase operations
    //         try {
    //             const response = await usersConfig.post(`signup/${pk}/`, {
    //                 password: addRePassword,
    //                 google_id_token: clint,
    //             });

    //             if (response.data.StatusCode === 6000) {
    //                 // Update user data here
    //                 updateUserDate({
    //                     ...state.userData,
    //                     accessToken: response.data.token.access,
    //                     name: response.data.data.name,
    //                     phone: response.data.data.phone,
    //                     mailId: response.data.data.email,
    //                     image: response.data.data.image,
    //                     isRegistered: true,
    //                     firebaseName: firebaseName,
    //                     firebaseEmail: firebaseEmail,
    //                     firebaseUid: firebaseUid,
    //                 });
    //                 setPrevModal('set-password');
    //                 setModalScreens('terms-and-conditions');
    //             } else {
    //                 setError(response.data.message);
    //             }
    //         } catch (error) {
    //             console.log('Error calling backend API:', error.message);
    //         }
    //     } catch (error) {
    //         console.log(
    //             'Error registering user with Firebase:',
    //             error.message,
    //         );
    //     }

    //     setIsLoading(false);
    // };

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps={'handled'}
            style={styles.container}>
            <Animated.View style={{transform: [{translateX}]}}>
                <DoubleColorHeading
                    firstTitle={'Set a Strong'}
                    secondTitle={'Password'}
                    isCenter={true}
                />
                <DescriptionHeading
                    isCenter={true}
                    nameField={state.userData.name}
                    text={
                        ', welcome to your account, choose a secure password.'
                    }
                />
                <NormalForm
                    label={'Password'}
                    placeholder={'Enter a Strong Password'}
                    type={'password'}
                    addPassword={addPassword}
                    setAddPassword={setAddPassword}
                    setError={setError}
                />
                <NormalForm
                    label={'Re - Enter Password'}
                    placeholder={'Re - Enter Password'}
                    type={'password'}
                    marginTop={24}
                    addRePassword={addRePassword}
                    setAddRePassword={setAddRePassword}
                    setError={setError}
                />
                <Text style={styles.errorMessage}>{error}</Text>
                <ColoredButton
                    label={'Save'}
                    buttonLoader={isLoading}
                    buttonDisabled={isLoading === true ? true : false}
                    onPress={() => {
                        const containsAlphabet = /[a-zA-Z]/.test(addPassword);
                        const containsNumber = /\d/.test(addPassword);
                        const containsSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(
                            addPassword,
                        );
                        let errorMessage = '';
                        if (
                            addPassword.length <= 7 ||
                            addRePassword.length <= 7
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
                        } else if (addPassword !== addRePassword) {
                            errorMessage = 'Passwords do not match.';
                        }
                        if (errorMessage) {
                            setError(errorMessage);
                        } else {
                            createAccount();
                            setVisible();
                        }
                    }}
                />
            </Animated.View>
        </KeyboardAwareScrollView>
    );
};

export default SetPassword;

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
});
