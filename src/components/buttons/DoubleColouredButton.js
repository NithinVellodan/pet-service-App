import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

const DoubleColouredButton = ({
    onPress,
    label,
    buttonLabel,
    buttonLabelDark,
    timer,
    disabled,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.greyText}>{label} </Text>
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={0.8}
                style={styles.buttonStyle}
                onPress={onPress && onPress}>
                {buttonLabelDark === 'dark' ? (
                    <Text style={styles.buttonText}>
                        {timer < 10 ? `0${buttonLabel}` : buttonLabel}
                    </Text>
                ) : (
                    <Text style={styles.buttonTextDark}>
                        {timer < 10 ? `0${buttonLabel}` : buttonLabel}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default DoubleColouredButton;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZE(16),
    },
    greyText: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#AAAAAA',
    },
    buttonStyle: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#009FD3',
    },
    buttonText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#009FD3',
    },
    buttonTextDark: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#003459',
    },
});
