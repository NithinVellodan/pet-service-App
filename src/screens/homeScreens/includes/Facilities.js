import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos

import InfoIcon from '../../../assets/icons/info-circle2.svg';
import SleepingIcon from '../../../assets/icons/sleeping.svg';
import PlayIcon from '../../../assets/icons/play.svg';
import GroomingIcon from '../../../assets/icons/grooming.svg';
import FeedingIcon from '../../../assets/icons/feeding.svg';

const Facilities = ({}) => {
    const facilitiesData = [
        {
            id: 1,
            name: 'Sleeping Areas',
            icon: <SleepingIcon width={'100%'} height={'100%'} />,
            image: require('../../../assets/images/sleeping.png'),
        },
        {
            id: 2,
            name: 'Feeding Stations',
            icon: <FeedingIcon width={'100%'} height={'100%'} />,
            image: require('../../../assets/images/sleeping.png'),
        },
        {
            id: 3,
            name: 'Play Areas',
            icon: <PlayIcon width={'100%'} height={'100%'} />,
            image: require('../../../assets/images/sleeping.png'),
        },
        {
            id: 4,
            name: 'Grooming',
            icon: <GroomingIcon width={'100%'} height={'100%'} />,
            image: require('../../../assets/images/sleeping.png'),
        },
    ];

    return (
        <View style={styles.facilitiesContainer}>
            <View style={styles.facilitiesHeading}>
                <Text allowFontScaling={false} style={styles.commonHeadingText}>
                    Facilities
                </Text>
            </View>
            {facilitiesData.map((item, index) => {
                const isLastChild = index === facilitiesData.length - 1;
                return (
                    <View
                        key={item.id}
                        style={[
                            styles.facilitiesListContainer,

                            isLastChild && {marginBottom: 0},
                        ]}>
                        <View style={styles.facilitiesLeft}>
                            <View style={styles.facilityIcon}>{item.icon}</View>
                            <View style={styles.facilityTitle}>
                                <Text
                                    style={styles.facilityTitleText}
                                    allowFontScaling={false}>
                                    {item.name}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            hitSlop={10}
                            activeOpacity={0.8}
                            style={styles.infoIcon}>
                            <InfoIcon width={'100%'} height={'100%'} />
                        </TouchableOpacity>
                    </View>
                );
            })}
            <TouchableOpacity
                style={styles.facilityViewMore}
                activeOpacity={0.8}>
                <Text
                    style={styles.facilityViewMoreText}
                    allowFontScaling={false}>
                    View More
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Facilities;

const styles = StyleSheet.create({
    headingText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    commonHeadingText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    infoIcon: {
        alignSelf: 'center',
        width: SIZE(20),
        height: SIZE(20),
    },
    facilitiesContainer: {
        padding: SIZE(16),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
        marginVertical: SIZE(32),
    },
    facilitiesHeading: {
        paddingBottom: SIZE(12),
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: SIZE(1),
        marginBottom: SIZE(16),
    },
    facilitiesListContainer: {
        paddingHorizontal: SIZE(4),
        paddingVertical: SIZE(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(8),
    },
    facilitiesLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    facilityIcon: {
        width: SIZE(24),
        height: SIZE(24),
        marginRight: SIZE(10),
    },
    facilityTitleText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    facilityViewMore: {
        alignItems: 'center',
        marginTop: SIZE(28),
    },
    facilityViewMoreText: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
});
