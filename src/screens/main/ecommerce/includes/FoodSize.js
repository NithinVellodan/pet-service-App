import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const FoodSize = ({sizePress, selectedVariantIndex, item, index}) => {
    return (
        <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={[
                styles.variantContainer,
                selectedVariantIndex === index
                    ? {backgroundColor: '#EAF7FF'}
                    : null,
                selectedVariantIndex === index
                    ? {
                          borderWidth: SIZE(1),
                          borderColor: '#98C1D9',
                      }
                    : null,
                {marginRight: SIZE(12)},
            ]}
            onPress={() => {
                sizePress && sizePress();
            }}>
            <Text style={styles.decrementText}>{item.unit_name}</Text>
        </TouchableOpacity>
    );
};

export default FoodSize;

const styles = StyleSheet.create({
    variantContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(8),
        borderRadius: SIZE(4),
        backgroundColor: '#fff',
    },
    decrementText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#242424',
    },
});
