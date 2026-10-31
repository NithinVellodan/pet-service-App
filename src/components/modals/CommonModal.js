import {StyleSheet, View} from 'react-native';
import React from 'react';
// theme
import {SIZE, SIZES} from '../../theme/theme';
// packages
import Modal from 'react-native-modal';

const CommonModal = ({inner, isVisible, setVisible, currentScreen}) => {
    return (
        <Modal
            onBackButtonPress={() => {
                if (currentScreen === 'success-page') {
                    return;
                } else {
                    setVisible(false);
                }
            }}
            onBackdropPress={() => {
                if (currentScreen === 'success-page') {
                    return;
                } else {
                    setVisible(false);
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
                if (currentScreen === 'success-page') {
                    return;
                } else {
                    setVisible(false);
                }
            }}
            animationInTiming={200}
            animationOutTiming={200}>
            <View style={styles.container}>{inner}</View>
        </Modal>
    );
};

export default CommonModal;

const styles = StyleSheet.create({
    modalContainer: {
        margin: 0,
        width: '100%',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
        width: SIZES.width - SIZE(80),
        borderRadius: SIZE(12),
        overflow: 'hidden',
    },
});
