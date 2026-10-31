import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import UpArrow from '../../../assets/icons/arrowup.svg';
import {TrainerProviderSinglePageAction} from '../../main/ApiSectionTrainerProvider';

const TrainerBookingCard = ({
    detail,
    index,
    setBookingID,
    bookingID,
    route,
    state,
    navigation,
    home,
    bookingList,
}) => {
    const [bookingStatus, setBookingStatus] = useState(detail?.booking_status);
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
                    disabled={home || bookingList}
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
                    <Text
                        numberOfLines={1}
                        allowFontScaling={false}
                        style={styles.recentBookingName}>
                        {' '}
                        {detail.customer_details?.name}
                    </Text>
                    <View>
                        <View style={styles.recentNewHead}>
                            <View style={styles.recentBookingHead}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentBookingData}>
                                    {formattedStartDate} - {formattedEndDate}
                                </Text>
                            </View>
                            <View>
                                {!home && !bookingList ? (
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
                                ) : null}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {!bookingList && bookingID === detail.id ? (
                    <View style={styles.recentBookingMain}>
                        <View style={styles.recentBooking}>
                            <View style={styles.recentRight}>
                                <View style={styles.recentDetails}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsCategory}>
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
                                        2 Days (3 Hrs)
                                    </Text>
                                </View>
                                <View style={styles.recentDetails}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsCategory}>
                                        Services
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDott}>
                                        :
                                    </Text>
                                    {detail?.services?.map((item, index) => (
                                        <Text
                                            key={index}
                                            allowFontScaling={false}
                                            style={[
                                                styles.recentDetailsName,
                                                {width: SIZE(120)},
                                            ]}>
                                            {item.service_name}
                                        </Text>
                                    ))}
                                </View>
                                <View style={styles.recentDetails}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsCategory}>
                                        Amount
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDott}>
                                        :
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsName}>
                                        AED {detail?.total_amount}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.acceptDeclineBooking}>
                            {bookingStatus === 'incoming' && (
                                <TouchableOpacity
                                    onPress={async () => {
                                        try {
                                            const response =
                                                await TrainerProviderSinglePageAction(
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
                                    navigation.navigate(
                                        'TrainerProviderBooking',
                                        {
                                            item_id: detail.id,
                                            setBookingStatus: setBookingStatus,
                                        },
                                    );
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
                ) : bookingList || home ? (
                    <View style={styles.recentBookingMain}>
                        <View style={styles.recentBooking}>
                            <View style={styles.recentRight}>
                                <View style={styles.recentDetails}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsCategory}>
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
                                        2 Days (3 Hrs)
                                    </Text>
                                </View>
                                <View style={styles.recentDetails}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsCategory}>
                                        Services
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDott}>
                                        :
                                    </Text>
                                    {detail?.services?.map((item, index) => (
                                        <Text
                                            key={index}
                                            allowFontScaling={false}
                                            style={[
                                                styles.recentDetailsName,
                                                {width: SIZE(120)},
                                            ]}>
                                            {item.service_name}
                                        </Text>
                                    ))}
                                </View>
                                <View style={styles.recentDetails}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsCategory}>
                                        Amount
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDott}>
                                        :
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.recentDetailsName}>
                                        AED {detail?.total_amount}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.acceptDeclineBooking}>
                            {bookingStatus === 'incoming' && (
                                <TouchableOpacity
                                    onPress={async () => {
                                        try {
                                            const response =
                                                await TrainerProviderSinglePageAction(
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
                                    navigation.navigate(
                                        'TrainerProviderBooking',
                                        {
                                            item_id: detail.id,
                                            setBookingStatus: setBookingStatus,
                                        },
                                    );
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

export default TrainerBookingCard;

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
        justifyContent: 'space-between',
    },
    recentNewHead: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZE(120),
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
    recentRight: {
        justifyContent: 'center',
        gap: SIZE(12),
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
