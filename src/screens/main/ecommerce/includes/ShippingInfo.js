import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import ArrowDown from '../../../../assets/icons/ecommerce/customer/arrow-down.svg';
import ArrowUp from '../../../../assets/icons/ecommerce/customer/arrow-up.svg';
import moment from 'moment';

const ShippingInfo = ({delivery, delivery_data}) => {
    const [showItem, setShowItem] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.items}>Shipping Information</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setShowItem(!showItem);
                    }}>
                    {showItem ? (
                        <ArrowDown width={SIZE(20)} height={SIZE(20)} />
                    ) : (
                        <ArrowUp width={SIZE(20)} height={SIZE(20)} />
                    )}
                </TouchableOpacity>
            </View>
            {showItem && (
                <View style={{marginTop: SIZE(16)}}>
                    {delivery_data.delivery_type === '20' ? (
                        <>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                <Text style={styles.leftText}>Tracking ID</Text>
                                <Text style={{marginHorizontal: SIZE(10)}}>
                                    :
                                </Text>
                                <Text style={styles.rightText}>
                                    {delivery_data?.shipping_info?.tracking_id}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: SIZE(10),
                                }}>
                                <Text style={styles.leftText}>
                                    Delivery Partner
                                </Text>
                                <Text style={{marginHorizontal: SIZE(10)}}>
                                    :
                                </Text>
                                <Text style={styles.rightText}>
                                    {
                                        delivery_data?.shipping_info
                                            ?.delivery_partner
                                    }
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: SIZE(10),
                                }}>
                                <Text style={styles.leftText}>
                                    Expected Delivery Date
                                </Text>
                                <Text style={{marginHorizontal: SIZE(10)}}>
                                    :
                                </Text>
                                <Text style={styles.rightText}>
                                    {moment(
                                        delivery_data?.shipping_info
                                            ?.expected_date,
                                    ).format('DD-MM-YYYY')}
                                </Text>
                            </View>
                        </>
                    ) : delivery_data.delivery_type === '10' ? (
                        <View>
                            <Text style={styles.remarkTexthead}>Remarks</Text>
                            <Text style={styles.remarkText}>
                                {delivery_data?.shipping_info?.order_remarks
                                    ? delivery_data?.shipping_info
                                          ?.order_remarks
                                    : null}
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <Text>No Data</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default ShippingInfo;

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
    items: {
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(17.5),
        color: '#969696',
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
        width: SIZE(160),
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
    remarkTexthead: {
        color: '#686868',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
    },
    remarkText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
        lineHeight: SIZE(17),
        marginTop: SIZE(8),
    },
});
