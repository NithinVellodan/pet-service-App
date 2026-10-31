import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
//packages
import LottieView from 'lottie-react-native';
// svg
import ConfirmIcon from '../../assets/icons/tick-circle.svg';
//json
import LoadingAnimation from '../../assets/lottie/loading.json';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {Context} from '../../contexts/Store';
export default function PaymentSuccess({route}) {
    const navigation = useNavigation();
    const {state, dispatch} = useContext(Context);
    const [isTransactionSuccessful, setTransactionSuccess] = useState(false);
    const previousScreen = useNavigationState(
        state => state.routes[state.index - 1]?.name,
    );

    const updateUserData = () => {
        dispatch({
            type: 'UPDATE_MODAL_SECTION',
            commonModal: {
                ...state.commonModal,
                appRatingModal: true,
            },
        });
    };

    useEffect(() => {
        const navigateToAnotherPage = () => {
            if (previousScreen === 'BookingSummary') {
                setTimeout(() => {
                    navigation.navigate('BookingSectionStack', {
                        screen: 'Bookings',
                        params: {
                            selectedFilter: {
                                id: 1,
                                type: 'Place to Stay',
                                page_type: 'place-to-stay',
                            },
                        },
                    });
                }, 2000);
            } else if (previousScreen === 'BookingSummaryBorrowPet') {
                setTimeout(() => {
                    navigation.navigate('BookingSectionStack', {
                        screen: 'Bookings',
                        params: {
                            selectedFilter: {
                                id: 2,
                                type: 'Borrow a Pet',
                                page_type: 'borrow-pet',
                            },
                        },
                    });
                }, 2000);
            } else if (previousScreen === 'BookingSummaryTrainerCustomer') {
                setTimeout(() => {
                    navigation.navigate('BookingSectionStack', {
                        screen: 'Bookings',
                        params: {
                            selectedFilter: {
                                id: 3,
                                type: 'Trainer',
                                page_type: 'trainer',
                            },
                        },
                    });
                }, 2000);
            } else if (route?.params?.screen_is === 'wallet') {
                setTimeout(() => {
                    if (!state?.userData?.is_service) {
                        navigation.navigate('WalletStackCustomer', {
                            is_payment: true,
                            screen: 'Wallet',
                        });
                    } else {
                        navigation.navigate('WalletStackProvider', {
                            is_payment: true,
                            screen: 'Wallet',
                        });
                    }
                }, 2000);
            }
        };
        if (!state.commonModal.ratingSubmitted) {
            setTimeout(() => {
                updateUserData();
            }, 2500);
        }
        navigateToAnotherPage();
    }, [navigation, previousScreen, route]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                {/* {isTransactionSuccessful ? ( */}
                <View style={styles.confirmContainer}>
                    <ConfirmIcon width={'100%'} height={'100%'} />
                </View>
                {/* ) : (
                    ''
                )} */}
                <View style={styles.successTextContainer}>
                    {/* {isTransactionSuccessful ? ( */}
                    <Text
                        allowFontScaling={false}
                        style={[styles.successText, {fontSize: SIZE(32)}]}>
                        Thank You
                    </Text>
                    {/* ) : 
                    <Text
                        allowFontScaling={false}
                        style={[styles.successText, {fontSize: SIZE(24)}]}>
                        Please Wait for Sometimes
                    </Text>
                    null} */}
                </View>
                <View style={styles.registrationTextContainer}>
                    {/* {isTransactionSuccessful ? ( */}
                    <>
                        <Text
                            allowFontScaling={false}
                            style={styles.registrationText}>
                            Your Booking Reference Number
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={styles.orderNumber}>
                            #{route?.params?.reference}
                        </Text>
                    </>
                    {/* ) :<Text
                        allowFontScaling={false}
                        style={styles.registrationText}>
                        Your Bank Transaction is in progress
                    </Text>} */}
                </View>
                {/* {isTransactionSuccessful ? (
                    ''
                ) : (
                    <View style={styles.lottieContainer}>
                        <LottieView
                            source={LoadingAnimation}
                            autoPlay
                            loop
                            style={{width: SIZE(80), height: SIZE(80)}}
                        />
                    </View>
                )} */}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
    orderNumber: {
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
});
