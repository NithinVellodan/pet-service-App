import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
//constants
import {Context} from '../../contexts/Store';

const DoubleColorHeading = ({firstTitle, secondTitle, isCenter, isSmall}) => {
    const {state, dispatch} = useContext(Context);
    return (
        <View>
            <Text
                style={[
                    styles.headingContainer,
                    {
                        textAlign: isCenter && 'center',
                        fontSize: isSmall ? SIZE(20) : SIZE(24),
                    },
                ]}>
                <Text
                    style={[
                        styles.primaryText,
                        {
                            color:
                                state.userData.is_service === true
                                    ? '#003459'
                                    : '#009FD3',
                        },
                    ]}>
                    {firstTitle}
                </Text>
                <Text style={styles.secondryText}> {secondTitle}</Text>
            </Text>
        </View>
    );
};

export default DoubleColorHeading;

const styles = StyleSheet.create({
    headingContainer: {
        fontSize: SIZE(24),
        fontFamily: FONTS.semiBold,
    },
    primaryText: {
        // color: '#009FD3',
    },
    secondryText: {
        color: '#000',
    },
});
