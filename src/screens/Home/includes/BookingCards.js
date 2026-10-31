import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//axios config
const CARD_WIDTH = SIZES.width;

const BookingCards = ({item, navigation, filterPage, is_place_to_stay}) => {
    const getStatusStyles = item => {
        let borderColor, backgroundColor;
        switch (item.stay_status || item.booking_status) {
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
    const {borderColor, backgroundColor} = getStatusStyles(item);

    const formatDate = endDate => {
        const formattedDate = new Date(endDate);
        const day = formattedDate.getDate();
        const month = formattedDate.toLocaleString('default', {month: 'short'});
        const year = formattedDate.getFullYear();
        return `${day} ${month}`;
    };

    const formattedStartDate = formatDate(
        item?.start_date ? item?.start_date : '2023-01-01',
    );
    const formattedEndDate = formatDate(
        item?.end_date ? item?.end_date : '2024-01-01',
    );

    return (
        <TouchableOpacity
            onPress={() => {
                if (is_place_to_stay) {
                    navigation.navigate('CustomerBookingPlace', {item: item});
                } else {
                    filterPage(item);
                }
            }}
            style={{
                borderWidth: 0,
                alignItems: 'center',
            }}
            activeOpacity={0.7}>
            <View style={styles.animatedContent}>
                <View style={{width: CARD_WIDTH / 3.5}}>
                    <Image
                        source={{uri: item.image}}
                        style={styles.imageSize}
                    />
                </View>
                <View style={styles.likeOptionComponent}>
                    <View style={styles.hedBox}>
                        <Text
                            allowFontScaling={false}
                            style={styles.mainHeading}>
                            {item?.stay_name ? item?.stay_name : item?.breed}
                        </Text>
                        <View
                            style={{
                                paddingHorizontal: SIZE(10),
                                borderRadius: SIZE(4),
                                paddingVertical: SIZE(4),
                                backgroundColor: backgroundColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    fontFamily: FONTS.regular,
                                    fontSize: SIZE(13),
                                    color: borderColor,
                                }}>
                                {item?.stay_status
                                    ? item?.stay_status === 'incoming'
                                        ? 'Pending'
                                        : item?.stay_status?.charAt(0)
                                              .toUpperCase() +
                                          item?.stay_status?.slice(1)
                                    : item?.booking_status === 'incoming'
                                    ? 'Pending'
                                    : item?.booking_status?.charAt(0)
                                          .toUpperCase() +
                                      item?.booking_status?.slice(1)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.hedBox1}>
                        <Text
                            allowFontScaling={false}
                            style={styles.mainHeading1}>
                            Booked Date {''} :
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={styles.mainHeading1}>
                            {'   '}
                            {formattedStartDate} - {formattedEndDate}
                        </Text>
                    </View>

                    {is_place_to_stay ? (
                        <View style={styles.hedBox1}>
                            <Text
                                allowFontScaling={false}
                                style={styles.mainHeading1}>
                                No of pets{'      '}:
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.mainHeading1}>
                                {'  '} {item?.no_of_pets}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.hedBox1}>
                            <Text
                                allowFontScaling={false}
                                style={styles.mainHeading1}>
                                No of days{'      '}:
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.mainHeading1}>
                                {'  '} {item?.no_of_days}
                            </Text>
                        </View>
                    )}
                    {is_place_to_stay && (
                        <View style={styles.hedBox1}>
                            <Text
                                allowFontScaling={false}
                                style={styles.mainHeading1}>
                                Food {'   '} :
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.mainHeading1}>
                                {'  '} {item?.food_needed ? 'Yes' : 'No'}
                            </Text>
                        </View>
                    )}
                    <View style={[styles.hedBox, {alignItems: 'center'}]}>
                        <Text
                            allowFontScaling={false}
                            style={styles.mainHeading}>
                            AED {item?.total_amount}
                        </Text>

                        <Text
                            allowFontScaling={false}
                            style={styles.ratingText}>
                            {item?.booked_time}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
    },
    animatedContent: {
        borderRadius: SIZE(12),
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: SIZE(135),
    },
    likeOptionComponent: {
        width: CARD_WIDTH / 1.6,
        padding: SIZE(12),
        justifyContent: 'space-around',
    },
    hedBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    hedBox1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainHeading: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        color: '#242424',
        fontWeight: '600',
    },
    mainHeading1: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#757575',
    },
    subHeading: {
        color: '#757575',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        width: CARD_WIDTH * 0.5,
    },
    bottomContentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomContent: {
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(13),
        fontWeight: '600',
    },
    ratingButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.6,
        borderRadius: SIZE(20),
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderColor: '#eee',
    },
    ratingText: {
        fontFamily: FONTS.regular,
        color: '#969696',
        fontSize: SIZE(12),
        fontWeight: '400',
    },
    imageSize: {
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: SIZE(12),
        borderBottomLeftRadius: SIZE(12),
    },
});

export default BookingCards;
