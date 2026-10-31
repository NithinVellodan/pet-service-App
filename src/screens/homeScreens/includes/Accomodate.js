import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import InfoIcon from '../../../assets/icons/info-circle2.svg';

const Accomodate = ({}) => {
    const petAccommodationData = [
        {
            id: 1,
            name: 'Dog',
            price: 100,
            no: 1,
        },
        {
            id: 2,
            name: 'Cat',
            price: 80,
            no: 2,
        },
        {
            id: 3,
            name: 'Bird',
            price: 70,
            no: 1,
        },
    ];

    return (
        <View style={styles.accommodationContainer}>
            <View style={styles.accommodationHeading}>
                <Text allowFontScaling={false} style={styles.commonHeadingText}>
                    Pets can Accommodate
                </Text>
            </View>
            <View style={styles.accommodationList}>
                <View style={styles.accommodationSub}>
                    <View style={styles.accommodationSubTextContainer}>
                        <Text
                            allowFontScaling={false}
                            style={styles.accommodationSubText}>
                            Type
                        </Text>
                    </View>
                    <View style={styles.accommodationSubTextContainer}>
                        <Text
                            allowFontScaling={false}
                            style={styles.accommodationSubText}>
                            No of Pets
                        </Text>
                    </View>
                    <View style={styles.accommodationSubTextContainer}>
                        <Text
                            allowFontScaling={false}
                            style={styles.accommodationSubText}>
                            Price
                        </Text>
                    </View>
                    <View style={styles.extraSpace}></View>
                </View>
                {petAccommodationData.map((item, index) => {
                    return (
                        <View
                            key={item.id}
                            style={[
                                styles.accommodationMapList,
                                {
                                    backgroundColor:
                                        index % 2 === 0 ? '#fff' : '#F7F7F7',
                                },
                            ]}>
                            <View style={styles.accommodationType}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.accommodationTypeText}>
                                    {item.name}
                                </Text>
                            </View>
                            <View style={styles.accommodationType}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.accommodationTypeText}>
                                    {item.no}
                                </Text>
                            </View>
                            <View style={styles.accommodationType}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.accommodationTypeText}>
                                    AED {item.price}
                                </Text>
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
            </View>
        </View>
    );
};

export default Accomodate;

const styles = StyleSheet.create({
    headingText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },

    accommodationHeading: {
        marginBottom: SIZE(21),
    },
    commonHeadingText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    accommodationList: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
    accommodationSub: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EDEDED',
    },
    accommodationSubTextContainer: {
        alignSelf: 'flex-start',
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
    },
    accommodationSubText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    accommodationMapList: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    accommodationType: {
        width: SIZE(118),
        padding: SIZE(16),
    },
    accommodationTypeText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        textAlign: 'left',
    },
    infoIcon: {
        alignSelf: 'center',
        width: SIZE(20),
        height: SIZE(20),
    },
});
