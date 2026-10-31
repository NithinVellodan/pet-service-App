import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    NativeModules,
    Platform,
    ActivityIndicator,
    Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// packages
import Modal from 'react-native-modal';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import {useStripe, confirmPayment} from '@stripe/stripe-react-native';

//component
import CardModal from './CardModal';
import SignUpOptions from './includes/SignUpOptions';
import BookingDetails from './includes/BookingDetails';
import PriceDetails from './includes/PriceDetails';
import BillingAddress from './includes/BillingAddress';
import Payment from './includes/Payment';
import CommonListSingle from '../includes/commonlist/CommonListSingle';
import AddCustomerPetDetails from '../detail/AddCustomerPetDetails';
import CalendarBookingPlace from '../includes/calendar/CalendarBookingPlace';

//constants
import {Context} from '../../contexts/Store';
import {ApiSectionCustomerPetType, getCardList} from '../main/ApiSection';
import {usersConfigCustomer} from '../../../axiosConfig';

// Icons
import BackIcon from '../../assets/icons/profile-icons/arrow-left.svg';
import Wallet from '../../assets/icons/booking-details/wallet.svg';
import SamsungPay from '../../assets/icons/booking-details/samsung-pay.svg';
import ApplePay from '../../assets/icons/booking-details/apple-pay.svg';
import ArrowRight from '../../assets/icons/profile-icons/arrow-right.svg';
import ModalScreen from '../Profile-related/ModalScreen';
import UserLogin from './includes/UserLogin';
import TermsConditions from '../Auth/privacy/TermsConditions';

const BookingSummary = ({navigation}) => {
    const {state} = useContext(Context);
    const route = useRoute();
    const {StatusBarManager} = NativeModules;
    const toast = useToast();
    //states
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [submitLoadingCard, setSubmitLoadingCard] = useState(false);
    const [saveCardLoader, setSaveCardLoader] = useState(false);

    const [isType, setType] = useState('mail');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [selectedAddressPk, setSelectedAddressPk] = useState('');
    const [cardModalVisible, setCardModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [wishlist, setWishlist] = useState({});
    const selectedDateRange = route.params?.selectedDateRange;
    const [bookingDate, setBookingDate] = useState(selectedDateRange);
    const [petDetails, setPetDetails] = useState();
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedPetPk, setSelectedPetPk] = useState([]);
    const [numberOfDays, setNumberOfDays] = useState();
    const [selectedItems1, setSelectedItems1] = useState({
        price_per_Day: 100,
        number_of_pets: 0,
    });
    const [selected1, setSelected1] = useState(false);
    const [selected, setSelected] = useState(false);
    const selectedPetType = route?.params?.currentSelection;
    const Food_Price = route?.params?.currentSelection.food_price;
    const content = route.params.content;
    const stayPk = route.params.singleItemPk;
    const categoryId = route.params.currentSelection.pet_type;
    const [userModal, setUserModal] = useState(false);
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    //add Pet States
    const [petList, setPetList] = useState([]);
    const [section, setSection] = useState(null);
    const [arrival, setArrival] = useState();
    const [petType, setPetType] = useState([]);
    const [breedType, setBreedType] = useState([]);
    const [ageValue, setAgeValue] = useState(null);
    const [sexValue, setSexValue] = useState(null);
    const [nameAs, setNameAs] = useState('');
    const [vaccination, setVaccination] = useState([]);
    const [insuranceDocuments, setInsuranceDocuments] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateTwo, setSelectedDateTwo] = useState(null);
    const [selectedDateThree, setSelectedDateThree] = useState('');
    const [categoryValue, setCategoryValue] = useState(null);
    const [breedValue, setBreedValue] = useState(null);
    const [ckeck, setCheck] = useState(false);
    const [ckeckInsurance, setckeckInsurance] = useState(false);
    const [ckeckTerms, setCkeckTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [upToDateImage, setUpToDateImage] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [section2, setSection2] = useState([]);
    const [pk, setPk] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [existError, setExistError] = useState();
    const [ageGroup, setAgeGroup] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCard, setSelectedCard] = useState('');

    ApiSectionCustomerPetType(
        selectedPetType.pet_type,
        setPetDetails,
        isLoading,
    );

    useEffect(() => {
        setSelectedItems1(prevState => ({
            ...prevState,
            number_of_pets: selectedItems.length,
        }));
    }, [selectedItems, bookingDate]);

    useEffect(() => {
        calculateNumberOfDays();
    }, [bookingDate]);

    const calculateNumberOfDays = () => {
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const startDate = bookingDate?.startDate.getTime();
        const endDate = bookingDate?.endDate.getTime();
        const differenceInMilliseconds = endDate - startDate;
        setNumberOfDays(
            Math.ceil(differenceInMilliseconds / millisecondsPerDay) + 1,
        );
    };

    const handleDateRangeSelected = (startDate, endDate) => {
        const {setSelectedDateRange, selectedDateRange} = route.params;
        setSelectedDateRange({startDate, endDate});
        setBookingDate({startDate, endDate});
    };

    // add my pet function
    const addMyPet = async image => {
        setSubmitLoading(true);
        let formattedDateString = '';
        let formattedDateStringVaccination = '';
        let formattedDateStringDOB = '';

        if (selectedDate && selectedDate !== '') {
            formattedDateString = new Date(selectedDate).toLocaleDateString(
                'en-CA',
                {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                },
            );
        }

        if (selectedDateTwo && selectedDateTwo !== '') {
            formattedDateStringVaccination = new Date(
                selectedDateTwo,
            ).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }

        if (selectedDateThree && selectedDateThree !== '') {
            formattedDateStringDOB = new Date(
                selectedDateThree,
            ).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }

        const token = state.userData.accessToken;
        const formData = new FormData();
        formData.append('pet_name', nameAs);
        formData.append('pet_type', section);
        formData.append('pet_breed', breedType);
        selectedImages.forEach((image, index) => {
            formData.append(`images`, {
                uri: image.uri,
                type: image.type,
                name: image.name,
            });
        });
        formData.append('date_of_birth', formattedDateStringDOB);
        formData.append('vaccination_expiry', formattedDateStringVaccination);
        formData.append('insurance_expiry', formattedDateString);
        formData.append('is_insured', ckeckInsurance);
        {
            ckeckInsurance &&
                formData.append('insurance_document', {
                    uri: insuranceDocuments[0].uri,
                    type: insuranceDocuments[0].type,
                    name: insuranceDocuments[0].name,
                });
        }
        formData.append('is_vaccinated', ckeck);
        {
            ckeck &&
                formData.append('vaccination_document', {
                    uri: vaccination[0].uri,
                    type: vaccination[0].type,
                    name: vaccination[0].name,
                });
        }
        try {
            await usersConfigCustomer
                .post('create-pet/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    setSubmitLoading(false);
                    setEditModalVisible(false);
                    setIsLoading(true);
                    setIsLoading(false);
                    clearAll();
                })
                .catch(error => {
                    setSubmitLoading(false);
                    console.log('error pet try => ', error.response.data);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    // clear all function
    const clearAll = () => {
        setPetType([]);
        setBreedType([]);
        setAgeValue(null);
        setNameAs('');
        setVaccination([]);
        setInsuranceDocuments([]);
        setSelectedImages([]);
        setSelectedDate(null);
        setSelectedDateTwo(null);
        setSelectedDateThree(null);
        setCategoryValue(null);
        setBreedValue(null);
        setCheck(false);
        setckeckInsurance(false);
        setCkeckTerms(false);
        setUpToDateImage([]);
    };

    // place to stay booking api
    const stayBooking = () => {
        setSubmitLoading(true);
        const access_token = state?.userData?.accessToken;

        let foodNeeded = 'False';
        if (selected === true) {
            foodNeeded = 'True';
        } else {
            foodNeeded = 'False';
        }

        const end_date = bookingDate.endDate
            ? moment(bookingDate.endDate).format('YYYY-MM-DD')
            : '';
        const start_date = bookingDate.startDate
            ? moment(bookingDate.startDate).format('YYYY-MM-DD')
            : '';

        const formData = new FormData();
        formData.append('pet_type', selectedPetType.pet_type);
        formData.append('pet_pks', selectedPetPk);
        formData.append('address_pk', selectedAddressPk);
        formData.append('start_date', start_date);
        formData.append('end_date', end_date);
        formData.append('food_needed', foodNeeded);
        usersConfigCustomer
            .post(`pts-booking-using-wallet/${stayPk}/`, formData, {
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
                //             id: 1,
                //             type: 'Place to Stay',
                //             page_type: 'place-to-stay',
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

    const stayBookingCard = () => {
        setSubmitLoadingCard(true);
        const access_token = state?.userData?.accessToken;

        let foodNeeded = 'False';
        if (selected === true) {
            foodNeeded = 'True';
        } else {
            foodNeeded = 'False';
        }

        const end_date = bookingDate.endDate
            ? moment(bookingDate.endDate).format('YYYY-MM-DD')
            : '';
        const start_date = bookingDate.startDate
            ? moment(bookingDate.startDate).format('YYYY-MM-DD')
            : '';

        const formData = new FormData();
        formData.append('pet_type', selectedPetType.pet_type);
        formData.append('pet_pks', selectedPetPk);
        formData.append('address_pk', selectedAddressPk);
        formData.append('start_date', start_date);
        formData.append('end_date', end_date);
        formData.append('food_needed', foodNeeded);

        usersConfigCustomer
            .post(`pts-booking-using-card/${stayPk}/`, formData, {
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
        if (selectedPetPk.length !== 0 && selectedAddressPk !== undefined) {
            stayBooking();
        } else if (selectedPetPk.length === 0) {
            toast.show('Please Select a Pet', {type: 'danger'});
        } else if (
            selectedAddressPk === null ||
            selectedAddressPk === '' ||
            selectedAddressPk === undefined
        ) {
            toast.show('Please Select an Address', {type: 'danger'});
        } else {
            console.log('select just pk');
        }
    };

    const handleCardPay = () => {
        if (
            selectedPetPk.length !== 0 &&
            selectedAddressPk !== undefined &&
            selectedCard !== undefined &&
            selectedCard.length !== 0 &&
            selectedCard.length !== null
        ) {
            stayBookingCard();
        } else if (selectedPetPk.length === 0) {
            toast.show('Please Select a Pet', {type: 'danger'});
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
            console.log('select just pk');
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
                    />
                </View>
                <BookingDetails
                    setEditModalVisible={setEditModalVisible}
                    onPress={() => {
                        setCalModalVisible(true);
                    }}
                    bookingDate={bookingDate}
                    petDetails={petDetails}
                    selectedPetType={selectedPetType}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    setSelectedItems1={setSelectedItems1}
                    selectedPetPk={selectedPetPk}
                    setSelectedPetPk={setSelectedPetPk}
                    selected1={selected1}
                    setSelected1={setSelected1}
                    selected={selected}
                    setSelected={setSelected}
                    state={state}
                    setUserModal={setUserModal}
                    setScreen={setScreen}
                />
                <PriceDetails
                    bookingDate={bookingDate}
                    selectedItems1={selectedItems1}
                    Food_Price={Food_Price}
                    price_per_day={selectedPetType.price_per_day}
                    numberOfDays={numberOfDays}
                    selected={selected}
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
                            state={state}
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
                        <CalendarBookingPlace
                            onDateRangeSelected={handleDateRangeSelected}
                            setCalModalVisible={setCalModalVisible}
                            defaultDateRange={bookingDate}
                            id={stayPk}
                            categoryId={categoryId}
                        />
                    </View>
                )}
            </Modal>
            {state?.userData?.isTermsAndCondition ? (
                <Modal
                    isVisible={editModalVisible}
                    animationInTiming={400}
                    animationOutTiming={400}
                    animationIn={'slideInUp'}
                    backdropOpacity={0.2}
                    useNativeDriver={false}
                    useNativeDriverForBackdrop={true}
                    style={{
                        margin: 0,
                        marginTop:
                            Platform.OS === 'ios'
                                ? StatusBarManager.HEIGHT +
                                  SIZES.height * 0.009 +
                                  SIZE(30)
                                : StatusBarManager.HEIGHT + SIZE(20),
                    }}
                    onBackdropPress={() => setEditModalVisible(false)}
                    onBackButtonPress={() => setEditModalVisible(false)}
                    propagateSwipe={true}
                    avoidKeyboard={true}>
                    <AddCustomerPetDetails
                        forClose={true}
                        fromList={true}
                        setEditModalVisible={setEditModalVisible}
                        clearAll={clearAll}
                        addMyPet={addMyPet}
                        upToDateImage={upToDateImage}
                        setUpToDateImage={setUpToDateImage}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedDateTwo={selectedDateTwo}
                        setSelectedDateTwo={setSelectedDateTwo}
                        categoryValue={categoryValue}
                        setCategoryValue={setCategoryValue}
                        breedValue={breedValue}
                        setBreedValue={setBreedValue}
                        ckeck={ckeck}
                        setCheck={setCheck}
                        ckeckInsurance={ckeckInsurance}
                        setckeckInsurance={setckeckInsurance}
                        ckeckTerms={ckeckTerms}
                        setCkeckTerms={setCkeckTerms}
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        insuranceDocuments={insuranceDocuments}
                        setInsuranceDocuments={setInsuranceDocuments}
                        vaccination={vaccination}
                        setVaccination={setVaccination}
                        nameAs={nameAs}
                        setNameAs={setNameAs}
                        ageValue={ageValue}
                        setAgeValue={setAgeValue}
                        setBreedType={setBreedType}
                        petType={petType}
                        setPetType={setPetType}
                        setSection={setSection}
                        setArrival={setArrival}
                        section={section}
                        arrival={arrival}
                        setIsLoading={setIsLoading}
                        ageGroup={ageGroup}
                        setAgeGroup={setAgeGroup}
                        sexValue={sexValue}
                        setSexValue={setSexValue}
                        selectedDateThree={selectedDateThree}
                        setSelectedDateThree={setSelectedDateThree}
                        submitLoading={submitLoading}
                    />
                </Modal>
            ) : (
                <Modal
                    isVisible={editModalVisible}
                    animationInTiming={400}
                    animationOutTiming={400}
                    animationIn={'slideInUp'}
                    backdropOpacity={0.2}
                    useNativeDriver={false}
                    useNativeDriverForBackdrop={true}
                    style={{
                        margin: 0,
                        marginTop:
                            Platform.OS === 'ios'
                                ? StatusBarManager.HEIGHT +
                                  SIZES.height * 0.008 +
                                  SIZE(0)
                                : StatusBarManager.HEIGHT - SIZE(20),
                    }}
                    onBackdropPress={() => setEditModalVisible(false)}
                    onBackButtonPress={() => setEditModalVisible(false)}
                    propagateSwipe={true}
                    avoidKeyboard={true}>
                    <TermsConditions
                        close={setEditModalVisible}
                        termsAccept={true}
                    />
                </Modal>
            )}
            {/* Auth Modal */}
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

export default BookingSummary;

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
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        marginTop: SIZE(5),
        textAlign: 'right',
    },
});
