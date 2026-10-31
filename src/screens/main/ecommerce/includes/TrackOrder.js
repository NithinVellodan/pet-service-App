import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {React, useContext, useState} from 'react';

//packages
import {useToast} from 'react-native-toast-notifications';
import {Dropdown} from 'react-native-element-dropdown';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';

//svg
import UpArrow from '../../../../assets/icons/ecommerce/customer/arrow-up.svg';
import DownArrow from '../../../../assets/icons/ecommerce/customer/arrow-down.svg';

import Trash from '../../../../assets/icons/ecommerce/customer/trash.svg';
import StarIcon from '../../../../assets/icons/star.svg';
import {Context} from '../../../../contexts/Store';
import {ecommerceApiCustomers} from '../../../../../axiosConfig';

export default function TrackOrder({
    trackingHistory,
    orderDate,
    orderRating,
    trashButton,
    remove,
    cartItem,
    setItemStat,
    setRefreshing,
    order_updates,
    is_detail_confirm,
    setQuantityModal,
    setQtyList,
}) {
    const {state} = useContext(Context);
    const navigation = useNavigation();
    const toast = useToast();
    const [isOrderContainerVisible, setOrderContainerVisible] = useState(true);

    const toggleOrderContainerVisibility = () => {
        setOrderContainerVisible(!isOrderContainerVisible);
    };

    const cartCountChange = async (qty, id, varId) => {
        setRefreshing(true);
        const token = state.userData.accessToken;
        try {
            const response = await ecommerceApiCustomers.post(
                `update-cart-quantity/${id}/`,
                {
                    quantity: qty,
                    variant_item_pk: varId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setRefreshing(false);
            if (response.data.StatusCode === 6001) {
                toast.show('Unavailable Quantity', {type: 'warning'});
            } else {
                toast.show('Count Changed', {type: 'success'});
            }
        } catch (error) {
            setRefreshing(false);
        }
    };

    const data = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: 'More', value: '4'},
    ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View
            style={{
                backgroundColor: orderDate && '#fff',
                padding: orderDate && SIZE(16),
                borderRadius: orderDate && SIZE(8),
            }}>
            <View style={{backgroundColor: '#fff'}}>
                {orderDate && (
                    <View
                        style={[
                            styles.avatarContainer,
                            isOrderContainerVisible && {
                                borderBottomWidth: SIZE(1),
                                borderColor: '#E2E2E2',
                                paddingBottom: SIZE(16),
                                marginBottom: SIZE(16),
                            },
                        ]}>
                        {order_updates?.order_status !== '10' && (
                            <View>
                                <View>
                                    <Text style={styles.shippingText}>
                                        Shipping items (
                                        {order_updates?.order_items_count})
                                    </Text>
                                </View>
                                <View style={styles.deliveryDate}>
                                    <Text style={styles.deliveryDateText}>
                                        Delivered on Dec 02, 2023
                                    </Text>
                                </View>
                            </View>
                        )}
                        {order_updates?.order_status !== '10' && (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                hitSlop={10}
                                style={styles.arrowContainer}
                                onPress={toggleOrderContainerVisibility}>
                                {isOrderContainerVisible ? (
                                    <UpArrow />
                                ) : (
                                    <DownArrow />
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
            {cartItem?.map((item, index) => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        navigation.navigate('ProductDetail', {
                            id: item.id,
                        })
                    }
                    key={item?.id}
                    style={[
                        styles.orderContainerTwo,
                        {marginBottom: index === index - 1 ? 0 : 20},
                    ]}>
                    <View style={styles.productContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{uri: item?.image}}
                                style={styles.avatarImage}
                            />
                        </View>
                        <View style={styles.detailContainer}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <View style={styles.headingContainer}>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.headingText}>
                                        {item?.name}
                                    </Text>
                                </View>
                                {trashButton && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            remove && remove();
                                            setItemStat(item);
                                        }}
                                        style={{
                                            padding: SIZE(6),
                                            borderWidth: SIZE(1),
                                            borderColor: '#E2E2E2',
                                            borderRadius: SIZE(50),
                                            alignSelf: 'center',
                                        }}>
                                        <Trash />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.descriptionContainer}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.description}>
                                    {item?.description}
                                </Text>
                            </View>
                            {!is_detail_confirm && (
                                <View>
                                    {item?.offer !== null && (
                                        <View style={styles.discountContainer}>
                                            <View
                                                style={{marginRight: SIZE(8)}}>
                                                <Text
                                                    style={styles.discountRate}>
                                                    AED {item?.original_price}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text
                                                    style={styles.discountPerc}>
                                                    {item?.offer}% off
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: SIZE(8),
                                }}>
                                <View
                                    style={{
                                        width: SIZE(130),
                                    }}>
                                    <Text style={styles.headingText}>
                                        AED{' '}
                                        {item?.final_price
                                            ? item?.final_price
                                            : item.price}
                                    </Text>
                                </View>
                                {orderRating && (
                                    <View style={styles.ratingContainer}>
                                        <View style={styles.starContainer}>
                                            <StarIcon
                                                width={SIZE(16)}
                                                height={SIZE(16)}
                                            />
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
                        </View>
                    </View>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={[styles.headingTextTwo]}
                        labelField="label"
                        valueField="value"
                        containerStyle={{
                            borderColor: '#EDEDED',
                            borderRadius: SIZE(4),
                            padding: SIZE(5),
                        }}
                        itemContainerStyle={{
                            borderRadius: SIZE(5),
                            margin: SIZE(-8),
                        }}
                        activeColor={'#EAF7FF'}
                        itemTextStyle={[
                            styles.buttonTextTwo,
                            {color: index === 3 ? 'red' : '#003459'},
                        ]}
                        data={data}
                        placeholder={`Qty : ${item.quantity}`}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item2 => {
                            setValue(item2.value);
                            setIsFocus(false);
                            if (item2.value === '4') {
                                setQuantityModal(true);
                                setQtyList([
                                    {id: item.id, varId: item.variant_item_pk},
                                ]);
                            } else {
                                cartCountChange(
                                    item2.value,
                                    item.id,
                                    item.variant_item_pk,
                                );
                            }
                        }}
                    />
                    {trackingHistory && (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('OrderStatus')}
                            style={styles.OrderCancelContainer}>
                            <Text style={styles.historyText}>
                                Track my order
                            </Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shippingText: {
        fontSize: SIZE(14),
        lineHeight: SIZE(17.5),
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    deliveryDate: {marginTop: SIZE(8)},
    deliveryDateText: {
        fontSize: SIZE(14),
        lineHeight: SIZE(17.5),
        fontFamily: FONTS.medium,
        color: '#242424',
    },
    arrowContainer: {
        width: SIZE(20),
        height: SIZE(20),
    },
    orderContainerTwo: {
        paddingVertical: SIZE(13),
        paddingHorizontal: SIZE(16),
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    avatarImage: {
        width: SIZE(120),
        height: SIZE(120),
        borderRadius: SIZE(8),
    },
    productContainer: {
        flexDirection: 'row',
        borderBottomWidth: SIZE(1),
        paddingBottom: SIZE(16),
        borderColor: '#E2E2E2',
        marginBottom: SIZE(16),
    },
    detailContainer: {
        flex: 1,
        marginLeft: SIZE(16),
    },
    headingContainer: {
        marginTop: SIZE(9.5),
        width: SIZE(150),
    },
    headingText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        color: '#00171F',
    },
    headingTextTwo: {
        fontSize: SIZE(12),
        fontFamily: FONTS.medium,
        color: '#00171F',
    },
    descriptionContainer: {
        marginTop: SIZE(8),
        marginBottom: SIZE(12),
        width: SIZE(150),
    },
    description: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        color: '#757575',
    },
    discountContainer: {
        flexDirection: 'row',
    },
    OrderCancelContainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(24),
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        alignItems: 'center',
    },
    historyText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontFamily: FONTS.bold,
    },
    discountRate: {
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
        textDecorationLine: 'line-through',
        color: '#969696',
    },
    discountPerc: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(5),
        borderRadius: SIZE(4),
        backgroundColor: '#EDEDED',
    },
    starContainer: {
        marginRight: SIZE(10),
    },
    imageContainer: {},
    starText: {
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    downArrow: {
        marginLeft: SIZE(6),
        width: SIZE(14),
        height: SIZE(14),
    },
    buttonTextTwo: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
        fontWeight: '600',
        color: '#003459',
    },
    dropdown: {
        borderWidth: SIZE(1),
        paddingHorizontal: SIZE(8),
        borderColor: '#EDEDED',
        borderRadius: SIZE(4),
        alignSelf: 'flex-end',
        width: SIZE(80),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
