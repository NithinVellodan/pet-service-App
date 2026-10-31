import {StyleSheet, Text, View} from 'react-native';
import {React} from 'react';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const PaymentDetailCustomer = ({detailData}) => {
    console.log(detailData, 'detailData');
    return (
        <View style={styles.paymentDetailContainer}>
            <View style={styles.subContainer}>
                <View style={styles.paymentHeaderContainer}>
                    <Text style={styles.paymentHeader}>Price Details</Text>
                </View>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.description}>Price ( 1 item )</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>
                            AED {detailData?.[0].price}
                        </Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.description}>Discount</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>
                            - AED {detailData?.[0].discount}
                        </Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.description}>
                            Delivery Charge ({detailData?.[0].delivery_distance}{' '}
                            ) km
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.description}>
                            AED {detailData?.[0].delivery_charge}
                        </Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.description}>
                            Tax ({detailData?.[0].tax_percentage} % VAT)
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.description}>
                            AED {detailData?.[0].tax_amount}
                        </Text>
                    </View>
                </View>

                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.description}>Convenience Fee</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>
                            AED {detailData?.[0].commission_amount}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <View>
                    <Text style={styles.grantTotalText}>Total Amount</Text>
                </View>
                <View>
                    <Text style={styles.grantTotal}>
                        <Text>
                            {parseFloat(detailData?.[0].total_price.toFixed(2))}
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default PaymentDetailCustomer;

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
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        color: '#242424',
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
    },
    grantTotalText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.regular,
    },
    grantTotal: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.semiBold,
    },
});
