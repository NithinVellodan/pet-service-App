import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const CardSplitInput = ({
    setExpiry,
    formatExpiry,
    expiryError,
    cvvError,
    expiry,
    setExpiryError,
}) => {
    return (
        <View>
            <View style={[styles.splitDetails]}>
                <View
                    style={[
                        styles.textInputMain,
                        {
                            flex: 1,
                            marginBottom:
                                cvvError || expiryError ? SIZE(0) : SIZE(24),
                        },
                    ]}>
                    <View style={styles.commonHeading}>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={styles.commonHeadingText}>
                                Expiry
                            </Text>
                        </View>
                    </View>

                    <View style={styles.inputSub}>
                        <TextInput
                            allowFontScaling={false}
                            keyboardType="numeric"
                            style={styles.textInput}
                            placeholder="06/2028"
                            placeholderTextColor={'#8E8E8E'}
                            maxLength={7}
                            onChangeText={text => {
                                setExpiry(formatExpiry(text));
                                setExpiryError('');
                            }}
                            value={expiry}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: cvvError || expiryError ? SIZE(24) : SIZE(0),
                }}>
                <View style={{width: '100%'}}>
                    {expiryError ? (
                        <Text style={styles.errorText}>{expiryError}</Text>
                    ) : null}
                </View>
                <View style={{width: '45%'}}>
                    {cvvError ? (
                        <Text style={styles.errorText}>{cvvError}</Text>
                    ) : null}
                </View>
            </View>
        </View>
    );
};

export default CardSplitInput;

const styles = StyleSheet.create({
    splitDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
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
    errorText: {
        color: 'red',
        fontWeight: '500',
        fontFamily: FONTS.medium,
        fontSize: SIZE(12),
    },
});
