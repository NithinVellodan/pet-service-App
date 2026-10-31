import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import CalendarIcon from '../../../assets/icons/booking/calendar.svg';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const BookingTopDate = ({route, bookingData}) => {
    const dateObject = new Date(bookingData.start_date);
    const dateObject2 = new Date(bookingData.end_date);
    const year = dateObject.getFullYear();
    const year2 = dateObject2.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const month2 = (dateObject2.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const day2 = dateObject2.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    const formattedDate2 = `${day2}/${month2}/${year2}`;
    return (
        <View style={styles.bookedItemDate}>
            <View style={styles.bookedItemDateGray}>
                <CalendarIcon width={SIZE(16)} height={SIZE(16)} />
                <Text style={styles.bookedDate}>
                    {formattedDate} - {formattedDate2}
                </Text>
                {route.name === 'BorrowBookingSinge' ? (
                    ''
                ) : (
                    <Text style={styles.bookedDays}>( 5 Days )</Text>
                )}
            </View>
            <View style={styles.bookedItemDateWhite}>
                <Text style={styles.bookedDateText}>Booked Date</Text>
            </View>
        </View>
    );
};

export default BookingTopDate;

const styles = StyleSheet.create({
    bookedItemDate: {
        borderColor: '#E2E2E2',
        borderWidth: 1,
        marginTop: SIZE(16),
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
    bookedItemDateGray: {
        flexDirection: 'row',
        backgroundColor: '#EDEDED',
        padding: SIZE(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookedDate: {
        marginHorizontal: SIZE(8),
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    bookedDays: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    bookedItemDateWhite: {
        padding: SIZE(16),
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    bookedDateText: {
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
        color: '#686868',
    },
});
