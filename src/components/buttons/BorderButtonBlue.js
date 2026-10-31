import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

const BorderButtonBlue = ({
    lowLabel,
    label,
    icon,
    onPress,
    iconTwo,
    selected,
    onPressTwo,
    isStoreAdd,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.buttonStyle,
                selected && styles.selectedButtonStyle,
                isStoreAdd && styles.storeAddStyle,
            ]}
            disabled={isStoreAdd}
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
            <TouchableOpacity
                disabled={isStoreAdd}
                hitSlop={20}
                onPress={() => onPressTwo && onPressTwo()}
                activeOpacity={0.8}
                style={styles.iconContainer}>
                {iconTwo}
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default BorderButtonBlue;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#f7f7f7',
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: 1,
        borderColor: '#009FD3',
        flexDirection: 'row',
        paddingHorizontal: SIZE(32),
        justifyContent: 'space-between',
    },
    buttonText: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
        width: SIZE(255),
    },
    iconContainer: {
        width: SIZE(20),
        height: SIZE(20),
    },
    selectedButtonStyle: {
        backgroundColor: '#EAF7FF',
    },
    storeAddStyle: {
        opacity: 0.3,
    },
});
