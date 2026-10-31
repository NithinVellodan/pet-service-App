import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import moment from 'moment';

const OrderIdTotal = ({order, orderQty, orderPrice}) => {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.name}>{order?.customer_name}</Text>
                <Text style={styles.date}>
                    {moment(order?.order_date).format('DD MMM YYYY')}
                </Text>
            </View>
            <View style={{marginTop: SIZE(16)}}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={styles.leftText}>Order ID </Text>
                    <Text style={{marginHorizontal: SIZE(10)}}>:</Text>
                    <Text style={styles.rightText}>{order?.order_id}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: SIZE(10),
                    }}>
                    <Text style={styles.leftText}>Total</Text>
                    <Text style={{marginHorizontal: SIZE(10)}}>:</Text>
                    <Text style={styles.rightText}>
                        AED {order?.total_amount}{' '}
                        <Text style={[styles.rightText, {color: '#969696'}]}>
                            ( {order?.order_items_count} item )
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default OrderIdTotal;

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
    leftText: {
        width: SIZE(90),
        color: '#686868',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
    },
    rightText: {
        width: SIZE(170),
        textAlign: 'right',
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(17),
    },
});
