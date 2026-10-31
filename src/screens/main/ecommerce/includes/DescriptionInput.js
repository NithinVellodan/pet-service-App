import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const DescriptionInput = ({
    label,
    placeholder,
    margitop,
    description,
    setDescription,
    setError,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View
            style={{
                marginTop: margitop ? SIZE(margitop) : SIZE(24),
            }}>
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
                    placeholderTextColor={'#242424'}
                    maxLength={500}
                    style={styles.textInputStyle}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    multiline={true}
                    value={description}
                    onChangeText={text => {
                        setDescription(text);
                        setError({description: ''});
                    }}
                />
            </View>
        </View>
    );
};

export default DescriptionInput;

const styles = StyleSheet.create({
    labelText: {
        fontFamily: FONTS.medium,
        fontSize: SIZE(16),
        color: '#686868',
        marginBottom: SIZE(8),
    },
    inputBox: {
        borderWidth: 1,
        borderRadius: SIZE(8),
        borderColor: '#D3D3D3',
        paddingHorizontal: SIZE(16),
        justifyContent: 'space-between',
        backgroundColor: '#f7f7f7',
        height: SIZE(100),
    },
    textInputStyle: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#242424',
        paddingTop: SIZE(16),
        opacity: 0.5,
    },
});
