import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    NativeModules,
    Platform,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import React, {useCallback, useContext, useRef, useState} from 'react';

//packages
import Modal from 'react-native-modal';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-notifications';

//constants
import {FONTS} from '../../theme/fonts';
import {SIZE, SIZES} from '../../theme/theme';
import {serviceProviderConfig} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';
import CustomToast from '../../components/toast/CustomToast';
import {serviceProviderPlaceToStayList} from '../main/ApiSectionServiceProvider';

//components
import Headers from '../includes/headers/Headers';
import PetList from '../homeScreens/includes/PetList';
import EditModal from '../homeScreens/includes/EditModal';
import BreedDetail from '../detail/BreedDetail';
import ConfirmationPage from '../detail/ConfirmationPage';

//images and logos
import SpotLightLogo from '../../assets/icons/emptyplace.svg';
import CloseIcon from '../../assets/icons/close-icon-blue.svg';

const MyPlaces = () => {
    const route = useRoute();
    const {StatusBarManager} = NativeModules;
    const toastRef = useRef();

    //states
    const {state, dispatch} = useContext(Context);
    const [petsAvailable, setPetsAvailable] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [modalContent, setModalContent = {modalContent}] = useState(
        route?.params?.type != 'BorrowAPet' ? 'PlaceDetail' : 'addPetModal',
    );
    const [title, setTitle] = useState();
    const [phone, setPhone] = useState();
    const [description, setDescription] = useState();
    const [aboutService, setAboutService] = useState();
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

    const [upToDateImage, setUpToDateImage] = useState([]);
    const [removedImagePk, setRemovedImagePk] = useState([]);
    const [removedFAcilityPk, setRemovedFAcilityPk] = useState([]);

    //add Place function
    const addPBreed = async image => {
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
                setIsLoading(true);
                setIsLoading(false);
            })
            .catch(error => {
                console.log('error breed try => ', error.response.data);
            });
    };

    const clearAll = () => {
        setTitle();
        setPhone();
        setDescription();
        setAboutService();
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
    };

    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [placeList, setPlaceList] = useState([]);
    serviceProviderPlaceToStayList(
        setPlaceList,
        isLoading,
        setIsLoading,
        refreshing,
    );
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Headers
                    route={route}
                    setAddModalVisible={setEditModalVisible}
                    headText={'My Places'}
                    petsAvailable={petsAvailable}
                    rightText={'+ Add Place'}
                />
                {isLoading ? (
                    <ActivityIndicator
                        style={{
                            height: SIZES.height - SIZE(185),
                        }}
                        size={'large'}
                        color={'#009fd3'}
                    />
                ) : (
                    <FlatList
                        bounces={false}
                        refreshControl={
                            <RefreshControl
                                colors={['#003459']}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={placeList}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => (
                            <PetList key={item.id} petData={item} />
                        )}
                        contentContainerStyle={styles.petsContainer}
                        showsVerticalScrollIndicator={false}
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
                    />
                )}
            </View>
            <Modal
                isVisible={editModalVisible}
                onBackButtonPress={() => {
                    setEditModalVisible(false);
                    setModalContent(
                        route?.params?.type != 'BorrowAPet'
                            ? 'PlaceDetail'
                            : 'addPetModal',
                    );
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
                        margin: 0,
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
                        setModalContent('PlaceDetail');
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
                                keyboardShouldPersistTaps={'handled'}
                                bounces={false}
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
                                        // setDetailScreens={setDetailScreens}
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
                                        removedFAcilityPk={removedFAcilityPk}
                                        setRemovedFAcilityPk={
                                            setRemovedFAcilityPk
                                        }
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

export default MyPlaces;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    subContainer: {
        flex: 1,
    },
    petsContainer: {
        paddingVertical: SIZE(24),
        paddingHorizontal: SIZE(16),
        flexDirection: 'column',
    },
    spotlightMain: {
        flex: 1,

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
        color: '#242424',
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
    button: {
        backgroundColor: '#003459',
        borderRadius: SIZE(6),
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(10),
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        letterSpacing: SIZE(0.5),
        lineHeight: SIZE(22),
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        width: SIZES.width,
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        height: '100%',
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
});
