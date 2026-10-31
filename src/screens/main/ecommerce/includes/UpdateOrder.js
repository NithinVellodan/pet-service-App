import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SIZE} from '../../../../theme/theme';
import ArrowDown from '../../../../assets/icons/ecommerce/customer/arrow-down.svg';
import ArrowUp from '../../../../assets/icons/ecommerce/customer/arrow-up.svg';
import TickDark from '../../../../assets/icons/tick_dark.svg';
import TickIcon from '../../../../assets/icons/tick-icon.svg';
import {FONTS} from '../../../../theme/fonts';

const UpdateOrder = ({status, setShippingModal, deliverOrder}) => {
    const [showItem, setShowItem] = useState(true);
    const [checkPlacedTick, setCheckPlacedTick] = useState(
        status === 'Order Accepted' ||
            status === 'Order Shipped' ||
            status === 'Order Delivered'
            ? true
            : false,
    );
    const [checkPlaced, setCheckPlaced] = useState(
        status === 'Order Accepted' ||
            status === 'Order Shipped' ||
            status === 'Order Delivered'
            ? true
            : false,
    );

    const [checkDispatched, setCheckDispatched] = useState(
        status === 'Order Shipped' || status === 'Order Delivered'
            ? true
            : false,
    );
    const [checkDispatchedTick, setCheckDispatchedTick] = useState(
        status === 'Order Shipped' || status === 'Order Delivered'
            ? true
            : false,
    );

    const [checkDelivered, setCheckDelivered] = useState(
        status === 'Order Delivered' ? true : false,
    );
    const [checkDeliveredTick, setCheckDeliveredTick] = useState(
        status === 'Order Delivered' ? true : false,
    );

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.items}>Update Order</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setShowItem(!showItem);
                    }}>
                    {showItem ? (
                        <ArrowDown width={SIZE(20)} height={SIZE(20)} />
                    ) : (
                        <ArrowUp width={SIZE(20)} height={SIZE(20)} />
                    )}
                </TouchableOpacity>
            </View>
            {showItem && (
                <View style={{marginTop: SIZE(16)}}>
                    <View style={styles.OrderContainer}>
                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity
                                disabled={checkPlaced}
                                activeOpacity={0.8}
                                onPress={() => {}}
                                style={[
                                    styles.checkbox,
                                    checkPlaced && styles.checked,
                                ]}>
                                <TickIcon width={10} height={10} />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.updateStatus}>
                                    Order Placed
                                </Text>
                                <Text style={styles.dateStatus}>
                                    Jan 22, 2024
                                </Text>
                            </View>
                        </View>
                        {checkPlacedTick ? (
                            <View style={styles.tickBoxContainer}>
                                <View>
                                    <TickDark
                                        width={SIZE(16)}
                                        height={SIZE(16)}
                                    />
                                </View>
                                <Text style={styles.saveText}>Saved</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.tickBoxContainer}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setCheckPlacedTick(true);
                                }}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* Product Dispatched */}
                    <View style={styles.OrderContainer}>
                        <View
                            style={[
                                styles.checkboxContainer,
                                {marginVertical: SIZE(24)},
                            ]}>
                            <TouchableOpacity
                                disabled={checkDispatched}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setShippingModal(true);
                                }}
                                style={[
                                    styles.checkbox,
                                    checkDispatched && styles.checked,
                                ]}>
                                <TickIcon width={10} height={10} />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.updateStatus}>
                                    Product Dispatched
                                </Text>
                                <Text style={styles.dateStatus}>
                                    Jan 22, 2024
                                </Text>
                            </View>
                        </View>
                        {checkDispatchedTick ? (
                            <View style={styles.tickBoxContainer}>
                                <View>
                                    <TickDark
                                        width={SIZE(16)}
                                        height={SIZE(16)}
                                    />
                                </View>
                                <Text style={styles.saveText}>Saved</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.tickBoxContainer}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setShippingModal(true);
                                }}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.OrderContainer}>
                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity
                                disabled={!checkDispatchedTick}
                                onPress={() => {
                                    if (!checkDeliveredTick) {
                                        setCheckDelivered(prev => !prev);
                                    }
                                }}
                                style={[
                                    styles.checkbox,
                                    checkDelivered && styles.checked,
                                ]}>
                                <TickIcon width={10} height={10} />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.updateStatus}>
                                    Product Delivered
                                </Text>
                                <Text style={styles.dateStatus}>
                                    Jan 22, 2024
                                </Text>
                            </View>
                        </View>
                        {checkDeliveredTick ? (
                            <View style={styles.tickBoxContainer}>
                                <View>
                                    <TickDark
                                        width={SIZE(16)}
                                        height={SIZE(16)}
                                    />
                                </View>
                                <Text style={styles.saveText}>Saved</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.tickBoxContainer}
                                activeOpacity={0.8}
                                disabled={!checkDispatchedTick}
                                onPress={() => {
                                    if (checkDelivered) {
                                        setCheckDeliveredTick(true);
                                        setCheckDelivered(true);
                                        deliverOrder();
                                    }
                                }}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

export default UpdateOrder;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        padding: SIZE(16),
        backgroundColor: '#FFFFFF',
        marginBottom: SIZE(16),
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: SIZE(16),
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
    },
    items: {
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(17.5),
        color: '#969696',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: SIZE(10),
    },
    checkbox: {
        width: SIZE(20),
        height: SIZE(20),
        borderWidth: SIZE(1),
        borderColor: '#969696',
        borderRadius: SIZE(5),
        marginRight: SIZE(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checked: {
        backgroundColor: '#2A85FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateStatus: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        lineHeight: SIZE(17.5),
    },
    dateStatus: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
    },
    OrderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tickBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    saveText: {
        marginLeft: SIZE(8),
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
