import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

//packages
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

//images and logos
import PageNotFoundLogo from '../../assets/icons/page-not-found.svg';

const PageNotFound = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.spotlightMain}>
            <View style={styles.spotlight}>
                <PageNotFoundLogo width={'100%'} height={'100%'} />
            </View>
            <View style={styles.bottom}>
                <Text allowFontScaling={false} style={styles.mainText}>
                    Page Not Found
                </Text>
                <Text allowFontScaling={false} style={styles.subText}>
                    We’re Sorry ! The page you requested could not be found
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('MainHome');
                    }}
                    activeOpacity={0.8}
                    style={styles.button}>
                    <Text allowFontScaling={false} style={styles.buttonText}>
                        Go Home
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PageNotFound;

const styles = StyleSheet.create({
    spotlightMain: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
    },
    spotlight: {
        width: SIZE(300),
        height: SIZE(300),
        marginBottom: SIZE(32),
    },
    bottom: {},
    mainText: {
        color: '#000',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: SIZE(12),
    },
    subText: {
        color: '#686868',
        fontFamily: FONTS.regular,
        fontSize: SIZE(16),
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: SIZE(24),
        width: SIZE(270),
    },
    button: {
        backgroundColor: '#003459',
        borderRadius: SIZE(6),
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(10),
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        letterSpacing: SIZE(0.5),
        lineHeight: SIZE(22),
    },
});
