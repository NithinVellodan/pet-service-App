import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
} from 'react-native';
// theme
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import NormalForm from '../../../../components/forms/NormalForm';

import ArrowDown from '../../../../assets/icons/arrow-down.svg';
import Arrow from '../../../../assets/icons/arrow-up.svg';

export const EnterInputPhone = ({
    phonEnter,
    setPhonEnter,
    errorMessage,
    setVisible,
}) => {
    return (
        <View style={{zIndex: -10}}>
            <NormalForm
                label={'Phone Number'}
                type={'phone'}
                placeholder={'Enter your Phone Number'}
                pricePerDay={phonEnter}
                setPricePerDay={setPhonEnter}
                marginTop={25}
                setVisible={setVisible}
            />
            {/* {errorMessage.phone_number_is == true && (
                <Text style={styles.errorMessage}>
                    Please enter phone number
                </Text>
            )} */}
            {(errorMessage.phone_number_valid === true ||
                errorMessage.phone_number_is === true) && (
                <Text style={styles.errorMessage}>
                    Please enter a valid phone number
                </Text>
            )}
        </View>
    );
};

export const EnterInputName = ({
    nameAs,
    setNameAs,
    errorMessage,
    setVisible,
}) => {
    return (
        <View style={{zIndex: -10}}>
            <NormalForm
                label={'Name'}
                type={'Text'}
                placeholder={'Enter your Name'}
                pricePerDay={nameAs}
                setPricePerDay={setNameAs}
                marginTop={25}
                setVisible={setVisible}
            />
            {errorMessage.name_is == true && (
                <Text style={styles.errorMessage}>Please enter name</Text>
            )}
        </View>
    );
};

export const AddressLineFirst = ({
    firstAddress,
    setFirstAddress,
    errorMessage,
    setVisible,
}) => {
    return (
        <View style={{zIndex: -10}}>
            <NormalForm
                label={'Address Line 1'}
                type={'Text'}
                placeholder={'Address Line 1'}
                pricePerDay={firstAddress}
                setPricePerDay={setFirstAddress}
                marginTop={25}
                multiline={true}
                numberOfLines={3}
                setVisible={setVisible}
            />
            {errorMessage.first_address_is == true && (
                <Text style={styles.errorMessage}>
                    Please enter Address Line 1
                </Text>
            )}
        </View>
    );
};

export const AddressLineSecond = ({
    secondAddress,
    setSecondAddress,
    errorMessage,
    setVisible,
}) => {
    return (
        <View style={{zIndex: -10}}>
            <NormalForm
                label={'Address Line 2'}
                type={'Text'}
                placeholder={'Address Line 2'}
                pricePerDay={secondAddress}
                setPricePerDay={setSecondAddress}
                marginTop={25}
                setVisible={setVisible}
            />
            {errorMessage.second_address_is == true && (
                <Text style={styles.errorMessage}>
                    Please enter Address Line 2
                </Text>
            )}
        </View>
    );
};

export const StreetAndEmirates = ({
    street,
    setStreet,
    errorMessage,
    emirates,
    setEmirates,
    setEmiratesValue,
    visible,
    setVisible,
}) => {
    const Emirates = [
        {value: '10', label: 'Abu Dhabi'},
        {value: '20', label: 'Dubai'},
        {value: '30', label: 'Sharjah'},
        {value: '40', label: 'Ras Al Khaimah'},
        {value: '50', label: 'Ajman'},
        {value: '60', label: 'Umm Al Quwain'},
        {value: '70', label: 'Fujairah'},
    ];

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}>
            <View style={styles.inputBoxSub}>
                <Text allowFontScaling={false} style={styles.labelText}>
                    Street
                </Text>
                <View style={[styles.inputOption]}>
                    <TextInput
                        value={street}
                        placeholder="Enter"
                        placeholderTextColor={'#8E8E8E'}
                        onChangeText={v => {
                            setStreet(v);
                        }}
                        style={{
                            height: SIZE(46),
                            fontSize: SIZE(14),
                            fontFamily: FONTS.medium,
                            color: '#686868',
                        }}
                        onFocus={() => setVisible(false)}
                    />
                </View>
                {errorMessage.street_is == true && (
                    <Text style={styles.errorMessage}>Please Enter Street</Text>
                )}
            </View>
            <View
                style={[
                    styles.inputBoxSub,
                    {zIndex: 12, position: 'relative'},
                ]}>
                <Text allowFontScaling={false} style={styles.labelText}>
                    Emirates
                </Text>
                <TouchableOpacity
                    style={{width: '48%'}}
                    activeOpacity={0.8}
                    onPress={() => {
                        setVisible(!visible);
                    }}>
                    <View
                        style={[
                            styles.dropStyle,
                            {
                                borderBottomLeftRadius: visible ? 0 : SIZE(8),
                                borderBottomRightRadius: visible ? 0 : SIZE(8),
                            },
                        ]}>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZE(14),
                                color: '#686868',
                            }}>
                            {emirates || 'choose'}
                        </Text>
                        <View
                            style={{
                                width: SIZE(24),
                                height: SIZE(24),
                            }}>
                            {!visible ? (
                                <ArrowDown width={SIZE(20)} height={SIZE(20)} />
                            ) : (
                                <Arrow width={SIZE(20)} height={SIZE(20)} />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                {visible && (
                    <View style={[styles.flatList]}>
                        <FlatList
                            bounces={false}
                            data={Emirates}
                            style={{flex: 1}}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setEmiratesValue(item.value);
                                        setEmirates(item.label),
                                            setVisible(!visible);
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: SIZE(14),
                                            padding: SIZE(10),
                                            fontFamily: FONTS.medium,
                                            color: '#686868',
                                        }}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
                {errorMessage.emirates_is == true && (
                    <Text style={styles.errorMessage}>
                        Please select Emirates
                    </Text>
                )}
            </View>
        </View>
    );
};

const InputFields = ({description, setDescription, errorMessage}) => {
    return (
        <View style={styles.container}>
            <NormalForm
                label={'Features'}
                type={'Text'}
                placeholder={'Description'}
                multiline={true}
                numberOfLines={3}
                descriptionForm={true}
                description={description}
                setDescription={setDescription}
                marginTop={25}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: -10,
    },
    labelText: {
        fontFamily: FONTS.medium,
        fontSize: SIZE(16),
        color: '#686868',
        marginBottom: SIZE(8),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    inputBoxSub: {
        marginTop: SIZE(24),
        width: SIZES.width * 0.4,
    },
    dropStyle: {
        padding: SIZE(10),
        borderWidth: 1,
        borderTopLeftRadius: SIZE(8),
        borderTopRightRadius: SIZE(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#D3D3D3',
        width: SIZES.width * 0.4,
        backgroundColor: '#f7f7f7',
    },
    flatList: {
        borderWidth: SIZE(1),
        borderBottomLeftRadius: SIZE(8),
        borderBottomRightRadius: SIZE(8),
        borderBottomRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        borderColor: '#D3D3D3',
        width: SIZES.width * 0.4,
    },
    inputOption: {
        borderColor: '#D3D3D3',
        borderWidth: SIZE(1),
        paddingHorizontal: SIZE(16),
        borderRadius: SIZE(8),
        backgroundColor: '#f7f7f7',
    },
});

export default InputFields;
