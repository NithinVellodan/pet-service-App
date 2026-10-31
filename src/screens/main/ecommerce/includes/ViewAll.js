import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const ViewAll = ({label, onPress, wallet}) => {
    return (
        <View
            style={[
                styles.viewContainer,
                {marginHorizontal: wallet ? SIZE(0) : SIZE(16)},
            ]}>
            <View>
                <Text style={styles.shopText}>{label}</Text>
            </View>
            <TouchableOpacity
                onPress={() => onPress && onPress()}
                hitSlop={0.7}
                activeOpacity={0.8}>
                <Text
                    style={[
                        styles.viewText,
                        {color: wallet ? '#003459' : '#009FD3'},
                    ]}>
                    View All
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ViewAll;

const styles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'row',
        marginHorizontal: SIZE(16),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shopText: {
        fontSize: SIZE(18),
        color: '#00171F',
        fontFamily: FONTS.bold,
    },
    viewText: {
        fontSize: SIZE(14),
        color: '#009FD3',
        fontFamily: FONTS.bold,
    },
});
