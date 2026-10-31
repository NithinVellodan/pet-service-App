import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import UpArrow from '../../../assets/icons/arrowup.svg';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';
const RecentBooking = ({navigation}) => {
    const [bookingID, setBookingID] = useState('');
    const {state} = useContext(Context);

    const BOOKING_STATUS = [
        {
            id: 1,
            Breed: 'Rottweiler',
            status: 'Ongoing',
            category: 'Dog',
            age: 1,
            no_days: 6,
            place: 'Ras Al‑Khaimah, Dubai',
            Rate: 800,
        },
        {
            id: 2,
            Breed: 'Rottweiler',
            status: 'Expired',
            category: 'Dog',
            age: 1,
            no_days: 5,
            place: 'Ras Al‑Khaimah, Dubai',
            Rate: 800,
        },
        {
            id: 3,
            Breed: 'Rottweiler',
            status: 'Expired',
            category: 'Dog',
            age: 1,
            no_days: 3,
            place: 'Ras Al‑Khaimah, Dubai',
            Rate: 800,
        },
    ];

    return (
        <View style={styles.recentBookingContainer}>
            <View style={styles.reviewsHead}>
                <Text style={styles.reviewsText}>Recent Bookings</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        if (state?.userData?.is_service) {
                            navigation.navigate('MyReviews');
                        } else if (!state.userData.is_service) {
                            navigation.navigate('CustomerReviews');
                        }
                    }}>
                    <Text style={styles.reviewsViewText}>View All</Text>
                </TouchableOpacity>
            </View>
            {BOOKING_STATUS.map((detail, index) => (
                <View style={styles.recentBookingSection} key={index}>
                    <View style={styles.recentBookingTop}>
                        <Text style={styles.recentBookingName}>Rottweiler</Text>
                        <View style={styles.recentBookingHead}>
                            <Text style={styles.recentBookingStatus}>
                                Ongoing
                            </Text>
                            <Text style={styles.recentBookingData}>
                                12 Sep - 20 Sep
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    if (bookingID === detail.id) {
                                        setBookingID('');
                                    } else {
                                        setBookingID(detail.id);
                                    }
                                }}>
                                <UpArrow width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {bookingID === detail.id ? (
                        <View style={styles.recentBookingMain}>
                            <View style={styles.recentBooking}>
                                <View style={styles.recentRight}>
                                    <View style={styles.recentDetails}>
                                        <Text
                                            allowFontScaling={false}
                                            style={
                                                styles.recentDetailsCategory
                                            }>
                                            Pet Category
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.recentDott}>
                                            :
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.recentDetailsName}>
                                            Dog
                                        </Text>
                                    </View>
                                    <View style={styles.recentDetails}>
                                        <Text
                                            allowFontScaling={false}
                                            style={
                                                styles.recentDetailsCategory
                                            }>
                                            No of Pets
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.recentDott}>
                                            :
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.recentDetailsName}>
                                            {/* {detail.age} */}2
                                        </Text>
                                    </View>
                                    <View style={styles.recentDetails}>
                                        <Text
                                            allowFontScaling={false}
                                            style={
                                                styles.recentDetailsCategory
                                            }>
                                            No of Days
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.recentDott}>
                                            :
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.recentDetailsName}>
                                            {detail.no_days}
                                        </Text>
                                    </View>
                                </View>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentBookingRating}>
                                    AED 800
                                </Text>
                            </View>
                            <View style={styles.acceptDeclineBooking}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.acceptDeclineButton}>
                                    <Text
                                        style={styles.acceptDeclineText}
                                        allowFontScaling={false}>
                                        Decline
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.acceptButton}>
                                    <Text
                                        style={styles.acceptText}
                                        allowFontScaling={false}>
                                        Accept
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null}
                </View>
            ))}
        </View>
    );
};

export default RecentBooking;

const styles = StyleSheet.create({
    recentBookingContainer: {
        marginTop: SIZE(8),
    },
    recentBookingSection: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 10,
        padding: SIZE(16),
        marginBottom: SIZE(16),
    },
    reviewsHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(24),
        alignItems: 'center',
    },
    reviewsText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(24),
    },
    reviewsViewText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(24),
        letterSpacing: 0.5,
    },
    recentBookingTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    recentBookingHead: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentBookingName: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    recentBookingStatus: {
        backgroundColor: '#CF67291A',
        color: '#F69459',
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(4),
        borderRadius: 8,
        marginRight: SIZE(16),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
    },
    recentBookingData: {
        marginRight: SIZE(10),
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(16),
    },
    recentBookingMain: {
        marginTop: SIZE(16),
    },
    recentBooking: {
        paddingVertical: SIZE(14),
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    recentImage: {
        width: SIZE(140),
        height: SIZE(140),
        marginRight: SIZE(12),
        borderRadius: 8,
    },
    recentRight: {
        justifyContent: 'center',
    },
    recentDetails: {
        flexDirection: 'row',
        marginBottom: SIZE(4),
    },
    recentDetailsCategory: {
        width: '50%',
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(16),
    },
    recentDott: {
        marginRight: 15,
        marginLeft: 5,
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(16),
    },
    recentDetailsName: {
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(16),
    },
    recentLocationIcon: {
        flexDirection: 'row',
        marginVertical: SIZE(10),
    },
    recentLocationName: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(18),
        marginLeft: SIZE(4),
        color: '#757575',
    },
    recentBookingRating: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        color: '#00171F',
        alignSelf: 'flex-end',
    },
    acceptDeclineBooking: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    acceptDeclineButton: {
        borderWidth: 1,
        borderColor: '#009FD3',
        borderRadius: 6,
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(32),
        width: SIZE(152),
    },
    acceptDeclineText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        color: '#009FD3',
        textAlign: 'center',
    },
    acceptButton: {
        borderWidth: 1,
        borderColor: '#003459',
        borderRadius: 6,
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(32),
        width: SIZE(152),
        backgroundColor: '#003459',
    },
    acceptText: {
        color: '#FFFFFF',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        textAlign: 'center',
    },
});
