import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';

//constants
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';

//images and logos
import CloseIcon from '../../assets/icons/modalclose.svg';
import CloseIconDark from '../../assets/icons/closedark.svg';
import CardTopInput from './includes/CardTopInput';
import CardSplitInput from './includes/CardSplitInput';

const CardModal = ({
    setCardModalVisible,
    creditCardNumber,
    holderName,
    dateExpiry,
    setAddModal,
    addModal,
    editCard,
    editCardPay,
    addNewCard,
    editModal,
    setEditModal,
    editedIndex,
    editCardApi,
    existError,
    submitLoading,
}) => {
    const {state} = useContext(Context);

    const [cardNumberError, setCardNumberError] = useState('');
    const [expiryError, setExpiryError] = useState('');
    const [cvvError, setCVVError] = useState('');
    const [accountHolderNameError, setAccountHolderNameError] = useState('');
    const [cardNumber, setCardNumber] = useState(
        creditCardNumber
            ? creditCardNumber.replace(/(\d{4})/g, '$1 ').slice(0, -1)
            : '',
    );
    const formatExpiryDate = dateExpiry => {
        const [month, year] = dateExpiry.split('/');
        const formattedMonth = month.length === 1 ? `0${month}` : month;
        return `${formattedMonth}/${year}`;
    };
    const [expiry, setExpiry] = useState(
        dateExpiry ? formatExpiryDate(dateExpiry) : '',
    );
    const [cvv, setCVV] = useState('');
    const [accountHolderName, setAccountHolderName] = useState(
        holderName ? holderName : '',
    );
    const formatCardNumber = input => {
        const numericInput = input.replace(/\D/g, '');
        return numericInput.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    // Function to format expiry input with
    const formatExpiry = input => {
        const numericInput = input.replace(/\D/g, '');

        if (numericInput.length <= 2) {
            return numericInput;
        }

        const formattedExpiry = `${numericInput.slice(
            0,
            2,
        )}/${numericInput.slice(2)}`;

        return formattedExpiry;
    };

    // Function to restrict CVV input to numbers and limit to 3 digits
    const formatCVV = input => {
        return input.replace(/\D/g, '').slice(0, 3);
    };
    // Function to handle Account Holder Name input
    const handleAccountHolderName = input => {
        const formattedName = input.replace(/[^A-Za-z\s]/g, '').slice(0, 20);
        setAccountHolderName(formattedName);

        if (!formattedName.trim()) {
            setAccountHolderNameError('Name is required');
        } else {
            setAccountHolderNameError('');
        }
    };

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const currentYear = currentDate.getFullYear();
    const [expiryMonth, expiryYear] = expiry
        .split('/')
        .map(num => parseInt(num, 10));

    const handleApply = () => {
        let hasErrors = false;
        if (cardNumber.length !== 19) {
            setCardNumberError('Card number must be 16 digits');
            hasErrors = true;
        } else {
            setCardNumberError('');
        }

        if (
            expiryYear < currentYear ||
            (expiryYear === currentYear && expiryMonth < currentMonth)
        ) {
            setExpiryError('Expiry date must be in the future');
            hasErrors = true;
        } else if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiry)) {
            setExpiryError('Invalid expiry date');
            hasErrors = true;
        } else {
            setExpiryError('');
        }

        if (!accountHolderName.trim()) {
            setAccountHolderNameError('Name is required');
            hasErrors = true;
        }
        if (existError) {
            setCardNumberError(existError);
        } else {
        }

        // If all fields are valid, you can proceed with your logic
        if (!hasErrors) {
            if (editCard) {
                editCardApi(
                    cardNumber.replace(/\D/g, ''),
                    accountHolderName,
                    expiry,
                    editedIndex?.id,
                );
            } else if (addModal) {
                addNewCard(
                    cardNumber.replace(/\D/g, ''),
                    accountHolderName,
                    expiry,
                );
            } else {
                addNewCard(
                    cardNumber.replace(/\D/g, ''),
                    accountHolderName,
                    expiry,
                );
            }
        }
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView
                bounces={false}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.subContainer}>
                <TouchableOpacity
                    hitSlop={10}
                    onPress={() => {
                        if (addModal) {
                            setAddModal(false);
                        } else if (editModal) {
                            setEditModal(false);
                        } else {
                            setCardModalVisible(false);
                        }
                    }}
                    activeOpacity={0.8}
                    style={styles.closeIcon}>
                    {state?.userData?.is_service ? (
                        <CloseIconDark width={'100%'} height={'100%'} />
                    ) : (
                        <CloseIcon width={'100%'} height={'100%'} />
                    )}
                </TouchableOpacity>
                <View style={styles.heading}>
                    <Text allowFontScaling={false} style={styles.headingText}>
                        {editModal ? 'Edit Card' : 'Add New Card'}
                    </Text>
                </View>
                <CardTopInput
                    setCardNumber={setCardNumber}
                    formatCardNumber={formatCardNumber}
                    cardNumberError={cardNumberError}
                    setCardNumberError={setCardNumberError}
                    cardNumber={cardNumber}
                    handleAccountHolderName={handleAccountHolderName}
                    accountHolderName={accountHolderName}
                    accountHolderNameError={accountHolderNameError}
                />
                <CardSplitInput
                    setExpiry={setExpiry}
                    formatExpiry={formatExpiry}
                    setCVV={setCVV}
                    formatCVV={formatCVV}
                    expiryError={expiryError}
                    setExpiryError={setExpiryError}
                    setCVVError={setCVVError}
                    cvvError={cvvError}
                    expiry={expiry}
                    cvv={cvv}
                />
                <View>
                    {addModal || editCard ? (
                        ''
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                handleApply();
                            }}
                            disabled={submitLoading}
                            activeOpacity={0.8}
                            style={[
                                styles.rightButton,
                                {
                                    backgroundColor: !state?.userData
                                        ?.is_service
                                        ? '#009FD3'
                                        : '#003459',
                                },
                            ]}>
                            <View>
                                {submitLoading ? (
                                    <ActivityIndicator
                                        size={'small'}
                                        color={'#fff'}
                                    />
                                ) : (
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.rightText}>
                                        Save
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                {!editCardPay && (
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            disabled={submitLoading}
                            onPress={() => {
                                if (addModal) {
                                    setAddModal(false);
                                } else {
                                    setEditModal(false);
                                }
                            }}
                            activeOpacity={0.8}
                            style={styles.leftButton}>
                            <Text
                                allowFontScaling={false}
                                style={styles.leftText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                handleApply();
                            }}
                            disabled={submitLoading}
                            activeOpacity={0.8}
                            style={[
                                styles.rightButton,
                                {
                                    backgroundColor: !state?.userData
                                        ?.is_service
                                        ? '#009FD3'
                                        : '#003459',
                                },
                            ]}>
                            {submitLoading ? (
                                <ActivityIndicator
                                    size={'small'}
                                    color={'#fff'}
                                />
                            ) : (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.rightText}>
                                    Save
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default CardModal;

const styles = StyleSheet.create({
    mainContainer: {},
    subContainer: {
        paddingHorizontal: SIZE(32),
        paddingTop: SIZE(20),
        paddingBottom: SIZE(40),
    },
    closeIcon: {
        width: SIZE(15),
        height: SIZE(15),
        alignSelf: 'flex-end',
        marginBottom: SIZE(10),
    },
    heading: {
        paddingBottom: SIZE(16),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
        marginBottom: SIZE(32),
    },
    headingText: {
        color: '#242424',
        fontSize: SIZE(20),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },

    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(24),
    },
    leftButton: {
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(12),
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        flex: 1,
        marginRight: SIZE(16),
    },
    leftText: {
        color: '#003459',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    rightButton: {
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        alignItems: 'center',
        borderRadius: SIZE(8),
        backgroundColor: '#009FD3',
        flex: 1,
    },
    rightText: {
        color: '#FFF',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
