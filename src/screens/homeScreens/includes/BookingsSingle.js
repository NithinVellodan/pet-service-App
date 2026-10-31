import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import UpArrow from '../../../assets/icons/arrowup.svg';
import {
    ApiSectionServiceProviderSinglePageAction,
    ApiSectionServiceProviderBorrowSinglePageAction,
} from '../../main/ApiSectionServiceProvider';

const BookingsSingle = ({
    detail,
    index,
    setBookingID,
    bookingID,
    route,
    state,
    navigation,
}) => {
    const [bookingStatus, setBookingStatus] = useState(
        route?.type === 'Place_ToStay'
            ? detail?.stay_status
            : detail?.booking_status,
    );
    const startDate = new Date(detail.start_date);
    const endDate = new Date(detail.end_date);
    const formattedStartDate = `${startDate.getDate()} ${new Intl.DateTimeFormat(
        'en-US',
        {month: 'short'},
    ).format(startDate)}`;
    const formattedEndDate = `${endDate.getDate()} ${new Intl.DateTimeFormat(
        'en-US',
        {month: 'short'},
    ).format(endDate)}`;

    useEffect(() => {
        if (index === 0) {
            setBookingID(detail.id);
        }
    }, [index, detail.id, setBookingID]);

    const getStatusStyles = detail => {
        let borderColor, backgroundColor;
        switch (detail.stay_status || detail.booking_status) {
            case 'accepted':
                borderColor = '#0BBE49';
                backgroundColor = '#0BBE491A';
                break;
            case 'incoming':
                borderColor = '#EBA900';
                backgroundColor = '#EBA9001A';
                break;
            case 'ongoing':
                borderColor = '#F69459';
                backgroundColor = '#CF67291A';
                break;
            case 'expired':
                borderColor = '#7F3C00';
                backgroundColor = '#7F3C001A';
                break;
            case 'rejected':
                borderColor = '#CF2929';
                backgroundColor = '#CF29291A';
                break;
            default:
                borderColor = 'black';
                backgroundColor = 'white';
                break;
        }

        return {borderColor, backgroundColor};
    };
    const {borderColor, backgroundColor} = getStatusStyles(detail);

    return (
        <View>
            <View style={styles.recentBookingSection} key={index}>
                <TouchableOpacity
                    style={styles.recentBookingTop}
                    hitSlop={10}
                    activeOpacity={0.8}
                    onPress={() => {
                        if (bookingID === detail.id) {
                            setBookingID('');
                        } else {
                            setBookingID(detail.id);
                        }
                    }}>
                    {route?.type === 'BorrowAPet' ? (
                        <Text
                            allowFontScaling={false}
                            style={styles.recentBookingName}>
                            {detail.customer_name}
                        </Text>
                    ) : (
                        <Text
                            numberOfLines={1}
                            allowFontScaling={false}
                            style={styles.recentBookingName}>
                            {' '}
                            {detail.stay_name}
                        </Text>
                    )}
                    <View style={styles.recentNewHead}>
                        <View style={styles.recentBookingHead}>
                            {route?.type === 'BorrowAPet' ? (
                                ''
                            ) : detail?.stay_status ? (
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.recentBookingStatus,
                                        {
                                            color: borderColor,
                                            backgroundColor: backgroundColor,
                                        },
                                    ]}>
                                    {detail?.stay_status === 'incoming'
                                        ? 'Pending'
                                        : detail?.stay_status?.charAt(0)
                                              .toUpperCase() +
                                          detail?.stay_status?.slice(1)}
                                </Text>
                            ) : null}

                            <Text
                                allowFontScaling={false}
                                style={styles.recentBookingData}>
                                {formattedStartDate} - {formattedEndDate}
                            </Text>
                        </View>
                        <View>
                            <UpArrow
                                style={{
                                    transform: [
                                        {
                                            rotate:
                                                bookingID === detail.id
                                                    ? '0deg'
                                                    : '180deg',
                                        },
                                    ],
                                }}
                                width={20}
                                height={20}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                {bookingID === detail.id ? (
                    <View style={styles.recentBookingMain}>
                        <View style={styles.recentBooking}>
                            <View style={styles.recentRight}>
                                <View style={styles.recentDetails}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsCategory}>
                                        {route?.type === 'BorrowAPet'
                                            ? 'No of Days'
                                            : 'Pet Category'}
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDott}>
                                        :
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsName}>
                                        {route?.type === 'BorrowAPet'
                                            ? `${detail.no_of_days} Days`
                                            : `${detail.pet_type_name}`}
                                    </Text>
                                </View>
                                <View style={styles.recentDetails}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsCategory}>
                                        {route?.type === 'BorrowAPet'
                                            ? 'Pet Category'
                                            : 'No of Pets'}
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDott}>
                                        :
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsName}>
                                        {route?.type === 'BorrowAPet'
                                            ? `${detail.pet_type}`
                                            : `${detail.no_of_pets}`}
                                    </Text>
                                </View>
                                <View style={styles.recentDetails}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsCategory}>
                                        {route?.type === 'BorrowAPet'
                                            ? 'Amount'
                                            : 'No of Days'}
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDott}>
                                        :
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsName}>
                                        {route?.type === 'BorrowAPet'
                                            ? `AED ${detail.total_amount}`
                                            : `${detail.no_of_days}`}
                                    </Text>
                                </View>
                            </View>
                            {route?.type === 'BorrowAPet' ? (
                                ''
                            ) : (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentBookingRating}>
                                    AED {detail.total_amount}
                                </Text>
                            )}
                        </View>
                        <View style={styles.acceptDeclineBooking}>
                            {bookingStatus === 'incoming' && (
                                <TouchableOpacity
                                    onPress={async () => {
                                        try {
                                            const response =
                                                (await route?.type) ===
                                                'BorrowAPet'
                                                    ? ApiSectionServiceProviderBorrowSinglePageAction(
                                                          state,
                                                          detail.id,
                                                          'reject',
                                                      )
                                                    : ApiSectionServiceProviderSinglePageAction(
                                                          state,
                                                          detail.id,
                                                          'reject',
                                                      );
                                            setBookingStatus('rejected');
                                        } catch (e) {
                                            console.log('Error: ', e);
                                        }
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.acceptDeclineButton}>
                                    <Text
                                        style={styles.acceptDeclineText}
                                        allowFontScaling={false}>
                                        Decline
                                    </Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                onPress={() => {
                                    if (route?.type === 'Place_ToStay') {
                                        navigation.navigate('BookingItem', {
                                            item_id: detail.id,
                                            setBookingStatus: setBookingStatus,
                                        });
                                    } else {
                                        navigation.navigate(
                                            'BorrowBookingSinge',
                                            {
                                                item_id: detail.id,
                                                setBookingStatus:
                                                    setBookingStatus,
                                            },
                                        );
                                    }
                                }}
                                activeOpacity={0.8}
                                style={[
                                    styles.acceptButton,
                                    {
                                        width:
                                            bookingStatus !== 'incoming'
                                                ? SIZE(350)
                                                : SIZE(152),
                                    },
                                ]}>
                                <Text
                                    style={styles.acceptText}
                                    allowFontScaling={false}>
                                    View
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default BookingsSingle;

const styles = StyleSheet.create({
    recentBookingSection: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E2E2',
        borderWidth: SIZE(1),
        borderRadius: 10,
        padding: SIZE(16),
        marginBottom: SIZE(16),
    },
    recentBookingTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentNewHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZE(220),
    },
    recentBookingHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    recentBookingName: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        width: SIZE(135),
        marginRight: SIZE(5),
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
        overflow: 'hidden',
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
