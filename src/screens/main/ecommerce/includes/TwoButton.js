import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const TwoButton = ({
    leftText,
    onPressL,
    rightText,
    onPressR,
    providerColor,
    buttonLoader,
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={buttonLoader}
                activeOpacity={0.8}
                onPress={() => {
                    onPressL && onPressL();
                }}
                style={[
                    styles.leftContainer,
                    {borderColor: providerColor ? '#003459' : '#009FD3'},
                ]}>
                <Text
                    style={[
                        styles.leftText,
                        {color: providerColor ? '#003459' : '#009FD3'},
                    ]}>
                    {leftText}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={buttonLoader}
                activeOpacity={0.8}
                onPress={() => {
                    onPressR && onPressR();
                }}
                style={[
                    styles.rightContainer,
                    {backgroundColor: providerColor ? '#009FD3' : '#003459'},
                ]}>
                {buttonLoader ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <Text style={styles.rightText}>{rightText}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default TwoButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainer: {
        backgroundColor: '#f7f7f7',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: 1,
        borderColor: '#009FD3',
        paddingHorizontal: SIZE(32),
        width: '48%',
    },
    leftText: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
    rightContainer: {
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        paddingHorizontal: SIZE(32),
        backgroundColor: '#003459',
        width: '48%',
    },
    rightText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
});
