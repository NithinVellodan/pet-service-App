import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

const SmallColoredButton = ({lowLabel, label, icon, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
                onPress && onPress();
            }}>
            <View style={styles.iconContainer}>{icon}</View>
            <Text style={styles.buttonText}>
                {
                    <Text
                        style={[
                            styles.buttonText,
                            {fontFamily: FONTS.regular},
                        ]}>
                        {lowLabel}
                    </Text>
                }
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default SmallColoredButton;

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        flexDirection: 'row',
        paddingHorizontal: SIZE(32),
        backgroundColor: '#003459',
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
    },
    iconContainer: {
        width: SIZE(20),
        height: SIZE(20),
    },
});
