import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    View,
} from 'react-native';
import React, {useState} from 'react';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

//components
import TwoButton from '../main/ecommerce/includes/TwoButton';

//images and logos
import ArrowDown from '../../assets/icons/ecommerce/customer/arrow-down.svg';
import ArrowUp from '../../assets/icons/ecommerce/customer/arrow-up.svg';

const OrderFilterEco = ({
    setSelectedOrderPass,
    setSelectedTimePass,
    filterModal,
    clearFilter,
    setIsFilterActive,
}) => {
    const [showOrderItem, setShowOrderItem] = useState(true);
    const [showOrderTime, setShowOrderTime] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [data, setData] = useState([
        {id: 1, name: 'Placed', value: 10},
        {id: 2, name: 'On the way', value: 30},
        {id: 3, name: 'Delivered', value: 40},
        {id: 4, name: 'Cancelled', value: 50},
    ]);
    const [days, setdays] = useState([
        {id: 1, name: 'Last 30 days', value: 'within_month'},
        {id: 2, name: 'Last 2 months', value: 'last_2_months'},
        {id: 3, name: 'Last 6 months', value: 'last_6_months'},
        {id: 4, name: 2024, value: '2024'},
    ]);

    return (
        <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.headingContainer}>
                    <Text allowFontScaling={false} style={styles.filterText}>
                        Filters
                    </Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.head}>
                        <Text style={styles.items}>Order Status</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                setShowOrderItem(!showOrderItem);
                            }}>
                            {showOrderItem ? (
                                <ArrowDown width={SIZE(20)} height={SIZE(20)} />
                            ) : (
                                <ArrowUp width={SIZE(20)} height={SIZE(20)} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {showOrderItem && (
                        <View style={styles.bottomcontain}>
                            {data.map(item => (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (
                                            selectedOrder.some(
                                                selectedItem =>
                                                    selectedItem.id === item.id,
                                            )
                                        ) {
                                            setSelectedOrder(
                                                selectedOrder.filter(
                                                    selectedItem =>
                                                        selectedItem.id !==
                                                        item.id,
                                                ),
                                            );
                                        } else {
                                            setSelectedOrder([
                                                ...selectedOrder,
                                                item,
                                            ]);
                                        }
                                    }}
                                    activeOpacity={0.8}
                                    key={item.id}
                                    style={[
                                        styles.itemSub,
                                        {
                                            borderColor: selectedOrder.some(
                                                selectedItem =>
                                                    selectedItem.id === item.id,
                                            )
                                                ? '#98C1D9'
                                                : '#E2E2E2',
                                            backgroundColor: selectedOrder.some(
                                                selectedItem =>
                                                    selectedItem.id === item.id,
                                            )
                                                ? '#EAF7FF'
                                                : '#FFF',
                                        },
                                    ]}>
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.itemSubText,
                                            {
                                                color: selectedOrder.some(
                                                    selectedItem =>
                                                        selectedItem.id ===
                                                        item.id,
                                                )
                                                    ? '#009FD3'
                                                    : '#242424',
                                            },
                                        ]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                {/* second */}
                <View style={styles.container}>
                    <View style={styles.head}>
                        <Text style={styles.items}>Order Time</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                setShowOrderTime(!showOrderTime);
                            }}>
                            {showOrderTime ? (
                                <ArrowDown width={SIZE(20)} height={SIZE(20)} />
                            ) : (
                                <ArrowUp width={SIZE(20)} height={SIZE(20)} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {showOrderTime && (
                        <View style={styles.bottomcontain}>
                            {days.map(item => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedTime(item);
                                    }}
                                    activeOpacity={0.8}
                                    key={item.id}
                                    style={[
                                        styles.itemSub,
                                        {
                                            borderColor:
                                                selectedTime.id === item.id
                                                    ? '#98C1D9'
                                                    : '#E2E2E2',
                                            backgroundColor:
                                                selectedTime.id === item.id
                                                    ? '#EAF7FF'
                                                    : '#FFF',
                                        },
                                    ]}>
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.itemSubText,
                                            {
                                                color:
                                                    selectedTime.id === item.id
                                                        ? '#009FD3'
                                                        : '#242424',
                                            },
                                        ]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                <View style={styles.buttom}>
                    <TwoButton
                        leftText={'Cancel'}
                        onPressL={() => {
                            filterModal();
                            clearFilter();
                        }}
                        rightText={'Apply'}
                        onPressR={() => {
                            setSelectedOrderPass(selectedOrder);
                            setSelectedTimePass(selectedTime);
                            filterModal();
                            setIsFilterActive && setIsFilterActive(true);
                        }}
                        providerColor={true}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default OrderFilterEco;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: SIZE(32),
        paddingTop: SIZE(10),
        backgroundColor: '#F7F7F7',
        width: SIZES.width,
    },
    subContainer: {
        flex: 1,
        paddingBottom: SIZE(20),
    },
    headingContainer: {
        paddingBottom: SIZE(13),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
        marginBottom: SIZE(24),
    },
    filterText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    container: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        padding: SIZE(16),
        backgroundColor: '#FFFFFF',
        marginBottom: SIZE(16),
    },
    items: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        color: '#242424',
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomcontain: {
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        marginTop: SIZE(16),
        paddingTop: SIZE(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: SIZE(16),
    },
    itemSub: {
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(8),
        alignItems: 'center',
        justifyContent: 'center',
        width: '46%',
    },
    itemSubText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    itemyear: {
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(8),
        alignItems: 'center',
        justifyContent: 'center',
        width: '27%',
    },
    buttom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
