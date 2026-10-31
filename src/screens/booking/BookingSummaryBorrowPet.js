import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    ActivityIndicator,
    Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {usersConfigCustomer} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';

// packages
import Modal from 'react-native-modal';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import {useStripe, confirmPayment} from '@stripe/stripe-react-native';

//component
import CardModal from './CardModal';
import BookingDetailsBorrowPet from './includes/BookingDetailsBorrowPet';
import CalendarBooking from '../includes/calendar/CalendarBooking';
import {PriceDetailsPet} from './includes/PriceDetails';
import BillingAddress from './includes/BillingAddress';
import Payment from './includes/Payment';
import SignUpOptions from './includes/SignUpOptions';
import ModalScreen from '../Profile-related/ModalScreen';
import UserLogin from './includes/UserLogin';
import CommonListSingle from '../includes/commonlist/CommonListSingle';

// Icons
import BackIcon from '../../assets/icons/profile-icons/arrow-left.svg';
import Wallet from '../../assets/icons/booking-details/wallet.svg';
import SamsungPay from '../../assets/icons/booking-details/samsung-pay.svg';
import ApplePay from '../../assets/icons/booking-details/apple-pay.svg';
import ArrowRight from '../../assets/icons/profile-icons/arrow-right.svg';
import {getCardList} from '../main/ApiSection';

//Screens

const BookingSummaryBorrowPet = ({navigation, route}) => {
    const {state} = useContext(Context);
    //states
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [submitLoadingCard, setSubmitLoadingCard] = useState(false);
    const [saveCardLoader, setSaveCardLoader] = useState(false);
    const [calModalVisible, setCalModalVisible] = useState(false);
    const selectedDateRange = route.params?.selectedDateRange;
    const [bookingDate, setBookingDate] = useState(selectedDateRange);
    const [wishlist, setWishlist] = useState({});
    const [selectedAddressPk, setSelectedAddressPk] = useState('');
    const [numberOfDays, setNumberOfDays] = useState();
    const [cardModalVisible, setCardModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [section2, setSection2] = useState([]);
    const [pk, setPk] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [existError, setExistError] = useState();
    const [userModal, setUserModal] = useState(false);
    const [isType, setType] = useState('mail');
    const [errorMessage, setErrorMessage] = useState('');
    const toast = useToast();
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });
    const [selectedCard, setSelectedCard] = useState('');

    const content = route.params.content;
    const petPk = content?.singleItemPk;

    const handleDateRangeSelected = (startDate, endDate) => {
        const {setSelectedDateRange, selectedDateRange} = route.params;
        setSelectedDateRange({startDate, endDate});
        setBookingDate({startDate, endDate});
    };

    const calculateNumberOfDays = () => {
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const startDate = bookingDate?.startDate.getTime();
        const endDate = bookingDate?.endDate.getTime();
        const differenceInMilliseconds = endDate - startDate;
        setNumberOfDays(
            Math.ceil(differenceInMilliseconds / millisecondsPerDay) + 1,
        );
    };

    const petBooking = () => {
        setSubmitLoading(true);
        const access_token = state?.userData?.accessToken;
        const end_date = bookingDate.endDate
            ? moment(bookingDate.endDate).format('YYYY-MM-DD')
            : '';
        const start_date = bookingDate.startDate
            ? moment(bookingDate.startDate).format('YYYY-MM-DD')
            : '';

        const formData = new FormData();
        formData.append('address_pk', selectedAddressPk);
        formData.append('start_date', start_date);
        formData.append('end_date', end_date);
        usersConfigCustomer
            .post(`pet-booking-using-wallet/${petPk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setSubmitLoading(false);
                // console.log('response.data', response.data);
                navigation.navigate('PaymentSuccess', {});
                // navigation.navigate('BookingSectionStack', {
                //     screen: 'Bookings',
                //     params: {
                //         selectedFilter: {
                //             id: 2,
                //             type: 'Borrow a Pet',
                //             page_type: 'borrow-pet',
                //         },
                //     },
                // });
            })
            .catch(error => {
                setSubmitLoading(false);
                console.log('Error:', error.response.data);
                navigation.navigate('PaymentFailed');
            });
    };

    const petBookingCard = () => {
        setSubmitLoadingCard(true);
        const access_token = state?.userData?.accessToken;
        const end_date = bookingDate.endDate
            ? moment(bookingDate.endDate).format('YYYY-MM-DD')
            : '';
        const start_date = bookingDate.startDate
            ? moment(bookingDate.startDate).format('YYYY-MM-DD')
            : '';

        const formData = new FormData();
        formData.append('address_pk', selectedAddressPk);
        formData.append('start_date', start_date);
        formData.append('end_date', end_date);
        usersConfigCustomer
            .post(`borrow-pet-booking-using-card/${petPk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setSubmitLoadingCard(false);
                confirmSavedPayment(response.data);
            })
            .catch(error => {
                setSubmitLoadingCard(false);
                console.log('Error:', error.response.data);
                navigation.navigate('PaymentFailed');
            });
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
        const access_token = state?.userData?.accessToken;
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
            usersConfigCustomer
                .post(data.cancel_url, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        'Content-Type': 'multipart/form-data',
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
            usersConfigCustomer
                .post(data.success_url, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    navigation.navigate('PaymentSuccess', {
                        reference: response.data.transaction_id,
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

    useEffect(() => {
        calculateNumberOfDays();
    }, [bookingDate]);

    const handleRemoveItem = id => {
        setPk(id);
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

    const handleWalletPay = () => {
        if (
            selectedAddressPk?.length !== 0 &&
            selectedAddressPk !== null &&
            selectedAddressPk !== undefined
        ) {
            petBooking();
        } else if (
            selectedAddressPk === null ||
            selectedAddressPk === '' ||
            selectedAddressPk === undefined
        ) {
            toast.show('Please Select an Address', {type: 'danger'});
        } else {
            console.log('select address');
        }
    };

    const handleCardPay = () => {
        if (
            selectedAddressPk?.length !== 0 &&
            selectedAddressPk !== null &&
            selectedAddressPk !== undefined &&
            selectedCard !== undefined &&
            selectedCard.length !== 0 &&
            selectedCard.length !== null
        ) {
            petBookingCard();
        } else if (
            selectedAddressPk === null ||
            selectedAddressPk === '' ||
            selectedAddressPk === undefined
        ) {
            toast.show('Please Select an Address', {type: 'danger'});
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
        <View style={styles.container}>
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
                    <Text style={styles.borrowPetText}>Booking Summary</Text>
                </View>
            </View>
            <ScrollView
                bounces={false}
                contentContainerStyle={{
                    paddingBottom: SIZE(100),
                }}
                style={{paddingHorizontal: SIZE(16)}}
                showsVerticalScrollIndicator={false}>
                <View>
                    <CommonListSingle
                        selected={content}
                        wishlist={wishlist}
                        setWishlist={setWishlist}
                        selectedFilter={'Borrow a Pet'}
                    />
                </View>
                <BookingDetailsBorrowPet
                    onPress={() => {
                        setCalModalVisible(true);
                    }}
                    bookingDate={bookingDate}
                />
                <PriceDetailsPet
                    bookingDate={bookingDate}
                    numberOfDays={numberOfDays}
                    price_per_day={content?.price_per_day}
                    pet_breed={content?.pet_breed}
                />
                {state.userData.is_login === true ? (
                    <>
                        <BillingAddress
                            setSelectedAddressPk={setSelectedAddressPk}
                            selectedAddressPk={selectedAddressPk}
                        />
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
                            bookingPage={true}
                            bookingCardApi={handleCardPay}
                            submitLoadingCard={submitLoadingCard}
                            selectedCard={selectedCard}
                            setSelectedCard={setSelectedCard}
                            saveCardSheet={saveNewCard}
                            saveCardLoader={saveCardLoader}
                        />
                        {errorMessage && (
                            <Text
                                allowFontScaling={false}
                                style={styles.errorMessage}>
                                {errorMessage}
                            </Text>
                        )}
                        <View style={{marginTop: SIZE(20)}}>
                            <TouchableOpacity
                                disabled={submitLoading}
                                onPress={() => {
                                    handleWalletPay();
                                }}
                                activeOpacity={0.8}
                                style={[styles.buttonIndex]}>
                                <Wallet width={SIZE(20)} height={SIZE(20)} />
                                {submitLoading ? (
                                    <ActivityIndicator
                                        size={'small'}
                                        color={'#009fd3'}
                                    />
                                ) : (
                                    <Text style={styles.bottomButtonText}>
                                        Pay with Wallet
                                    </Text>
                                )}
                                <ArrowRight
                                    width={SIZE(20)}
                                    height={SIZE(20)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.buttonIndex,
                                    {marginVertical: SIZE(15)},
                                ]}>
                                <SamsungPay
                                    width={SIZE(20)}
                                    height={SIZE(20)}
                                />
                                <Text style={styles.bottomButtonText}>
                                    Samsung Pay
                                </Text>
                                <ArrowRight
                                    width={SIZE(20)}
                                    height={SIZE(20)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.buttonIndex]}>
                                <ApplePay width={SIZE(20)} height={SIZE(20)} />
                                <Text style={styles.bottomButtonText}>
                                    Apple Pay
                                </Text>
                                <ArrowRight
                                    width={SIZE(20)}
                                    height={SIZE(20)}
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <SignUpOptions
                        buttonDisabled={true}
                        setUserModal={setUserModal}
                        setType={setType}
                        bookingPage={true}
                        setScreen={setScreen}
                        is_Firbase={is_Firbase}
                        setIs_Firbase={setIs_Firbase}
                    />
                )}
            </ScrollView>

            <Modal
                isVisible={cardModalVisible || calModalVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={cardModalVisible ? styles.modalContainer : {margin: 0}}
                onBackdropPress={() => {
                    Keyboard.dismiss();
                    setCalModalVisible(false);
                }}
                onBackButtonPress={() => {
                    setCalModalVisible(false);
                }}
                propagateSwipe={true}
                avoidKeyboard={true}>
                {calModalVisible && (
                    <View style={styles.modalTwoContainer}>
                        <View style={styles.barContainer}></View>
                        <CalendarBooking
                            onDateRangeSelected={handleDateRangeSelected}
                            setCalModalVisible={setCalModalVisible}
                            defaultDateRange={bookingDate}
                            id={petPk}
                        />
                    </View>
                )}
            </Modal>
            <ModalScreen
                isVisible={userModal}
                setVisible={setUserModal}
                inner={
                    <UserLogin
                        isType={isType}
                        close={setUserModal}
                        screen={screen}
                        is_Firbase={is_Firbase}
                        setIs_Firbase={setIs_Firbase}
                    />
                }
            />
        </View>
    );
};

export default BookingSummaryBorrowPet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    borrowPetText: {
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(18),
    },
    headercontainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        borderBottomWidth: SIZE(1),
        borderColor: '#0000001A',
        alignItems: 'center',
        marginBottom: SIZE(30),
    },
    backButton: {
        width: SIZE(40),
        height: SIZE(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(100),
        backgroundColor: '#fff',
        marginRight: SIZE(20),
    },
    headerRight: {
        flex: 1,
    },
    subContent: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
    },
    toggleContainer: {
        flexDirection: 'row',
        width: SIZE(60),
        borderWidth: SIZE(1),
        borderRadius: SIZE(30),
    },
    toggleButton: {
        width: SIZE(30),
        height: SIZE(30),
        borderRadius: SIZE(15),
    },
    contentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(10),
    },
    addPet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(10),
    },
    boxOfWidth: {
        flexDirection: 'row',
        borderWidth: SIZE(1),
        justifyContent: 'space-between',
        paddingVertical: SIZE(6),
        paddingHorizontal: SIZE(8),
        borderRadius: SIZE(4),
        borderColor: '#E2E2E2',
    },
    foodOption: {
        flexDirection: 'row',
        borderWidth: SIZE(1),
        justifyContent: 'space-between',
        paddingVertical: SIZE(6),
        paddingHorizontal: SIZE(8),
        borderRadius: SIZE(4),
        borderColor: '#E2E2E2',
    },
    bottomBox: {
        flexDirection: 'row',
        width: SIZE(50),
        padding: SIZE(3),
        borderRadius: SIZE(30),
    },
    topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: SIZE(1),
        borderBlockColor: '#E2E2E2',
        paddingBottom: SIZE(10),
    },
    buttonIndex: {
        borderWidth: SIZE(1),
        borderColor: '#003459',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(10),
        borderRadius: SIZE(8),
    },

    modalContainer: {
        screenBackgroundcolor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        paddingHorizontal: SIZE(20),
        margin: SIZE(0),
    },
    modalTwoContainer: {
        backgroundColor: '#F7F7F7',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(40),
    },
    barContainer: {
        backgroundColor: '#009FD3',
        width: SIZE(70),
        height: SIZE(4),
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: SIZE(16),
        marginBottom: SIZE(22),
    },
    modalSubContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: SIZE(12),
    },
    bottomButtonText: {
        fontFamily: FONTS.semiBold,
        color: '#003459',
        fontSize: SIZE(15),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        marginTop: SIZE(5),
        textAlign: 'right',
    },
});
