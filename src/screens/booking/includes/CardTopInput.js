import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import CardIcon from '../../../assets/icons/atmcard.svg';

const CardTopInput = ({
    setCardNumber,
    formatCardNumber,
    cardNumberError,
    cardNumber,
    handleAccountHolderName,
    accountHolderName,
    accountHolderNameError,
    setCardNumberError,
}) => {
    return (
        <>
            <View style={styles.textInputMain}>
                <View style={styles.commonHeading}>
                    <View>
                        <Text
                            allowFontScaling={false}
                            style={styles.commonHeadingText}>
                            Card Number
                        </Text>
                    </View>
                </View>

                <View style={styles.inputSub}>
                    <TextInput
                        allowFontScaling={false}
                        keyboardType="numeric"
                        style={styles.textInput}
                        placeholder="Card Number"
                        placeholderTextColor={'#8E8E8E'}
                        maxLength={19}
                        onChangeText={text => {
                            setCardNumber(formatCardNumber(text));
                            setCardNumberError('');
                        }}
                        value={cardNumber}
                    />
                    <View style={styles.cardIcon}>
                        <CardIcon width={'100%'} height={'100%'} />
                    </View>
                </View>
                {cardNumberError ? (
                    <Text style={styles.errorText}>{cardNumberError}</Text>
                ) : null}
            </View>
            <View style={styles.textInputMain}>
                <View style={styles.commonHeading}>
                    <View>
                        <Text
                            allowFontScaling={false}
                            style={styles.commonHeadingText}>
                            Account Holder Name
                        </Text>
                    </View>
                </View>

                <View style={styles.inputSub}>
                    <TextInput
                        allowFontScaling={false}
                        onChangeText={text => {
                            handleAccountHolderName(text);
                        }}
                        value={accountHolderName}
                        style={styles.textInput}
                        placeholder="Enter Name"
                        placeholderTextColor={'#8E8E8E'}
                    />
                </View>
                {accountHolderNameError ? (
                    <Text style={styles.errorText}>
                        {accountHolderNameError}
                    </Text>
                ) : null}
            </View>
        </>
    );
};

export default CardTopInput;

const styles = StyleSheet.create({
    headingText: {
        color: '#242424',
        fontSize: SIZE(20),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    textInputMain: {
        marginBottom: SIZE(24),
    },
    commonHeading: {
        marginBottom: SIZE(8),
    },
    commonHeadingText: {
        color: '#686868',
        fontSize: SIZE(16),
        fontWeight: '500',
        fontFamily: FONTS.medium,
    },
    inputSub: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(11),
        borderWidth: SIZE(1),
        borderColor: '#D3D3D3',
        borderRadius: SIZE(8),
    },
    textInput: {
        flex: 1,
        padding: 0,
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '400',
        color: '#242424',
    },
    cardIcon: {width: SIZE(24), height: SIZE(24)},
    errorText: {
        color: 'red',
        fontWeight: '500',
        fontFamily: FONTS.medium,
        fontSize: SIZE(12),
    },
});
