import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FONTS} from '../../theme/fonts';
import {SIZE} from '../../theme/theme';
import {TextInput} from 'react-native';

const LongPriceForm = ({
    label,
    setField,
    field,
    setErrorMessage,
    placeholderText,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChangeText = text => {
        setErrorMessage && setErrorMessage({});
        const regex = /^(?!0\d)(?!.*\..*\..*)[0-9]*\.?[0-9]*$/;
        if (regex.test(text)) {
            setField(text);
        }
    };

    return (
        <View style={{marginTop: SIZE(24)}}>
            <View>
                <Text style={styles.labelText}>{label}</Text>
            </View>
            <View
                style={{
                    ...styles.inputBox,
                    borderColor: isFocused
                        ? '#009FD3'
                        : styles.inputBox.borderColor,
                }}>
                <TextInput
                    paddingVertical={Platform.OS === 'ios' ? SIZE(15) : null}
                    placeholderTextColor={'rgba(36, 36, 36, 0.5)'}
                    value={field}
                    placeholder={placeholderText}
                    onChangeText={handleChangeText}
                    inputMode="numeric"
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    style={[styles.textInputStyle]}
                />
            </View>
        </View>
    );
};

export default LongPriceForm;

const styles = StyleSheet.create({
    labelText: {
        fontFamily: FONTS.medium,
        fontSize: SIZE(16),
        color: '#686868',
        marginBottom: SIZE(8),
    },
    inputBox: {
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#D3D3D3',
        paddingHorizontal: SIZE(10),
        backgroundColor: '#f7f7f7',
    },
    textInputStyle: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#242424',
    },
});
