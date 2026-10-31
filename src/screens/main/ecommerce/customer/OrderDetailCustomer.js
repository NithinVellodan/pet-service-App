import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Headers from '../../../includes/headers/Headers';
//constants
import {SIZE} from '../../../../theme/theme';
//components
import OrderCancel from '../includes/OrderCancel';
import ShippingAddress from '../includes/ShippingAddress';
import OrderId from '../includes/OrderId';
import PaymentDetailCustomer from '../includes/PaymentDetailCustomer';

const OrderDetailCustomer = () => {
    return (
        <View style={styles.mainContainer}>
            <Headers
                icon={true}
                searchCommerce={true}
                cart={true}
                headText={'Order Details'}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.subContainer}>
                <OrderId />
                <OrderCancel />
                <ShippingAddress />
                <PaymentDetailCustomer />
            </ScrollView>
        </View>
    );
};

export default OrderDetailCustomer;

const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: SIZE(120),
    },
    subContainer: {
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(24),
        gap: SIZE(16),
    },
});
