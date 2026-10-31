import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const OrderPriceDetails = ({
    title,
    noItems,
    price,
    discount,
    tax,
    delivery,
    convenience,
    total,
}) => {
    return (
        <View style={styles.paymentDetailContainer}>
            <View style={styles.subContainer}>
                <View style={styles.paymentHeaderContainer}>
                    <Text style={styles.paymentHeader}>
                        {title} ( {noItems} item )
                    </Text>
                </View>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.description}>Price</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>AED {price}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.description}>Discount</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>- AED {discount}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.description}>Tax (5 % VAT)</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>AED {tax}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.description}>Delivery Charge</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>AED {delivery}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.description}>Convenience Fee</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>
                            AED {convenience}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <View>
                    <Text style={styles.grantTotalText}>Total Amount</Text>
                </View>
                <View>
                    <Text style={styles.grantTotal}>AED {total}</Text>
                </View>
            </View>
        </View>
    );
};

export default OrderPriceDetails;

const styles = StyleSheet.create({
    paymentDetailContainer: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
    },
    subContainer: {
        borderBottomWidth: SIZE(1),
        paddingBottom: SIZE(16),
        borderBottomColor: '#E2E2E2',
    },
    paymentHeaderContainer: {
        borderBottomWidth: SIZE(1),
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(12),
    },
    paymentHeader: {
        color: '#969696',
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
        lineHeight: SIZE(17),
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(12),
    },
    description: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        color: '#242424',
        lineHeight: SIZE(17),
    },
    grantTotalText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        color: '#242424',
        lineHeight: SIZE(17),
    },
    grantTotal: {
        fontSize: SIZE(16),
        fontFamily: FONTS.medium,
        color: '#242424',
        lineHeight: SIZE(20),
    },
});
