import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const Title = ({label, onPress, rightText, trainer}) => {
    return (
        <View
            style={[
                styles.viewContainer,
                {
                    marginHorizontal: trainer ? 0 : SIZE(16),
                },
            ]}>
            <View>
                <Text
                    style={[
                        styles.shopText,
                        {fontSize: trainer ? SIZE(20) : SIZE(16)},
                    ]}>
                    {label}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => onPress && onPress()}
                hitSlop={0.7}
                activeOpacity={0.8}>
                <Text style={styles.viewText}>{rightText}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Title;

const styles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'row',
        marginHorizontal: SIZE(16),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shopText: {
        fontSize: SIZE(16),
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    viewText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
