import {StyleSheet, View} from 'react-native';
import React from 'react';

// packages
import Modal from 'react-native-modal';

// theme
import {SIZE, SIZES} from '../../../theme/theme';

const ModalBox = ({inner, isVisible, setVisible}) => {
    return (
        <Modal
            onBackButtonPress={() => {
                setVisible(false);
            }}
            onBackdropPress={() => {
                setVisible(false);
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
            <View style={styles.container}>{inner}</View>
        </Modal>
    );
};

export default ModalBox;

const styles = StyleSheet.create({
    modalContainer: {
        margin: 0,
        width: '100%',
        alignItems: 'center',
        marginTop: SIZE(30),
    },
    container: {
        backgroundColor: '#F7F7F7',
        borderRadius: SIZE(12),
        overflow: 'hidden',
    },
});
