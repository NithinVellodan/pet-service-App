import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useContext} from 'react';

//packages
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {format} from 'date-fns';

//components
import Headers from '../../../includes/headers/Headers';
import EmptyPageCustomer from '../includes/EmptyPageCustomer';
import ShopsAndDonated from '../includes/ShopsAndDonated';
import OrderFilterSection from './includes/OrderFilterSection';
import ModalScreen from '../../../Profile-related/ModalScreen';

//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {Context} from '../../../../contexts/Store';
import {
    EcommerceApiProductDonationOrder,
    EcommerceApiProductOrderList,
} from '../../EcommerceCustomerApi';

//svg
import EmptyOrder from '../../../../assets/icons/empty-page/order-null.svg';
import RightArrow from '../../../../assets/icons/arrow-right-black.svg';

const OrderCustomer = ({route}) => {
    const {state, dispatch} = useContext(Context);
    const navigation = useNavigation();

    //states
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterItemSelected, setFilterItemSelected] = useState(0);
    const [isFilter, setIsFilter] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('shops');
    const [orderData, setOrderData] = useState([]);
    const [orderData1, setOrderData1] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);
    const [orderTime, setOrderTime] = useState('');
    const [isFilterActive, setIsFilterActive] = useState(false);

    //api connection functions
    if (selectedCategory == 'shops' && state?.userData?.is_login) {
        EcommerceApiProductOrderList(
            setOrderData,
            refreshing,
            orderStatus,
            orderTime,
            searchQuery,
            selectedCategory,
            setIsLoading,
        );
    } else if (state?.userData?.is_login) {
        EcommerceApiProductDonationOrder(
            setOrderData,
            refreshing,
            orderStatus,
            orderTime,
            searchQuery,
            selectedCategory,
            setIsLoading,
        );
    } else {
    }

    const updateUserData = () => {
        dispatch({
            type: 'UPDATE_READ_SECTION',
            readSection: {
                ...state.readSection,
                un_read_booking_ecom_customer: false,
            },
        });
    };

    useFocusEffect(
        useCallback(() => {
            updateUserData();
            setRefreshing(prev => !prev);
            setTimeout(() => {
                setRefreshing(false);
            }, 500);
            return () => {};
        }, []),
    );

    //filter modal open function
    const filterModal = () => {
        setIsFilter(!isFilter);
    };

    // clear filter function
    const clearFilterData = () => {
        setIsFilterActive(false);
        setOrderStatus([]);
        setOrderTime('');
    };

    //render item function
    const renderItem = ({item, index}) => (
        <TouchableOpacity
            onPress={() => {
                if (selectedCategory === 'shops') {
                    navigation.navigate('OrderDetailConfirmed', {
                        order_id: item.id,
                    });
                } else {
                    navigation.navigate('DonateCustomerSingle', {
                        order_id: item.id,
                    });
                }
            }}
            key={item.id}
            activeOpacity={0.8}
            style={[
                styles.productContainer,
                index === orderData.length - 1 && {
                    marginBottom: SIZE(185),
                },
            ]}>
            <View style={styles.imageContainer}>
                <Image
                    source={{uri: item.product_image || item.image}}
                    style={styles.imageProduct}
                />
            </View>
            <View style={styles.sellerDetail}>
                <View>
                    <View style={styles.statusContainer}>
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.statusText,

                                {
                                    color:
                                        item.order_status === '10'
                                            ? '#FCAD08'
                                            : item.order_status === '20'
                                            ? '#009FD3'
                                            : item.order_status === '40'
                                            ? '#0BBE49'
                                            : item.order_status === '50'
                                            ? '#CF2929'
                                            : 'red',
                                },
                            ]}>
                            {!item?.delivery_date && item.order_status_value}
                            {item?.delivery_date && 'Delivered on '}
                            {item?.delivery_date &&
                                format(
                                    new Date(item?.delivery_date),
                                    'MMMM dd, yyyy',
                                )}
                        </Text>
                    </View>
                    <View style={styles.quantityContainer}>
                        <Text style={styles.quantityText}>
                            {item.items_count || item.quantity} Items
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.sellerText}>
                            Seller :{item.provider_name}
                        </Text>
                    </View>
                </View>
                <View style={styles.arrowContainer}>
                    <RightArrow width={SIZE(20)} height={SIZE(20)} />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <Headers
                setSearchQueryCustomer={setSearchQuery}
                icon={true}
                filter={true}
                searchCommerce={true}
                headText={'My Orders'}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                onPressSearch={() => {
                    setIsSearch(true);
                }}
                setSearchQuery={setSearchQuery}
                filterItemSelected={filterItemSelected}
                setFilterItemSelected={setFilterItemSelected}
                setOrderTime={setOrderTime}
                setOrderStatus={setOrderStatus}
                filterModal={filterModal}
                orderTime={orderTime}
                orderStatus={orderStatus}
                isFilterActive={isFilterActive}
                onPressClearData={clearFilterData}
            />

            <View
                style={{marginVertical: SIZE(24), paddingHorizontal: SIZE(16)}}>
                <ShopsAndDonated
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </View>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        marginTop: SIZE(240),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : orderData.length > 0 ? (
                <FlatList
                    bounces={false}
                    data={orderData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.mainContainer}
                    // ListEmptyComponent={
                    //     <EmptyPageCustomer
                    //         heading={'Empty Orders'}
                    //         image={<EmptyOrder />}
                    //         button={'Shop now'}
                    //         description={'Your Orders are Currently Empty.'}
                    //     />
                    // }
                />
            ) : (
                <EmptyPageCustomer
                    heading={'Empty Orders'}
                    image={<EmptyOrder />}
                    button={'Shop now'}
                    description={'Your Orders are Currently Empty.'}
                />
            )}

            <ModalScreen
                isVisible={isFilter}
                setVisible={setIsFilter}
                inner={
                    <OrderFilterSection
                        close={setIsFilter}
                        orderStatus={orderStatus}
                        setOrderStatus={setOrderStatus}
                        orderTime={orderTime}
                        setOrderTime={setOrderTime}
                        page="is_order_page"
                        setIsFilterActive={setIsFilterActive}
                    />
                }
            />
        </View>
    );
};

export default OrderCustomer;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: SIZE(16),
    },
    productContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(16),
        alignItems: 'center',
        borderRadius: SIZE(8),
        marginBottom: SIZE(10),
    },
    imageContainer: {
        width: SIZE(80),
        height: SIZE(80),
        marginRight: SIZE(12),
    },
    imageProduct: {
        width: SIZE(80),
        height: SIZE(80),
        borderRadius: SIZE(8),
    },
    statusContainer: {},
    statusText: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    quantityContainer: {
        paddingVertical: SIZE(6),
    },
    quantityText: {
        fontSize: SIZE(14),
        lineHeight: SIZE(17.5),
        fontFamily: FONTS.regular,
    },
    sellerText: {
        color: '#242424',
        fontSize: SIZE(14),
        lineHeight: SIZE(17.5),
        fontFamily: FONTS.semiBold,
    },
    arrowContainer: {
        width: SIZE(24),
        height: SIZE(24),
        marginLeft: SIZE(12),
    },
    noDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    sellerDetail: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
