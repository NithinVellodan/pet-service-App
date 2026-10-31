import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import Headers from '../../../includes/headers/Headers';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import OrderIdTotal from '../includes/OrderIdTotal';
import ArrowDown from '../../../../assets/icons/ecommerce/customer/arrow-down.svg';
import ArrowUp from '../../../../assets/icons/ecommerce/customer/arrow-up.svg';
import OrderItems from '../includes/OrderItems';
import ShippingDetail from '../includes/ShippingDetail';
import OrderPriceDetails from '../includes/OrderPriceDetails';
import ModalBox from '../../../Home/includes/ModalBox';
import CancelOrder from '../includes/CancelOrder';
import UpdateOrder from '../includes/UpdateOrder';
import ShippingInfo from '../includes/ShippingInfo';
import {EcommerceServiceProviderOrderSingle} from '../../EcommerceApiSection';
import {Context} from '../../../../contexts/Store';
import {ecommerceApiServiceProvider} from '../../../../../axiosConfig';
import {useNavigation, useRoute} from '@react-navigation/native';
import ModalScreen from '../../../Profile-related/ModalScreen';
import ShippingInfoModal from '../includes/ShippingInfoModal';

const OrderDetails = ({route}) => {
    const navigation = useNavigation();

    const {state} = useContext(Context);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [shiploading, setShipLoading] = useState(false);
    const [showItem, setShowItem] = useState(true);
    const [cancelModal, setCancelModal] = useState(false);
    const [shippingModal, setShippingModal] = useState(false);
    const [delivery, setDelivery] = useState('direct_delivery');
    const [reason, setReason] = useState('');
    const [orderDelText, setOrderDelText] = useState('');
    const [errorMessage, setErrorMessage] = useState({});
    const [select, setSelect] = useState({id: 1, type: 'Update_Order'});
    const [orderDetails, setOrderDetails] = useState([]);
    const order = route?.params?.order;

    // clear all function
    const clearAll = () => {
        setReason('');
        setOrderDelText('');
    };

    //api section
    EcommerceServiceProviderOrderSingle(
        state,
        setOrderDetails,
        order.id || order,
        setLoading,
        refreshing,
        shiploading,
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setLoading(prev => !prev);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    // accept-order
    const acceptOrder = async () => {
        setButtonLoading(true);
        const token = state.userData.accessToken;
        const pk = orderDetails.id;

        try {
            const response = await ecommerceApiServiceProvider.post(
                `accept-order/${pk}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                console.log('accepted order');
            } else {
                console.log('failure order');
            }
            setRefreshing(prev => !prev);
            setTimeout(() => {
                setRefreshing(false);
            }, 500);
            setButtonLoading(false);
        } catch (error) {
            setButtonLoading(false);
        }
    };

    // cancel-order
    const cancelOrders = async () => {
        setButtonLoading(true);
        const token = state.userData.accessToken;
        const pk = orderDetails.id;
        const formData = new FormData();
        if (reason.name === 'Other') {
            formData.append('cancelled_reason', orderDelText);
        } else {
            formData.append('cancelled_reason', reason.name);
        }

        try {
            const response = await ecommerceApiServiceProvider.post(
                `cancel-order/${pk}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setCancelModal(false);
                clearAll();
            } else {
            }
            navigation.goBack();
            setCancelModal(false);
            setButtonLoading(false);
        } catch (error) {
            setButtonLoading(false);
        }
    };

    // DELIVER ORDER
    const deliverOrder = async () => {
        setButtonLoading(true);
        const token = state.userData.accessToken;
        const pk = orderDetails.id;

        try {
            const response = await ecommerceApiServiceProvider.post(
                `set-order-delivered/${pk}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                console.log('deliver order');
                console.log('Handle success order-deliver');
            } else {
                console.log('failure order order-deliver');
            }
            setLoading(prev => !prev);
            setButtonLoading(false);
        } catch (error) {
            setButtonLoading(false);
        }
    };
    return (
        <View>
            <Headers headText={'Order Summary'} />
            <ScrollView
                bounces={false}
                refreshControl={
                    <RefreshControl
                        colors={['#003459']}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.mainContainer}>
                <OrderIdTotal
                    order={orderDetails}
                    orderQty={'2'}
                    orderPrice={'180'}
                />
                <View style={styles.container}>
                    <View style={styles.head}>
                        <Text style={styles.items}>
                            Items ({orderDetails?.order_items_count})
                        </Text>
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
                        <>
                            {orderDetails?.order_items?.map((item, index) => (
                                <OrderItems key={index} order={item} />
                            ))}
                        </>
                    )}
                </View>
                <View style={{marginTop: SIZE(16)}}>
                    <ShippingDetail
                        title={'Shipping Details'}
                        name={orderDetails?.billing_details?.full_name}
                        number={orderDetails?.billing_details?.phone}
                        address={`${orderDetails?.billing_details?.address_1}, ${orderDetails?.billing_details?.address_2}, ${orderDetails?.billing_details?.street}, ${orderDetails?.billing_details?.emirate}`}
                    />
                </View>
                <View>
                    <OrderPriceDetails
                        title={'Price Details'}
                        noItems={orderDetails?.order_items_count}
                        price={orderDetails?.price_details?.product_total}
                        discount={orderDetails?.price_details?.discount}
                        tax={orderDetails?.price_details?.tax_amount}
                        delivery={orderDetails?.price_details?.delivery_charge}
                        convenience={
                            orderDetails?.price_details?.commission_amount
                        }
                        total={orderDetails?.price_details?.total_price}
                    />
                </View>
                {orderDetails.order_status_value === 'Order Placed' && (
                    <View style={styles.bottomButtton}>
                        <TouchableOpacity
                            disabled={buttonLoading}
                            onPress={() => {
                                acceptOrder();
                            }}
                            activeOpacity={0.8}
                            style={styles.accept}>
                            {buttonLoading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Text style={styles.acceptText}>Accept</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.cancel}
                            onPress={() => {
                                console.log('order cancel modal');
                                setCancelModal(true);
                            }}>
                            <Text style={styles.cancelText}>Cancel Order</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {(orderDetails?.order_status_value === 'Order Accepted' ||
                    orderDetails?.order_status_value === 'Order Shipped' ||
                    orderDetails?.order_status_value === 'Order Delivered') && (
                    <View>
                        <View style={styles.selectBox}>
                            <TouchableOpacity
                                onPress={() =>
                                    setSelect({id: 1, type: 'Update_Order'})
                                }
                                style={[
                                    styles.selectItem,
                                    {
                                        backgroundColor:
                                            select.type === 'Update_Order'
                                                ? '#003459'
                                                : '#FFFFFF',
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.selectItemText,
                                        {
                                            color:
                                                select.type === 'Update_Order'
                                                    ? '#FFFFFF'
                                                    : '#242424',
                                            fontFamily:
                                                select.type === 'Update_Order'
                                                    ? FONTS.semiBold
                                                    : FONTS.regular,
                                        },
                                    ]}>
                                    Update Order
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelect({
                                        id: 1,
                                        type: 'Shipping_Information',
                                    });
                                }}
                                style={[
                                    styles.selectItem,
                                    {
                                        backgroundColor:
                                            select.type ===
                                            'Shipping_Information'
                                                ? '#003459'
                                                : '#FFFFFF',
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.selectItemText,
                                        {
                                            color:
                                                select.type ===
                                                'Shipping_Information'
                                                    ? '#FFFFFF'
                                                    : '#242424',
                                            fontFamily:
                                                select.type ===
                                                'Shipping_Information'
                                                    ? FONTS.semiBold
                                                    : FONTS.regular,
                                        },
                                    ]}>
                                    Shipping Information
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {refreshing ? null : (
                            <>
                                {select.type === 'Update_Order' ? (
                                    <UpdateOrder
                                        status={
                                            orderDetails?.order_status_value
                                        }
                                        setShippingModal={setShippingModal}
                                        deliverOrder={deliverOrder}
                                    />
                                ) : (
                                    select.type === 'Shipping_Information' && (
                                        <ShippingInfo
                                            delivery={delivery}
                                            delivery_data={orderDetails}
                                        />
                                    )
                                )}
                            </>
                        )}
                    </View>
                )}
            </ScrollView>
            <ModalBox
                isVisible={cancelModal}
                setVisible={setCancelModal}
                inner={
                    <CancelOrder
                        orderDelText={orderDelText}
                        setOrderDelText={setOrderDelText}
                        close={setCancelModal}
                        errorMessage={errorMessage}
                        setError={setErrorMessage}
                        categoryValue={reason}
                        setCategoryValue={setReason}
                        clearAll={clearAll}
                        cancelOrders={cancelOrders}
                        buttonLoading={buttonLoading}
                    />
                }
            />
            <ModalScreen
                isVisible={shippingModal}
                setVisible={setShippingModal}
                inner={
                    <ShippingInfoModal
                        close={setShippingModal}
                        delivery={delivery}
                        setDelivery={setDelivery}
                        pkId={orderDetails.id}
                        setRefreshing={setRefreshing}
                        setShipLoading={setShipLoading}
                    />
                }
            />
        </View>
    );
};

export default OrderDetails;

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: SIZE(24),
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(100),
    },
    container: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        padding: SIZE(16),
        backgroundColor: '#FFFFFF',
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: SIZE(16),
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
        marginBottom: SIZE(10),
    },
    items: {
        color: '#969696',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(17),
    },
    bottomButtton: {
        marginTop: SIZE(32),
    },
    accept: {
        backgroundColor: '#003459',
        alignItems: 'center',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
    },
    acceptText: {
        color: '#FFF',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    cancel: {
        alignSelf: 'center',
        marginTop: SIZE(20),
    },
    cancelText: {
        color: '#CF2929',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    selectBox: {
        marginTop: SIZE(20),
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
});
