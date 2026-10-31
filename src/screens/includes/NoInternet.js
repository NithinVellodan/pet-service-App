import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform,
    NativeModules,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import React from 'react';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

//images and logos
import OfflineLogo from '../../assets/icons/offline-logo.svg';

const NoInternet = () => {
    const {StatusBarManager} = NativeModules;
    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    marginTop:
                        Platform.OS === 'ios'
                            ? StatusBarManager.HEIGHT +
                              SIZES.height * 0.009 -
                              SIZE(5)
                            : null,
                    marginBottom:
                        Platform.OS === 'ios'
                            ? StatusBarManager.HEIGHT +
                              SIZES.height * 0.009 -
                              SIZE(30)
                            : null,
                },
            ]}>
            <StatusBar barStyle="light-content" />
            <View style={styles.spotlightMain}>
                <View style={styles.spotlight}>
                    <OfflineLogo width={'100%'} height={'100%'} />
                </View>
                <View style={styles.bottom}>
                    <Text allowFontScaling={false} style={styles.mainText}>
                        You’re Offline
                    </Text>
                    <Text allowFontScaling={false} style={styles.subText}>
                        Please connect to the internet and try again
                    </Text>
                    <TouchableOpacity
                        onPress={() => {}}
                        activeOpacity={0.8}
                        style={styles.button}>
                        <Text
                            allowFontScaling={false}
                            style={styles.buttonText}>
                            Try Again
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NoInternet;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#F7F7F7',
        zIndex: 10000,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
