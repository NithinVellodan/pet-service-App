import React, {useContext} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';

// packages
import Modal from 'react-native-modal';
// svg
import CloseIcon from '../../assets/icons/close-icon-blue.svg';
import TickIcon from '../../assets/icons/tick-circle.svg';
// theme
import {SIZE, SIZES} from '../../theme/theme';
import {Context} from '../../contexts/Store';
import {FONTS} from '../../theme/fonts';

const AuthModal = ({
    inner,
    isVisible,
    setVisible,
    modalScreens,
    setModalScreens,
    requestType,
    setOnBack,
    prevModal,
    showToast,
}) => {
    const {state, dispatch} = useContext(Context);
    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };
    const renderToast = () => {
        return (
            <View style={styles.toastMain}>
                <View style={styles.toastSub}>
                    <View style={styles.toastTop}>
                        <View style={styles.toastTickIcon}>
                            <TickIcon width={'100%'} height={'100%'} />
                        </View>
                        <Text style={styles.toastTextOne}>Successful</Text>
                    </View>
                    <View style={styles.toastBottom}>
                        <Text style={styles.toastTextTwo}>
                            Please check your mail for OTP
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <Modal
            onBackButtonPress={() => {
                setVisible(false);
            }}
            onRequestClose={() => {
                if (requestType === 'open') {
                    setVisible(true);
                    setOnBack(false);
                    if (modalScreens === 'login') {
                        setOnBack(true);
                    } else if (modalScreens !== prevModal) {
                        setModalScreens(prevModal);
                    } else if (modalScreens === prevModal) {
                        if (modalScreens === 'sign-up') {
                            setModalScreens('login');
                        } else if (modalScreens === 'enter-password') {
                            setModalScreens('login');
                        } else if (modalScreens === 'forgot-password') {
                            setModalScreens('enter-password');
                        } else if (modalScreens === 'otp-verification') {
                            setModalScreens('forgot-password');
                        } else if (modalScreens === 'reset-password') {
                            setModalScreens('forgot-password');
                        }
                    }
                }
            }}
            isVisible={isVisible}
            backdropOpacity={0.4}
            deviceHeight={SIZES.height}
            style={[
                styles.modalContainer,
                {
                    screenBackgroundcolor: 'transparent',
                    modalPresentationStyle: 'overCurrentContext',
                },
            ]}
            useNativeDriver={false}
            useNativeDriverForBackdrop={true}
            onSwipeComplete={() => {
                setVisible(false);
            }}
            animationInTiming={200}
            animationOutTiming={200}>
            <ScrollView
                bounces={false}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {modalScreens !== 'terms-and-conditions' &&
                        modalScreens !== 'detail' && (
                            <TouchableOpacity
                                style={styles.buttonIcon}
                                onPress={() => {
                                    updateUserDate({
                                        ...state.userData,
                                        is_skip: true,
                                        name: '',
                                    });
                                }}>
                                <CloseIcon width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                        )}
                    {inner}
                    {showToast && renderToast()}
                </View>
            </ScrollView>
        </Modal>
    );
};

export default AuthModal;

const styles = StyleSheet.create({
    modalContainer: {
        margin: 0,
        width: '100%',
        justifyContent: 'flex-end',
        paddingTop: SIZE(30),
    },
    container: {
        backgroundColor: '#F7F7F7',
        width: '100%',
        height: SIZES.height - SIZE(30),
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
    },
    toastMain: {
        position: 'absolute',
        top: SIZE(152),
        left: SIZE(99),
        paddingLeft: SIZE(4),
        backgroundColor: '#009FD3',
        borderRadius: SIZE(16),
        width: SIZE(225),
    },
    toastSub: {
        paddingHorizontal: SIZE(24),
        paddingVertical: SIZE(8),
        backgroundColor: '#fff',
        borderRadius: SIZE(12),
        elevation: 10,
    },
    toastTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZE(9),
    },
    toastTickIcon: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(8),
    },
    toastTextOne: {
        color: '#3E3E53',
        fontSize: SIZE(14),
        fontWeight: FONTS.semiBold,
        fontWeight: '600',
    },
    toastBottom: {},
    toastTextTwo: {
        color: '#3E3E53',
        fontSize: SIZE(12),
        fontWeight: FONTS.regular,
        fontWeight: '400',
    },
});
