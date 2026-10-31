import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';

//images and logos
import CloseIcon from '../../../assets/icons/close-icon-blue.svg';

const ShakeInfoModal = ({setShakeInfoModal}) => {
    const {state, dispatch} = useContext(Context);
    const updateUserData = () => {
        dispatch({
            type: 'UPDATE_MODAL_SECTION',
            commonModal: {
                ...state.commonModal,
                shakeInfoModal: false,
            },
        });
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonIcon}
                onPress={() => {
                    setShakeInfoModal(false);
                    updateUserData();
                }}>
                <CloseIcon width={'100%'} height={'100%'} />
            </TouchableOpacity>
            <View style={{marginBottom: SIZE(15)}}>
                <Text style={styles.textHed}>Shake for support</Text>
                <Text style={styles.textSub}>
                    Get instant help navigating the app or reporting bugs with
                    our "Shake for Support" feature. Just shake your phone, and
                    our dedicated support team will assist you promptly.
                </Text>
            </View>
            <TouchableOpacity
                style={styles.postButton}
                activeOpacity={0.8}
                onPress={() => {
                    setShakeInfoModal(false);
                    updateUserData();
                }}>
                <Text allowFontScaling={false} style={styles.postButtonText}>
                    Go Back and Shake Phone
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ShakeInfoModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        // width: '100%',
        width: '95%',
        // height: '66%',
        borderRadius: SIZE(12),
        padding: SIZE(30),
        alignItems: 'center',
    },
    textHed: {
        textAlign: 'center',
        color: '#242424',
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
    },
    textSub: {
        fontSize: SIZE(16),
        color: '#969696',
        textAlign: 'center',
        fontFamily: FONTS.medium,
        marginTop: SIZE(16),
        fontWeight: '500',
    },
    postButton: {
        marginTop: SIZE(24),
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
        alignItems: 'center',
        width: '100%',
        height: SIZE(42),
        justifyContent: 'center',
    },
    postButtonText: {
        color: '#FFFFFF',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        position: 'absolute',
        right: 0,
        top: 0,
    },
});
