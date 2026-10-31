import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Keyboard,
    Alert,
} from 'react-native';
import {React, useState, useContext} from 'react';

//packages
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import Modal from 'react-native-modal';
import {useStripe, confirmPayment} from '@stripe/stripe-react-native';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

//components
import Headers from '../../../includes/headers/Headers';
import Payment from '../../../booking/includes/Payment';

//icons
import Wallet from '../../../../assets/icons/booking-details/wallet.svg';
import SamsungPay from '../../../../assets/icons/booking-details/samsung-pay.svg';
import ApplePay from '../../../../assets/icons/booking-details/apple-pay.svg';
import ArrowRight from '../../../../assets/icons/profile-icons/arrow-right.svg';
import TopArrow from '../../../../assets/icons/booking-details/arrow-top';
import BottomArrow from '../../../../assets/icons/booking-details/bottom-arrow';
import {Context} from '../../../../contexts/Store';
import {
    ecommerceApiCustomers,
    usersConfigCustomer,
} from '../../../../../axiosConfig';
import {CustomerListCard, getCardList} from '../../ApiSection';
import CardModal from '../../../booking/CardModal';
import CustomerPeymentConfirmationModal from '../customer/includes/CustomerPeymentConfirmationModal';

const CustomerPayment = ({route}) => {
    const {state, dispatch} = useContext(Context);
    const toast = useToast();
    const [cardModalVisible, setCardModalVisible] = useState(false);
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [modalVisibleForPayment, setModalVisibleForPayment] = useState(false);
    const [visiblePriceDetails, setVisiblePriceDetails] = useState(true);
    const navigation = useNavigation();
    const [detailData, setDetailData] = useState(route?.params?.detailData);
    const [cartItem, setCartItem] = useState(route?.params.cartItem);
    const [address, setAddress] = useState(route?.params?.address);
    const [section2, setSection2] = useState([]);
    //add Pet States
    const [refreshing, setRefreshing] = useState(false);
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [pk, setPk] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [existError, setExistError] = useState();
    const [selectedCard, setSelectedCard] = useState('');
    const [lowBalance, setLowBalance] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [submitLoadingCard, setSubmitLoadingCard] = useState(false);
    const [saveCardLoader, setSaveCardLoader] = useState(false);

    const handleRemoveItem = id => {
        setPk(id);
    };

    const [buttonRender, setButtonRender] = useState([
        {
            id: 1,
            button: 'Pay with Wallet',
            icon: <Wallet width={SIZE(20)} height={SIZE(20)} />,
        },
        {
            id: 2,
            icon: <SamsungPay width={SIZE(20)} height={SIZE(20)} />,
            button: 'Samsung Pay',
        },
        {
            id: 3,
            button: 'Apple Pay',
            icon: <ApplePay width={SIZE(20)} height={SIZE(20)} />,
        },
    ]);

    const PostDataProductCart = async () => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;
        const ids = cartItem.map(item => item.id);
        const formData = new FormData();
        formData.append('cart_item_pks', JSON.stringify(ids));
        formData.append('address_pk', address.id);
        try {
            const response = await ecommerceApiCustomers.post(
                'place-order-using-wallet/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (response.data.StatusCode === 6000) {
                setSubmitLoading(false);
                navigation.navigate('OrderDetailConfirmed', {
                    order_id: response.data.order_id,
                });
                handlePress();
                setModalVisibleForPayment(false);
                toast.show(
                    response.data.message,
                    {
                        type: 'success',
                    },
                    2000,
                );
            } else {
                setSubmitLoading(false);
                toast.show(
                    response.data.message,
                    {
                        type: 'danger',
                    },
                    1000,
                );
                setLowBalance(true);
            }
        } catch (error) {
            setSubmitLoading(false);
            console.log('error => ', error);
            toast.show(
                'Error placing order',
                {
                    type: 'danger',
                },
                1000,
            );
        }
    };

    const PostDataProductCartCard = async () => {
        setSubmitLoadingCard(true);

        const token = state.userData.accessToken;
        const ids = cartItem.map(item => item.id);
        const formData = new FormData();
        formData.append('cart_item_pks', JSON.stringify(ids));
        formData.append('address_pk', address.id);
        try {
            const response = await ecommerceApiCustomers.post(
                'place-order-using-card/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (response.data.StatusCode === 6000) {
                setSubmitLoadingCard(false);
                confirmSavedPayment(response.data);
            } else {
                setSubmitLoadingCard(false);
                toast.show(
                    response.data.message,
                    {
                        type: 'danger',
                    },
                    1000,
                );
            }
        } catch (error) {
            setSubmitLoadingCard(false);
            console.log('error => ', error);
            toast.show(
                'Error placing order',
                {
                    type: 'danger',
                },
                1000,
            );
        }
    };

    const saveNewCard = async () => {
        setSaveCardLoader(true);
        const access_token = state?.userData?.accessToken;
        usersConfigCustomer
            .post(`cards-adding/`, null, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setSaveCardLoader(false);
                initializePaymentSheet(response.data);
            })
            .catch(error => {
                setSaveCardLoader(false);
                console.log('Error:', error.response.data);
            });
    };

    const initializePaymentSheet = async data => {
        const {error} = await initPaymentSheet({
            merchantDisplayName: 'Example, Inc.',
            customerId: data.customer,
            customerEphemeralKeySecret: data.ephemeralKey,
            setupIntentClientSecret: data.setup_intent,
            allowsDelayedPaymentMethods: true,
            returnURL: usersConfigCustomer,
        });

        if (!error) {
            setSaveCardLoader(true);
            setRefreshing(true);
            const {error} = await presentPaymentSheet();
            if (!error) {
                setSaveCardLoader(false);
                setRefreshing(false);
            } else {
                setSaveCardLoader(false);
                setRefreshing(false);
            }
        }
    };

    const confirmSavedPayment = async data => {
        setSubmitLoadingCard(true);
        const access_token = state.userData.accessToken;
        const {error, paymentIntent} = await confirmPayment(
            data.paymentIntent,
            {
                paymentMethodType: 'Card',
                paymentMethodData: {
                    paymentMethodId: selectedCard,
                    // cvc: '123',
                    // billingDetails: {
                    //     name: 'Jane Doe',
                    // },
                },
            },
        );
        if (error) {
            ecommerceApiCustomers
                .post(data.cancel_url, null, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then(response => {
                    setSubmitLoadingCard(false);
                })
                .catch(error => {
                    setSubmitLoadingCard(false);
                    console.log('Error:', error.response.data);
                    navigation.navigate('PaymentFailed');
                });
        } else {
            ecommerceApiCustomers
                .post(data.success_url, null, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then(response => {
                    toast.show(
                        response.data.message,
                        {
                            type: 'success',
                        },
                        2000,
                    );
                    handlePress();
                    navigation.navigate('OrderDetailConfirmed', {
                        order_id: response.data.order_id,
                    });
                    setSubmitLoadingCard(false);
                })
                .catch(error => {
                    setSubmitLoadingCard(false);
                    console.log('Error:', error.response.data);
                    navigation.navigate('PaymentFailed');
                });
        }
    };

    const handlePress = async () => {
        cartItem.forEach(cartItem => {
            const matchedItem = state.wishList.find(
                wishlistItem => wishlistItem.id === cartItem.id,
            );
            dispatch({
                type: 'UPDATE_USER_DATA',
                userData: {
                    ...state.userData,
                    cart_count: 0,
                },
            });
            dispatch({
                type: 'CLEAR_CART',
            });
            if (matchedItem) {
                dispatch({
                    type: 'REMOVE_FROM_WISH',
                    itemId: matchedItem.id,
                });
            }
        });
    };

    const removeCard = async pk => {
        setRefreshing(true);
        setSubmitLoading(true);
        const token = state.userData.accessToken;

        try {
            await usersConfigCustomer
                .post(`delete-saved-card/${pk}/`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setSubmitLoading(false);
                    setRefreshing(false);
                    setSection2([]);
                    setPk('');
                    toast.show('Card Removed', {
                        type: 'success',
                    });
                })
                .catch(error => {
                    setSubmitLoading(false);
                    setRefreshing(false);
                    console.log('error try => ', error.response.data);
                    setPk('');
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    getCardList(setSection2, refreshing);

    const handleCardPay = () => {
        if (
            selectedCard !== undefined &&
            selectedCard.length !== 0 &&
            selectedCard.length !== null
        ) {
            PostDataProductCartCard();
        } else if (
            selectedCard === null ||
            selectedCard === '' ||
            selectedCard === undefined
        ) {
            toast.show('Please Select a Card', {type: 'danger'});
        } else {
            console.log('select address');
        }
    };

    const modalOptional = () => {
        setModalVisibleForPayment(!modalVisibleForPayment);
    };

    return (
        <View>
            <Headers
                headText={'Payment'}
                rightText={'1 Item, To pay : AED 80'}
                arrow={true}
            />

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: SIZE(200),
                    paddingVertical: SIZE(28),
                }}
                bounces={false}
                style={{paddingHorizontal: SIZE(16)}}
                showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: SIZE(20)}}>
                    <View style={styles.paymentDetailContainer}>
                        <View style={styles.subContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => [
                                    setVisiblePriceDetails(
                                        !visiblePriceDetails,
                                    ),
                                ]}
                                style={[
                                    styles.topBox,
                                    {
                                        borderBottomWidth: visiblePriceDetails
                                            ? 1
                                            : 0,
                                        paddingBottom: !visiblePriceDetails
                                            ? 0
                                            : SIZE(15),
                                    },
                                ]}>
                                <Text style={styles.subContent1}>
                                    Price Details
                                </Text>
                                <View>
                                    {visiblePriceDetails ? (
                                        <TopArrow />
                                    ) : (
                                        <BottomArrow />
                                    )}
                                </View>
                            </TouchableOpacity>
                            {visiblePriceDetails && (
                                <View>
                                    <View style={styles.priceContainer}>
                                        <View>
                                            <Text style={styles.description}>
                                                Price ( 1 item )
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.description}>
                                                AED {detailData?.[0].price}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <View>
                                            <Text style={styles.description}>
                                                Discount
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.description}>
                                                AED {detailData?.[0].discount}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <View>
                                            <Text style={styles.description}>
                                                Delivery Charge (
                                                {
                                                    detailData?.[0]
                                                        .delivery_distance
                                                }{' '}
                                                ) km{' '}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.description}>
                                                {' '}
                                                AED{' '}
                                                {
                                                    detailData?.[0]
                                                        .delivery_charge
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <View>
                                            <Text style={styles.description}>
                                                Tax (
                                                {detailData?.[0].tax_percentage}{' '}
                                                % VAT)
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.description}>
                                                AED {detailData?.[0].tax_amount}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <View>
                                            <Text style={styles.description}>
                                                Convenience Fee
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.description}>
                                                AED{' '}
                                                {
                                                    detailData?.[0]
                                                        .commission_amount
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <View>
                                            <Text style={styles.grantTotal}>
                                                Amount Payable
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.grantTotal}>
                                                AED{' '}
                                                {detailData?.[0].total_price}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <Payment
                    navigation={navigation}
                    setCardModalVisible={setCardModalVisible}
                    removeCard={removeCard}
                    handleRemoveItem={handleRemoveItem}
                    section={section2}
                    setRemoveModal={setRemoveModal}
                    removeModal={removeModal}
                    pk={pk}
                    existError={existError}
                    state={state}
                    bookingPage={true}
                    bookingCardApi={handleCardPay}
                    submitLoadingCard={submitLoadingCard}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    saveCardSheet={saveNewCard}
                    saveCardLoader={saveCardLoader}
                />
                <View style={{marginTop: SIZE(20)}}>
                    {buttonRender.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={modalOptional}
                            style={[
                                styles.buttonIndex,
                                {
                                    marginVertical: index == 1 ? SIZE(20) : 0,
                                },
                            ]}
                            key={index}>
                            {item.icon}
                            <Text style={styles.bottomButtonText}>
                                {item.button}
                            </Text>
                            <ArrowRight width={SIZE(20)} height={SIZE(20)} />
                        </TouchableOpacity>
                    ))}
                </View>
                <Modal
                    isVisible={modalVisibleForPayment}
                    animationInTiming={400}
                    animationOutTiming={400}
                    animationIn={'slideInUp'}
                    backdropOpacity={0.2}
                    useNativeDriver={false}
                    useNativeDriverForBackdrop={true}
                    style={
                        modalVisibleForPayment
                            ? styles.modalContainer
                            : {margin: 0}
                    }
                    onBackdropPress={() => {
                        Keyboard.dismiss();
                        setModalVisibleForPayment(false);
                    }}
                    onBackButtonPress={() => {
                        setModalVisibleForPayment(false);
                    }}
                    propagateSwipe={true}
                    avoidKeyboard={true}>
                    <View style={styles.modalSubContainer}>
                        <CustomerPeymentConfirmationModal
                            PostDataProductCart={PostDataProductCart}
                            lowBalance={lowBalance}
                            setLowBalance={setLowBalance}
                            setModalVisibleForPayment={
                                setModalVisibleForPayment
                            }
                            navigation={navigation}
                            submitLoading={submitLoading}
                        />
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
};

export default CustomerPayment;

const styles = StyleSheet.create({
    paymentDetailContainer: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
    },
    subContainer: {
        borderBottomColor: '#E2E2E2',
    },
    paymentHeaderContainer: {
        borderBottomWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    paymentHeader: {
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        color: '#242424',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(12),
    },
    description: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        color: '#242424',
    },
    grantTotal: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.bold,
    },
    buttonIndex: {
        borderWidth: 1,
        borderColor: '#003459',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(10),
        borderRadius: SIZE(8),
    },
    bottomButtonText: {
        fontFamily: FONTS.semiBold,
        color: '#003459',
        fontSize: SIZE(15),
    },
    topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBlockColor: '#E2E2E2',
        paddingBottom: SIZE(10),
    },
    subContent1: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
    },
    modalSubContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: SIZE(12),
    },
});
