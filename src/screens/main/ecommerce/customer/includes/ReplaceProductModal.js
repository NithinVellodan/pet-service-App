import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

//constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

//images and logos
import CloseIcon from '../../../../../assets/icons/closedark.svg';

const ReplaceProductModal = ({setReplaceModal, handlePressReplace}) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                onPress={() => {
                    setReplaceModal(false);
                }}
                style={{alignItems: 'flex-end'}}
                activeOpacity={0.8}
                hitSlop={10}>
                <CloseIcon width={SIZE(14)} height={SIZE(14)} />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.mainText}>
                Replace Cart Item{' '}
            </Text>
            <Text allowFontScaling={false} style={styles.middleText}>
                Your Cart contains items from Roberts Shop. Do you want to
                discard the Selection and add items from Carter Geidt’s Shop.{' '}
            </Text>
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setReplaceModal(false);
                    }}
                    activeOpacity={0.8}
                    style={styles.leftButton}>
                    <Text allowFontScaling={false} style={styles.leftText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handlePressReplace();
                        setReplaceModal(false);
                    }}
                    activeOpacity={0.8}
                    style={[styles.rightButton]}>
                    <Text allowFontScaling={false} style={styles.rightText}>
                        Replace
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ReplaceProductModal;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: SIZE(12),
        width: '100%',
        alignSelf: 'center',
        padding: SIZE(25),
    },
    mainText: {
        padding: 0,
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(22),
        fontWeight: '600',
        color: '#242424',
        marginBottom: SIZE(10),
        textAlign: 'center',
    },

    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftButton: {
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        borderRadius: SIZE(8),
        width: SIZE(153),
        paddingVertical: 10,
    },
    middleText: {
        padding: 0,
        fontFamily: FONTS.regular,
        fontSize: SIZE(16),
        fontWeight: '600',
        color: '#969696',
        marginBottom: SIZE(20),
        textAlign: 'center',
    },
    leftText: {
        color: '#009FD3',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    rightButton: {
        paddingVertical: SIZE(10),
        width: SIZE(153),
        alignItems: 'center',
        borderRadius: SIZE(8),
        backgroundColor: '#009FD3',
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
