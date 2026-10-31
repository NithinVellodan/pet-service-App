import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const OrderItems = ({order}) => {
    return (
        <View style={styles.bottom}>
            <View>
                {order.image ? (
                    <Image
                        style={styles.leftImage}
                        source={{uri: order.image}}
                    />
                ) : (
                    <View style={styles.leftImage}></View>
                )}
            </View>
            <View style={styles.rightBox}>
                <Text style={styles.types}>{order.name}</Text>
                <Text numberOfLines={1} style={styles.discription}>
                    {order?.description}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={styles.itemPrice}>AED {order?.price}</Text>
                    <Text style={styles.qtyitem}>Qty : {order?.quantity}</Text>
                </View>
            </View>
        </View>
    );
};

export default OrderItems;

const styles = StyleSheet.create({
    bottom: {
        marginBottom: SIZE(16),
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(14),
        flexDirection: 'row',
        borderRadius: SIZE(12),
        borderWidth: 1,
        borderColor: '#E2E2E2',
    },
    leftImage: {
        height: SIZE(100),
        width: SIZE(100),
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
    rightBox: {
        marginLeft: SIZE(16),
        flex: 1,
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
    itemDot: {},
    itemPrice: {
        color: '#00171F',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(17),
    },
    price: {
        color: '#969696',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(17),
        textDecorationLine: 'line-through',
        marginRight: SIZE(5),
    },
    qtyitem: {
        borderWidth: SIZE(1),
        borderColor: '#EDEDED',
        padding: SIZE(8),
        borderRadius: SIZE(4),
        color: '#242424',
        fontSize: SIZE(12),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(15),
    },
});
