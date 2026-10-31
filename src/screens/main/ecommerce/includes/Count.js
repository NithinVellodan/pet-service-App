import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import Modal from 'react-native-modal';
import StockProvider from './StockProvider';

const Count = ({count, setCount}) => {
    const [quantityModal, setQuantityModal] = useState(false);

    const handleIncrement = () => {
        setCount(count + 1);
    };
    const handleType = stock => {
        setCount(stock);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    return (
        <View style={styles.container1}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleDecrement()}
                style={styles.button}>
                <Text allowFontScaling={false} style={styles.buttonText2}>
                    -
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setQuantityModal(true);
                }}
                style={styles.ChooseBoxCount}>
                <Text allowFontScaling={false} style={styles.countText}>
                    {count}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleIncrement()}
                style={styles.button}>
                <Text allowFontScaling={false} style={styles.buttonText2}>
                    +
                </Text>
            </TouchableOpacity>
            <Modal
                isVisible={quantityModal}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={{
                    margin: 0,
                    paddingHorizontal: SIZE(12),
                }}
                onBackdropPress={() => {
                    Keyboard.dismiss();
                    setQuantityModal(false);
                }}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <StockProvider
                    setQuantityModal={setQuantityModal}
                    setQuantity={setCount}
                    quantity={count}
                    handleType={handleType}
                />
            </Modal>
        </View>
    );
};

export default Count;

const styles = StyleSheet.create({
    container1: {
        // borderWidth: 1,
        // borderColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: SIZE(5),
        width: SIZE(30),
        height: SIZE(30),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText2: {
        color: '#000',
        fontSize: SIZE(16),
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
    },
    countText: {
        textAlign: 'center',
        color: '#242424',
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
    },
    ChooseBoxCount: {
        marginHorizontal: SIZE(10),
        borderWidth: SIZE(1),
        width: SIZE(30),
        height: SIZE(30),
        borderRadius: SIZE(4),
        borderColor: '#98C1D9',
        backgroundColor: '#EAF7FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
