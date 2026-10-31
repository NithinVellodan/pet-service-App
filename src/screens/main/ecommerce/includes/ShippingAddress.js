import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const ShippingAddress = ({shippiDetails}) => {
    return (
        <View style={styles.orderContainer}>
            <View style={styles.avatarContainer}>
                <Text style={styles.shippingText}>Shipping Details</Text>
            </View>
            <View>
                <View>
                    <Text style={styles.nameText}>Marcus Donin</Text>
                </View>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>
                        {shippiDetails?.full_name}, {shippiDetails?.address_1} ,
                        {shippiDetails?.address_2}, {shippiDetails?.street} ,
                        {shippiDetails?.emirate},
                    </Text>
                </View>
                <View>
                    <Text style={styles.nameText}>{shippiDetails?.phone}</Text>
                </View>
            </View>
        </View>
    );
};

export default ShippingAddress;

const styles = StyleSheet.create({
    orderContainer: {
        paddingVertical: SIZE(13),
        paddingHorizontal: SIZE(16),
        backgroundColor: '#FFF',
        borderRadius: SIZE(8),
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: SIZE(1),
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(16),
        marginBottom: SIZE(16),
    },
    shippingText: {
        fontSize: SIZE(14),
        lineHeight: SIZE(17.5),
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    addressContainer: {
        marginTop: SIZE(12),
        marginBottom: SIZE(6),
    },
    addressText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.regular,
    },
    nameText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.semiBold,
    },
});
