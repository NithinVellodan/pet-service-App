import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import moment from 'moment';

const OrderDonateList = ({donate, donatePress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                donatePress && donatePress();
            }}
            style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.name}>{donate.order_id}</Text>
                <View style={styles.statuscontain}>
                    <Text style={styles.date}>
                        {moment(donate.date_added).format('DD MMM YYYY')}
                    </Text>
                    <Text
                        style={[
                            styles.status,
                            {
                                color:
                                    donate.order_status === 'Product Accepted'
                                        ? '#009FD3'
                                        : donate.order_status ===
                                          'Product Requested'
                                        ? '#FCAD08'
                                        : donate.order_status ===
                                          'Product Rejected'
                                        ? '#CF2929'
                                        : donate.order_status === 'Delivered' &&
                                          '#0BBE49',
                                backgroundColor:
                                    donate.order_status === 'Product Accepted'
                                        ? '#EAF7FF'
                                        : donate.order_status ===
                                          'Product Requested'
                                        ? '#DAA12C33'
                                        : donate.order_status ===
                                          'Product Rejected'
                                        ? '#CF29291A'
                                        : donate.order_status === 'Delivered' &&
                                          '#0BBE491A',
                            },
                        ]}>
                        {donate.order_status === 'Product Accepted'
                            ? 'Claimed'
                            : donate.order_status === 'Product Requested'
                            ? 'Incoming'
                            : donate.order_status === 'Product Rejected'
                            ? 'Cancelled'
                            : donate.order_status === 'Order Shipped' &&
                              'Delivered'}
                    </Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View>
                    {donate?.product_image ? (
                        <Image
                            style={styles.leftImage}
                            source={{uri: donate?.product_image}}
                        />
                    ) : (
                        <Image
                            style={styles.leftImage}
                            source={require('../../../../assets/images/ecommerce/orderItem.png')}
                        />
                    )}
                </View>
                <View style={styles.rightBox}>
                    <Text style={styles.types}>{donate.product_name}</Text>
                    <Text numberOfLines={2} style={styles.discription}>
                        {donate.description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default OrderDonateList;

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
        height: SIZE(100),
        width: SIZE(100),
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
        marginBottom: SIZE(12),
    },
    discription: {
        color: '#686868',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(20),
    },
    statuscontain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    status: {
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(4),
        borderRadius: SIZE(4),
        fontSize: SIZE(12),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(15),
        marginLeft: SIZE(16),
    },
});
