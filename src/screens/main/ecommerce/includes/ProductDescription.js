import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StarIcon from '../../../../assets/icons/star.svg';
import StarDot from '../../../../assets/icons/map-view/starDot.svg';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
const ProductDescription = ({item, quantity, itemData, donated, title}) => {
    return (
        <View>
            <View
                key={itemData?.product_data?.id}
                style={{paddingHorizontal: SIZE(16)}}>
                <View style={{width: SIZE(280)}}>
                    <Text numberOfLines={1} style={styles.productHeading}>
                        {itemData?.title}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: SIZE(4),
                        alignItems: 'center',
                    }}>
                    <View style={{width: SIZE(290)}}>
                        <Text
                            numberOfLines={2}
                            style={styles.productDescription}>
                            {itemData?.name}
                        </Text>
                    </View>
                    {!donated && (
                        <View style={styles.ratingContainer}>
                            <View style={styles.starContainer}>
                                {itemData?.rating > 0 ? (
                                    <StarIcon width={'100%'} height={'100%'} />
                                ) : (
                                    <StarDot width={'100%'} height={'100%'} />
                                )}
                            </View>
                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.starText}>
                                    {itemData?.rating > 0
                                        ? parseFloat(
                                              itemData?.rating?.toFixed(1),
                                          )
                                        : 'New'}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                {!donated ? (
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        {itemData?.offer !== null ? (
                            <View>
                                <Text style={styles.offeredPrice}>
                                    AED {itemData?.original_price * quantity}
                                </Text>
                            </View>
                        ) : null}

                        <View>
                            <Text
                                style={[
                                    styles.productHeading,
                                    {
                                        marginHorizontal:
                                            itemData?.offer !== null
                                                ? SIZE(16)
                                                : 0,
                                    },
                                ]}>
                                AED {itemData?.final_price * quantity}
                            </Text>
                        </View>
                        {itemData?.offer !== null ? (
                            <View>
                                <Text style={styles.percentage}>
                                    {itemData?.offer} % off
                                </Text>
                            </View>
                        ) : null}
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default ProductDescription;

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
        paddingHorizontal: SIZE(17),
        paddingVertical: SIZE(6),
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
