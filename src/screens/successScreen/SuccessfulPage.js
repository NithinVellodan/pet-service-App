import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
//packages
import LottieView from 'lottie-react-native';
// svg
import ConfirmIcon from '../../assets/icons/tick-circle.svg';
//json
import LoadingAnimation from '../../assets/lottie/loading.json';
import {Context} from '../../contexts/Store';

export default function SuccessfulPage({route, setModalScreens}) {
    const {state, dispatch} = useContext(Context);

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: 'UPDATE_USER_DATA',
                userData: {
                    ...state.userData,
                    is_login: true,
                },
            });
            setModalScreens('detail');
        }, 2500);
    }, []);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.confirmContainer}>
                    <ConfirmIcon width={'100%'} height={'100%'} />
                </View>

                <View style={styles.successTextContainer}>
                    <Text style={styles.successText}>
                        {state.userData.isRegistered
                            ? 'Successful'
                            : 'Successful Login'}
                    </Text>
                </View>
                <View style={styles.registrationTextContainer}>
                    {route?.params?.fromLogin === true ? (
                        ''
                    ) : (
                        <Text style={styles.registrationText}>
                            {state.userData.isRegistered &&
                                'Your Registration Successfully Completed'}
                        </Text>
                    )}
                </View>

                <View style={styles.lottieContainer}>
                    <LottieView
                        source={LoadingAnimation}
                        autoPlay
                        loop
                        style={{width: SIZE(80), height: SIZE(80)}}
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
    },
    subContainer: {
        alignItems: 'center',
    },
    confirmContainer: {
        width: SIZE(120),
        height: SIZE(120),
    },
    successTextContainer: {
        marginTop: SIZE(24),
    },
    successText: {
        color: '#009FD3',
        fontSize: SIZE(32),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    registrationTextContainer: {
        marginTop: SIZE(8),
        width: SIZE(288),
    },
    registrationText: {
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        textAlign: 'center',
    },
    lottieContainer: {},
});
