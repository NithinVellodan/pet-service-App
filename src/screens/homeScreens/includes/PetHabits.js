import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const PetHabits = ({item}) => {
    return (
        <View style={styles.mainContainer}>
            {item.map(item => (
                <View key={item.id}>
                    <View style={styles.mainHeading}>
                        <Text allowFontScaling={false} style={styles.mainText}>
                            {item.option}
                        </Text>
                    </View>
                    <View style={styles.subContainer}>
                        <Text allowFontScaling={false} style={styles.subText}>
                            {item.detail}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default PetHabits;

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: SIZE(10),
        overflow: 'hidden',
        borderWidth: SIZE(1),
        borderColor: '#EDEDED',
        marginBottom: SIZE(32),
    },
    mainHeading: {
        padding: SIZE(16),
        backgroundColor: '#EDEDED',
    },
    mainText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    subContainer: {
        padding: SIZE(16),
        backgroundColor: '#fff',
    },
    subText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
});
