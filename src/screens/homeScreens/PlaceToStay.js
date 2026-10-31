import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    ActivityIndicator,
    NativeModules,
    Platform,
} from 'react-native';
import React, {useContext, useState, useRef} from 'react';

//packages
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-notifications';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {Context} from '../../contexts/Store';
import {FONTS} from '../../theme/fonts';
import {serviceProviderConfig} from '../../../axiosConfig';
import CustomToast from '../../components/toast/CustomToast';

//components
import EditModal from './includes/EditModal';
import {
    serviceProviderPet,
    serviceProviderPlaceToStayList,
} from '../main/ApiSectionServiceProvider';
import BreedDetail from '../detail/BreedDetail';
import ConfirmationPage from '../detail/ConfirmationPage';
import ConfirmationPageTwo from '../detail/ConfirmationPageTwo';
import Search from './includes/Search';
import MyPetMore from '../Profile-related/MyPetMore';

//images and logos
import LeftArrow from '../../assets/icons/profile-icons/arrow-left.svg';
import SearchIcon from '../../assets/icons/booking/search.svg';
import AddIcon from '../../assets/icons/add.svg';
import LocationBlack from '../../assets/icons/locationblack.svg';
import AddYourPetDetails from '../detail/AddYourPetDetails';
import CloseIcon from '../../assets/icons/close-icon-blue.svg';
import SpotLightLogo from '../../assets/icons/booking/no-data.svg';
import EmptyPlace from '../../assets/icons/emptyplace.svg';

const PlaceToStay = ({navigation, route}) => {
    const {state, dispatch} = useContext(Context);
    const {StatusBarManager} = NativeModules;
    const toastRef = useRef();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    //place states
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [placeList, setPlaceList] = useState([]);
    const [borrowList, setBorrowList] = useState([]);
    const [modalContent, setModalContent = {modalContent}] = useState(
        route?.params?.type != 'BorrowAPet' ? 'PlaceDetail' : 'addPetModal',
    );

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
    const [upToDateImage, setUpToDateImage] = useState([]);
    const [removedImagePk, setRemovedImagePk] = useState([]);
    const [exactLocation, setExactLocation] = useState({
        latitude: '',
        longitude: '',
    });
    const finalLocation = geoAddressText ? geoAddressText : addressText;

    //pet states
    const [petType, setPetType] = useState([]);
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
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateTwo, setSelectedDateTwo] = useState('');
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
    const [weight, setWeight] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [description1, setDescription1] = useState('');
    const [medicalCondition, setMedicalCondition] = useState(null);
    const [vaccination, setVaccination] = useState([]);
    const [insuranceDocuments, setInsuranceDocuments] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [removedFAcilityPk, setRemovedFAcilityPk] = useState([]);

    const finalLocation1 = geoAddressText1 ? geoAddressText1 : addressText1;

    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [ageGroup, setAgeGroup] = useState([]);
    const [medicalGroup, setMedicalGroup] = useState([]);

    const [nameAs, setNameAs] = useState('');
    const [respondData, setRespondData] = useState('');
    const [likesData, setLikesData] = useState('');
    const [habitsData, setHabitsData] = useState('');
    const [petName, setPetName] = useState('');

    //add Place function
    const addPBreed = async image => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;
        const formData = new FormData();
        formData.append('about_services', aboutService);
        formData.append('description', description);
        formData.append('latitude', exactLocation.latitude);
        formData.append('location', finalLocation);
        formData.append('longitude', exactLocation.longitude);
        formData.append('pet_types', JSON.stringify(selectedCategories));
        formData.append('phone', phone);
        formData.append('title', title);
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
        facilityImages.forEach((image, index) => {
            formData.append(image.id, {
                uri: image.path,
                type: image.type,
                name: image.name,
            });
        });
        serviceProviderConfig
            .post('create-place-to-stay/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                clearAll();
                setSubmitLoading(false);
                setEditModalVisible(false);
                setModalContent('PlaceDetail');
                setRefreshing(prev => !prev);
            })
            .catch(error => {
                console.log('error breed try => ', error.response.data);
                setSubmitLoading(false);
            });
    };

    //add Pet function
    const addPet = async image => {
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
        formData.append('weight', weight);
        formData.append('sex', sexValue.value);
        formData.append('color', colorValue);
        formData.append('latitude', exactLocation1.latitude);
        formData.append('location', finalLocation1);
        formData.append('longitude', exactLocation1.longitude);
        formData.append('price_per_day', pricePerDay);
        formData.append('like', likesData);
        formData.append('response', respondData);
        formData.append('worst_habit', habitsData);
        formData.append('name', petName);
        formData.append('description', description1);
        formData.append('medical_conditions', medicalCondition.id);
        formData.append('vaccinated_expiry', formattedDateStringVaccination);
        formData.append('insurance_expiry', formattedDateString);
        selectedPets.forEach((id, index) => {
            formData.append(`pet_characteristics`, id);
        });
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
            await serviceProviderConfig
                .post('create-provider-pet/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    clearAll();
                    setSubmitLoading(false);
                    setEditModalVisible(false);
                    setModalContent('addPetModal');
                    setRefreshing(prev => !prev);
                })
                .catch(error => {
                    console.log('error pet try => ', error.response.data);
                    setSubmitLoading(false);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };
    serviceProviderPet(
        setBorrowList,
        isLoading,
        setIsLoading,
        refreshing,
        searchQuery,
    );
    serviceProviderPlaceToStayList(
        setPlaceList,
        isLoading,
        setIsLoading,
        refreshing,
        searchQuery,
    );

    const clearAll = () => {
        setTitle();
        setPhone();
        setDescription();
        setAboutService('');
        setAddressText();
        setLocation();
        setImages([]);
        setSelectedCategories([]);
        setSelectedFacilities([]);
        setFacilityImages([]);
        setFacilityPK([]);
        setGeoAddressText();
        setUpToDateImage([]);
        setRemovedImagePk([]);
        setExactLocation({latitude: '', longitude: ''});
        setPetType([]);
        setSelectedPets([]);
        setBreedType([]);
        setCategoryValue(null);
        setBreedValue(null);
        setCheck(false);
        setckeckInsurance(false);
        setSelectedDate('');
        setSelectedDateTwo('');
        setSelectedDateThree('');
        setGeoAddressText1();
        setAddressText1();
        setExactLocation1({
            latitude: '',
            longitude: '',
        });
        setAgeValue(null);
        setSexValue(null);
        setColorValue('');
        setWeight('');
        setPricePerDay();
        setDescription1('');
        setMedicalCondition(null);
        setVaccination([]);
        setInsuranceDocuments([]);
        setSelectedImages([]);
        setRemovedFAcilityPk([]);
        setCkeckTerms(false);
        setNameAs('');
        setRespondData('');
        setLikesData('');
        setHabitsData('');
        setPetName('');
    };

    const updateUserData = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };
    useFocusEffect(
        React.useCallback(() => {
            setRefreshing(prev => !prev);
            if (route?.params?.type === 'BorrowAPet') {
                updateUserData({
                    ...state.userData,
                    tempStateBookingNav: 'borrow-a-pet',
                });
            } else if (route?.params?.type === 'Place_ToStay') {
                updateUserData({
                    ...state.userData,
                    tempStateBookingNav: 'place-to-stay',
                });
            }
            return () => {};
        }, []),
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            if (isSearch) {
                                setIsSearch(false);
                                setSearchQuery('');
                            } else {
                                navigation.goBack();
                            }
                        }}
                        style={styles.iconBox}>
                        <LeftArrow width={'100%'} height={'100%'} />
                    </TouchableOpacity>
                    {isSearch ? (
                        <Search setSearchQuery={setSearchQuery} />
                    ) : (
                        <>
                            {route?.params?.type === 'BorrowAPet' &&
                            route?.params?.type2 !== 'MyPet' ? (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.placeStayText}>
                                    Borrow a Pet
                                </Text>
                            ) : route?.params?.type2 === 'MyPet' &&
                              route?.params?.type === 'BorrowAPet' ? (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.placeStayText}>
                                    My Pets
                                </Text>
                            ) : (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.placeStayText}>
                                    Place to Stay
                                </Text>
                            )}
                        </>
                    )}
                </View>
                {!isSearch && (
                    <View style={styles.rightIcons}>
                        {route?.params?.type2 === 'MyPet' &&
                        route?.params?.type === 'BorrowAPet' ? (
                            ''
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    setIsSearch(true);
                                }}
                                activeOpacity={0.8}
                                style={[
                                    styles.iconBox,
                                    {marginRight: SIZE(10)},
                                ]}>
                                <SearchIcon width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            onPress={() => {
                                if (route?.params?.type != 'BorrowAPet') {
                                    setEditModalVisible(true);
                                } else {
                                    setEditModalVisible(true);
                                }
                            }}
                            activeOpacity={0.8}
                            style={styles.iconBox}>
                            <AddIcon width={'100%'} height={'100%'} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(185),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : (
                <View style={styles.listContainer}>
                    {route?.params?.type === 'BorrowAPet' ? (
                        <FlatList
                            bounces={false}
                            ListEmptyComponent={
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
                                            No Data Available
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.subText}>
                                            No data, please try again later
                                        </Text>
                                    </View>
                                </View>
                            }
                            showsVerticalScrollIndicator={false}
                            data={borrowList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        navigation.navigate(
                                            'ServiceProviderSinglePage',
                                            {
                                                type: 'BorrowAPet',
                                                pk: item.id,
                                            },
                                        );
                                    }}
                                    activeOpacity={0.8}
                                    style={{
                                        ...styles.listItem,
                                        backgroundColor: !item.is_active
                                            ? '#e3e4e6'
                                            : '#fff',
                                        opacity: !item.is_active && 0.8,
                                    }}>
                                    <View style={styles.listleftImage}>
                                        <Image
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            source={{uri: item.image}}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={styles.listDetails}>
                                        <View style={styles.listDetailsTop}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.listDetailsName}>
                                                {item.pet_breed}
                                            </Text>
                                            {item.is_active &&
                                            item.no_of_pending_bookings ? (
                                                <View style={styles.notifyMain}>
                                                    <Text
                                                        allowFontScaling={false}
                                                        style={
                                                            styles.listDetailsNotify
                                                        }>
                                                        {
                                                            item.no_of_pending_bookings
                                                        }
                                                    </Text>
                                                </View>
                                            ) : (
                                                ''
                                            )}
                                            {!item.is_active && (
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.disable}>
                                                    Disabled
                                                </Text>
                                            )}
                                        </View>
                                        <View style={styles.recentLocationIcon}>
                                            <LocationBlack
                                                width={SIZE(12)}
                                                height={SIZE(12)}
                                            />
                                            <Text
                                                numberOfLines={1}
                                                allowFontScaling={false}
                                                style={
                                                    styles.recentLocationName
                                                }>
                                                {item.location}
                                            </Text>
                                        </View>
                                        <Text
                                            numberOfLines={2}
                                            allowFontScaling={false}
                                            style={
                                                styles.listDetailsDescription
                                            }>
                                            {item.description}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <FlatList
                            bounces={false}
                            ListEmptyComponent={
                                <View style={styles.spotlightMain}>
                                    <View style={styles.spotlight}>
                                        <EmptyPlace
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </View>
                                    <View style={styles.bottom}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.mainText}>
                                            No Data Available
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.subText}>
                                            No data, please try again later
                                        </Text>
                                    </View>
                                </View>
                            }
                            showsVerticalScrollIndicator={false}
                            data={placeList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(
                                            'ServiceProviderSinglePage',
                                            {
                                                type: 'Place_ToStay',
                                                pk: item.id,
                                            },
                                        );
                                    }}
                                    activeOpacity={0.8}
                                    style={{
                                        ...styles.listItem,
                                        backgroundColor: !item.is_enabled
                                            ? '#e3e4e6'
                                            : '#fff',
                                        opacity: !item.is_enabled && 0.8,
                                    }}>
                                    <View style={styles.listleftImage}>
                                        <Image
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            source={{uri: item.image}}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={styles.listDetails}>
                                        <View style={styles.listDetailsTop}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.listDetailsName}>
                                                {item.title}
                                            </Text>
                                            {item.is_enabled &&
                                                item.no_of_pending_bookings >
                                                    0 && (
                                                    <View
                                                        style={
                                                            styles.notifyMain
                                                        }>
                                                        <Text
                                                            allowFontScaling={
                                                                false
                                                            }
                                                            style={
                                                                styles.listDetailsNotify
                                                            }>
                                                            {
                                                                item.no_of_pending_bookings
                                                            }
                                                        </Text>
                                                    </View>
                                                )}
                                            {!item.is_enabled && (
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.disable}>
                                                    Disabled
                                                </Text>
                                            )}
                                        </View>
                                        <View style={styles.recentLocationIcon}>
                                            <LocationBlack
                                                width={SIZE(12)}
                                                height={SIZE(12)}
                                            />
                                            <Text
                                                numberOfLines={1}
                                                allowFontScaling={false}
                                                style={
                                                    styles.recentLocationName
                                                }>
                                                {item.location}
                                            </Text>
                                        </View>
                                        <Text
                                            numberOfLines={2}
                                            allowFontScaling={false}
                                            style={
                                                styles.listDetailsDescription
                                            }>
                                            {item.description}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            )}

            <Modal
                isVisible={editModalVisible}
                onBackButtonPress={() => {
                    setEditModalVisible(false);
                    setModalContent(
                        route?.params?.type != 'BorrowAPet'
                            ? 'PlaceDetail'
                            : 'addPetModal',
                    );
                    clearAll();
                }}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                deviceHeight={SIZES.height}
                style={[
                    styles.modalContainer,
                    {
                        screenBackgroundcolor: 'transparent',
                        modalPresentationStyle: 'overCurrentContext',
                        backgroundColor: '#F7F7F7',
                        marginTop:
                            Platform.OS === 'ios'
                                ? StatusBarManager.HEIGHT + SIZES.height * 0.04
                                : StatusBarManager.HEIGHT,
                    },
                ]}
                onSwipeComplete={() => {
                    setEditModalVisible(false);
                    setModalContent('PlaceDetail');
                }}>
                <TouchableOpacity
                    style={[styles.buttonIcon]}
                    onPress={() => {
                        setEditModalVisible(false);
                        if (route?.params?.type != 'BorrowAPet') {
                            setModalContent('PlaceDetail');
                        } else {
                            setModalContent('addPetModal');
                        }
                        clearAll();
                    }}>
                    <CloseIcon width={'100%'} height={'100%'} />
                </TouchableOpacity>
                <KeyboardAwareScrollView
                    extraScrollHeight={SIZE(100)}
                    bounces={false}
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        {route?.params?.type != 'BorrowAPet' ? (
                            <ScrollView
                                bounces={false}
                                keyboardShouldPersistTaps={'handled'}
                                showsVerticalScrollIndicator={false}>
                                {modalContent === 'PlaceDetail' && (
                                    <EditModal
                                        clearAll={clearAll}
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
                                        setGeoAddressText={setGeoAddressText}
                                        geoAddressText={geoAddressText}
                                        exactLocation={exactLocation}
                                        finalLocation={finalLocation}
                                        fromList={true}
                                        upToDateImage={upToDateImage}
                                        setUpToDateImage={setUpToDateImage}
                                        removedImagePk={removedImagePk}
                                        setRemovedImagePk={setRemovedImagePk}
                                        toastRef={toastRef}
                                    />
                                )}
                                {modalContent === 'BreedDetail' && (
                                    <BreedDetail
                                        clearAll={clearAll}
                                        setEditModalVisible={
                                            setEditModalVisible
                                        }
                                        selectedCategories={selectedCategories}
                                        setSelectedCategories={
                                            setSelectedCategories
                                        }
                                        selectedFacilities={selectedFacilities}
                                        setSelectedFacilities={
                                            setSelectedFacilities
                                        }
                                        facilityImages={facilityImages}
                                        setFacilityImages={setFacilityImages}
                                        setFacilityPK={setFacilityPK}
                                        facilityPK={facilityPK}
                                        setModalContent={setModalContent}
                                        fromList={true}
                                        setRemovedFAcilityPk={
                                            setRemovedFAcilityPk
                                        }
                                        removedFAcilityPk={removedFAcilityPk}
                                    />
                                )}
                                {modalContent === 'ConfirmationPage' && (
                                    <ConfirmationPage
                                        clearAll={clearAll}
                                        setEditModalVisible={
                                            setEditModalVisible
                                        }
                                        setModalContent={setModalContent}
                                        addPBreed={addPBreed}
                                        fromList={true}
                                        submitLoading={submitLoading}
                                    />
                                )}
                            </ScrollView>
                        ) : (
                            <>
                                {modalContent === 'addPetModal' && (
                                    <AddYourPetDetails
                                        clearAll={clearAll}
                                        setEditModalVisible={
                                            setEditModalVisible
                                        }
                                        route={route}
                                        isEdit={true}
                                        setModalContent={setModalContent}
                                        fromList={true}
                                        petType={petType}
                                        setPetType={setPetType}
                                        petCharacteristics={petCharacteristics}
                                        setPetCharacteristics={
                                            setPetCharacteristics
                                        }
                                        breedType={breedType}
                                        setBreedType={setBreedType}
                                        section={section}
                                        setSection={setSection}
                                        arrival={arrival}
                                        setArrival={setArrival}
                                        categoryValue={categoryValue}
                                        setCategoryValue={setCategoryValue}
                                        breedValue={breedValue}
                                        setBreedValue={setBreedValue}
                                        selectedPets={selectedPets}
                                        setSelectedPets={setSelectedPets}
                                        ckeck={ckeck}
                                        setCheck={setCheck}
                                        ckeckInsurance={ckeckInsurance}
                                        setckeckInsurance={setckeckInsurance}
                                        ckeckTerms={ckeckTerms}
                                        setCkeckTerms={setCkeckTerms}
                                        selectedDate={selectedDate}
                                        setSelectedDate={setSelectedDate}
                                        selectedDateTwo={selectedDateTwo}
                                        setSelectedDateTwo={setSelectedDateTwo}
                                        selectedDateThree={selectedDateThree}
                                        setSelectedDateThree={
                                            setSelectedDateThree
                                        }
                                        geoAddressText={geoAddressText1}
                                        setGeoAddressText={setGeoAddressText1}
                                        addressText={addressText1}
                                        setAddressText={setAddressText1}
                                        exactLocation={exactLocation1}
                                        setExactLocation={setExactLocation1}
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
                                        description={description1}
                                        setDescription={setDescription1}
                                        medicalCondition={medicalCondition}
                                        setMedicalCondition={
                                            setMedicalCondition
                                        }
                                        vaccination={vaccination}
                                        setVaccination={setVaccination}
                                        insuranceDocuments={insuranceDocuments}
                                        setInsuranceDocuments={
                                            setInsuranceDocuments
                                        }
                                        selectedImages={selectedImages}
                                        setSelectedImages={setSelectedImages}
                                        finalLocation={finalLocation1}
                                        upToDateImage={upToDateImage}
                                        setUpToDateImage={setUpToDateImage}
                                        removedImagePk={removedImagePk}
                                        setRemovedImagePk={setRemovedImagePk}
                                        ageGroup={ageGroup}
                                        setAgeGroup={setAgeGroup}
                                        medicalGroup={medicalGroup}
                                        setMedicalGroup={setMedicalGroup}
                                        petName={petName}
                                        setPetName={setPetName}
                                        toastRef={toastRef}
                                    />
                                )}
                                {modalContent === 'add-more' && (
                                    <MyPetMore
                                        clearAll={clearAll}
                                        nameAs={petName}
                                        setNameAs={setNameAs}
                                        setRespondData={setRespondData}
                                        setHabitsData={setHabitsData}
                                        setLikesData={setLikesData}
                                        habitsData={habitsData}
                                        likesData={likesData}
                                        respondData={respondData}
                                        modalContent={modalContent}
                                        setModalContent={setModalContent}
                                        fromList={true}
                                        route={route}
                                        forClose={true}
                                    />
                                )}
                                {modalContent === 'ConfirmationPageTwo' && (
                                    <ConfirmationPageTwo
                                        clearAll={clearAll}
                                        setEditModalVisible={
                                            setEditModalVisible
                                        }
                                        setModalContent={setModalContent}
                                        addPet={addPet}
                                        fromList={true}
                                        submitLoading={submitLoading}
                                    />
                                )}
                            </>
                        )}
                    </View>
                </KeyboardAwareScrollView>
                <Toast
                    renderToast={toastOptions => {
                        return <CustomToast toastOptions={toastOptions} />;
                    }}
                    successColor="#009FD3"
                    warningColor="orange"
                    ref={toastRef}
                    duration={2000}
                    offsetBottom={SIZE(100)}
                />
            </Modal>
        </View>
    );
};

export default PlaceToStay;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: SIZE(70),
        paddingHorizontal: SIZE(20),
        borderBottomWidth: 1,
        borderColor: '#0000001A',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: SIZE(40),
        height: SIZE(40),
        backgroundColor: '#fff',
        padding: SIZE(8),
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#E2E2E2',
    },
    placeStayText: {
        marginLeft: SIZE(20),
        color: '#00171F',
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        lineHeight: SIZE(24),
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addPlace: {},
    addPlaceText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
    },
    listContainer: {
        paddingHorizontal: SIZE(20),
        paddingTop: SIZE(20),
        height: SIZES.height - SIZE(180),
    },
    listItem: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 10,
        marginBottom: SIZE(16),
    },
    listleftImage: {
        width: SIZE(136),
        height: SIZE(122),
        overflow: 'hidden',
        borderTopLeftRadius: SIZE(10),
        borderBottomLeftRadius: SIZE(10),
    },
    listDetails: {
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: SIZE(12),
    },
    listDetailsTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listDetailsName: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        color: '#242424',
    },
    notifyMain: {
        height: SIZE(20),
        width: SIZE(20),
        // backgroundColor: '#42A7EF26',
        backgroundColor: 'rgba(255, 0, 0, 0.10)',
        borderRadius: SIZE(10),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        top: SIZE(-15),
    },
    listDetailsNotify: {
        // color: '#003459',
        color: 'red',
        fontSize: SIZE(12),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
    disable: {
        backgroundColor: '#CF29291A',
        color: '#CF2929',
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(15),
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(4),
        borderRadius: SIZE(4),
        overflow: 'hidden',
    },
    recentLocationIcon: {
        flexDirection: 'row',
        marginVertical: SIZE(8),
        alignItems: 'center',
    },
    recentLocationName: {
        marginLeft: SIZE(4),
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(18),
        color: '#757575',
        width: SIZE(200),
    },
    listDetailsDescription: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(16),
        color: '#757575',
    },
    modalContainer: {
        margin: 0,
        width: '100%',
        justifyContent: 'flex-end',
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        overflow: 'hidden',
    },
    container: {
        backgroundColor: '#F7F7F7',
        width: '100%',
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        paddingBottom: SIZE(25),
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
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
    bottom: {},
    mainText: {
        color: '#000',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: SIZE(12),
    },
    subText: {
        color: '#686868',
        fontFamily: FONTS.regular,
        fontSize: SIZE(16),
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: SIZE(24),
    },
    rightText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
