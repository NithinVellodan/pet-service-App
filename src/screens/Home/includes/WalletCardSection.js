import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import {useToast} from 'react-native-toast-notifications';
import Modal from 'react-native-modal';
import {useStripe, confirmPayment} from '@stripe/stripe-react-native';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';
import {usersConfigCustomer, usersConfigGeneral} from '../../../../axiosConfig';

//components
import Payment from '../../booking/includes/Payment';
import CardModal from '../../booking/CardModal';

//images and logos
import SamsungPay from '../../../assets/icons/booking-details/samsung-pay.svg';
import SamsungPayBlue from '../../../assets/icons/booking-details/samsung-payblue.svg';
import ApplePay from '../../../assets/icons/booking-details/apple-pay.svg';
import ApplePayBlue from '../../../assets/icons/booking-details/apple-payblue.svg';
import ArrowRight from '../../../assets/icons/profile-icons/arrow-right.svg';
import ArrowRightBlue from '../../../assets/icons/arrow-right.svg';
import BackIcon from '../../../assets/icons/profile-icons/arrow-left.svg';
import {getCardList} from '../../main/ApiSection';

const WalletCardSection = ({navigation, route}) => {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const {state} = useContext(Context);
    const toast = useToast();
    const [refreshing, setRefreshing] = useState(false);
    const [section, setSection] = useState([]);
    const [pk, setPk] = useState(null);
    const [cardModalVisible, setCardModalVisible] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [existError, setExistError] = useState();
    const [saveCardLoader, setSaveCardLoader] = useState(false);
    const [selectedCard, setSelectedCard] = useState('');
    const [submitLoadingCard, setSubmitLoadingCard] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [amount, setAmount] = useState(route ? route.params?.amount : '');

    const [buttonRender, setButtonRender] = useState([
        {
            id: 2,
            icon: state?.userData?.is_service ? (
                <SamsungPayBlue width={SIZE(20)} height={SIZE(20)} />
            ) : (
                <SamsungPay width={SIZE(20)} height={SIZE(20)} />
            ),
            button: 'Samsung Pay',
        },
        {
            id: 3,
            button: 'Apple Pay',
            icon: state?.userData?.is_service ? (
                <ApplePayBlue width={SIZE(20)} height={SIZE(20)} />
            ) : (
                <ApplePay width={SIZE(20)} height={SIZE(20)} />
            ),
        },
    ]);

    const handleRemoveItem = id => {
        setPk(id);
    };

    const walletRecharge = async () => {
        setSubmitLoadingCard(true);
        const token = state.userData.accessToken;
        try {
            const response = await usersConfigGeneral.post(
                'wallet-recharge-card/',
                {
                    amount: amount,
                },
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
                'Recharge Error',
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
            usersConfigGeneral
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
                    console.log('Error:', error);
                    navigation.navigate('PaymentFailed');
                });
        } else {
            usersConfigGeneral
                .post(data.success_url, null, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then(response => {
                    navigation.navigate('PaymentSuccess', {
                        screen_is: 'wallet',
                        // reference: response.data.transaction_id,
                    });
                    setSubmitLoadingCard(false);
                })
                .catch(error => {
                    setSubmitLoadingCard(false);
                    console.log('Error:', error);
                    navigation.navigate('PaymentFailed');
                });
        }
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
                    setSection([]);
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

    getCardList(setSection, refreshing);

    const handleCardPay = () => {
        if (
            selectedCard !== undefined &&
            selectedCard.length !== 0 &&
            selectedCard.length !== null
        ) {
            walletRecharge();
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

    return (
        <>
            <View style={styles.headercontainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={styles.backButton}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <Text style={styles.pageHeading}>Add Money to Wallet</Text>
                </View>
            </View>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={{
                    backgroundColor: '#F7F7F7',
                    width: '100%',
                    paddingHorizontal: SIZE(16),
                }}>
                <Payment
                    screen_is="Cards"
                    navigation={navigation}
                    setCardModalVisible={setCardModalVisible}
                    state={state}
                    removeCard={removeCard}
                    setRemoveModal={setRemoveModal}
                    handleRemoveItem={handleRemoveItem}
                    section={section}
                    removeModal={removeModal}
                    pk={pk}
                    existError={existError}
                    route={route}
                    bookingCardApi={handleCardPay}
                    submitLoadingCard={submitLoadingCard}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    saveCardSheet={saveNewCard}
                    saveCardLoader={saveCardLoader}
                    bookingPage={true}
                />
                <View style={{marginTop: SIZE(20)}}>
                    {buttonRender.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                styles.buttonIndex,
                                {
                                    marginVertical: index == 1 ? SIZE(20) : 0,
                                    borderColor: state?.userData?.is_service
                                        ? '#009FD3'
                                        : '#003459',
                                },
                            ]}
                            key={index}>
                            {item.icon}
                            <Text
                                style={[
                                    styles.bottomButtonText,
                                    {
                                        color: state?.userData?.is_service
                                            ? '#009FD3'
                                            : '#003459',
                                    },
                                ]}>
                                {item.button}
                            </Text>
                            {!state?.userData?.is_service ? (
                                <ArrowRightBlue
                                    width={SIZE(20)}
                                    height={SIZE(20)}
                                />
                            ) : (
                                <ArrowRight
                                    width={SIZE(20)}
                                    height={SIZE(20)}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};
const styles = StyleSheet.create({
    modalSubContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: SIZE(12),
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
    headercontainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#0000001A',
        alignItems: 'center',
        marginBottom: SIZE(30),
    },
    backButton: {
        width: SIZE(40),
        height: SIZE(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 100,
        backgroundColor: '#fff',
        marginRight: SIZE(20),
    },
    pageHeading: {
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        color: '#00171F',
        lineHeight: SIZE(25),
    },
});

export default WalletCardSection;
