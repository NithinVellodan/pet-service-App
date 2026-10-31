import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    NativeModules,
    Platform,
    ActivityIndicator,
    Share,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

// packages
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-notifications';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {
    ApiSectionServiceProvider,
    serviceProviderPetSingle,
    serviceProviderPlaceToStaySingle,
} from '../main/ApiSectionServiceProvider';
import {Context} from '../../contexts/Store';
import {serviceProviderConfig} from '../../../axiosConfig';
import {serviceProviderPlaceToStayAddBreedList} from '../common/ApiGeneral';
import CustomToast from '../../components/toast/CustomToast';

//components
import ReviewsProvider from './includes/ReviewsProvider';
import AboutProvider from './includes/AboutProvider';
import ProviderFacilities from './includes/ProviderFacilities';
import ProviderAccomodation from './includes/ProviderAccomodation';
import EditModal from './includes/EditModal';
import PriceTo from './includes/PriceTo';
import HealthSectionProvider, {
    Characteristics,
} from './includes/HealthSectionProvider';
import AddYourPetDetails from '../detail/AddYourPetDetails';
import Spotlight from './includes/Spotlight';
import BookingsSingle from './includes/BookingsSingle';
import MyPetMore from '../Profile-related/MyPetMore';
import DisableOption from './includes/DisableOption';
import BreedDetail from '../detail/BreedDetail';
import InternalServerError from '../error/InternalServerError';
import PageNotFound from '../error/PageNotFound';

//images and logos
import CloseIcon from '../../assets/icons/close-icon-blue.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import Edit from '../../assets/icons/edit.svg';
import ToolTip from '../../assets/icons/tooltip.svg';
import ShareIcon from '../../assets/icons/share.svg';

const ServiceProviderSinglePage = ({route}) => {
    const navigation = useNavigation();
    const {state} = useContext(Context);
    const {StatusBarManager} = NativeModules;
    const toastRef = useRef();

    //states
    const [errorStatus, setErrorStatus] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent = {modalContent}] = useState(
        route?.params?.type === 'Place_ToStay' ? 'PlaceDetail' : 'add-pet',
    );
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState('');
    const [bookingID, setBookingID] = useState('');
    const [scrollY, setScrollY] = useState(0);
    const [isShow, setIsShow] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);
    const [tempId, setTempId] = useState(false);
    const [tempRemarks, setTempRemarks] = useState();
    const [petIndex, setPetIndex] = useState(undefined);
    const [singlePage, setSinglePage] = useState();
    const [singlePagePet, setSinglePagePet] = useState();
    const [reviews, setReviews] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [isSelectedCategories, setIsSelectedCategories] = useState([]);
    const [petType, setPetType] = useState();
    const [pricePerDay, setPricePerDay] = useState();
    const [isOn, setIsOn] = useState();
    const [bookingStatus, setBookingStatus] = useState();
    const [color, setColor] = useState();
    const [weight, setWeight] = useState();
    const [age, setAge] = useState();
    const [petPriceData, setPetPriceData] = useState([]);
    const [characteristics, setCharacteristics] = useState([]);
    const [removedFAcilityPk, setRemovedFAcilityPk] = useState([]);
    const [selectedCategoriesAddModal, setSelectedCategoriesAddModal] =
        useState([]);
    const [selectedFilter, setSelectedFilter] = useState(
        route?.params?.type === 'Place_ToStay' ? 'place-to-stay' : 'borrow-pet',
    );

    const is_provider = true;
    const pk = route.params.pk;

    //place states
    const [title, setTitle] = useState();
    const [phone, setPhone] = useState();
    const [description, setDescription] = useState();
    const [aboutService, setAboutService] = useState('');
    const [addressText, setAddressText] = useState();
    const [location, setLocation] = useState();
    const [images, setImages] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [facilityImages, setFacilityImages] = useState([]);
    const [facilityPK, setFacilityPK] = useState([]);
    const [geoAddressText, setGeoAddressText] = useState();
    const [exactLocation, setExactLocation] = useState({
        latitude: '',
        longitude: '',
    });
    const finalLocation = geoAddressText ? geoAddressText : addressText;

    const [petCharacteristics, setPetCharacteristics] = useState([]);
    const [breedType, setBreedType] = useState([]);
    const [section, setSection] = useState(null);
    const [arrival, setArrival] = useState();
    const [categoryValue, setCategoryValue] = useState(null);
    const [breedValue, setBreedValue] = useState(null);
    const [selectedPets, setSelectedPets] = useState([]);
    const [ckeck, setCheck] = useState(false);
    const [ckeckInsurance, setckeckInsurance] = useState(false);
    const [ckeckTerms, setCkeckTerms] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateTwo, setSelectedDateTwo] = useState(null);
    const [selectedDateThree, setSelectedDateThree] = useState('');
    const [geoAddressText1, setGeoAddressText1] = useState();
    const [addressText1, setAddressText1] = useState();
    const [exactLocation1, setExactLocation1] = useState({
        latitude: '',
        longitude: '',
    });
    const [ageValue, setAgeValue] = useState(null);
    const [sexValue, setSexValue] = useState(null);
    const [colorValue, setColorValue] = useState('');
    const [description1, setDescription1] = useState('');
    const [medicalCondition, setMedicalCondition] = useState(null);
    const [vaccination, setVaccination] = useState([]);
    const [insuranceDocuments, setInsuranceDocuments] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [upToDateImage, setUpToDateImage] = useState([]);
    const [removedImagePk, setRemovedImagePk] = useState([]);
    const [facitlityClone, setFacitlityClone] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [breedList, setBreedList] = useState([]);
    const [editableInsureDoc, setEditableInsureDoc] = useState([]);
    const [editableVaccinationDoc, setEditableVaccinationDoc] = useState([]);
    const [ageGroup, setAgeGroup] = useState([]);
    const [medicalGroup, setMedicalGroup] = useState([]);
    const finalLocation1 = geoAddressText1 ? geoAddressText1 : addressText1;
    const [nameAs, setNameAs] = useState('');
    const [respondData, setRespondData] = useState('');
    const [likesData, setLikesData] = useState('');
    const [habitsData, setHabitsData] = useState('');
    const [petName, setPetName] = useState('');

    useEffect(() => {
        setPetPriceData([
            {
                id: 1,
                name: color,
                option: 'Color',
            },
            {
                id: 2,
                name: `${weight} kg`,
                option: 'Weight',
            },
            {
                id: 3,
                name: age,
                option: 'Age',
            },
        ]);
    }, [color, weight, age]);

    useEffect(() => {
        if (singlePage && route?.params?.type === 'Place_ToStay') {
            setUpToDateImage(singlePage.gallery);
            setTitle(singlePage.title);
            setGeoAddressText(singlePage.location_data.location);
            setDescription(singlePage.description);
            setSelectedCategories(singlePage.pet_details);
            setIsSelectedCategories(singlePage.pet_details);
            setSelectedFacilities(singlePage.facilities);
            setFacilityPK(singlePage.facilities_pks);
            setFacitlityClone(singlePage.facilities);
            setAboutService(singlePage.about_services);
            setExactLocation(singlePage.location_data);
            setReviews(singlePage.reviews);
            setBookings(singlePage.recent_bookings);
            setIsOn(singlePage.is_enabled);
            setPhone(singlePage.phone);
            setImages([]);
        } else if (singlePagePet && route?.params?.type === 'BorrowAPet') {
            setSelectedImages([]);
            setUpToDateImage(singlePagePet.gallery);
            setTitle(singlePagePet.pet_breed);
            setGeoAddressText(singlePagePet.location_data.location);
            setDescription(singlePagePet.description);
            setPricePerDay(singlePagePet.price_per_day);
            setLikesData(singlePagePet.like);
            setRespondData(singlePagePet.response);
            setHabitsData(singlePagePet.worst_habit);
            setPetName(singlePagePet.name);
            setExactLocation(singlePagePet.location_data);
            setReviews(singlePagePet.reviews);
            setBookings(singlePagePet.recent_bookings);
            setIsOn(singlePagePet.is_active);
            setColor(singlePagePet.color);
            setColorValue(singlePagePet.color);
            setWeight(singlePagePet.weight);
            setAge(singlePagePet.age);
            setCheck(singlePagePet.is_vaccinated);
            setckeckInsurance(singlePagePet.is_insured);
            const formattedDate = moment(
                singlePagePet.insurance_expiry,
            ).toISOString();
            setSelectedDate(formattedDate);
            const formattedDateTwo = moment(
                singlePagePet.vaccinated_expiry,
            ).toISOString();
            setSelectedDateTwo(formattedDateTwo);
            setSelectedDateThree(singlePagePet.date_of_birth);
            setEditableInsureDoc(singlePagePet.insurance_document);
            setEditableVaccinationDoc(singlePagePet.vaccination_document);
            setCharacteristics(singlePagePet.pet_characteristics);
            setBreedType(singlePagePet.pet_breed_id);
            setBreedValue(singlePagePet.pet_breed);
            setSection(singlePagePet.pet_type_id);
            setCategoryValue(singlePagePet.pet_type);
            setAgeValue(
                singlePagePet.age
                    ? {
                          id: singlePagePet.age_id,
                          title: singlePagePet.age,
                      }
                    : null,
            );
            setSexValue(
                singlePagePet.sex === 'Male'
                    ? {
                          label: 'Male',
                          value: '10',
                      }
                    : singlePagePet.sex === 'Female'
                    ? {
                          label: 'Female',
                          value: '20',
                      }
                    : {
                          label: 'Not Specified',
                          value: '30',
                      },
            );
            setMedicalCondition(
                singlePagePet.medical_conditions
                    ? {
                          id: singlePagePet.medical_conditions_id,
                          title: singlePagePet.medical_conditions,
                      }
                    : null,
            );
        }
    }, [singlePage, singlePagePet, editModalVisible]);

    serviceProviderPlaceToStaySingle(
        setSinglePage,
        pk,
        loading,
        setRefreshing,
        setErrorStatus,
    );
    serviceProviderPetSingle(
        setSinglePagePet,
        pk,
        loading,
        setRefreshing,
        setErrorStatus,
    );
    ApiSectionServiceProvider(selectedFilter, setBookingStatus);
    serviceProviderPlaceToStayAddBreedList(setBreedList, pk, loading);

    const openModal = facility => {
        setSelectedFacility(facility);
        setModalVisible(true);
    };

    //addBreed function
    const editBreed = async () => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;
        const pk = route.params.pk;
        const formData = new FormData();
        formData.append('about_services', aboutService);
        formData.append('description', description);
        formData.append('latitude', exactLocation.latitude);
        formData.append('location', finalLocation);
        formData.append('longitude', exactLocation.longitude);
        formData.append('pet_types', JSON.stringify(selectedCategories));
        formData.append('phone', phone);
        formData.append('title', title);
        removedImagePk.forEach((id, index) => {
            formData.append(`removed_image_pks`, id);
        });
        images.forEach((image, index) => {
            formData.append(`images`, {
                uri: image.path,
                type: image.type,
                name: image.name,
            });
        });
        facilityPK.forEach((id, index) => {
            formData.append(`facility_pk`, id);
        });
        removedFAcilityPk.forEach((id, index) => {
            formData.append(`removed_facility_pks`, id);
        });
        facilityImages.forEach((image, index) => {
            formData.append(image.id, {
                uri: image.path,
                type: image.type,
                name: image.name,
            });
        });
        serviceProviderConfig
            .put(`update-place-to-stay/${pk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setSubmitLoading(false);
                setEditModalVisible(false);
                setModalContent('PlaceDetail');
                setLoading(prev => !prev);
            })
            .catch(error => {
                setSubmitLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

    //addBreed function
    const addPBreed = async () => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;
        const pk = route.params.pk;
        const formData = new FormData();
        selectedCategoriesAddModal.forEach((category, index) => {
            formData.append('pet_type', category.id);
            formData.append('no_of_pets', category.no_of_pets);
            formData.append('price_per_day', category.price_per_day);
            formData.append('food_price', category.food_price);
            formData.append('food_available', category.food_available);
            formData.append('remarks', category.remarks);
        });
        serviceProviderConfig
            .post(`add-breed/${pk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setSubmitLoading(false);
                setLoading(prev => !prev);
            })
            .catch(error => {
                setSubmitLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

    //enable or disable place
    const togglePlace = async () => {
        const token = state.userData.accessToken;
        const pk = route.params.pk;

        try {
            setSubmitLoading(true);
            if (route?.params?.type === 'Place_ToStay') {
                const response = await serviceProviderConfig.put(
                    `enable-disable-stay/${pk}/`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                setSubmitLoading(false);
            } else if (route?.params?.type === 'BorrowAPet') {
                const response = await serviceProviderConfig.put(
                    `enable-disable-pet/${pk}/`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                setSubmitLoading(false);
            } else {
                setSubmitLoading(false);
                console.log('Invalid type specified');
            }
        } catch (error) {
            setSubmitLoading(false);
            console.log('error toggle => ', error.response.data);
        }
    };

    // edit pet function
    const editPet = async () => {
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
        const pk = route.params.pk;
        const formData = new FormData();
        formData.append('pet_type', section);
        formData.append('pet_breed', breedType);
        removedImagePk.forEach((id, index) => {
            formData.append(`removed_image_pks`, id);
        });
        selectedImages.forEach((image, index) => {
            formData.append(`images`, {
                uri: image.uri,
                type: image.type,
                name: image.name,
            });
        });
        formData.append('date_of_birth', formattedDateStringDOB);
        formData.append('weight', weight);
        formData.append('sex', sexValue?.value);
        formData.append('color', colorValue);
        formData.append('latitude', exactLocation?.latitude);
        formData.append('location', finalLocation);
        formData.append('longitude', exactLocation?.longitude);
        formData.append('price_per_day', pricePerDay);
        formData.append('like', likesData);
        formData.append('response', respondData);
        formData.append('worst_habit', habitsData);
        formData.append('name', petName);
        formData.append('description', description);
        formData.append('medical_conditions', medicalCondition?.id);
        formData.append('vaccinated_expiry', formattedDateStringVaccination);
        formData.append('insurance_expiry', formattedDateString);
        selectedPets.forEach((id, index) => {
            formData.append(`pet_characteristics`, id);
        });
        formData.append('is_insured', ckeckInsurance);
        if (
            ckeckInsurance &&
            Array.isArray(insuranceDocuments) &&
            insuranceDocuments.length !== 0
        ) {
            formData.append('insurance_document', {
                uri: insuranceDocuments[0].uri,
                type: insuranceDocuments[0].type,
                name: insuranceDocuments[0].name,
            });
        }
        formData.append('is_vaccinated', ckeck);
        if (ckeck && Array.isArray(vaccination) && vaccination.length !== 0) {
            formData.append('vaccination_document', {
                uri: vaccination[0].uri,
                type: vaccination[0].type,
                name: vaccination[0].name,
            });
        }
        try {
            await serviceProviderConfig
                .put(`update-provider-pet/${pk}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    setSubmitLoading(false);
                    setEditModalVisible(false);
                    setModalContent('add-pet');
                    setLoading(prev => !prev);
                })
                .catch(error => {
                    setSubmitLoading(false);
                    console.log('error try => ', error.response.data);
                });
        } catch (error) {
            setSubmitLoading(false);
            console.log('error => ', error);
        }
    };

    const handleScroll = event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrollY(offsetY);
    };
    const ShareUrl = () => {
        const message =
            singlePage && route?.params?.type === 'Place_ToStay'
                ? singlePage.shareable_link
                : singlePagePet.shareable_link;

        Share.share({
            message: message,
        })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    };

    return (
        <>
            {refreshing ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(185),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : errorStatus === 500 ? (
                <InternalServerError />
            ) : errorStatus === 404 ? (
                <PageNotFound />
            ) : (
                <View style={styles.mainContainer}>
                    <View
                        style={[
                            styles.commonButtonContainer,
                            {
                                backgroundColor:
                                    scrollY >=
                                    Dimensions.get('window').height * 0.35
                                        ? '#F7F7F7'
                                        : 'transparent',
                                borderBottomWidth:
                                    scrollY >=
                                    Dimensions.get('window').height * 0.35
                                        ? SIZE(1)
                                        : 0,
                                borderColor: '#d3d3d3',
                            },
                        ]}>
                        <View style={styles.topButtonLeft}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                activeOpacity={0.8}
                                style={styles.commonButtonMain}>
                                <View style={styles.commonTopButtons}>
                                    <ArrowLeft width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topButtonRight}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.commonButtonMain,
                                    {marginRight: SIZE(16)},
                                ]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        ShareUrl();
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.commonTopButtons}>
                                    <ShareIcon width={'100%'} height={'100%'} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                            {is_provider == true ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        setEditModalVisible(true);
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.commonButtonMain}>
                                    <View style={styles.commonTopButtons}>
                                        <Edit width={'100%'} height={'100%'} />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        setWishlist(prev => !prev);
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.commonButtonMain}>
                                    <View style={styles.commonTopButtons}>
                                        {wishlist ? (
                                            <HeartBig
                                                width={'100%'}
                                                height={'100%'}
                                            />
                                        ) : (
                                            <WishlistIconBlack
                                                width={'100%'}
                                                height={'100%'}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <ScrollView
                        onScroll={handleScroll}
                        bounces={false}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.subContainer}>
                        <Spotlight
                            togglePlace={togglePlace}
                            pricePerDay={pricePerDay}
                            setIsOn={setIsOn}
                            isOn={isOn}
                            description={
                                description ? description : description1
                            }
                            finalLocation={
                                finalLocation ? finalLocation : finalLocation1
                            }
                            title={title}
                            images={upToDateImage}
                            navigation={navigation}
                            is_provider={true}
                            setEditModalVisible={setEditModalVisible}
                        />
                        <View style={styles.detailsSection}>
                            {route?.params?.type === 'Place_ToStay' && (
                                <>
                                    <ProviderAccomodation
                                        isShow={isShow}
                                        tempId={tempId}
                                        setPetIndex={setPetIndex}
                                        setTempRemarks={setTempRemarks}
                                        setIsShow={setIsShow}
                                        setTempId={setTempId}
                                        selectedCategories={selectedCategories}
                                        setSelectedCategories={
                                            setSelectedCategories
                                        }
                                        addPBreed={addPBreed}
                                        facilityImages={facilityImages}
                                        setFacilityImages={setFacilityImages}
                                        setFacilityPK={setFacilityPK}
                                        facilityPK={facilityPK}
                                        setEditModalVisible={
                                            setEditModalVisible
                                        }
                                        setModalContent={setModalContent}
                                        setSelectedCategoriesAddModal={
                                            setSelectedCategoriesAddModal
                                        }
                                        selectedCategoriesAddModal={
                                            selectedCategoriesAddModal
                                        }
                                        breedList={breedList}
                                    />
                                    {isShow === tempId && (
                                        <View
                                            style={{
                                                borderWidth: SIZE(0.6),
                                                borderColor: '#E2E2E2',
                                                position: 'absolute',
                                                right: SIZE(70),
                                                top:
                                                    petIndex !== undefined
                                                        ? SIZE(
                                                              100 +
                                                                  petIndex *
                                                                      SIZE(40),
                                                          )
                                                        : SIZE(100),
                                                width: SIZE(180),
                                                height: SIZE(70),
                                                zIndex: 1000,
                                                backgroundColor: '#fff',
                                                borderRadius: SIZE(8),
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: SIZE(10),
                                            }}>
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    transform: [
                                                        {rotate: '90deg'},
                                                    ],
                                                    left: SIZE(178.5),
                                                    zIndex: -100,
                                                }}>
                                                <ToolTip
                                                    width={SIZE(18)}
                                                    height={SIZE(18)}
                                                />
                                            </View>

                                            <Text
                                                style={{
                                                    color: '#969696',
                                                    fontFamily: FONTS.medium,
                                                    fontSize: SIZE(12),
                                                }}>
                                                {tempRemarks}
                                            </Text>
                                        </View>
                                    )}
                                </>
                            )}
                            {route?.params?.type === 'BorrowAPet' && (
                                <PriceTo item={petPriceData} />
                            )}
                            {route?.params?.type === 'BorrowAPet' && (
                                <HealthSectionProvider
                                    insurance={ckeckInsurance}
                                    vaccination={ckeck}
                                    route={route}
                                />
                            )}
                            {route?.params?.type === 'BorrowAPet' &&
                                characteristics.length != 0 && (
                                    <Characteristics
                                        characteristics={characteristics}
                                        route={route}
                                    />
                                )}

                            {route?.params?.type === 'Place_ToStay' && (
                                <ProviderFacilities
                                    selectedFacilities={selectedFacilities}
                                    openModal={openModal}
                                />
                            )}
                            {exactLocation?.latitude ? (
                                <AboutProvider
                                    route={route}
                                    finalLocation={
                                        finalLocation
                                            ? finalLocation
                                            : finalLocation1
                                    }
                                    aboutService={aboutService}
                                    exactLocation={
                                        exactLocation.latitude != '' &&
                                        exactLocation.longitude != ''
                                            ? exactLocation
                                            : exactLocation1
                                    }
                                />
                            ) : null}
                            {reviews.length != 0 && (
                                <ReviewsProvider
                                    route={route}
                                    reviews={reviews}
                                    state={state}
                                    refreshing={loading}
                                    setRefreshing={setLoading}
                                />
                            )}
                            <View style={styles.recentBookingContainer}>
                                {bookings.length != 0 ? (
                                    <>
                                        <View style={styles.reviewsHead}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.reviewsText}>
                                                Recent Bookings
                                            </Text>
                                        </View>
                                        {bookings
                                            .slice(0, 4)
                                            .map((detail, index) => (
                                                <BookingsSingle
                                                    navigation={navigation}
                                                    state={state}
                                                    key={index}
                                                    detail={detail}
                                                    index={index}
                                                    bookingID={bookingID}
                                                    setBookingID={setBookingID}
                                                    route={route?.params}
                                                />
                                            ))}
                                    </>
                                ) : (
                                    ''
                                )}
                            </View>
                            <View
                                style={{
                                    marginBottom: SIZE(20),
                                }}>
                                {is_provider && (
                                    <DisableOption
                                        togglePlace={togglePlace}
                                        setIsOn={setIsOn}
                                        isOn={isOn}
                                        route={route}
                                    />
                                )}
                            </View>
                        </View>
                    </ScrollView>
                    <Modal
                        onBackButtonPress={() => {
                            setModalVisible(false);
                        }}
                        onBackdropPress={() => {
                            setModalVisible(false);
                        }}
                        isVisible={modalVisible}
                        backdropOpacity={0.4}
                        style={styles.AccModalContainer}
                        propagateSwipe={true}
                        useNativeDriver={false}
                        useNativeDriverForBackdrop={true}
                        onSwipeComplete={() => setModalVisible(false)}
                        swipeDirection={['down']}
                        animationType={'fade'}
                        animationIn={'slideInUp'}
                        animationInTiming={200}
                        animationOutTiming={200}>
                        {selectedFacility && (
                            <View style={styles.modalMain}>
                                <View
                                    style={{
                                        marginBottom: SIZE(24),
                                    }}>
                                    <View style={styles.sliderLine}></View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(false);
                                        }}
                                        activeOpacity={0.8}
                                        hitSlop={10}
                                        style={styles.closeIcon}>
                                        <CloseIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modalTop}>
                                    <View style={styles.modalTopLeft}>
                                        <View style={styles.facilityModalIcon}>
                                            <Image
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: SIZE(32),
                                                }}
                                                source={{
                                                    uri: selectedFacility.icon,
                                                }}
                                            />
                                        </View>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.facilityName}>
                                            {selectedFacility.title}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.modalBottom}>
                                    <Image
                                        style={styles.modalImage}
                                        source={{uri: selectedFacility.image}}
                                    />
                                </View>
                            </View>
                        )}
                    </Modal>
                    <Modal
                        isVisible={editModalVisible}
                        animationInTiming={400}
                        animationOutTiming={400}
                        animationIn={'slideInUp'}
                        backdropOpacity={0.2}
                        useNativeDriver={false}
                        useNativeDriverForBackdrop={true}
                        deviceHeight={SIZES.height}
                        style={[
                            styles.modalContainerTwo,
                            {
                                screenBackgroundcolor: 'transparent',
                                modalPresentationStyle: 'overCurrentContext',
                                marginTop:
                                    Platform.OS === 'ios'
                                        ? StatusBarManager.HEIGHT +
                                          SIZES.height * 0.009 -
                                          SIZE(10)
                                        : StatusBarManager.HEIGHT - SIZE(20),
                            },
                        ]}
                        onBackdropPress={() => {
                            setEditModalVisible(false);
                            setModalContent(
                                route?.params?.type === 'Place_ToStay'
                                    ? 'PlaceDetail'
                                    : 'add-pet',
                            );
                        }}
                        propagateSwipe={true}
                        avoidKeyboard={true}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: '#f7f7f7',
                            }}>
                            <TouchableOpacity
                                style={[styles.buttonIcon]}
                                disabled={submitLoading}
                                onPress={() => {
                                    setEditModalVisible(false);
                                    if (route?.params?.type != 'BorrowAPet') {
                                        setModalContent('PlaceDetail');
                                    } else {
                                        setModalContent('add-pet');
                                    }
                                }}>
                                <CloseIcon width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                            {route?.params?.type === 'BorrowAPet' ? (
                                <>
                                    <KeyboardAwareScrollView
                                        extraScrollHeight={SIZE(100)}
                                        bounces={false}
                                        keyboardShouldPersistTaps={'handled'}
                                        showsVerticalScrollIndicator={false}>
                                        {modalContent === 'add-pet' && (
                                            <AddYourPetDetails
                                                editPet={editPet}
                                                isEdit={true}
                                                isEditModal={true}
                                                setEditModalVisible={
                                                    setEditModalVisible
                                                }
                                                petType={petType}
                                                setPetType={setPetType}
                                                petCharacteristics={
                                                    petCharacteristics
                                                }
                                                setPetCharacteristics={
                                                    setPetCharacteristics
                                                }
                                                characteristics={
                                                    characteristics
                                                }
                                                breedType={breedType}
                                                setBreedType={setBreedType}
                                                section={section}
                                                setSection={setSection}
                                                arrival={arrival}
                                                setArrival={setArrival}
                                                categoryValue={categoryValue}
                                                setCategoryValue={
                                                    setCategoryValue
                                                }
                                                breedValue={breedValue}
                                                setBreedValue={setBreedValue}
                                                selectedPets={selectedPets}
                                                setSelectedPets={
                                                    setSelectedPets
                                                }
                                                ckeck={ckeck}
                                                setCheck={setCheck}
                                                ckeckInsurance={ckeckInsurance}
                                                setckeckInsurance={
                                                    setckeckInsurance
                                                }
                                                ckeckTerms={ckeckTerms}
                                                setCkeckTerms={setCkeckTerms}
                                                selectedDate={selectedDate}
                                                setSelectedDate={
                                                    setSelectedDate
                                                }
                                                selectedDateTwo={
                                                    selectedDateTwo
                                                }
                                                setSelectedDateTwo={
                                                    setSelectedDateTwo
                                                }
                                                geoAddressText={geoAddressText}
                                                setGeoAddressText={
                                                    setGeoAddressText
                                                }
                                                addressText={addressText1}
                                                setAddressText={setAddressText}
                                                exactLocation={exactLocation}
                                                setExactLocation={
                                                    setExactLocation
                                                }
                                                ageValue={ageValue}
                                                setAgeValue={setAgeValue}
                                                sexValue={sexValue}
                                                setSexValue={setSexValue}
                                                colorValue={colorValue}
                                                setColorValue={setColorValue}
                                                weight={weight}
                                                setWeight={setWeight}
                                                pricePerDay={pricePerDay}
                                                setPricePerDay={setPricePerDay}
                                                description={description}
                                                setDescription={setDescription}
                                                medicalCondition={
                                                    medicalCondition
                                                }
                                                setMedicalCondition={
                                                    setMedicalCondition
                                                }
                                                vaccination={vaccination}
                                                setVaccination={setVaccination}
                                                insuranceDocuments={
                                                    insuranceDocuments
                                                }
                                                setInsuranceDocuments={
                                                    setInsuranceDocuments
                                                }
                                                selectedImages={selectedImages}
                                                setSelectedImages={
                                                    setSelectedImages
                                                }
                                                finalLocation={finalLocation}
                                                upToDateImage={upToDateImage}
                                                setUpToDateImage={
                                                    setUpToDateImage
                                                }
                                                removedImagePk={removedImagePk}
                                                setRemovedImagePk={
                                                    setRemovedImagePk
                                                }
                                                setEditableInsureDoc={
                                                    setEditableInsureDoc
                                                }
                                                editableInsureDoc={
                                                    editableInsureDoc
                                                }
                                                editableVaccinationDoc={
                                                    editableVaccinationDoc
                                                }
                                                setEditableVaccinationDoc={
                                                    setEditableVaccinationDoc
                                                }
                                                ageGroup={ageGroup}
                                                setAgeGroup={setAgeGroup}
                                                medicalGroup={medicalGroup}
                                                setMedicalGroup={
                                                    setMedicalGroup
                                                }
                                                setModalContent={
                                                    setModalContent
                                                }
                                                setPetName={setPetName}
                                                petName={petName}
                                                selectedDateThree={
                                                    selectedDateThree
                                                }
                                                setSelectedDateThree={
                                                    setSelectedDateThree
                                                }
                                                toastRef={toastRef}
                                            />
                                        )}
                                        {modalContent === 'add-more' && (
                                            <ScrollView
                                                showsVerticalScrollIndicator={
                                                    false
                                                }
                                                bounces={false}
                                                style={{
                                                    height: '100%',
                                                    backgroundColor: '#f7f7f7',
                                                }}>
                                                <MyPetMore
                                                    nameAs={petName}
                                                    setNameAs={setNameAs}
                                                    setRespondData={
                                                        setRespondData
                                                    }
                                                    setHabitsData={
                                                        setHabitsData
                                                    }
                                                    setLikesData={setLikesData}
                                                    habitsData={habitsData}
                                                    likesData={likesData}
                                                    respondData={respondData}
                                                    modalContent={modalContent}
                                                    setModalContent={
                                                        setModalContent
                                                    }
                                                    forClose={true}
                                                    editPet={editPet}
                                                    isEdit={true}
                                                    setEditModalVisible={
                                                        setEditModalVisible
                                                    }
                                                    submitLoading={
                                                        submitLoading
                                                    }
                                                />
                                            </ScrollView>
                                        )}
                                    </KeyboardAwareScrollView>
                                </>
                            ) : (
                                <KeyboardAwareScrollView
                                    keyboardShouldPersistTaps={'handled'}
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    extraScrollHeight={SIZE(100)}>
                                    {modalContent === 'PlaceDetail' && (
                                        <EditModal
                                            setModalContent={setModalContent}
                                            setEditModalVisible={
                                                setEditModalVisible
                                            }
                                            setTitle={setTitle}
                                            setPhone={setPhone}
                                            setDescription={setDescription}
                                            setAboutService={setAboutService}
                                            setAddressText={setAddressText}
                                            setLocation={setLocation}
                                            setImages={setImages}
                                            title={title}
                                            phone={phone}
                                            description={description}
                                            aboutService={aboutService}
                                            addressText={addressText}
                                            location={location}
                                            images={images}
                                            setExactLocation={setExactLocation}
                                            setGeoAddressText={
                                                setGeoAddressText
                                            }
                                            geoAddressText={geoAddressText}
                                            exactLocation={exactLocation}
                                            finalLocation={finalLocation}
                                            fromSingle={true}
                                            isEdit={true}
                                            upToDateImage={upToDateImage}
                                            setUpToDateImage={setUpToDateImage}
                                            removedImagePk={removedImagePk}
                                            setRemovedImagePk={
                                                setRemovedImagePk
                                            }
                                            editBreed={editBreed}
                                            toastRef={toastRef}
                                        />
                                    )}
                                    {modalContent === 'BreedDetail' && (
                                        <BreedDetail
                                            setEditModalVisible={
                                                setEditModalVisible
                                            }
                                            selectedCategories={
                                                selectedCategories
                                            }
                                            setSelectedCategories={
                                                setSelectedCategories
                                            }
                                            isSelectedCategories={
                                                isSelectedCategories
                                            }
                                            selectedFacilities={
                                                selectedFacilities
                                            }
                                            setSelectedFacilities={
                                                setSelectedFacilities
                                            }
                                            facilityImages={facilityImages}
                                            setFacilityImages={
                                                setFacilityImages
                                            }
                                            setFacilityPK={setFacilityPK}
                                            facilityPK={facilityPK}
                                            setModalContent={setModalContent}
                                            fromSingle={true}
                                            addPBreed={editBreed}
                                            facitlityClone={facitlityClone}
                                            setFacitlityClone={
                                                setFacitlityClone
                                            }
                                            removedFAcilityPk={
                                                removedFAcilityPk
                                            }
                                            setRemovedFAcilityPk={
                                                setRemovedFAcilityPk
                                            }
                                            submitLoading={submitLoading}
                                        />
                                    )}
                                </KeyboardAwareScrollView>
                            )}
                        </View>
                        <Toast
                            renderToast={toastOptions => {
                                return (
                                    <CustomToast toastOptions={toastOptions} />
                                );
                            }}
                            successColor="#009FD3"
                            warningColor="orange"
                            ref={toastRef}
                            duration={2000}
                            offsetBottom={SIZE(100)}
                        />
                    </Modal>
                </View>
            )}
        </>
    );
};

export default ServiceProviderSinglePage;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    commonButtonContainer: {
        position: 'absolute',
        zIndex: 1000,
        paddingHorizontal: SIZE(20),
        paddingVertical: SIZE(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width,
    },
    topButtonLeft: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonButtonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE(40),
        height: SIZE(40),
        padding: SIZE(8),
        backgroundColor: '#FFF',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(40),
    },
    commonTopButtons: {
        width: SIZE(24),
        height: SIZE(24),
    },
    topButtonRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subContainer: {
        paddingBottom: SIZE(20),
    },

    detailsSection: {
        paddingHorizontal: SIZE(16),
    },

    priceHeading: {
        marginBottom: SIZE(30),
    },
    priceMainText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    priceSubText: {
        color: '#242424',
        fontSize: SIZE(20),
        fontWeight: '500',
        fontFamily: FONTS.medium,
    },

    bookNowMain: {
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(32),
        paddingTop: SIZE(24),
        backgroundColor: '#FFFFFF',
        borderTopWidth: SIZE(1),
        borderTopColor: '#E2E2E2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    leftTop: {
        marginBottom: SIZE(10),
    },
    priceLeft: {
        color: '#242424',
        fontSize: SIZE(24),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    priceRight: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    leftBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookNowCalendar: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(4),
    },
    bookNowDate: {},
    dateTextOne: {
        color: '#686868',
        fontSize: SIZE(12),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    dateTextTwo: {
        color: '#686868',
        fontSize: SIZE(12),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    bookNowRight: {
        paddingVertical: SIZE(14),
        paddingHorizontal: SIZE(32),
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
    },
    bookNowText: {
        color: '#fff',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
    AccModalContainer: {
        justifyContent: 'flex-end',
        margin: 0,
        screenBackgroundColor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
    },
    modalMain: {
        padding: SIZE(20),
        backgroundColor: '#fff',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
    },
    modalTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(16),
        alignItems: 'center',
    },
    modalTopLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sliderLine: {
        width: '15%',
        borderWidth: SIZE(3),
        borderColor: '#009FD3',
        borderRadius: SIZE(100),
        alignSelf: 'center',
    },
    facilityModalIcon: {
        width: SIZE(32),
        height: SIZE(32),
        marginRight: SIZE(16),
    },
    facilityName: {
        height: SIZE(32),
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    closeIcon: {
        width: SIZE(15),
        height: SIZE(15),
        position: 'absolute',
        top: 0,
        right: 0,
    },
    modalBottom: {
        borderRadius: SIZE(8),
        height: SIZE(225),
        overflow: 'hidden',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(40),
    },
    modalContainerTwo: {
        margin: 0,
        width: '100%',
        justifyContent: 'flex-end',
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        overflow: 'hidden',
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
    recentBookingContainer: {
        marginTop: SIZE(8),
        marginBottom: SIZE(20),
    },
    reviewsHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(24),
        alignItems: 'center',
    },
    reviewsText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(24),
    },
    reviewsViewText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(24),
        letterSpacing: 0.5,
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
    },
});
