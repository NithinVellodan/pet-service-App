import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// theme
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import NormalForm from '../../../components/forms/NormalForm';
import LongPriceForm from '../../../components/forms/LongPriceForm';

export const EnterInputPrice = ({
    pricePerDay,
    setPricePerDay,
    setErrorMessage,
}) => {
    return (
        <View style={{zIndex: -10}}>
            <LongPriceForm
                label={'Price Per Day'}
                setErrorMessage={setErrorMessage}
                setField={setPricePerDay}
                field={pricePerDay}
                placeholderText={'AED'}
            />
        </View>
    );
};

export const EnterInputPet = ({
    pricePerDay,
    setPricePerDay,
    setErrorMessage,
}) => {
    return (
        <View style={{zIndex: -10, overflow: 'scroll'}}>
            <NormalForm
                label={'Price Per Pet'}
                maxlength={15}
                type={'price'}
                placeholder={'AED'}
                pricePerDay={pricePerDay}
                setPricePerDay={setPricePerDay}
                marginTop={25}
                setErrorMessage={setErrorMessage}
            />
        </View>
    );
};

export const EnterInputName = ({
    nameAs,
    setNameAs,
    errorMessage,
    setErrorMessage,
}) => {
    return (
        <View style={{zIndex: -10}}>
            <NormalForm
                label={'Pet Name'}
                type={'Text'}
                placeholder={'Enter Pet Name'}
                pricePerDay={nameAs}
                setPricePerDay={setNameAs}
                marginTop={25}
                // setErrorMessage={setErrorMessage}
            />
            {errorMessage.name_is == true && (
                <Text style={styles.errorMessage}>Please enter name</Text>
            )}
        </View>
    );
};

const EnterInput = ({
    description,
    setDescription,
    errorMessage,
    setErrorMessage,
}) => {
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
                setErrorMessage={setErrorMessage}
            />
            {errorMessage.description_is == true && (
                <Text style={styles.errorMessage}>Please enter Features</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: -10,
    },
    labelText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.medium,
        marginBottom: SIZE(10),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});

export default EnterInput;
