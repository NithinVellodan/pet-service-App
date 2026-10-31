import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import React, {useState} from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const AddWalletMoney = ({navigation, state, setUserModal, setScreen}) => {
    const [selectedItem, setSelectedItem] = useState({id: 1, name: 'AED 50'});
    const [number, setNumber] = useState('50');
    const [error, setError] = useState('');

    const buttonSection = [
        {id: 1, name: 'AED 50'},
        {id: 2, name: 'AED 100'},
        {id: 3, name: 'AED 150'},
        {id: 4, name: 'AED 200'},
        {id: 5, name: 'AED 250'},
        {id: 6, name: 'AED 450'},
        {id: 7, name: 'AED 508'},
    ];
    const handleInputChange = input => {
        setError('');
        const numericInput = input.replace(/[^0-9]/g, '');
        setNumber(numericInput);
    };

    return (
        <View
            style={{
                backgroundColor: '#fff',
                borderWidth: SIZE(1),
                padding: SIZE(16),
                alignSelf: 'center',
                borderRadius: SIZE(8),
                borderColor: '#E2E2E2',
                marginTop: SIZE(25),
            }}>
            <View
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#E2E2E2',
                    paddingBottom: SIZE(13),
                }}>
                <Text style={styles.head}>
                    Add money to{' '}
                    <Text
                        style={{
                            color: !state?.userData?.is_service
                                ? '#009FD3'
                                : '#003459',
                        }}>
                        Pet to Place Wallet
                    </Text>
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    width: SIZE(364),
                    height: SIZE(50),
                    justifyContent: 'space-between',
                    backgroundColor: '#F7F7F7',
                    alignItems: 'center',
                    paddingHorizontal: SIZE(10),
                    borderRadius: SIZE(8),
                    borderWidth: SIZE(1),
                    borderColor: '#E2E2E2',
                    marginVertical: SIZE(25),
                    alignItems: 'center',
                }}>
                <Text style={styles.inputOption}>AED</Text>
                <TextInput
                    value={number}
                    placeholderTextColor="#242424"
                    placeholder=" Enter Amount"
                    style={{
                        width: SIZE(300),
                        fontFamily: FONTS.regular,
                        fontWeight: '400',
                        fontSize: SIZE(14),
                        color: '#242424',
                    }}
                    onChangeText={handleInputChange}
                />
            </View>
            {error && <Text style={styles.errorMessage}>{error}</Text>}
            <View style={styles.buttonContainer}>
                {buttonSection.map((item, index) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setError('');
                            setSelectedItem(item),
                                setNumber(item.name.replace(/[^0-9]/g, ''));
                        }}
                        style={[
                            styles.button,
                            {
                                backgroundColor:
                                    selectedItem.id === item.id
                                        ? !state?.userData?.is_service
                                            ? '#009FD3'
                                            : '#003459'
                                        : 'transparent',
                                borderColor:
                                    selectedItem.id == item.id
                                        ? '#E2E2E2'
                                        : '#E2E2E2',
                            },
                        ]}
                        key={index}>
                        <Text
                            style={[
                                styles.buttonText,
                                {
                                    color:
                                        selectedItem.id === item.id
                                            ? '#FFFFFF'
                                            : '#242424',
                                },
                            ]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    if (parseFloat(number) > 0) {
                        if (state.userData.is_login) {
                            navigation.navigate('WalletCardSection', {
                                amount: number,
                            });
                        } else {
                            setUserModal(true);
                            setScreen('login');
                        }
                    } else {
                        setError('Please enter valid amount');
                    }
                }}
                style={{
                    backgroundColor: !state?.userData?.is_service
                        ? '#009FD3'
                        : '#003459',
                    paddingVertical: SIZE(12),
                    borderRadius: SIZE(8),
                    marginTop: SIZE(25),
                }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontFamily: FONTS.bold,
                        fontWeight: '600',
                        color: '#FFFFFF',
                        fontSize: SIZE(16),
                    }}>
                    Proceed
                </Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageBackground: {
        width: SIZE(396),
        height: SIZE(126),
        borderRadius: SIZE(12),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SIZE(30),
    },
    buttonContainer: {
        flexDirection: 'row',
        width: SIZE(364),
        padding: SIZE(3),
        borderRadius: SIZE(6),
        flexWrap: 'wrap',
    },
    head: {
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        fontSize: SIZE(18),
    },
    button: {
        margin: SIZE(5),
        paddingVertical: SIZE(8),
        borderRadius: SIZE(20),
        borderWidth: SIZE(1),
        paddingHorizontal: SIZE(12),
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        fontSize: SIZE(14),
    },
    walletBalance: {
        textAlign: 'center',
        fontFamily: FONTS.regular,
        fontWeight: '400',
        fontSize: SIZE(14),
        color: '#FFFFFF',
        marginLeft: SIZE(10),
    },
    inputOption: {
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        fontSize: SIZE(14),
        color: '#242424',
    },
    amount: {
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        fontSize: SIZE(25),
        color: '#FFFFFF',
        marginTop: SIZE(5),
    },
    flexOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(-15),
        marginBottom: SIZE(10),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});

export default AddWalletMoney;
