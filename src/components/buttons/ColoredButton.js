import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import LottieView from 'lottie-react-native';
import ButtonLoader from '../../assets/lottie/buttonloader.json';

//svg
import LoginIcon from '../../assets/icons/login-icon.svg';
// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

const ColoredButton = ({
    label,
    marginTop,
    onPress,
    buttonLoader,
    loginIcon,
    buttonDisabled,
    dark,
}) => {
    return (
        <TouchableOpacity
            disabled={buttonDisabled}
            activeOpacity={0.8}
            onPress={() => {
                onPress && onPress();
            }}
            style={[
                styles.buttonStyle,
                {
                    marginTop: marginTop ? SIZE(marginTop) : SIZE(24),
                    backgroundColor: dark ? '#003459' : '#009FD3',
                    paddingVertical: dark ? SIZE(10) : SIZE(14),
                },
            ]}>
            {buttonLoader ? (
                <LottieView
                    source={ButtonLoader}
                    autoPlay
                    loop
                    style={{width: SIZE(20), height: SIZE(20)}}
                />
            ) : loginIcon ? (
                <View style={styles.loginImage}>
                    <LoginIcon width={SIZE(20)} height={SIZE(20)} />
                </View>
            ) : null}
            {buttonLoader
                ? null
                : label && <Text style={styles.buttonText}>{label}</Text>}
        </TouchableOpacity>
    );
};

export default ColoredButton;

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: SIZE(24),
        alignItems: 'center',
        borderRadius: SIZE(8),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
    },
    loginImage: {
        marginRight: SIZE(10),
    },
});
