import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import React, {useState} from 'react';

//constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

//images and logos
import CloseIcon from '../../../../../assets/icons/closedark.svg';

const CustomQuantity = ({
    setQuantityModal,
    quantity,
    setQuantity,
    setQty,
    cartCountChange,
    qtyList,
}) => {
    const handleTextChange = text => {
        const numericOnly = text.replace(/[^0-9]/g, '');
        setQuantity(numericOnly);
    };

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                style={{alignItems: 'flex-end'}}
                onPress={() => {
                    setQuantityModal(false);
                }}
                activeOpacity={0.8}
                hitSlop={10}>
                <CloseIcon width={SIZE(14)} height={SIZE(14)} />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.mainText}>
                Enter Quantity
            </Text>
            <TextInput
                allowFontScaling={false}
                keyboardType="numeric"
                style={styles.input}
                placeholder="Quantity"
                placeholderTextColor={'#8E8E8E'}
                maxLength={2}
                value={quantity}
                onChangeText={handleTextChange}
            />
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setQuantityModal(false);
                    }}
                    activeOpacity={0.8}
                    style={styles.leftButton}>
                    <Text allowFontScaling={false} style={styles.leftText}>
                        Cancel
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setQuantityModal(false);
                        setQty(quantity);
                        cartCountChange(
                            quantity,
                            qtyList[0].id,
                            qtyList[0].varId,
                        );
                    }}
                    activeOpacity={0.8}
                    style={[styles.rightButton]}>
                    <Text allowFontScaling={false} style={styles.rightText}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomQuantity;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: SIZE(12),
        width: SIZE(347),
        alignSelf: 'center',
        padding: SIZE(32),
    },
    mainText: {
        padding: 0,
        fontFamily: FONTS.bold,
        fontSize: SIZE(24),
        fontWeight: '600',
        color: '#242424',
        marginBottom: SIZE(20),
    },
    input: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '400',
        borderWidth: SIZE(1),
        height: SIZE(50),
        borderRadius: SIZE(12),
        paddingHorizontal: SIZE(20),
        paddingVertical: 0,
        borderColor: '#D3D3D3',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // flex: 1,
        marginTop: SIZE(24),
    },
    leftButton: {
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(12),
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        // width: '46%',
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
        flex: 1,
        backgroundColor: '#003459',
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
