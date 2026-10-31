import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

const DescriptionHeading = ({text, isSmall, nameField, isCenter}) => {
    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: isSmall ? SIZE(12) : SIZE(16),
                },
            ]}>
            <Text
                style={[
                    styles.textColor,
                    {
                        fontSize: isSmall ? SIZE(14) : SIZE(16),
                        textAlign: isCenter && 'center',
                    },
                ]}>
                {nameField}
                {text}
            </Text>
        </View>
    );
};

export default DescriptionHeading;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: SIZE(16),
        marginBottom: SIZE(16),
    },
    textColor: {
        fontSize: SIZE(16),
        textAlign: 'center',
        color: '#8E8E8E',
        fontFamily: FONTS.regular,
    },
});
