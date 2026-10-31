import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const PriceTo = ({item, is_customer, petSingle, is_single_customer}) => {
    const [petPrice, setPetPrice] = useState('');
    return (
        <View style={styles.priceMainContainer}>
            <View style={styles.reviewHeading}>
                <Text
                    allowFontScaling={false}
                    style={[
                        styles.reviewHeadingText,
                        {fontSize: is_customer ? SIZE(24) : SIZE(20)},
                    ]}>
                    {is_customer ? petSingle?.pet_name : 'Features'}
                </Text>
            </View>
            <View
                style={[
                    styles.petPriceMainContainer,
                    {paddingBottom: is_customer ? SIZE(0) : SIZE(30)},
                ]}>
                {item?.map(item => {
                    return (
                        <TouchableOpacity
                            disabled={is_customer || is_single_customer}
                            onPress={() => {
                                setPetPrice(item.id);
                            }}
                            activeOpacity={0.8}
                            key={item.id}
                            style={[
                                styles.petPriceSingleContainer,
                                {
                                    borderColor:
                                        petPrice === item.id
                                            ? '#98C1D9'
                                            : '#E2E2E2',
                                },
                            ]}>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <View
                                    style={[
                                        styles.petTitleContainer,
                                        {
                                            backgroundColor:
                                                petPrice === item.id
                                                    ? '#EAF7FF'
                                                    : '#EDEDED',
                                        },
                                    ]}>
                                    <Text
                                        // numberOfLines={1}
                                        allowFontScaling={false}
                                        style={styles.petTitle}>
                                        {item.name}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.petPriceContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.petPriceText}>
                                    {item.option}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default PriceTo;

const styles = StyleSheet.create({
    reviewHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        letterSpacing: SIZE(0.5),
    },
    priceMainContainer: {},
    reviewHeadingText: {
        color: '#242424',
        fontSize: SIZE(20),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    petPriceMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: SIZE(20),
        paddingBottom: SIZE(30),
    },
    petPriceSingleContainer: {
        width: SIZE(119),
        borderRadius: SIZE(8),
        overflow: 'hidden',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    petTitleContainer: {
        paddingVertical: SIZE(16),
        backgroundColor: '#EDEDED',
        alignItems: 'center',
    },
    petTitle: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },

    petPriceContainer: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    petPriceText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
});
