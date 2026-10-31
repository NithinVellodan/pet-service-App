import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const ShopsAndDonated = ({selectedCategory, setSelectedCategory, product}) => {
    const handleCategoryPress = category => {
        setSelectedCategory(category);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[
                    styles.categoryButton,
                    selectedCategory === 'shops' && styles.selectedCategory,
                ]}
                onPress={() => handleCategoryPress('shops')}>
                <Text
                    style={[
                        styles.categoryText,
                        selectedCategory === 'shops' &&
                            styles.selectedCategoryText,
                    ]}>
                    {product ? ' Products' : 'Shops'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                style={[
                    styles.categoryButton,
                    selectedCategory === 'donatedProducts' &&
                        styles.selectedCategory,
                ]}
                onPress={() => handleCategoryPress('donatedProducts')}>
                <Text
                    style={[
                        styles.categoryText,
                        selectedCategory === 'donatedProducts' &&
                            styles.selectedCategoryText,
                    ]}>
                    Donated Products
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        padding: SIZE(4),
        borderRadius: SIZE(8),
    },
    categoryButton: {
        flex: 1,
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(20),
        borderRadius: SIZE(8),
        alignItems: 'center',
    },
    selectedCategory: {
        backgroundColor: '#009FD3',
    },
    categoryText: {
        fontFamily: FONTS.regular,

        fontSize: SIZE(16),
        color: '#242424',
    },
    selectedCategoryText: {
        fontSize: SIZE(16),
        color: '#fff',
        fontFamily: FONTS.semiBold,
    },
});

export default ShopsAndDonated;
