import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
// svg
import FailedIcon from '../../assets/icons/card-remove.svg';
import {useNavigation} from '@react-navigation/native';

export default function PaymentFailed({route}) {
    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.confirmContainer}>
                    <FailedIcon width={'100%'} height={'100%'} />
                </View>

                <View style={styles.successTextContainer}>
                    <Text
                        allowFontScaling={false}
                        style={[styles.successText, {fontSize: SIZE(32)}]}>
                        Payment Failed
                    </Text>
                </View>
                <View style={styles.registrationTextContainer}>
                    <Text
                        allowFontScaling={false}
                        style={styles.registrationText}>
                        Sorry, your transaction has failed. Please try again
                        later.
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
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
        marginBottom: SIZE(32),
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
    button: {
        backgroundColor: '#009FD3',
        paddingHorizontal: SIZE(24),
        paddingVertical: SIZE(10),
        borderRadius: SIZE(6),
    },
    buttonText: {
        color: '#fff',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
    },
});
