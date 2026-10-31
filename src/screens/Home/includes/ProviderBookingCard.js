import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useContext} from 'react';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import ArrowRight from '../../../assets/icons/profile-icons/arrow-right.svg';
import Location from '../../../assets/icons/location2.svg';
import {useNavigation} from '@react-navigation/native';
import {
    ApiSectionServiceProviderBorrowSinglePageAction,
    ApiSectionServiceProviderSinglePageAction,
} from '../../main/ApiSectionServiceProvider';
import {Context} from '../../../contexts/Store';

//images and logos

export const ProviderBorrowPet = ({detail, index, setReload}) => {
    const {state, dispatch} = useContext(Context);
    const [bookingStatus, setBookingStatus] = useState(detail?.stay_status);
    const navigation = useNavigation();
    const formatDate = endDate => {
        const formattedDate = new Date(endDate);
        const day = formattedDate.getDate();
        const month = formattedDate.toLocaleString('default', {month: 'short'});
        const year = formattedDate.getFullYear();
        return `${day} ${month}`;
    };

    const formattedStartDate = formatDate(detail?.start_date);
    const formattedEndDate = formatDate(detail?.end_date);

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
        <View style={{flex: 1}}>
            <View style={styles.recentBookingSection}>
                <View style={styles.recentBookingTop}>
                    <Text
                        allowFontScaling={false}
                        style={styles.recentBookingName}>
                        {detail.stay_name}
                    </Text>
                    <View style={styles.recentBookingHead}>
                        {detail?.stay_status ? (
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
                                    : detail?.stay_status
                                          ?.charAt(0)
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
                </View>
                <View style={styles.recentBookingMain}>
                    <View style={styles.recentBooking}>
                        <View style={styles.recentImage}>
                            {detail?.image && (
                                <Image
                                    style={{width: '100%', height: '100%'}}
                                    source={{uri: detail?.image}}
                                />
                            )}
                        </View>
                        <View style={styles.recentRight}>
                            <View style={styles.recentDetails}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDetailsCategory}>
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
                                    {detail.pet_type_name}
                                </Text>
                            </View>
                            <View style={styles.recentDetails}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDetailsCategory}>
                                    Pet Breed
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDott}>
                                    :
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDetailsName}>
                                    Rottweiler
                                </Text>
                            </View>
                            <View style={styles.recentDetails}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDetailsCategory}>
                                    Age
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDott}>
                                    :
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDetailsName}>
                                    {detail.age}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: SIZE(10),
                        }}>
                        <View>
                            <View style={styles.recentLocationIcon}>
                                <Location width={SIZE(12)} height={SIZE(12)} />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentLocationName}>
                                    {detail.location}
                                </Text>
                            </View>
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
                                    {detail.no_of_days}
                                </Text>
                            </View>
                        </View>
                        <Text
                            allowFontScaling={false}
                            style={styles.recentBookingRating}>
                            AED {detail.total_amount}
                        </Text>
                    </View>
                    <View style={styles.acceptDeclineBooking}>
                        {bookingStatus === 'incoming' && (
                            <TouchableOpacity
                                onPress={async () => {
                                    try {
                                        const response =
                                            await ApiSectionServiceProviderSinglePageAction(
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
                                navigation.navigate('BookingItem', {
                                    item_id: detail.id,
                                    setBookingStatus: setBookingStatus,
                                });
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
            </View>
        </View>
    );
};

export const ProviderPlaceToStay = ({detail, index, navigation}) => {
    const {state, dispatch} = useContext(Context);
    const [bookingStatus, setBookingStatus] = useState(detail?.stay_status);
    const formatDate = endDate => {
        const formattedDate = new Date(endDate);
        const day = formattedDate.getDate();
        const month = formattedDate.toLocaleString('default', {month: 'short'});
        return `${day} ${month}`;
    };

    const formattedStartDate = formatDate(detail?.start_date);
    const formattedEndDate = formatDate(detail?.end_date);

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
        <View style={{flex: 1}}>
            <View style={styles.recentBookingSection} key={index}>
                <View style={styles.recentBookingTop}>
                    <Text
                        allowFontScaling={false}
                        style={styles.recentBookingName}>
                        {detail.stay_name}
                    </Text>
                    <View style={styles.recentBookingHead}>
                        {detail?.stay_status ? (
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
                                    : (detail?.stay_status || '')
                                          .charAt(0)
                                          .toUpperCase() +
                                      (detail?.stay_status || '').slice(1)}
                            </Text>
                        ) : null}

                        <Text
                            allowFontScaling={false}
                            style={styles.recentBookingData}>
                            {formattedStartDate} - {formattedEndDate}
                        </Text>
                    </View>
                </View>
                <View style={styles.recentBookingMain}>
                    <View
                        style={[
                            styles.recentBooking,
                            {
                                marginBottom: detail?.Expired ? 0 : SIZE(12),
                                borderBottomWidth: detail?.Expired
                                    ? 0
                                    : SIZE(1),
                            },
                        ]}>
                        <View style={styles.recentImage}>
                            {detail.image && (
                                <Image
                                    style={{width: '100%', height: '100%'}}
                                    source={{uri: detail.image}}
                                />
                            )}
                        </View>
                        <View style={styles.recentRight}>
                            <View style={styles.recentDetails}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDetailsCategory}>
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
                                    {detail?.pet_type_name}
                                </Text>
                            </View>
                            <View style={styles.recentDetails}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDetailsCategory}>
                                    Age
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDott}>
                                    :
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDetailsName}>
                                    1
                                </Text>
                            </View>
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
                                    {detail?.no_of_days}
                                </Text>
                            </View>
                            <View style={styles.recentLocationIcon}>
                                <Location width={SIZE(12)} height={SIZE(12)} />
                                <Text
                                    numberOfLines={1}
                                    allowFontScaling={false}
                                    style={styles.recentLocationName}>
                                    {detail?.location}
                                </Text>
                            </View>
                            <Text
                                allowFontScaling={false}
                                style={styles.recentBookingRating}>
                                AED {detail?.total_amount}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.acceptDeclineBooking}>
                        {bookingStatus === 'incoming' && (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.acceptDeclineButton}
                                onPress={async () => {
                                    try {
                                        const response =
                                            await ApiSectionServiceProviderSinglePageAction(
                                                state,
                                                detail.id,
                                                'reject',
                                            );
                                        setBookingStatus('rejected');
                                    } catch (error) {
                                        console.log('Error: ', error);
                                    }
                                }}>
                                <Text
                                    style={styles.acceptDeclineText}
                                    allowFontScaling={false}>
                                    Decline
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('BookingItem', {
                                    item_id: detail.id,
                                    setBookingStatus: setBookingStatus,
                                });
                            }}
                            activeOpacity={0.8}
                            style={[
                                styles.acceptButton,
                                {
                                    width:
                                        bookingStatus !== 'incoming'
                                            ? SIZE(358)
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
            </View>
        </View>
    );
};

const ProviderBookingCard = ({detail, is_hide_Arrow}) => {
    const {state, dispatch} = useContext(Context);
    const [bookingStatus, setBookingStatus] = useState(detail?.booking_status);
    const [dateVisible, setDateVisible] = useState(true);
    const navigation = useNavigation();

    const formatDate = endDate => {
        const formattedDate = new Date(endDate);
        const day = formattedDate.getDate();
        const month = formattedDate.toLocaleString('default', {month: 'short'});
        const year = formattedDate.getFullYear();
        return `${day} ${month}`;
    };

    const formattedStartDate = formatDate(detail?.start_date);
    const formattedEndDate = formatDate(detail?.end_date);

    return (
        <View style={styles.recentBookingSection}>
            <View style={styles.recentBookingTop}>
                <Text style={styles.recentBookingName}>{detail?.breed}</Text>
                <TouchableOpacity
                    onPress={() => {
                        {
                            !is_hide_Arrow == true &&
                                setDateVisible(!dateVisible);
                        }
                    }}
                    style={styles.recentBookingHead}>
                    <Text style={styles.recentBookingData}>
                        {formattedStartDate} - {formattedEndDate}
                    </Text>
                    {!is_hide_Arrow == true && (
                        <ArrowRight
                            width={15}
                            height={15}
                            style={{
                                transform: [
                                    {
                                        rotate: !dateVisible
                                            ? '90deg'
                                            : '-90deg',
                                    },
                                ],
                            }}
                        />
                    )}
                </TouchableOpacity>
            </View>
            {dateVisible && (
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
                                    {detail?.no_of_days} Days
                                </Text>
                            </View>
                            <View style={styles.recentDetails}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentDetailsCategory}>
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
                                    {detail?.pet_type}
                                </Text>
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
                                activeOpacity={0.8}
                                style={styles.acceptDeclineButton}
                                onPress={async () => {
                                    try {
                                        const response =
                                            await ApiSectionServiceProviderBorrowSinglePageAction(
                                                state,
                                                detail.id,
                                                'reject',
                                            );
                                        setBookingStatus('rejected');
                                    } catch (error) {
                                        console.log('Error: ', error);
                                    }
                                }}>
                                <Text
                                    style={styles.acceptDeclineText}
                                    allowFontScaling={false}>
                                    Decline
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('BorrowBookingSinge', {
                                    item_id: detail.id,
                                    setBookingStatus: setBookingStatus,
                                });
                            }}
                            activeOpacity={0.8}
                            style={[
                                styles.acceptButton,
                                {
                                    width:
                                        bookingStatus !== 'incoming'
                                            ? SIZE(358)
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
            )}
        </View>
    );
};

export default ProviderBookingCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        flex: 1,
    },

    filterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(14),
        borderColor: '#E2E2E2',
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        backgroundColor: '#FFFFFF',
    },

    recentBookingSection: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E2E2',
        borderWidth: SIZE(1),
        borderRadius: SIZE(10),
        padding: SIZE(14),
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
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    recentBookingStatus: {
        backgroundColor: '#CF67291A',
        color: '#F69459',
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(4),
        borderRadius: SIZE(6),
        marginRight: SIZE(14),
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
        lineHeight: SIZE(14),
    },
    recentBookingMain: {
        marginTop: SIZE(14),
    },
    recentBooking: {
        paddingVertical: SIZE(14),
        borderBottomWidth: SIZE(1),
        borderTopWidth: SIZE(1),
        borderColor: '#E2E2E2',
        flexDirection: 'row',
        marginBottom: SIZE(12),
    },
    recentImage: {
        width: SIZE(130),
        height: SIZE(130),
        marginRight: SIZE(12),
        borderRadius: SIZE(10),
        overflow: 'hidden',
    },
    recentRight: {
        justifyContent: 'center',
    },
    recentDetails: {
        flexDirection: 'row',
        marginBottom: SIZE(4),
    },
    recentDetailsCategory: {
        width: '45%',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        fontWeight: '400',
        color: '#757575',
    },
    recentDott: {
        marginRight: SIZE(15),
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        fontWeight: '400',
    },
    recentDetailsName: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        fontWeight: '400',
        color: '#757575',
    },
    recentLocationIcon: {
        flexDirection: 'row',
        marginVertical: SIZE(10),
        alignItems: 'center',
    },
    recentLocationName: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(18),
        marginLeft: SIZE(4),
        color: '#757575',
        width: SIZE(200),
    },
    recentBookingRating: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        color: '#00171F',
    },
    acceptDeclineBooking: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    acceptDeclineButton: {
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        borderRadius: SIZE(6),
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(32),
        width: SIZE(152),
    },
    acceptDeclineText: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        color: '#009FD3',
        textAlign: 'center',
    },
    acceptButton: {
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(6),
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(32),
        width: SIZE(152),
        backgroundColor: '#003459',
    },
    acceptText: {
        color: '#FFFFFF',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        textAlign: 'center',
    },
    selectedFilterItem: {
        marginRight: SIZE(12),
        borderWidth: SIZE(0.5),
        borderRadius: SIZE(20),
        borderColor: '#003459',
        backgroundColor: '#EAF7FF',
    },
    selectedFilterItemText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
});
