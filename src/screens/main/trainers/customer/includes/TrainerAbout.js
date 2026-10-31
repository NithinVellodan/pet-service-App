import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

const TrainerAbout = ({data}) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headingText}>About Services</Text>
            <Text style={styles.aboutText}>{data}</Text>
        </View>
    );
};

export default TrainerAbout;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: SIZE(32),
    },
    headingText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(18),
        fontWeight: '600',
        color: '#242424',
        marginBottom: SIZE(16),
    },
    aboutText: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '400',
        color: '#757575',
    },
});
