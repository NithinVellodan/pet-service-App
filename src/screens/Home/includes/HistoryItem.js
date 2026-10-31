import {View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//packages
import {format} from 'date-fns';
import enUS from 'date-fns/locale/en-US';

//images and logos
import WalletSection from '../../../assets/icons/wallet-icons/wallet-section.svg';
import Credit from '../../../assets/icons/wallet-icons/credit-icon.svg';

const HistoryItem = ({navigation, item, state, walletMain}) => {
    const paymentDate = new Date(item.payment_datetime);

    const formattedDate = format(paymentDate, 'dd MMM yyyy', {locale: enUS});

    return (
        <View style={[walletMain ? styles.containerTwo : styles.container]}>
            <View style={styles.leftSection}>
                {item?.transaction_type === 'credit' ? (
                    <WalletSection width={SIZE(60)} height={SIZE(60)} />
                ) : (
                    <Credit width={SIZE(60)} height={SIZE(60)} />
                )}
            </View>
            <View style={styles.middleContent}>
                <View
                    style={{
                        marginRight: SIZE(10),
                        width: SIZES.width * 0.45,
                    }}>
                    <Text style={styles.wallet}>
                        {item.transaction_type === 'credit'
                            ? 'Wallet Credited'
                            : 'Wallet Debited'}
                    </Text>
                    <Text
                        style={[
                            styles.walletSubHead,
                            {
                                color: !state?.userData?.is_service
                                    ? '#007EA7'
                                    : '#003459',
                            },
                        ]}>
                        Order {'#'}
                        {item.transaction_id}
                    </Text>
                </View>
                <View>
                    <Text
                        style={[
                            styles.walletCash,
                            {
                                color:
                                    item.transaction_type === 'credit'
                                        ? 'green'
                                        : !state?.userData?.is_service
                                        ? 'red'
                                        : 'red',
                            },
                        ]}>
                        {item.transaction_type === 'credit' ? '+' : '-'} AED{' '}
                        {item.amount}
                    </Text>
                    <Text style={styles.walletDate}>{formattedDate}</Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: SIZE(390),
        padding: SIZE(12),
        marginVertical: SIZE(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: SIZE(8),
    },
    containerTwo: {
        width: SIZE(390),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZE(24),
    },
    leftSection: {
        backgroundColor: '#eee',
        borderRadius: SIZE(30),
        borderWidth: SIZE(0.6),
        borderColor: '#eee',
        marginRight: SIZE(16),
    },
    bottomButtonText: {
        fontFamily: FONTS.semiBold,
        color: '#003459',
        fontSize: SIZE(15),
    },
    middleContent: {
        flexDirection: 'row',
        width: SIZES.width * 0.68,
        justifyContent: 'space-between',
    },
    wallet: {
        fontFamily: FONTS.semiBold,
        color: '#000000',
        fontSize: SIZE(16),
    },
    walletSubHead: {
        fontFamily: FONTS.regular,
        color: '#009FD3',
        fontSize: SIZE(14),
        marginTop: SIZE(10),
    },
    walletCash: {
        fontFamily: FONTS.medium,
        color: '#009FD3',
        fontSize: SIZE(14),
        fontWeight: '500',
    },
    walletDate: {
        fontFamily: FONTS.regular,
        color: '#969696',
        fontSize: SIZE(13),
        fontWeight: '400',
        marginTop: SIZE(12),
        textAlign: 'right',
    },
});

export default HistoryItem;
