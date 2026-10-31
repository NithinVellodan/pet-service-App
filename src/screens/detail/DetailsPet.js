import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//components
import AddPet from './AddPet';
import PlaceDetail from './PlaceDetail';
import BreedDetail from './BreedDetail';
import ConfirmationPage from './ConfirmationPage';
import {Context} from '../../contexts/Store';
import AddYourPetDetails from './AddYourPetDetails';
import ConfirmationPageTwo from './ConfirmationPageTwo';
import {
    ecommerceApiServiceProvider,
    serviceProviderConfig,
} from '../../../axiosConfig';
import MyPetMore from '../Profile-related/MyPetMore';
import AddStore from '../main/ecommerce/provoider/AddStore';
import ConfirmationStore from './ConfirmationStore';
import AddProfile from '../main/trainers/customer/includes/AddProfile';
import AddService from '../main/trainers/customer/includes/AddService';
import AddAvailableDates from '../main/trainers/customer/includes/AddAvailableDates';
import ConfirmationPageTrainer from './ConfirmationPageTrainer';

const DetailsPet = ({setCalModalVisible, toastRef}) => {
    const {state, dispatch} = useContext(Context);
    const [detailScreens, setDetailScreens] = useState('addPet');
    const [isOpen, setOpen] = useState(true);
    const [onBack, setOnBack] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

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
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateTwo, setSelectedDateTwo] = useState(null);
    const [selectedDateThree, setSelectedDateThree] = useState('');
    const [geoAddressText1, setGeoAddressText1] = useState();
    const [addressText1, setAddressText1] = useState();
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
    const [upToDateImage, setUpToDateImage] = useState([]);
    const [removedImagePk, setRemovedImagePk] = useState([]);
    const [removedFAcilityPk, setRemovedFAcilityPk] = useState([]);
    const [ageGroup, setAgeGroup] = useState([]);
    const [medicalGroup, setMedicalGroup] = useState([]);
    const [petName, setPetName] = useState('');
    const [pricePerPet, setPricePerPet] = useState('');
    const finalLocation1 = geoAddressText1 ? geoAddressText1 : addressText1;
    const [nameAs, setNameAs] = useState('');
    const [respondData, setRespondData] = useState('');
    const [likesData, setLikesData] = useState('');
    const [habitsData, setHabitsData] = useState('');
    const [exactLocation1, setExactLocation1] = useState({
        latitude: '',
        longitude: '',
    });
    const [loading, setLoading] = useState(false);
    const [storeTitle, setStoreTitle] = useState('');
    const [shopImage, setShopImage] = useState([]);
    const [geoAddressTextStore, setGeoAddressTextStore] = useState();
    const [addressTextStore, setAddressTextStore] = useState();
    const [exactLocationStore, setExactLocationStore] = useState({
        latitude: '',
        longitude: '',
    });
    const finalLocationStore = geoAddressTextStore
        ? geoAddressTextStore
        : addressTextStore;
    const [errorMessage, setErrorMessage] = useState({});

    //trainer states
    const [errorMessage2, setErrorMessage2] = useState({});

    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [addressText2, setAddressText2] = useState();
    const [geoAddressText2, setGeoAddressText2] = useState();
    const [exactLocation2, setExactLocation2] = useState({
        latitude: '',
        longitude: '',
    });

    const finalLocation2 = geoAddressText2 ? geoAddressText2 : addressText2;

    const [pricePerHour, setPricePerHour] = useState('');
    const [description2, setDescription2] = useState('');
    const [gallery, setGallery] = useState('');
    const [trainingMode, setTrainingMode] = useState('');
    const [experience, setExperience] = useState('');
    const [cvFile, setCvFile] = useState('');
    const [about, setAbout] = useState('');
    const [selectedTrainingModes, setSelectedTrainingModes] = useState([]);
    const [components, setComponents] = useState([]);

    const [savedTime, setSavedTime] = useState([]);
    const [selected, setSelected] = useState(
        savedTime.length > 0 ? true : false,
    );
    const [selectedDates, setSelectedDates] = useState([]);

    const initialAvailability = [
        {day: 6, dayName: 'Sunday', slots: [], present: false},
        {day: 0, dayName: 'Monday', slots: [], present: false},
        {day: 1, dayName: 'Tuesday', slots: [], present: false},
        {day: 2, dayName: 'Wednesday', slots: [], present: false},
        {day: 3, dayName: 'Thursday', slots: [], present: false},
        {day: 4, dayName: 'Friday', slots: [], present: false},
        {day: 5, dayName: 'Saturday', slots: [], present: false},
    ];
    const [availability, setAvailability] = useState(initialAvailability);

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    useEffect(() => {
        setOnBack(false);
    }, [onBack]);

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
                setSubmitLoading(false);
                setCalModalVisible(false);
                updateUserDate({
                    ...state.userData,
                    is_service: true,
                    isPetDetailsAdded: true,
                });
            })
            .catch(error => {
                setSubmitLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

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
                    setSubmitLoading(false);
                    setCalModalVisible(false);
                    updateUserDate({
                        ...state.userData,
                        is_service: true,
                        isPetDetailsAdded: true,
                    });
                })
                .catch(error => {
                    setSubmitLoading(false);
                    console.log('error try => ', error.response.data);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    // addstore
    const addStore = async () => {
        setLoading(true);
        const token = state.userData.accessToken;
        const formData = new FormData();
        shopImage.forEach((image, index) => {
            formData.append('image', {
                uri: image.path,
                type: image.mime,
                name: image.name,
            });
        });
        formData.append('name', storeTitle);
        formData.append('latitude', exactLocationStore.latitude);
        formData.append('location', finalLocationStore);
        formData.append('longitude', exactLocationStore.longitude);
        try {
            await ecommerceApiServiceProvider

                .post('add-store/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    const {StatusCode} = response.data;
                    if (StatusCode == 6000) {
                        console.log('Successfully');
                        updateUserDate({
                            ...state.userData,
                            is_service: true,
                            store_add: true,
                            store_name: storeTitle,
                            is_skip: true,
                        });
                        setOpen(false);
                        setCalModalVisible(false);
                    }
                    setLoading(false);
                    console.log('then response', StatusCode, response.data);
                })
                .catch(error => {
                    setLoading(false);
                    console.log('error response store', error.response.data);
                });
        } catch (error) {
            setLoading(false);
            console.log('error => ', error);
        }
    };

    const submitProfile = async () => {
        try {
            setSubmitLoading(true);
            const token = state.userData.accessToken;

            const transformedData = selectedTrainingModes.map(mode => {
                const correspondingComponent = components.find(
                    component => component.trainingMode.id === mode.id,
                );
                return {
                    ...mode,
                    no_of_hours: correspondingComponent.no_of_hours,
                    remarks: correspondingComponent.remarks,
                    selectedPetTypes: correspondingComponent.selectedPetTypes,
                };
            });

            const formattedDates = selectedDates.map(entry => {
                return {
                    date: new Date(entry.date).toLocaleDateString('en-CA', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }),
                };
            });

            const formData = new FormData();

            formData.append('name', name);
            formData.append('description', description2);
            formData.append('price_per_hour', pricePerHour);
            formData.append('training_mode', trainingMode.value);
            formData.append('experience', experience.value);
            formData.append('latitude', exactLocation2.latitude);
            formData.append('location', finalLocation2);
            formData.append('longitude', exactLocation2.longitude);
            formData.append('about_trainer', about);
            formData.append(
                'unavailable_dates',
                JSON.stringify(formattedDates),
            );
            formData.append('services_data', JSON.stringify(transformedData));
            formData.append(
                'available_dates_data',
                JSON.stringify(availability),
            );

            profileImage.forEach((image, index) => {
                formData.append('image', {
                    uri: image.path,
                    type: image.mime,
                    name: image.name,
                });
            });

            gallery.forEach((image, index) => {
                formData.append('images', {
                    uri: image.path,
                    type: image.type,
                    name: image.name,
                });
            });

            cvFile.forEach((cv, index) => {
                formData.append('curriculum_vitae', {
                    uri: cv.uri,
                    type: cv.type,
                    name: cv.name,
                });
            });

            const response = await serviceProviderConfig.post(
                'create-trainer-profile/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            if (response.data.StatusCode === 6000) {
                updateUserDate({
                    ...state.userData,
                    trainer_add: true,
                    is_service: true,
                });
                setCalModalVisible(false);
            } else {
                updateUserDate({
                    ...state.userData,
                    trainer_add: false,
                    is_service: true,
                });
            }
            setSubmitLoading(false);
            // console.log(response.data);
        } catch (error) {
            setSubmitLoading(false);
            console.log('Error:', error);
            if (error.response && error.response.data) {
                console.log('Response data:', error.response.data);
            } else {
                console.log('No response data:', error);
            }
        }
    };

    const clearStore = () => {
        setStoreTitle('');
        setShopImage([]);
        setGeoAddressTextStore('');
        setAddressTextStore();
        setExactLocationStore({
            latitude: '',
            longitude: '',
        });
        setErrorMessage('');
    };

    const clearAllTrainer = () => {
        setName('');
        setComponents([]);
        setSelectedTrainingModes([]);
        setProfileImage([]);
        setAddressText2('');
        setGeoAddressText2('');
        setExactLocation2({});
        setPricePerHour('');
        setDescription2('');
        setTrainingMode({});
        setExperience({});
        setGallery([]);
        setAbout('');
        setCvFile('');
    };

    return (
        <View style={styles.container}>
            {detailScreens === 'addPet' ? (
                <AddPet
                    setDetailScreens={setDetailScreens}
                    setVisible={setOpen}
                />
            ) : detailScreens === 'ConfirmationTwo' ? (
                <ConfirmationPageTwo
                    addPet={addPet}
                    setDetailScreens={setDetailScreens}
                    setOpen={setOpen}
                    setCalModalVisible={setCalModalVisible}
                    submitLoading={submitLoading}
                />
            ) : detailScreens === 'addStore' ? (
                <AddStore
                    setDetailScreens={setDetailScreens}
                    firststore={true}
                    storeTitle={storeTitle}
                    setStoreTitle={setStoreTitle}
                    shopImage={shopImage}
                    setShopImage={setShopImage}
                    geoAddressText={geoAddressTextStore}
                    setGeoAddressText={setGeoAddressTextStore}
                    addressText={addressTextStore}
                    setAddressText={setAddressTextStore}
                    exactLocation={exactLocationStore}
                    setExactLocation={setExactLocationStore}
                    finalLocation={finalLocationStore}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    clearStore={clearStore}
                    toastRef={toastRef}
                />
            ) : detailScreens === 'confiromStore' ? (
                <ConfirmationStore
                    firststore={true}
                    setDetailScreens={setDetailScreens}
                    setOpen={setOpen}
                    addStore={addStore}
                    clearStore={clearStore}
                    buttonLoader={loading}
                />
            ) : detailScreens === 'AddYourPetDetails' ? (
                <AddYourPetDetails
                    setDetailScreens={setDetailScreens}
                    petType={petType}
                    setPetType={setPetType}
                    petCharacteristics={petCharacteristics}
                    setPetCharacteristics={setPetCharacteristics}
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
                    setMedicalCondition={setMedicalCondition}
                    vaccination={vaccination}
                    setVaccination={setVaccination}
                    insuranceDocuments={insuranceDocuments}
                    setInsuranceDocuments={setInsuranceDocuments}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    finalLocation={finalLocation1}
                    addPet={addPet}
                    upToDateImage={upToDateImage}
                    setUpToDateImage={setUpToDateImage}
                    removedImagePk={removedImagePk}
                    setRemovedImagePk={setRemovedImagePk}
                    isMain={true}
                    ageGroup={ageGroup}
                    setAgeGroup={setAgeGroup}
                    medicalGroup={medicalGroup}
                    setMedicalGroup={setMedicalGroup}
                    petName={petName}
                    setPetName={setPetName}
                    pricePerPet={pricePerPet}
                    setPricePerPet={setPricePerPet}
                    selectedDateThree={selectedDateThree}
                    setSelectedDateThree={setSelectedDateThree}
                    toastRef={toastRef}
                />
            ) : detailScreens === 'placeDetails' ? (
                <PlaceDetail
                    setVisible={setOpen}
                    setDetailScreens={setDetailScreens}
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
                    toastRef={toastRef}
                />
            ) : detailScreens === 'breedDetail' ? (
                <View style={{flex: 1}}>
                    <BreedDetail
                        setDetailScreens={setDetailScreens}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        selectedFacilities={selectedFacilities}
                        setSelectedFacilities={setSelectedFacilities}
                        addPBreed={addPBreed}
                        facilityImages={facilityImages}
                        setFacilityImages={setFacilityImages}
                        setFacilityPK={setFacilityPK}
                        facilityPK={facilityPK}
                        setRemovedFAcilityPk={setRemovedFAcilityPk}
                        removedFAcilityPk={removedFAcilityPk}
                    />
                </View>
            ) : detailScreens === 'add-more' ? (
                <MyPetMore
                    nameAs={petName}
                    setNameAs={setNameAs}
                    setRespondData={setRespondData}
                    setHabitsData={setHabitsData}
                    setLikesData={setLikesData}
                    habitsData={habitsData}
                    likesData={likesData}
                    respondData={respondData}
                    modalContent={detailScreens}
                    setModalContent={setDetailScreens}
                    fromMain={true}
                />
            ) : detailScreens === 'confirm' ? (
                <ConfirmationPage
                    addPBreed={addPBreed}
                    setDetailScreens={setDetailScreens}
                    setOpen={setOpen}
                    setCalModalVisible={setCalModalVisible}
                    submitLoading={submitLoading}
                />
            ) : detailScreens === 'AddProfile' ? (
                <AddProfile
                    setModalVisible={setCalModalVisible}
                    setModalScreens={setDetailScreens}
                    name={name}
                    setName={setName}
                    profileImage={profileImage}
                    setProfileImage={setProfileImage}
                    addressText={addressText2}
                    setAddressText={setAddressText2}
                    geoAddressText={geoAddressText2}
                    setGeoAddressText={setGeoAddressText2}
                    exactLocation={exactLocation2}
                    setExactLocation={setExactLocation2}
                    finalLocation={finalLocation2}
                    pricePerHour={pricePerHour}
                    setPricePerHour={setPricePerHour}
                    description={description2}
                    setDescription={setDescription2}
                    trainingMode={trainingMode}
                    setTrainingMode={setTrainingMode}
                    experience={experience}
                    setExperience={setExperience}
                    cvFile={cvFile}
                    setCvFile={setCvFile}
                    errorMessage={errorMessage2}
                    setErrorMessage={setErrorMessage2}
                    toastRef={toastRef}
                    setAbout={setAbout}
                    about={about}
                    setGallery={setGallery}
                    gallery={gallery}
                    clearAll={clearAllTrainer}
                    fromMain={true}
                />
            ) : detailScreens === 'AddService' ? (
                <AddService
                    setModalVisible={setCalModalVisible}
                    setModalScreens={setDetailScreens}
                    components={components}
                    setComponents={setComponents}
                    setSelectedTrainingModes={setSelectedTrainingModes}
                    selectedTrainingModes={selectedTrainingModes}
                    clearAll={clearAllTrainer}
                />
            ) : detailScreens === 'AddAvailableDates' ? (
                <AddAvailableDates
                    setModalVisible={setCalModalVisible}
                    savedTime={savedTime}
                    setSavedTime={setSavedTime}
                    selected={selected}
                    setSelected={setSelected}
                    availability={availability}
                    setAvailability={setAvailability}
                    initialAvailability={initialAvailability}
                    setSelectedDates={setSelectedDates}
                    selectedDates={selectedDates}
                    submitProfile={submitProfile}
                    updateUserData={updateUserDate}
                    submitLoading={submitLoading}
                    setModalScreens={setDetailScreens}
                    clearAll={clearAllTrainer}
                />
            ) : detailScreens === 'ConfirmTrainer' ? (
                <ConfirmationPageTrainer
                    fromMain={true}
                    setModalContent={setDetailScreens}
                    setCalModalVisible={setCalModalVisible}
                    submitLoading={submitLoading}
                    submitProfile={submitProfile}
                    clearAll={clearAllTrainer}
                />
            ) : null}
        </View>
    );
};

export default DetailsPet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
