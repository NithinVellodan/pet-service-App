import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    View,
    Text,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';

//packages
import {useFocusEffect, useNavigation} from '@react-navigation/native';

//constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';
import {
    EcommerceServiceProviderDonatedProductOrders,
    EcommerceServiceProviderOrdersList,
} from '../../../EcommerceApiSection';
import {Context} from '../../../../../contexts/Store';

//components
import Headers from '../../../../includes/headers/Headers';
import OrdersList from '../../includes/OrdersList';
import ModalScreen from '../../../../Profile-related/ModalScreen';
import OrderDonateList from '../../includes/OrderDonateList';
import OrderFilterEco from '../../../../filter/OrderFilterEco';

//images and logos
import SpotLightLogo from '../../../../../assets/icons/emptyplace.svg';
import CloseIcon from '../../../../../assets/icons/close-icon-blue.svg';

const OrdersStore = () => {
    const {state, dispatch} = useContext(Context);

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterItemSelected, setFilterItemSelected] = useState(0);
    const [select, setSelect] = useState({id: 1, type: 'order'});
    const [isFilter, setIsFilter] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);

    const filterModal = () => {
        setIsFilter(!isFilter);
    };
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    const clearFilter = () => {
        setSelectedOrder('');
        setSelectedTime('');
        setIsFilterActive(false);
    };

    const [orders, setOrders] = useState([]);
    const [donates, setDonates] = useState([]);
    EcommerceServiceProviderOrdersList(
        setOrders,
        refreshing,
        selectedOrder,
        selectedTime,
        searchQuery,
    );

    EcommerceServiceProviderDonatedProductOrders(
        setDonates,
        refreshing,
        searchQuery,
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const updateUserData = () => {
        dispatch({
            type: 'UPDATE_READ_SECTION',
            readSection: {
                ...state.readSection,
                un_read_booking_ecom_provider: false,
            },
        });
    };

    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                updateUserData();
                setRefreshing(prev => !prev);
                setRefreshing(false);
            }, 500);
            return () => {};
        }, []),
    );
    return (
        <View>
            <Headers
                headText={'Orders'}
                icon={true}
                searchCommerce={true}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                onPressSearch={() => {
                    setIsSearch(true);
                }}
                setSearchQuery={setSearchQuery}
                filter={true}
                onPressFilter={() => {
                    console.log('filterPress');
                }}
                filterItemSelected={filterItemSelected}
                setFilterItemSelected={setFilterItemSelected}
                filterModal={filterModal}
                isFilterActive={isFilterActive}
                onPressClearData={clearFilter}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                refreshControl={
                    <RefreshControl
                        colors={['#003459']}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={styles.container}>
                <View style={styles.selectBox}>
                    <TouchableOpacity
                        onPress={() => setSelect({id: 1, type: 'order'})}
                        style={[
                            styles.selectItem,
                            {
                                backgroundColor:
                                    select.type === 'order'
                                        ? '#003459'
                                        : '#FFFFFF',
                            },
                        ]}>
                        <Text
                            style={[
                                styles.selectItemText,
                                {
                                    color:
                                        select.type === 'order'
                                            ? '#FFFFFF'
                                            : '#242424',
                                    fontFamily:
                                        select.type === 'order'
                                            ? FONTS.semiBold
                                            : FONTS.regular,
                                },
                            ]}>
                            Orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelect({id: 1, type: 'orderDonate'})}
                        style={[
                            styles.selectItem,
                            {
                                backgroundColor:
                                    select.type === 'orderDonate'
                                        ? '#003459'
                                        : '#FFFFFF',
                            },
                        ]}>
                        <Text
                            style={[
                                styles.selectItemText,
                                {
                                    color:
                                        select.type === 'orderDonate'
                                            ? '#FFFFFF'
                                            : '#242424',
                                    fontFamily:
                                        select.type === 'orderDonate'
                                            ? FONTS.semiBold
                                            : FONTS.regular,
                                },
                            ]}>
                            Donated Products
                        </Text>
                    </TouchableOpacity>
                </View>
                {select.type === 'order' ? (
                    <>
                        <>
                            {orders.length < 1 ? (
                                <View style={styles.spotlightMain}>
                                    <View style={styles.spotlight}>
                                        <SpotLightLogo
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </View>
                                    <View style={styles.bottom}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.mainText}>
                                            No Orders Available
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                <>
                                    {orders.map((item, index) => (
                                        <OrdersList
                                            key={index}
                                            order={item}
                                            orderPress={() => {
                                                console.log(
                                                    item.id,
                                                    'order single',
                                                );
                                                navigation.navigate(
                                                    'OrderDetails',
                                                    {
                                                        order: item,
                                                    },
                                                );
                                            }}
                                        />
                                    ))}
                                </>
                            )}
                        </>
                    </>
                ) : (
                    select.type === 'orderDonate' && (
                        <>
                            <>
                                {donates.length < 1 ? (
                                    <View style={styles.spotlightMain}>
                                        <View style={styles.spotlight}>
                                            <SpotLightLogo
                                                width={'100%'}
                                                height={'100%'}
                                            />
                                        </View>
                                        <View style={styles.bottom}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.mainText}>
                                                No Donate Orders Available
                                            </Text>
                                        </View>
                                    </View>
                                ) : (
                                    <>
                                        {donates.map((item, index) => (
                                            <OrderDonateList
                                                key={index}
                                                donate={item}
                                                donatePress={() => {
                                                    console.log(
                                                        item.id,
                                                        'donate single',
                                                    );
                                                    navigation.navigate(
                                                        'DonateSummary',
                                                        {
                                                            donate: item.id,
                                                        },
                                                    );
                                                }}
                                            />
                                        ))}
                                    </>
                                )}
                            </>
                        </>
                    )
                )}
            </ScrollView>
            <ModalScreen
                isVisible={isFilter}
                setVisible={setIsFilter}
                inner={
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                filterModal();
                                clearFilter();
                            }}
                            hitSlop={SIZE(5)}
                            style={{
                                position: 'absolute',
                                top: SIZE(20),
                                right: SIZE(20),
                                zIndex: 100,
                            }}>
                            <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                        </TouchableOpacity>
                        <View style={{marginTop: SIZE(40)}}></View>
                        <OrderFilterEco
                            filterPage={filterModal}
                            selectedOrderPass={selectedOrder}
                            setSelectedOrderPass={setSelectedOrder}
                            selectedTimePass={selectedTime}
                            setSelectedTimePass={setSelectedTime}
                            filterModal={filterModal}
                            clearFilter={clearFilter}
                            setIsFilterActive={setIsFilterActive}
                        />
                    </>
                }
            />
        </View>
    );
};

export default OrdersStore;

const styles = StyleSheet.create({
    container: {
        paddingTop: SIZE(24),
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(80),
    },
    selectBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: SIZE(8),
        padding: SIZE(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZE(16),
    },
    selectItem: {
        width: '50%',
        borderRadius: SIZE(6),
        padding: SIZE(10),
    },
    selectItemText: {
        fontSize: SIZE(16),
        lineHeight: SIZE(20),
        textAlign: 'center',
    },
    spotlightMain: {
        flex: 1,
        marginTop: SIZE(80),
        alignItems: 'center',
        justifyContent: 'center',
    },
    spotlight: {
        width: SIZE(300),
        height: SIZE(300),
        marginBottom: SIZE(32),
    },
    mainText: {
        color: '#000',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: SIZE(12),
    },
});
