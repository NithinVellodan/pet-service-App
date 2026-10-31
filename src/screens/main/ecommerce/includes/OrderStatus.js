import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
//components
import Headers from '../../../includes/headers/Headers';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
//svg
import GreenTick from '../../../../assets/icons/ecommerce/customer/tick-circle-green.svg';
import RedTick from '../../../../assets/icons/ecommerce/customer/tick-circle.svg';

const OrderStatus = ({route}) => {
    const [trackDetail, setTrackDetails] = useState(
        route?.params?.tracking_details,
    );

    let filteredOrderData = [];

    const formatDate = isoString => {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const date = new Date(isoString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const ampm = date.getHours() >= 12 ? 'pm' : 'am';
        return `${day}, ${month} ${year} - ${hours}:${
            minutes < 10 ? '0' + minutes : minutes
        } ${ampm}`;
    };
    const order_placed_date = formatDate(trackDetail?.order_placed_date);
    const accepted_date = formatDate(trackDetail?.accepted_date);
    const shipped_date = formatDate(trackDetail?.shipped_date);
    const delivery_date = formatDate(trackDetail?.delivery_date);

    const OrderData = [
        {
            id: 1,
            status: 'Order Placed',
            statusDate: 'Mon, Nov 05, 2023 ',
            description: 'Your Order has been placed.',
            dateTime: order_placed_date,
        },
        {
            id: 2,
            status: 'Order Confirmed',
            statusDate: 'Tue, Nov 06, 2023 ',
            description: 'Your item has been Confirmed by provider.',
            dateTime: accepted_date,
        },
        {
            id: 3,
            status: ' Order Shipped',
            statusDate: ' Fri, Nov 09, 2023',
            description: 'Your order has been shipped successfully',
            dateTime: shipped_date,
            shipping_message: trackDetail?.shipping_message,
        },

        {
            id: 4,
            status: 'Order delivered',
            statusDate: ' Fri, Nov 09, 2023',
            description: 'Your item has been delivered',
            dateTime: delivery_date,
        },
    ];

    const orderStatus = parseInt(route?.params?.order_status);

    if (orderStatus === 10) {
        filteredOrderData = OrderData.slice(0, 1);
    } else if (orderStatus === 20) {
        filteredOrderData = OrderData.slice(0, 2);
    } else if (orderStatus === 30) {
        filteredOrderData = OrderData.slice(0, 3);
    } else if (orderStatus === 40) {
        filteredOrderData = OrderData.slice(0, 4);
    }

    return (
        <View>
            <Headers icon={true} searchCommerce={false} headText={' Status'} />

            <View style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    {filteredOrderData.map((order, index) => (
                        <View style={{flexDirection: 'row'}} key={order.id}>
                            <View style={styles.trackingContainerLeft}>
                                {order.cancel ? <RedTick /> : <GreenTick />}
                                <View
                                    style={[
                                        styles.lineContainer,
                                        {
                                            borderLeftColor:
                                                index !==
                                                filteredOrderData.length - 1
                                                    ? '#0BBE49'
                                                    : '#fff',

                                            height:
                                                order?.shipping_message
                                                    ?.delivery_type === '10' ||
                                                order?.shipping_message
                                                    ?.delivery_type === '20'
                                                    ? SIZE(120)
                                                    : SIZE(80),
                                        },
                                    ]}>
                                    <Text></Text>
                                </View>
                            </View>
                            <View style={styles.trackingContainerRight}>
                                <View style={styles.orderDateC}>
                                    <Text style={styles.orderConfirm}>
                                        {order.status}
                                    </Text>
                                </View>

                                <View style={styles.orderDateCDown}>
                                    {order?.shipping_message?.delivery_type ===
                                    '10' ? (
                                        <View>
                                            <Text
                                                style={styles.orderConfirmDown}>
                                                {
                                                    order?.shipping_message
                                                        ?.message
                                                }
                                            </Text>
                                        </View>
                                    ) : order?.shipping_message
                                          ?.delivery_type === '20' ? (
                                        <View>
                                            <Text
                                                style={[
                                                    styles.orderConfirmDown,
                                                ]}>
                                                {
                                                    order?.shipping_message
                                                        ?.message
                                                }
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.orderConfirmDown,
                                                    {marginVertical: 5},
                                                ]}>
                                                {'TRACKING ID  :  ' +
                                                    order?.shipping_message
                                                        ?.tracking_id}
                                            </Text>
                                        </View>
                                    ) : null}

                                    <View>
                                        <Text style={styles.orderConfirmDown}>
                                            {order?.description}
                                        </Text>
                                    </View>
                                    <Text style={styles.dateDown}>
                                        {order?.dateTime}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default OrderStatus;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(18),
    },
    subContainer: {
        paddingVertical: SIZE(13),
        paddingHorizontal: SIZE(16),
        backgroundColor: '#FFF',
        borderRadius: SIZE(8),
        borderWidth: SIZE(2),
        borderColor: '#E2E2E2',
    },
    lineContainer: {
        borderLeftWidth: SIZE(2),
        borderLeftColor: '#0BBE49',
        width: SIZE(20),
        marginLeft: SIZE(9),
    },
    trackingContainerLeft: {},
    orderDateC: {
        flexDirection: 'row',
    },
    orderConfirm: {
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        color: '#242424',
        marginRight: SIZE(5),
    },
    date: {
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        color: '#969696',
    },
    orderDateCDown: {
        marginTop: SIZE(10),
        width: SIZE(332),
        lineHeight: SIZE(17.5),
    },
    orderConfirmDown: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#242424',
    },
    dateDown: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#969696',
    },
});
