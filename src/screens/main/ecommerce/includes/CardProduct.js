import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import StarIcon from '../../../../assets/icons/star.svg';
import CalendarIcon from '../../../../assets/icons/ecommerce/calendar.svg';
import ClockIcon from '../../../../assets/icons/ecommerce/clock.svg';
import EditOption from '../../../../assets/icons/editdark.svg';
import RemoveOption from '../../../../assets/icons/battery-disable.svg';
import moment from 'moment';

const CardProduct = ({
    item,
    offer,
    cardPress,
    editPress,
    removePress,
    disableclick,
}) => {
    // day&time
    const [balance, setBalance] = useState('');
    const [dateTime, setDateTime] = useState('date');
    const startDateTime = item.start_date_and_time;
    const endDateTime = item.end_date_and_time;
    useEffect(() => {
        const startDate = moment(startDateTime);
        const endDate = moment(endDateTime);

        if (startDate.isSame(endDate, 'day')) {
            const startTime = startDate.format('hh:mm A');
            const endTime = endDate.format('hh:mm A');
            setBalance(`${startTime} - ${endTime}`);
            setDateTime('time');
        } else {
            const days = endDate.diff(startDate, 'days') + 1;
            const startdate = startDate.format('DD/MM/YY');
            const enddate = endDate.format('DD/MM/YY');
            setBalance(`${startdate} - ${enddate}`);
            setDateTime('date');
        }
    }, [startDateTime, endDateTime]);
    return (
        <View
            style={[
                styles.item,
                {opacity: !item.is_enabled ? 0.4 : 1},
                {backgroundColor: !item.is_enabled ? 'silver' : '#FFF'},
            ]}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    cardPress && cardPress();
                }}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: item.image}} style={styles.image} />
                </View>
                <View>
                    <View style={styles.itemDescriptionContainer}>
                        <View style={styles.itemTitleMain}>
                            <View style={styles.itemTitleContainer}>
                                <Text
                                    numberOfLines={1}
                                    allowFontScaling={false}
                                    style={styles.twoItemTitle}>
                                    {offer
                                        ? item.product_title
                                        : item.product_name}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemContainer}>
                            <Text
                                numberOfLines={1}
                                allowFontScaling={false}
                                style={styles.twoImageDescription}>
                                {item.description}
                            </Text>
                        </View>
                        <View style={{marginTop: SIZE(16)}}>
                            <View style={styles.twoItemBottomContainer}>
                                <View style={styles.priceContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.priceText}>
                                        AED {item.offer_price}
                                    </Text>
                                </View>
                                <View style={styles.ratingContainer}>
                                    <View style={styles.starContainer}>
                                        <StarIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </View>
                                    <View>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.starText}>
                                            {item.rating} star
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {offer ? (
                                <Text style={styles.priceLine}>
                                    AED {item.price}
                                </Text>
                            ) : (
                                <>
                                    {item.offer == '' ? null : (
                                        <Text style={styles.priceLine}>
                                            AED {item.price}
                                        </Text>
                                    )}
                                </>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View
                style={{
                    paddingHorizontal: SIZE(16),
                    flex: 1,
                    justifyContent: 'flex-end',
                }}>
                <View style={styles.bottomCard}>
                    {offer ? (
                        <>
                            {dateTime === 'date' ? (
                                <>
                                    <CalendarIcon />
                                    <Text style={styles.date}>{balance}</Text>
                                </>
                            ) : (
                                dateTime === 'time' && (
                                    <>
                                        <ClockIcon />
                                        <Text style={styles.date}>
                                            {balance}
                                        </Text>
                                    </>
                                )
                            )}
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                hitSlop={10}
                                onPress={() => {
                                    editPress && editPress();
                                }}
                                style={styles.bottom}>
                                <EditOption
                                    width={SIZE(16)}
                                    height={SIZE(16)}
                                />
                                <Text style={styles.bottomText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={!disableclick}
                                hitSlop={10}
                                onPress={() => {
                                    removePress && removePress();
                                }}
                                style={styles.bottom}>
                                <RemoveOption
                                    width={SIZE(16)}
                                    height={SIZE(16)}
                                />
                                <Text style={styles.bottomText}>Disable</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
            {offer && (
                <ImageBackground
                    source={require('../../../../assets/images/ecommerce/offertag.png')}
                    style={styles.imageBackground}>
                    <Text style={styles.offerText}>
                        {item.offer_percentage}
                    </Text>
                    <Text style={styles.offerText}>OFF</Text>
                </ImageBackground>
            )}
        </View>
    );
};

export default CardProduct;

const styles = StyleSheet.create({
    item: {
        width: '48%',
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderRadius: SIZE(12),
        borderWidth: SIZE(0.5),
        borderColor: '#E2E2E2',
    },
    imageContainer: {
        width: SIZE(190),
        height: SIZE(157),
        overflow: 'hidden',
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    itemDescriptionContainer: {
        paddingTop: SIZE(16),
        paddingBottom: SIZE(5),
        paddingHorizontal: SIZE(12),
    },
    itemTitleMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemTitleContainer: {},

    twoImageContainer: {
        width: SIZE(190),
        height: SIZE(152),
        overflow: 'hidden',
    },
    twoImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    twoItemDescriptionContainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(12),
    },
    twoItemTitleMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    twoItemTitleContainer: {
        width: SIZE(134),
    },
    twoItemTitle: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        color: '#000',
    },
    wishlistIconContainer: {
        width: SIZE(28),
        height: SIZE(28),
        padding: SIZE(6),
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(50),
    },
    twoItemContainer: {
        marginVertical: SIZE(8),
    },
    twoImageDescription: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#757575',
    },
    twoItemBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZE(5),
    },
    priceLine: {
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#969696',
        textDecorationLine: 'line-through',
        lineHeight: SIZE(15),
        marginRight: SIZE(5),
    },
    priceText: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#00171F',
        lineHeight: SIZE(17.5),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(4),
        paddingVertical: SIZE(5),
        borderRadius: SIZE(4),
        backgroundColor: '#EDEDED',
    },
    starContainer: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
    starText: {
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    bottomCard: {
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        paddingVertical: SIZE(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomText: {
        marginLeft: SIZE(8),
        color: '#003459',
        fontSize: SIZE(12),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(15),
    },
    imageBackground: {
        resizeMode: 'contain',
        justifyContent: 'center',
        height: SIZE(54),
        width: SIZE(54),
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    offerText: {
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
        fontFamily: FONTS.regular,
        color: '#FFFFFF',
    },
    date: {
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
        fontFamily: FONTS.bold,
        color: '#003459',
    },
});
