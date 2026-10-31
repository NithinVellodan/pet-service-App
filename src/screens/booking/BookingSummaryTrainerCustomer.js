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
import React, {useContext, useEffect, useState} from 'react';
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
// packages
import Modal from 'react-native-modal';
import {useRoute} from '@react-navigation/native';
import {format} from 'date-fns';
import {useToast} from 'react-native-toast-notifications';
import {useStripe, confirmPayment} from '@stripe/stripe-react-native';

//component
import CardModal from './CardModal';
import SignUpOptions from './includes/SignUpOptions';
import BillingAddress from './includes/BillingAddress';
import Payment from './includes/Payment';
import TrainerCard from '../goolgle-map/TrainerCard';
import ModalScreen from '../Profile-related/ModalScreen';
import UserLogin from './includes/UserLogin';
import {
    BookingDetailsForTrainerSection,
    PriceDetailsForTrainerSection,
} from './includes/PriceDetails';
//constants
import {Context} from '../../contexts/Store';
import {usersConfigCustomer} from '../../../axiosConfig';
// Icons
import BackIcon from '../../assets/icons/profile-icons/arrow-left.svg';
import Wallet from '../../assets/icons/booking-details/wallet.svg';
import SamsungPay from '../../assets/icons/booking-details/samsung-pay.svg';
import ApplePay from '../../assets/icons/booking-details/apple-pay.svg';
import ArrowRight from '../../assets/icons/profile-icons/arrow-right.svg';
import {getCardList} from '../main/ApiSection';

const BookingSummaryTrainerCustomer = ({navigation}) => {
    const {state} = useContext(Context);
    const route = useRoute();
    const {params} = route;
    const toast = useToast();

    //states
    const [isType, setType] = useState('mail');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitLoadingWallet, setSubmitLoadingWallet] = useState(false);
    const [selectedAddressPk, setSelectedAddressPk] = useState('');
    const [cardModalVisible, setCardModalVisible] = useState(false);
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [submitLoadingCard, setSubmitLoadingCard] = useState(false);
    const [saveCardLoader, setSaveCardLoader] = useState(false);
    const [selectedCard, setSelectedCard] = useState('');
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    //add Pet States

    const [refreshing, setRefreshing] = useState(false);
    const [editedIndex, setEditedIndex] = useState(null);
    const [section2, setSection2] = useState([]);
    const [pk, setPk] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [existError, setExistError] = useState();
    const [editedItem, setEditedItem] = useState({});

    const handleEditItem = index => {
        setEditedIndex(index);
        setEditedItem(section2[index]);
        setPk(index.id);
    };
    const handleRemoveItem = id => {
        setPk(id);
    };

    const getStartAndEndDate = selectedDatesArray => {
        if (selectedDatesArray.length === 0) {
            return {startDate: null, endDate: null};
        }
        const sortedDates = selectedDatesArray
            .map(date => new Date(date))
            .sort((a, b) => a - b);

        const startDate = sortedDates[0];
        const endDate = sortedDates[sortedDates.length - 1];
        return {startDate, endDate};
    };

    // Example usage:

    const trainerBooking = () => {
        setSubmitLoadingWallet(true);
        const access_token = state?.userData?.accessToken;
        const selectedDatesArray = params.selectedDatesArray;
        const {startDate, endDate} = getStartAndEndDate(selectedDatesArray);
        const selectedIds = params?.selectedItems?.map(item => item.id);
        const dateEnd = new Date(endDate);
        const startingDate = new Date(startDate);
        const formatteEndDate = format(dateEnd, 'yyyy-MM-dd');
        const formatteStartDate = format(startingDate, 'yyyy-MM-dd');

        const formData = new FormData();
        formData.append('service_pks', selectedIds);
        formData.append('address_pk', selectedAddressPk);
        formData.append('start_date', formatteStartDate);
        formData.append('end_date', formatteEndDate);
        formData.append('no_of_hours', params?.totalHours);
        usersConfigCustomer
            .post(
                `trainer-booking-using-wallet/${params?.selected?.id}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )

            .then(response => {
                let {StatusCode, message} = response.data;

                if (StatusCode === 6000) {
                    // toast.show(message, {type: 'success'});
                    navigation.navigate('PaymentSuccess', {});
                } else if (StatusCode === 6001) {
                    toast.show(message, {type: 'danger'});
                }
                setSubmitLoadingWallet(false);
            })
            .catch(error => {
                setSubmitLoadingWallet(false);
                let {message} = error.response.data;
                console.log('Error:', error.response.data);
                toast.show(message, {type: 'warning'});
            });
    };

    const trainerBookingCard = () => {
        setSubmitLoadingCard(true);
        const access_token = state?.userData?.accessToken;
        const selectedDatesArray = params.selectedDatesArray;
        const {startDate, endDate} = getStartAndEndDate(selectedDatesArray);
        const selectedIds = params?.selectedItems?.map(item => item.id);
        const dateEnd = new Date(endDate);
        const startingDate = new Date(startDate);
        const formatteEndDate = format(dateEnd, 'yyyy-MM-dd');
        const formatteStartDate = format(startingDate, 'yyyy-MM-dd');

        const formData = new FormData();
        formData.append('service_pks', selectedIds);
        formData.append('address_pk', selectedAddressPk);
        formData.append('start_date', formatteStartDate);
        formData.append('end_date', formatteEndDate);
        formData.append('no_of_hours', params?.totalHours);
        usersConfigCustomer
            .post(
                `trainer-booking-using-card/${params?.selected?.id}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            .then(response => {
                setSubmitLoadingCard(false);
                confirmSavedPayment(response.data);
            })
            .catch(error => {
                setSubmitLoadingCard(false);
                toast.show(error.response.data.message, {type: 'danger'});
                console.log('Error:', error.response.data);
                // navigation.navigate('PaymentFailed');
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
            trainerBooking();
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
            trainerBookingCard();
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
                <View style={{marginBottom: SIZE(20)}}>
                    <TrainerCard
                        is_booking_page={true}
                        selected={params?.selected}
                    />
                </View>

                <BookingDetailsForTrainerSection
                    selectedItems={params?.selectedItems}
                />

                <PriceDetailsForTrainerSection
                    selectedItems={params?.selectedItems}
                    price_per_hour={params?.price_per_hour}
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
                            <TouchableOpacity
                                disabled={submitLoadingWallet}
                                onPress={() => {
                                    handleWalletPay();
                                }}
                                activeOpacity={0.8}
                                style={[styles.buttonIndex]}>
                                <Wallet width={SIZE(20)} height={SIZE(20)} />
                                {submitLoadingWallet ? (
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

export default BookingSummaryTrainerCustomer;

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
        width: 60,
        borderWidth: 1,
        borderRadius: 30,
    },
    toggleButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    contentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    addPet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    boxOfWidth: {
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'space-between',
        paddingVertical: SIZE(6),
        paddingHorizontal: SIZE(8),
        borderRadius: 4,
        borderColor: '#E2E2E2',
    },
    foodOption: {
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'space-between',
        paddingVertical: SIZE(6),
        paddingHorizontal: SIZE(8),
        borderRadius: 4,
        borderColor: '#E2E2E2',
    },
    bottomBox: {
        flexDirection: 'row',
        width: SIZE(50),
        padding: 3,
        borderRadius: 30,
    },
    topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBlockColor: '#E2E2E2',
        paddingBottom: 10,
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
});
