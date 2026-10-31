import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
//svg
import TickCircle from '../../../../assets/icons/ecommerce/customer/tick-circle.svg';

export default function OrderCancel() {
    return (
        <View style={styles.orderContainer}>
            <View style={styles.productContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../../../assets/images/ecommerce/customer/food2.png')}
                        style={styles.avatarImage}
                    />
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingText}>All Cats</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            Nunc nunc arcu tortor sed
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.headingText}>AED 60</Text>
                    </View>
                </View>
            </View>
            <View style={styles.OrderCancelContainer}>
                <View style={{flexDirection: 'row', marginBottom: SIZE(10)}}>
                    <View style={styles.tickContainer}>
                        <TickCircle />
                    </View>
                    <View>
                        <Text style={styles.dateText}>
                            Order Cancelled, ( Mon ) Nov 05, 2023
                        </Text>
                    </View>
                </View>
                <View style={{marginLeft: SIZE(32)}}>
                    <View>
                        <Text style={styles.confirmationText}>
                            The bank has not confirmed your payment.
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.timeContainer}>
                            Mon, Nov 05, 2023 - 5 : 10 pm
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    orderContainer: {
        paddingVertical: SIZE(13),
        paddingHorizontal: SIZE(16),
        backgroundColor: '#FFF',
        borderRadius: SIZE(8),
    },

    avatarImage: {
        width: SIZE(100),
        height: SIZE(100),
    },
    productContainer: {
        flexDirection: 'row',
        borderBottomWidth: SIZE(1),
        paddingBottom: SIZE(16),
        borderColor: '#E2E2E2',
        marginBottom: SIZE(16),
    },
    detailContainer: {
        marginLeft: SIZE(16),
    },

    headingContainer: {
        marginTop: SIZE(9.5),
    },
    headingText: {
        fontFamily: FONTS.bold,
        color: '#00171F',
    },
    descriptionContainer: {
        marginTop: SIZE(8),
        marginBottom: SIZE(12),
    },
    description: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
    },

    OrderCancelContainer: {
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(16),
        backgroundColor: '#FDE9E9',
        borderRadius: SIZE(8),
    },
    tickContainer: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(10),
    },
    dateText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    confirmationText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17.5),
    },
    timeContainer: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        color: '#686868',
        lineHeight: SIZE(17.5),
    },
});
