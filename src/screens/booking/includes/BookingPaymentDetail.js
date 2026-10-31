import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import UpIcon from '../../../assets/icons/arrow-up.svg';

import {FONTS} from '../../../theme/fonts';
import {SIZE} from '../../../theme/theme';

const BookingPaymentDetail = ({route, bookingData}) => {
    return (
        <View style={styles.paymentSection}>
            <View style={styles.paymentDetail}>
                <View style={styles.paymentDetailHead}>
                    <Text style={styles.paymentDetailText}>Payment Detail</Text>
                    {route.name === 'BorrowBookingSinge' ? (
                        ''
                    ) : (
                        <TouchableOpacity activeOpacity={0.8}>
                            <UpIcon width={SIZE(24)} height={SIZE(24)} />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.transantion}>
                    <View style={styles.transantionIdSection}>
                        <View style={styles.transantionIdLeft}>
                            <Text style={styles.transantionName}>
                                Li************en
                            </Text>
                            <Text style={styles.transantionIdText}>
                                Transaction ID
                            </Text>
                            {route.name === 'BorrowBookingSinge' ? (
                                <Text
                                    style={[
                                        styles.transantionNumber,
                                        {marginTop: SIZE(4)},
                                    ]}>
                                    #{' '}
                                    {
                                        bookingData?.payment_details
                                            ?.transaction_id
                                    }
                                </Text>
                            ) : (
                                ''
                            )}
                            {route.name === 'BorrowBookingSinge' ? (
                                ''
                            ) : (
                                <Text style={styles.transantionNumber}>
                                    #2366562266
                                </Text>
                            )}
                        </View>
                        <View>
                            <Text style={styles.totalText}>
                                AED {bookingData?.total_amount}
                            </Text>
                            <Text
                                style={[
                                    styles.transantionIdText,
                                    {textAlign: 'right'},
                                ]}>
                                {`(${Math.ceil(
                                    (new Date(bookingData?.end_date) -
                                        new Date(bookingData?.start_date)) /
                                        (1000 * 60 * 60 * 24),
                                )} Days)`}
                            </Text>
                        </View>
                    </View>
                    {route.name === 'BorrowBookingSinge' ? (
                        ''
                    ) : (
                        <>
                            <View style={styles.transantionItems}>
                                <Text style={styles.transantionItem}>
                                    Food (Addon)
                                </Text>
                                <Text style={styles.transantionItemCount}>
                                    AED 100
                                </Text>
                            </View>
                            <View style={styles.transantionItems}>
                                <Text style={styles.transantionItem}>
                                    Tax (5 % VAT)
                                </Text>
                                <Text style={styles.transantionItemCount}>
                                    AED 50
                                </Text>
                            </View>
                        </>
                    )}
                    {route.name === 'BorrowBookingSinge' ? (
                        ''
                    ) : (
                        <View style={styles.totalSection}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={styles.totalText}>AED 850</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default BookingPaymentDetail;

const styles = StyleSheet.create({
    paymentSection: {
        paddingHorizontal: SIZE(16),
        marginTop: SIZE(24),
        marginBottom: SIZE(38),
    },
    paymentDetail: {
        padding: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
    },
    paymentDetailHead: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        borderColor: '#E2E2E2',
        borderBottomWidth: 1,
        paddingBottom: SIZE(16),
    },
    paymentDetailText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#00171F',
    },
    transantion: {},
    transantionIdSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: SIZE(12),
    },
    transantionIdLeft: {},
    transantionName: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    transantionIdText: {
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
        color: '#242424',
        marginTop: SIZE(4),
    },
    transantionNumber: {
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
        color: '#242424',
    },
    transantionItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(12),
    },
    transantionItem: {
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    transantionItemCount: {
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(16),
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        paddingTop: SIZE(16),
    },
    totalText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#009FD3',
    },
});
