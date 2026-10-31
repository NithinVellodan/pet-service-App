import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const TwoColorButtonDark = ({leftText, onPressL, rightText, onPressR}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    onPressL && onPressL();
                }}
                style={styles.leftContainer}>
                <Text style={styles.leftText}>{leftText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    onPressR && onPressR();
                }}
                style={styles.rightContainer}>
                <Text style={styles.rightText}>{rightText}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TwoColorButtonDark;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftContainer: {
        backgroundColor: '#f7f7f7',
        paddingVertical: SIZE(12),
        borderRadius: SIZE(8),
        borderWidth: 1,
        borderColor: '#003459',
        paddingHorizontal: SIZE(32),
        width: SIZE(133),
        marginRight: SIZE(16),
    },
    leftText: {
        color: '#003459',
        fontFamily: FONTS.bold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
    rightContainer: {
        backgroundColor: '#fff',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        paddingHorizontal: SIZE(16),
        backgroundColor: '#009FD3',
        width: SIZE(150),
    },
    rightText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        textAlign: 'center',
    },
});
