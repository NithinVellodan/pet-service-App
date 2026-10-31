import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
//icon
import StarIcon from '../../../../assets/icons/star.svg';

const StarOfferCard = ({productCard, donate, isoffer}) => {
    return (
        <View>
            {productCard.map((item, index) => (
                <View key={item.id} style={{paddingHorizontal: SIZE(16)}}>
                    <View>
                        <Text style={styles.productHeading}>{item.title}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZE(4),
                            alignItems: 'center',
                        }}>
                        <View>
                            <Text style={styles.productDescription}>
                                {item.description}
                            </Text>
                        </View>
                        {!donate && (
                            <View style={styles.ratingContainer}>
                                <View style={styles.starContainer}>
                                    <StarIcon width={'100%'} height={'100%'} />
                                </View>
                                <View>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.starText}>
                                        {item.rating} star
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                    {!donate && (
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            {isoffer && (
                                <View>
                                    <Text
                                        style={[
                                            styles.offeredPrice,
                                            {marginRight: SIZE(16)},
                                        ]}>
                                        AED {item.normalPrice}
                                    </Text>
                                </View>
                            )}
                            <View>
                                {isoffer ? (
                                    <Text
                                        style={[
                                            styles.productHeading,
                                            {marginRight: SIZE(16)},
                                        ]}>
                                        AED {item.offeredPrice}
                                    </Text>
                                ) : (
                                    <Text
                                        style={[
                                            styles.productHeading,
                                            {marginRight: SIZE(16)},
                                        ]}>
                                        AED {item.normalPrice}
                                    </Text>
                                )}
                            </View>
                            {isoffer && (
                                <View>
                                    <Text style={styles.percentage}>
                                        {item.percentage} % off
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

export default StarOfferCard;

const styles = StyleSheet.create({
    productHeading: {
        color: '#242424',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
    productDescription: {
        fontSize: SIZE(16),
        color: '#686868',
        fontFamily: FONTS.regular,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(8),
        borderRadius: SIZE(73),
        backgroundColor: '#fff',
    },
    starContainer: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
    starText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        color: '#969696',
    },
    offeredPrice: {
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: '#969696',
    },
    percentage: {
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        color: '#009FD3',
    },
});
