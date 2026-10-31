import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

//images and logos
import UpIcon from '../../../../../assets/icons/arrow-up.svg';

const PaymentCardTrainerProvider = ({data}) => {
    const maskName = name => {
        if (!name || name.length < 2) return name;
        const firstLetter = name[0];
        const lastLetter = name[name.length - 1];
        const masked = firstLetter + '*'.repeat(name.length - 2) + lastLetter;
        return masked;
    };
    return (
        <View style={styles.paymentDetail}>
            <View style={styles.paymentDetailHead}>
                <Text style={styles.paymentDetailText}>Payment Detail</Text>
                <TouchableOpacity activeOpacity={0.8}>
                    <UpIcon width={SIZE(24)} height={SIZE(24)} />
                </TouchableOpacity>
            </View>
            <View style={styles.transantion}>
                <View style={styles.transantionIdSection}>
                    <View style={styles.transantionIdLeft}>
                        <Text style={styles.transantionName}>
                            {maskName(data?.payment_details?.billing_name)}
                        </Text>
                        <Text style={styles.transantionIdText}>
                            Transaction ID
                        </Text>
                    </View>
                    <Text style={styles.transantionNumber}>
                        {data?.payment_details?.transaction_id}
                    </Text>
                </View>
                <View style={styles.hourSection}>
                    <View style={styles.hourLeft}>
                        <Text style={styles.hourText}>Total Hours</Text>
                        <Text style={styles.hourDetail}>
                            AED {data?.price_per_hour} x {data?.no_of_hours}hr
                        </Text>
                    </View>
                    <Text style={styles.hourAmount}>
                        AED {data?.price_per_hour * data?.no_of_hours}
                    </Text>
                </View>
                <View style={styles.totalSection}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalText}>
                        AED {data?.total_amount}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default PaymentCardTrainerProvider;

const styles = StyleSheet.create({
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
        color: '#00171F',
    },
    hourSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: SIZE(12),
    },
    hourLeft: {},
    hourText: {
        fontSize: SIZE(12),
        fontWeight: '500',
        fontFamily: FONTS.medium,
        color: '#969696',
    },
    hourDetail: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    hourAmount: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
});
