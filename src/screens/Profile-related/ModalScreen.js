import {StyleSheet, Text, View, NativeModules, Platform} from 'react-native';
import React from 'react';

// theme
import {SIZE, SIZES} from '../../theme/theme';

// packages
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-notifications';

//constants
import {FONTS} from '../../theme/fonts';
import CustomToast from '../../components/toast/CustomToast';

const ModalScreen = ({
    inner,
    isVisible,
    setVisible,
    deleteModal,
    setDeleteModal,
    size,
    setSelectedCategoriesAddModal,
    toastRef,
    setEdit,
    setModalScreens,
    setUpdate,
    setAddService,
    setRefreshing,
}) => {
    const {StatusBarManager} = NativeModules;

    return (
        <Modal
            onBackButtonPress={() => {
                setSelectedCategoriesAddModal &&
                    setSelectedCategoriesAddModal([]);
                setEdit && setEdit(false);
                setUpdate && setUpdate(false);
                setAddService && setAddService(false);
                setModalScreens && setModalScreens('AddProfile');
                setRefreshing && setRefreshing(prev => !prev);
                setVisible(false);
                switch (deleteModal) {
                    case 'otp-verification':
                        setDeleteModal('delete-account');
                        break;

                    default:
                        break;
                }
            }}
            onBackdropPress={() => {
                setVisible(false);
                setEdit && setEdit(false);
                setUpdate && setUpdate(false);
                setAddService && setAddService(false);
                setModalScreens && setModalScreens('AddProfile');
                setRefreshing && setRefreshing(prev => !prev);
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
                {
                    marginTop: size
                        ? 0
                        : Platform.OS === 'ios'
                        ? StatusBarManager.HEIGHT +
                          SIZES.height * 0.009 -
                          SIZE(10)
                        : StatusBarManager.HEIGHT - SIZE(20),
                },
            ]}
            useNativeDriver={false}
            useNativeDriverForBackdrop={true}
            onSwipeComplete={() => {
                setVisible(false);
                setEdit && setEdit(false);
                setUpdate && setUpdate(false);
                setAddService && setAddService(false);
                setModalScreens && setModalScreens('AddProfile');
                setRefreshing && setRefreshing(prev => !prev);
            }}
            animationInTiming={200}
            animationOutTiming={200}>
            <View style={styles.container}>{inner}</View>
            <Toast
                renderToast={toastOptions => {
                    return <CustomToast toastOptions={toastOptions} />;
                }}
                successColor="#009FD3"
                warningColor="orange"
                ref={toastRef}
                duration={2000}
                offsetBottom={SIZE(100)}
            />
        </Modal>
    );
};

export default ModalScreen;

const styles = StyleSheet.create({
    modalContainer: {
        margin: 0,
        width: '100%',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#F7F7F7',
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        overflow: 'hidden',
        marginTop: SIZE(30),
    },
});
