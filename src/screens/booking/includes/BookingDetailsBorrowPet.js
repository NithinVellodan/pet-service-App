import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

import TopArrow from '../../../assets/icons/booking-details/arrow-top';
import BottomArrow from '../../../assets/icons/booking-details/bottom-arrow';

const BookingDetailsBorrowPet = ({onPress, bookingDate}) => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => [setIsVisible(!isVisible)]}
            style={{
                borderWidth: 1,
                borderColor: '#E2E2E2',
                padding: SIZE(13),
                borderRadius: SIZE(8),
                marginTop: SIZE(30),
                marginBottom: SIZE(20),
                backgroundColor: '#FFFFFF',
            }}>
            <View
                style={[
                    styles.topBox,
                    {
                        borderBottomWidth: isVisible ? 1 : 0,
                        paddingBottom: !isVisible ? 0 : SIZE(15),
                    },
                ]}>
                <Text style={styles.subContent2}>Booking Details</Text>
                <View>{isVisible ? <TopArrow /> : <BottomArrow />}</View>
            </View>
            {isVisible && (
                <View style={styles.contentBox}>
                    <View>
                        <Text style={[styles.subContent, {marginBottom: 5}]}>
                            Dates
                        </Text>
                        <Text
                            style={[
                                styles.subContent,
                                {
                                    color: '#232323',
                                    fontFamily: FONTS.semiBold,
                                },
                            ]}>
                            {`${bookingDate?.startDate.getDate()} ${bookingDate?.startDate.toLocaleString(
                                'default',
                                {month: 'short'},
                            )} - ${bookingDate?.endDate.getDate()} ${bookingDate?.endDate.toLocaleString(
                                'default',
                                {month: 'short'},
                            )} ${bookingDate?.endDate.getFullYear()}`}{' '}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={onPress}>
                        <Text
                            style={[
                                styles.subContent,
                                {fontFamily: FONTS.bold, color: '#009FD3'},
                            ]}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default BookingDetailsBorrowPet;

const styles = StyleSheet.create({
    subContent2: {
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
    },
    headerRight: {
        flex: 1,
    },
    subContent: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
    },
    contentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: SIZE(10),
    },
    topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBlockColor: '#E2E2E2',
        paddingBottom: 10,
    },
});
