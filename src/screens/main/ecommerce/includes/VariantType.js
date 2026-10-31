import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const VariantType = ({item, index, selectedFoodTypeIndex, variantPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                marginRight: SIZE(16),
            }}
            key={item.id}
            onPress={() => {
                variantPress && variantPress();
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZE(16),
                }}>
                <View
                    style={[
                        styles.variantSelectingContainerOne,
                        item.stock < 1 ? {opacity: 0.4} : null,
                        selectedFoodTypeIndex === index
                            ? {backgroundColor: '#EAF7FF'}
                            : null,
                    ]}>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.foodHeading,
                            selectedFoodTypeIndex === index
                                ? {color: '#009FD3'}
                                : null,
                        ]}>
                        {item.title}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    borderRadius: SIZE(6),
                }}>
                <View
                    style={[
                        styles.variantSelectingContainerTwo,
                        item?.stock < 1 && {opacity: 0.4},
                    ]}>
                    <Text style={styles.decrementText}>AED {item.price}</Text>
                    <Text style={styles.stockText}>
                        {item?.stock < 5 ? (
                            <Text
                                style={{
                                    color: '#CF2929',
                                }}>
                                {item?.stock} Items Left !
                            </Text>
                        ) : item?.stock > 5 ? (
                            <Text>In stock</Text>
                        ) : (
                            item?.stock < 1 && (
                                <Text
                                    style={{
                                        color: '#CF2929',
                                    }}>
                                    Out of Stock
                                </Text>
                            )
                        )}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default VariantType;

const styles = StyleSheet.create({
    variantSelectingContainerOne: {
        padding: SIZE(12),
        borderTopWidth: SIZE(1),
        borderLeftWidth: SIZE(1),
        borderRightWidth: SIZE(1),
        borderTopRightRadius: SIZE(6),
        borderTopLeftRadius: SIZE(6),
        borderRightRadius: SIZE(6),
        borderLeftRadius: SIZE(6),
        borderColor: '#E2E2E2',
        backgroundColor: '#EDEDED',
        width: SIZE(130),
    },
    foodHeading: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        color: '#00171F',
    },
    variantSelectingContainerTwo: {
        padding: SIZE(12),
        borderBottomWidth: SIZE(1),
        borderLeftWidth: SIZE(1),
        borderRightWidth: SIZE(1),
        borderBottomRightRadius: SIZE(6),
        borderBottomRightRadius: SIZE(6),
        borderBottomLeftRadius: SIZE(6),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        width: SIZE(130),
    },
    stockText: {
        fontSize: SIZE(12),
        fontFamily: FONTS.regular,
        color: '#003459',
    },
    decrementText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#242424',
    },
});
