import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const BookingTopItems = ({route, bookingData}) => {
    return (
        <View style={styles.bookedItemsTop}>
            <View style={styles.bookedItemsCategory}>
                <Text style={styles.bookedItemGray}>
                    {bookingData?.pet_type}
                </Text>
                <View style={{backgroundColor: '#fff'}}>
                    <Text style={styles.bookedItemWhite}>Category</Text>
                </View>
            </View>
            <View
                style={[
                    styles.bookedItemsCategory,
                    {marginHorizontal: SIZE(14)},
                ]}>
                {route.name === 'BorrowBookingSinge' ? (
                    <>
                        <View style={{width: SIZE(121)}}>
                            <Text style={styles.bookedItemGray}>
                                {bookingData?.age}
                            </Text>
                            <View style={{backgroundColor: '#fff'}}>
                                <Text style={styles.bookedItemWhite}>Age</Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.otherItemGray}>150/day</Text>
                        <Text style={styles.otherItemWhite}>
                            Other Price per Pet
                        </Text>
                    </>
                )}
            </View>
            {route.name === 'BorrowBookingSinge' ? (
                <View style={styles.bookedItemsCategory}>
                    <Text style={styles.bookedItemGray}>
                        {bookingData?.no_of_days}
                    </Text>
                    <View style={{backgroundColor: '#fff'}}>
                        <Text style={styles.bookedItemWhite}>No of Days</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.bookedItemsCategory}>
                    <Text style={styles.bookedItemGray}>5</Text>
                    <Text style={styles.bookedItemWhite}>No of Pets</Text>
                </View>
            )}
        </View>
    );
};

export default BookingTopItems;

const styles = StyleSheet.create({
    bookedItemsTop: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    bookedItemsCategory: {
        borderColor: '#E2E2E2',
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        width: SIZE(121),
        overflow: 'hidden',
    },
    bookedItemGray: {
        padding: SIZE(16),
        textAlign: 'center',
        backgroundColor: '#EDEDED',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        color: '#242424',
    },
    bookedItemWhite: {
        paddingVertical: SIZE(16),
        textAlign: 'center',
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
    },
});
