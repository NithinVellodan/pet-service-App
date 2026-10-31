import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

//packages
import * as Animatable from 'react-native-animatable';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import LocationIcon from '../../../assets/icons/locationblue.svg';
import CloseIcon from '../../../assets/icons/close-icon-blue.svg';

//axios config
const CARD_WIDTH = SIZES.width;

const BookingSingleModal = ({item, filterPage}) => {
    const getStatusStyles = item => {
        let borderColor, backgroundColor;
        switch (item.booking_status) {
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

    const formattedStartDate = formatDate(item?.start_date);
    const formattedEndDate = formatDate(item?.end_date);

    return (
        <Animatable.View animation={'fadeInUp'} style={styles.animatedContent}>
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View
                        style={{
                            width: CARD_WIDTH / 3.3,
                            height: CARD_WIDTH / 3.6,
                            borderWidth: 0.5,
                            borderColor: '#eee',
                            borderRadius: 20,
                        }}>
                        <Image
                            source={{uri: item.image}}
                            style={styles.imageSize}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: SIZE(20),
                            justifyContent: 'center',
                        }}>
                        <Text style={styles.name}>{item?.breed}</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginVertical: SIZE(10),
                                alignItems: 'center',
                            }}>
                            <LocationIcon width={SIZE(20)} height={SIZE(20)} />
                            <Text numberOfLines={1} style={styles.location}>
                                {item?.location}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                right: 0,
                                top: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                            }}
                            onPress={() => filterPage(item)}
                            hitSlop={{
                                top: 60,
                                bottom: 60,
                                left: 60,
                                right: 60,
                            }}>
                            <CloseIcon />
                        </TouchableOpacity>
                        <View
                            style={{
                                borderRadius: SIZE(4),
                                paddingVertical: SIZE(4),
                                backgroundColor: backgroundColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: SIZE(90),
                            }}>
                            <Text
                                style={{
                                    fontFamily: FONTS.regular,
                                    fontSize: SIZE(13),
                                    color: borderColor,
                                }}>
                                {item?.booking_status === 'incoming'
                                    ? 'Pending'
                                    : item?.booking_status
                                          ?.charAt(0)
                                          .toUpperCase() +
                                      item?.booking_status?.slice(1)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.likeOptionComponent}>
                    <View style={styles.hedBox1}>
                        <View style={styles.leftEnd}>
                            <Text style={styles.mainHeading1}>Booked Date</Text>
                        </View>
                        <Text style={styles.mainHeading}>:</Text>
                        <View style={styles.rightEnd}>
                            <Text style={styles.mainHeading2}>
                                {formattedStartDate} - {formattedEndDate}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.hedBox1}>
                        <View style={styles.leftEnd}>
                            <Text style={styles.mainHeading1}>Type</Text>
                        </View>
                        <Text style={styles.mainHeading}>:</Text>
                        <View style={styles.rightEnd}>
                            <Text style={styles.mainHeading2}>
                                {item?.pet_type}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.hedBox1}>
                        <View style={styles.leftEnd}>
                            <Text style={styles.mainHeading1}>Age</Text>
                        </View>
                        <Text style={styles.mainHeading}>:</Text>
                        <View style={styles.rightEnd}>
                            <Text style={styles.mainHeading2}>{item?.age}</Text>
                        </View>
                    </View>
                    <View style={styles.hedBox1}>
                        <View style={styles.leftEnd}>
                            <Text style={styles.mainHeading1}>No of Days</Text>
                        </View>
                        <Text style={styles.mainHeading}>:</Text>
                        <View style={styles.rightEnd}>
                            <Text style={styles.mainHeading2}>
                                {item?.no_of_days}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.hedBox, {alignItems: 'center'}]}>
                        <Text style={styles.name}>
                            AED {item?.total_amount}
                        </Text>
                    </View>
                </View>
            </View>
        </Animatable.View>
    );
};
const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
    },
    animatedContent: {
        borderRadius: SIZE(12),
        backgroundColor: '#fff',
        padding: SIZE(20),
    },
    likeOptionComponent: {
        marginTop: SIZE(20),
        justifyContent: 'space-around',
    },
    name: {
        fontSize: SIZE(20),
        fontFamily: FONTS.medium,
        color: '#00171F',
        fontWeight: '600',
    },
    hedBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(20),
    },
    hedBox1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    location: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        color: '#242424',
        fontWeight: '400',
        marginLeft: SIZE(10),
        width: SIZE(140),
    },
    mainHeading: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(17),
        color: '#242424',
        fontWeight: '600',
    },
    mainHeading1: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#686868',
        fontWeight: '600',
    },
    mainHeading2: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#242424',
        fontWeight: '600',
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
        borderRadius: SIZE(12),
    },
    leftEnd: {
        width: SIZES.width * 0.3,
    },
    rightEnd: {
        width: SIZES.width * 0.4,
    },
});

export default BookingSingleModal;
