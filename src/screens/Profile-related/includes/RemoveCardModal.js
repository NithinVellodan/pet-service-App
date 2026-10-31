import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
//images and logos
import CloseIcon from '../../../assets/icons/modalclose.svg';
import CloseIconDark from '../../../assets/icons/closedark.svg';
import TrashIcon from '../../../assets/icons/profile-icons/trashbig.svg';

const RemoveCardModal = ({setRemoveModal, state, removeCard, fromAddress}) => {
    return (
        <View style={styles.container}>
            <View>
                <View>
                    <TouchableOpacity
                        hitSlop={10}
                        onPress={() => {
                            setRemoveModal(false);
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
                        <Text
                            allowFontScaling={false}
                            style={styles.headingText}>
                            {fromAddress ? 'Remove Address' : 'Remove Card'}
                        </Text>
                    </View>
                </View>
                <View style={styles.trashContainer}>
                    <TrashIcon width={'100%'} height={'100%'} />
                </View>
                <Text style={styles.sureText}>
                    Are you Sure you want to Remove?
                </Text>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setRemoveModal(false);
                        }}
                        activeOpacity={0.8}
                        style={styles.leftButton}>
                        <Text allowFontScaling={false} style={styles.leftText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            removeCard();
                            setRemoveModal(false);
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.rightButton,
                            {
                                backgroundColor: !state?.userData?.is_service
                                    ? '#009FD3'
                                    : '#003459',
                            },
                        ]}>
                        <Text allowFontScaling={false} style={styles.rightText}>
                            Remove
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default RemoveCardModal;

const styles = StyleSheet.create({
    container: {
        padding: SIZE(32),
        backgroundColor: '#fff',
        borderRadius: SIZE(12),
    },
    closeIcon: {
        width: SIZE(15),
        height: SIZE(15),
        alignSelf: 'flex-end',
    },
    heading: {
        alignItems: 'center',
    },
    headingText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    trashContainer: {
        width: SIZE(120),
        height: SIZE(120),
        alignSelf: 'center',
        marginVertical: SIZE(24),
    },
    sureText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontWeight: '500',
        fontFamily: FONTS.medium,
        textAlign: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // flex: 1,
        marginTop: SIZE(24),
    },
    leftButton: {
        // paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(10),
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
        paddingVertical: SIZE(10),
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
