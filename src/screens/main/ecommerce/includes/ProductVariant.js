import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
const ProductVariant = ({
    itemIndex,
    variantIndex,
    setQuantity,
    sizes,
    all_variants,
    selectedItemIndex,
    setSelectedItemIndex,
    sizeVarientSelection,
    setSizevarientSelection,
    setSingleItemPk,
    setSizevarientSelection2,
    setStockManage,
}) => {
    console.log(sizes);

    return (
        <View
            style={{
                marginVertical: SIZE(30),
            }}>
            {sizes?.length !== 1 ? (
                <View style={{marginBottom: SIZE(30)}}>
                    <View
                        style={{
                            marginBottom: SIZE(15),
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: SIZE(16),
                        }}>
                        <View>
                            <Text style={styles.quantityText}>Size</Text>
                        </View>
                        <View>
                            <Text
                                style={[
                                    styles.quantityText,
                                    {marginHorizontal: SIZE(2)},
                                ]}>
                                :
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: SIZE(16),
                        }}>
                        <FlatList
                            bounces={false}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={sizes}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.variantContainer,
                                        sizeVarientSelection === item.id
                                            ? {
                                                  backgroundColor: '#EAF7FF',
                                                  borderWidth: SIZE(1),
                                                  borderColor: '#98C1D9',
                                              }
                                            : null,
                                        {marginRight: SIZE(12)},
                                    ]}
                                    onPress={() => {
                                        setSizevarientSelection(item.id);
                                        setSizevarientSelection2(item.id);
                                    }}>
                                    <Text
                                        style={[
                                            styles.decrementText,
                                            variantIndex === index
                                                ? {color: '#009FD3'}
                                                : {color: '#242424'},
                                        ]}>
                                        {item.unit_name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={{
                                flexDirection: 'row',
                            }}
                        />
                    </View>
                </View>
            ) : null}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: SIZE(16),
                }}>
                <View>
                    <Text style={styles.quantityText}>Variants : </Text>
                </View>
                <View style={{width: SIZE(280)}}>
                    <Text numberOfLines={1} style={styles.kilogram}>
                        {selectedItemIndex?.title}
                    </Text>
                </View>
            </View>
            <FlatList
                bounces={false}
                contentContainerStyle={{
                    alignItems: 'center',
                    flex: 1,
                    paddingHorizontal: 16,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={all_variants}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        disabled={
                            selectedItemIndex?.id === item?.id ? true : false
                        }
                        activeOpacity={0.8}
                        key={index}
                        onPress={() => {
                            setQuantity(1);
                            setSelectedItemIndex(item.id);
                            setSingleItemPk(item.id);
                            setSizevarientSelection(null);
                            setStockManage(item);
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: SIZE(16),
                                marginRight: 10,
                            }}>
                            <View
                                style={[
                                    styles.variantSelectingContainerOne,
                                    item?.stock === 1 ? {opacity: 0.4} : null,
                                    selectedItemIndex?.id === item.id
                                        ? {backgroundColor: '#EAF7FF'}
                                        : null,
                                ]}>
                                <Text
                                    numberOfLines={1}
                                    style={[
                                        styles.foodHeading,
                                        itemIndex === item.id
                                            ? {color: '#009FD3'}
                                            : null,
                                    ]}>
                                    {item?.title}
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
                                <Text style={styles.decrementText}>
                                    AED {item.price}
                                </Text>
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
                )}
            />
        </View>
    );
};

export default ProductVariant;

const styles = StyleSheet.create({
    quantityText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
    quantityContainer: {
        flexDirection: 'row',
        marginHorizontal: SIZE(16),
    },
    decrementContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(8),
        borderRadius: SIZE(4),
        backgroundColor: '#fff',
        opacity: 0.8,
    },
    decrementText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#242424',
    },
    number: {
        borderWidth: SIZE(1),
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(8),
        borderRadius: SIZE(4),
        backgroundColor: '#EAF7FF',
        borderColor: '#98C1D9',
        marginHorizontal: SIZE(12),
    },
    numberText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#009FD3',
    },
    kilogram: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        color: '#009FD3',
    },
    foodHeading: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        color: '#00171F',
    },
    variantContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(8),
        borderRadius: SIZE(4),
        backgroundColor: '#fff',
    },
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
        width: SIZE(121.3),
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
        width: SIZE(121.3),
    },
    stockText: {
        fontSize: SIZE(12),
        fontFamily: FONTS.regular,
        color: '#003459',
    },
});
