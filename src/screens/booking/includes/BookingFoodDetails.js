import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS} from '../../../theme/fonts';
import {SIZE} from '../../../theme/theme';

const BookingFoodDetails = ({bookingData}) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={[styles.foodContainer, {marginRight: SIZE(16)}]}>
                    <View style={styles.subOne}>
                        <Text style={styles.subOneText}>
                            {bookingData?.is_vaccinated ? 'Yes' : 'No'}
                        </Text>
                    </View>
                    <View style={styles.subTwo}>
                        <Text style={styles.subTwoText}>Vaccination</Text>
                    </View>
                </View>
                <View style={styles.foodContainer}>
                    <View style={styles.subOne}>
                        <Text style={styles.subOneText}>
                            {bookingData?.is_insured ? 'Yes' : 'No'}
                        </Text>
                    </View>
                    <View style={styles.subTwo}>
                        <Text style={styles.subTwoText}>Insurance</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default BookingFoodDetails;

const styles = StyleSheet.create({
    mainContainer: {},
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(16),
    },
    foodContainer: {
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        flex: 1,
        overflow: 'hidden',
    },
    subOne: {
        padding: SIZE(16),
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        overflow: 'hidden',
    },
    subTwo: {
        padding: SIZE(16),
        alignItems: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    subOneText: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        fontWeight: '600',
    },
    subTwoText: {
        color: '#686868',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        fontWeight: '600',
    },
    insuranceContainer: {
        padding: SIZE(16),
    },
});
