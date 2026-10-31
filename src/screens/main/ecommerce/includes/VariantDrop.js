import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
// Icons
import ArrowDown from '../../../../assets/icons/arrow_down.svg';
import ArrowUp from '../../../../assets/icons/arrow-up.svg';
import RemoveOption from '../../../../assets/icons/profile-icons/trashdark.svg';
import DisableIcon from '../../../../assets/icons/battery-disable.svg';
import TickDark from '../../../../assets/icons/tick_dark.svg';
import Modal from 'react-native-modal';
import StockProvider from './StockProvider';

const VariantDrop = ({
    item,
    count,
    setVariant,
    removePress,
    setError,
    varient,
    index,
    edi_vareint,
    enablePress,
}) => {
    const [showItem, setShowItem] = useState(false);
    const [enable, setenable] = useState(item.is_enabled);
    const [quantityModal, setQuantityModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        const updatedVariants = varient.map(variant =>
            variant.id === item.id ? {...variant, stock: count + 1} : variant,
        );
        setVariant(updatedVariants);
    };

    const handleType = stock => {
        const updatedVariants = varient.map(variant =>
            variant.id === item.id ? {...variant, stock: stock} : variant,
        );
        setVariant(updatedVariants);
    };
    const handleDecrement = () => {
        if (count > 0) {
            const updatedVariants = varient.map(variant =>
                variant.id === item.id
                    ? {...variant, stock: count - 1}
                    : variant,
            );
            setVariant(updatedVariants);
        }
    };
    const setPrice = text => {
        const updatedVariants = varient.map(variant =>
            variant.id === item.id ? {...variant, price: text} : variant,
        );
        setVariant(updatedVariants);
    };
    const setProductSize = text => {
        const updatedVariants = varient.map(variant =>
            variant.id === item.id ? {...variant, unit_name: text} : variant,
        );
        setVariant(updatedVariants);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    setShowItem(!showItem);
                }}
                style={styles.head}>
                <Text style={styles.items}>
                    {item?.name ? item?.name : `Variant`}
                </Text>
                <View>
                    {showItem ? (
                        <ArrowUp width={SIZE(20)} height={SIZE(20)} />
                    ) : (
                        <ArrowDown width={SIZE(20)} height={SIZE(20)} />
                    )}
                </View>
            </TouchableOpacity>
            {showItem && (
                <>
                    <View style={styles.bottomContain}>
                        <View style={{marginTop: SIZE(16)}}>
                            <Text style={styles.lableText}>Unit Name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => {
                                    setProductSize(text);
                                    setError('');
                                }}
                                value={item?.unit_name}
                                placeholder="Enter"
                                placeholderTextColor={'#8E8E8E'}
                            />
                        </View>
                        <View style={{marginTop: SIZE(16)}}>
                            <Text style={styles.lableText}>Price</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => {
                                    const regexPattern = /^\d*\.?\d*$/;
                                    if (
                                        text === '' ||
                                        (text !== '0' &&
                                            text.match(regexPattern))
                                    ) {
                                        setPrice(text);
                                    }

                                    setError('');
                                }}
                                value={`${item?.price}`}
                                placeholder="Enter"
                                placeholderTextColor={'#8E8E8E'}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.counterContainer}>
                            <Text style={styles.labelText}>
                                {edi_vareint ? 'Stock' : 'Initial Stock'}
                            </Text>
                            <View style={styles.container1}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        handleDecrement();
                                        setError('');
                                    }}
                                    style={styles.button}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.buttonText2}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setQuantityModal(true);
                                    }}
                                    style={styles.ChooseBoxCount}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.countText}>
                                        {count}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        handleIncrement();
                                        setError('');
                                    }}
                                    style={styles.button}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.buttonText2}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {edi_vareint ? (
                            <>
                                {item.is_enabled ? (
                                    <>
                                        {varient.length > 1 && (
                                            <TouchableOpacity
                                                hitSlop={10}
                                                onPress={() => {
                                                    setenable(false);
                                                    removePress &&
                                                        removePress();
                                                }}
                                                activeOpacity={0.8}
                                                style={styles.bottom}>
                                                {enable ? (
                                                    <>
                                                        <DisableIcon
                                                            width={SIZE(16)}
                                                            height={SIZE(16)}
                                                        />
                                                        <Text
                                                            style={
                                                                styles.bottomText
                                                            }>
                                                            Disable
                                                        </Text>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TickDark
                                                            width={SIZE(16)}
                                                            height={SIZE(16)}
                                                        />
                                                        <Text
                                                            style={
                                                                styles.bottomText
                                                            }>
                                                            Disabled
                                                        </Text>
                                                    </>
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    </>
                                ) : (
                                    <TouchableOpacity
                                        disabled={enable}
                                        hitSlop={10}
                                        onPress={() => {
                                            setenable(true);
                                            enablePress && enablePress();
                                        }}
                                        activeOpacity={0.8}
                                        style={styles.bottom}>
                                        {enable ? (
                                            <>
                                                <TickDark
                                                    width={SIZE(16)}
                                                    height={SIZE(16)}
                                                />
                                                <Text style={styles.bottomText}>
                                                    Enabled
                                                </Text>
                                            </>
                                        ) : (
                                            <>
                                                <DisableIcon
                                                    width={SIZE(16)}
                                                    height={SIZE(16)}
                                                />
                                                <Text style={styles.bottomText}>
                                                    Enable
                                                </Text>
                                            </>
                                        )}
                                    </TouchableOpacity>
                                )}
                            </>
                        ) : (
                            <TouchableOpacity
                                hitSlop={10}
                                onPress={() => {
                                    removePress && removePress();
                                }}
                                activeOpacity={0.8}
                                style={styles.bottom}>
                                <RemoveOption
                                    width={SIZE(16)}
                                    height={SIZE(16)}
                                />
                                <Text style={styles.bottomText}>Remove</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </>
            )}
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
                    setQuantity={setQuantity}
                    quantity={quantity}
                    handleType={handleType}
                />
            </Modal>
        </View>
    );
};

export default VariantDrop;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        padding: SIZE(16),
        backgroundColor: '#FFFFFF',
        marginTop: SIZE(24),
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    items: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(17),
    },
    bottomContain: {
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        marginTop: SIZE(10),
    },
    lableText: {
        color: '#686868',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
    },
    input: {
        borderWidth: SIZE(1),
        borderColor: '#EDEDED',
        paddingHorizontal: SIZE(16),
        borderRadius: SIZE(6),
        height: SIZE(50),
        marginTop: SIZE(8),
        backgroundColor: '#F7F7F7',
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
    },
    counterContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZE(10),
        marginTop: SIZE(24),
    },
    labelText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.medium,
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: SIZE(16),
    },
    bottomText: {
        marginLeft: SIZE(8),
        color: '#003459',
        fontSize: SIZE(12),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(15),
    },
    container1: {
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
