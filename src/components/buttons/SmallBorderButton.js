import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

const SmallBorderButton = ({lowLabel, label, icon, onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
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

export default SmallBorderButton;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#fff',
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: 1,
        borderColor: '#009FD3',
        flexDirection: 'row',
        paddingHorizontal: SIZE(32),
    
    },
    buttonText: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
      
    },
    iconContainer: {
        width: SIZE(20),
        height: SIZE(20),
    },
});
