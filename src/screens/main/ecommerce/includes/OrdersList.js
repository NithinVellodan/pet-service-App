import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import moment from 'moment';

const OrdersList = ({order, orderPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                orderPress && orderPress();
            }}
            style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.name}>{order.order_id}</Text>
                <Text style={styles.date}>
                    {moment(order.date_added).format('DD MMM YYYY')}
                </Text>
            </View>
            <View style={styles.bottom}>
                <View>
                    {order?.product_image ? (
                        <Image
                            style={styles.leftImage}
                            source={{uri: order?.product_image}}
                        />
                    ) : (
                        <Image
                            style={styles.leftImage}
                            source={require('../../../../assets/images/ecommerce/orderItem.png')}
                        />
                    )}
                </View>
                <View style={styles.rightBox}>
                    <Text style={styles.discription}>
                        Items <Text style={styles.itemDot}> : </Text>{' '}
                        {order.items_count}
                    </Text>
                    <Text style={styles.itemPrice}>
                        AED {order.total_amount}
                    </Text>
                    <View style={styles.statuscontain}>
                        <Text style={styles.statusText}>Status</Text>
                        <Text
                            style={[
                                styles.status,
                                {
                                    color:
                                        order.order_status === 'Order Accepted'
                                            ? '#009FD3'
                                            : order.order_status ===
                                              'Order Placed'
                                            ? '#FCAD08'
                                            : order.order_status ===
                                              'Order Cancelled'
                                            ? '#CF2929'
                                            : order.order_status ===
                                              'Order Delivered'
                                            ? '#0BBE49'
                                            : order.order_status ===
                                                  'Order Shipped' && '#009FD3',
                                    backgroundColor:
                                        order.order_status === 'Order Accepted'
                                            ? '#EAF7FF'
                                            : order.order_status ===
                                              'Order Placed'
                                            ? '#DAA12C33'
                                            : order.order_status ===
                                              'Order Cancelled'
                                            ? '#CF29291A'
                                            : order.order_status ===
                                              'Order Delivered'
                                            ? '#0BBE491A'
                                            : order.order_status ===
                                                  'Order Shipped' && '#EAF7FF',
                                },
                            ]}>
                            {order.order_status === 'Order Accepted'
                                ? 'Accepted'
                                : order.order_status === 'Order Placed'
                                ? 'Incoming'
                                : order.order_status === 'Order Cancelled'
                                ? 'Cancelled'
                                : order.order_status === 'Order Delivered'
                                ? 'Delivered'
                                : order.order_status === 'Order Shipped' &&
                                  'Shipped'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default OrdersList;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        padding: SIZE(16),
        backgroundColor: '#FFFFFF',
        marginBottom: SIZE(16),
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: SIZE(16),
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
    },
    name: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    date: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
    },
    bottom: {
        marginTop: SIZE(16),
        flexDirection: 'row',
    },
    leftImage: {
        height: SIZE(80),
        width: SIZE(80),
        overflow: 'hidden',
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    rightBox: {
        marginLeft: SIZE(16),
        flex: 1,
        justifyContent: 'center',
    },
    types: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        marginBottom: SIZE(8),
    },
    discription: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        marginBottom: SIZE(6),
    },
    itemPrice: {
        color: '#00171F',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(17),
    },
    statuscontain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SIZE(6),
    },
    statusText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
    },
    status: {
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(4),
        borderRadius: SIZE(4),
        fontSize: SIZE(12),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(15),
    },
});
