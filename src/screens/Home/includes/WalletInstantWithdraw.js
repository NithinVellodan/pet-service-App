import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {usersConfigGeneral} from '../../../../axiosConfig';

//svg
import BankImage from '../../../assets/icons/wallet-icons/bank.svg';

export default function WalletInstantWithdraw({walletBalance, state}) {
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [isInputActive, setIsInputActive] = useState(false);
    const [bankDetails, setBankDetails] = useState();

    const handleChangeText = text => {
        const regex = /^(?!0\d)(?!.*\..*\..*)[0-9]*\.?[0-9]*$/;
        if (regex.test(text)) {
            setWithdrawalAmount(text);
        }
    };

    const bankAccount = async () => {
        const token = state.userData.accessToken;
        try {
            const response = await usersConfigGeneral.get(
                'view-bank-account/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setBankDetails(response.data.data);
        } catch (error) {
            console.log('Error fetching user profile:', error.response.data);
        }
    };

    useEffect(() => {
        bankAccount();
    }, []);

    return (
        <View>
            <View style={styles.subContainer}>
                <View style={styles.amountContainer}>
                    <View style={styles.amountTextContainer}>
                        <Text style={styles.amountText}>Your Amount</Text>
                    </View>
                    {/* <View style={styles.amountTextContainer}>
                        <Text style={styles.rateText}>AED {walletBalance}</Text>
                    </View> */}
                </View>
                <View
                    style={[
                        styles.topContainer,
                        {borderColor: isInputActive ? '#009FD3' : '#E2E2E2'},
                    ]}>
                    <View style={{marginRight: SIZE(8)}}>
                        <Text style={styles.amount}>AED</Text>
                    </View>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Enter Amount"
                        value={withdrawalAmount}
                        onChangeText={handleChangeText}
                        keyboardType="numeric"
                        placeholderTextColor={'#242424'}
                        onFocus={() => setIsInputActive(true)}
                        onBlur={() => setIsInputActive(false)}
                    />
                </View>
                <View style={{marginTop: SIZE(8)}}>
                    <Text
                        style={{
                            color:
                                withdrawalAmount < 10
                                    ? '#242424'
                                    : parseFloat(withdrawalAmount) >
                                      parseFloat(walletBalance)
                                    ? '#CF2929'
                                    : '#009FD3',
                            fontFamily: FONTS.regular,
                            fontSize: SIZE(12),
                        }}>
                        {withdrawalAmount < 10
                            ? 'Minimum AED 10'
                            : parseFloat(withdrawalAmount) > walletBalance
                            ? 'Withdrawal Amount Cannot be greater than your amount'
                            : ' Withdraw your amount'}
                    </Text>
                </View>
                <View style={{marginVertical: SIZE(24)}}>
                    <Text style={styles.amountText}>Send amount to</Text>
                </View>
                <View style={styles.bankContainer}>
                    <View style={styles.bankSub}>
                        <View style={styles.leftContainer}>
                            <BankImage width="100%" height="100%" />
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <View>
                            <Text style={styles.amount}>
                                {bankDetails?.bank_name}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.cardNumber}>
                                {bankDetails?.account_number
                                    ? 'X'.repeat(
                                          bankDetails.account_number.length - 4,
                                      ) + bankDetails.account_number.slice(-4)
                                    : ''}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    disabled={
                        withdrawalAmount < 10 ||
                        parseFloat(withdrawalAmount) > walletBalance
                    }
                    activeOpacity={0.8}
                    style={styles.buttonMain}>
                    <Text style={styles.buttonText}>Withdraw Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        padding: SIZE(16),
        marginHorizontal: SIZE(16),
        marginVertical: SIZE(24),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: SIZE(1),
        paddingBottom: SIZE(16),
        borderColor: '#E2E2E2',
    },
    amountTextContainer: {},
    amountText: {
        fontSize: SIZE(16),
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        justifyContent: 'Space-between',
        paddingHorizontal: SIZE(16),
        marginTop: SIZE(24),
    },
    bankSub: {
        borderWidth: SIZE(1),
        borderColor: '#003459',
        padding: SIZE(8),
        marginRight: SIZE(16),
        borderRadius: SIZE(8),
    },
    rateText: {
        fontSize: SIZE(14),
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#003459',
    },
    inputContainer: {
        width: SIZE(292),
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        height: SIZE(50),
    },
    textInput: {},
    messageText: {
        fontSize: SIZE(12),
        fontFamily: FONTS.medium,
        color: '#CF2929',
    },
    amount: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#242424',
    },
    bankContainer: {
        flexDirection: 'row',
    },
    leftContainer: {
        width: SIZE(26),
        height: SIZE(26),
    },
    cardNumber: {
        color: '#969696',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
    },
    buttonMain: {
        backgroundColor: '#003459',
        paddingVertical: SIZE(12),
        borderRadius: SIZE(8),
        marginTop: SIZE(25),
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: FONTS.bold,
        fontWeight: '600',
        color: '#FFFFFF',
        fontSize: SIZE(16),
    },
});
