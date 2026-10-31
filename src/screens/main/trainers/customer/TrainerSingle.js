import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Share,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

//packages
import {useIsFocused, useNavigation} from '@react-navigation/native';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {Context} from '../../../../contexts/Store';
import {serviceProviderConfig} from '../../../../../axiosConfig';
import {ApiSectionTrainerProviderProfile} from '../../ApiSectionTrainerProvider';

//components
import Headers from '../../../includes/headers/Headers';
import AddProfile from './includes/AddProfile';
import AddService from './includes/AddService';
import AddAvailableDates from './includes/AddAvailableDates';
import ModalScreen from '../../../Profile-related/ModalScreen';
import ScrollHeader from './includes/ScrollHeader';
import TrainerProfileSection from './includes/TrainerProfileSection';
import CustomerDocument from '../../../Profile-related/includes/CustomerDocument';
import TrainerServices from './includes/TrainerServices';
import AvailabilityButton from './includes/AvailabilityButton';
import TrainerProfileGallery from './includes/TrainerProfileGallery';
import TrainerAbout from './includes/TrainerAbout';
import ReviewsEco from '../../ecommerce/includes/ReviewsEco';
import Title from '../../ecommerce/includes/Title';
import AboutAndLocation from '../../../homeScreens/includes/AboutAndLocation';
import InternalServerError from '../../../error/InternalServerError';
import PageNotFound from '../../../error/PageNotFound';
import TrainerBookingCard from '../../../homeScreens/includes/TrainerBookingCard';
import ConfirmationPageTrainer from '../../../detail/ConfirmationPageTrainer';

//images and logos
import EmptyTrainerLogo from '../../../../assets/icons/empty-trainer.svg';

const TrainerSingle = ({route}) => {
    const navigation = useNavigation();
    const toastRef = useRef();
    const isFocused = useIsFocused();
    const [scrollY, setScrollY] = useState(0);
    const {state, dispatch} = useContext(Context);

    const [errorStatus, setErrorStatus] = useState();
    const [profileData, setProfileData] = useState({});
    const [modeSelected, setModeSelected] = useState([]);
    const [docData, setDocData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(false);
    const [addService, setAddService] = useState(false);
    const [modalScreens, setModalScreens] = useState('AddProfile');
    const [loading, setLoading] = useState(false);
    const [bookingID, setBookingID] = useState('');

    const [errorMessage, setErrorMessage] = useState({});

    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState([]);

    const [addressText, setAddressText] = useState();
    const [geoAddressText, setGeoAddressText] = useState();
    const [exactLocation, setExactLocation] = useState({
        latitude: '',
        longitude: '',
    });
    const finalLocation = geoAddressText ? geoAddressText : addressText;
    const [pricePerHour, setPricePerHour] = useState('');
    const [description, setDescription] = useState('');
    const [gallery, setGallery] = useState([]);
    const [galleryEdit, setGalleryEdit] = useState([]);
    const [removedGalleyImagePK, setRemovedGalleyImagePK] = useState([]);
    const [trainingMode, setTrainingMode] = useState({});
    const [experience, setExperience] = useState('');
    const [cvFile, setCvFile] = useState('');
    const [cvFileNoEdit, setCvFileNoEdit] = useState('');
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

    // get cv name function
    const cvName =
        profileData?.curriculum_vitae &&
        typeof profileData?.curriculum_vitae === 'string'
            ? profileData?.curriculum_vitae.substring(
                  profileData?.curriculum_vitae.lastIndexOf('/') + 1,
              )
            : 'unknown';

    // get document size function
    const getDocumentSize = async url => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const sizeInBytes = blob.size;
            const sizeInMB = sizeInBytes ? sizeInBytes / (1024 * 1024) : 0;
            return parseFloat(sizeInMB.toFixed(3));
        } catch (error) {
            return 0;
        }
    };

    useEffect(() => {
        const fetchDocumentSizes = async () => {
            const cvSize = await getDocumentSize(profileData?.curriculum_vitae);
            const newDocData = [
                cvName !== 'unknown'
                    ? {
                          id: 1,
                          name: cvName,
                          size: cvSize,
                      }
                    : null,
            ].filter(item => item !== null);

            setDocData(newDocData);
        };
        fetchDocumentSizes();
    }, [profileData?.curriculum_vitae]);

    const [availability, setAvailability] = useState(initialAvailability);

    const handleScroll = event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrollY(offsetY);
    };

    const updateUserData = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };
    //profile create function
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
            formData.append('description', description);
            formData.append('price_per_hour', pricePerHour);
            formData.append('training_mode', trainingMode.value);
            formData.append('experience', experience.value);
            formData.append('latitude', exactLocation.latitude);
            formData.append('location', finalLocation);
            formData.append('longitude', exactLocation.longitude);
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
                updateUserData({
                    ...state.userData,
                    trainer_add: true,
                });
                clearAll();
                setRefreshing(!refreshing);
            } else {
                updateUserData({
                    ...state.userData,
                    trainer_add: false,
                });
            }
            setSubmitLoading(false);
            setModalScreens('AddProfile');
            setModalVisible(false);
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
    //edit profile
    const editProfile = async () => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;
        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append('price_per_hour', pricePerHour);
        formData.append('training_mode', trainingMode.value);
        formData.append('experience', experience.value);
        formData.append('latitude', exactLocation.latitude);
        formData.append('location', finalLocation);
        formData.append('longitude', exactLocation.longitude);
        formData.append('about_trainer', about);

        removedGalleyImagePK.forEach((id, index) => {
            formData.append(`removed_image_pks`, id);
        });
        profileImage.forEach((item, index) => {
            if (typeof item === 'string') {
            } else if (typeof item === 'object' && item.path) {
                formData.append('image', {
                    uri: item.path,
                    type: item.mime,
                    name: item.name,
                });
            }
        });

        gallery.forEach((image, index) => {
            formData.append('images', {
                uri: image.path,
                type: image.type,
                name: image.name,
            });
        });

        if (cvFile.length > 0) {
            cvFile.forEach((cv, index) => {
                formData.append('curriculum_vitae', {
                    uri: cv.uri,
                    type: cv.type,
                    name: cv.name,
                });
            });
        }

        serviceProviderConfig
            .post('edit-trainer-profile/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setSubmitLoading(false);
                setModalScreens('AddProfile');
                setEdit(false);
                setRefreshing(!refreshing);
                setModalVisible(false);
                setGallery([]);
            })
            .catch(error => {
                setSubmitLoading(false);
                console.log('An unexpected error occurred:', error);
            });
    };
    //service add function
    const submitService = async () => {
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

            const formData = new FormData();

            formData.append('services_data', JSON.stringify(transformedData));

            const response = await serviceProviderConfig.post(
                'create-trainer-service/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            setSubmitLoading(false);
            setModalVisible(false);
            setModalScreens('AddProfile');
            clearAll();
            setRefreshing(!refreshing);
        } catch (error) {
            setSubmitLoading(false);
            if (error.response && error.response.data) {
                // console.log('Response data:', error.response.data);
                toastRef.current.show(error.response.data.message, {
                    type: 'danger',
                });
            } else {
                console.log('No response data:', error);
            }
        }
    };
    //update availability function
    const updateAvailability = async () => {
        try {
            const token = state.userData.accessToken;

            setSubmitLoading(true);
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

            formData.append(
                'unavailable_dates',
                JSON.stringify(formattedDates),
            );
            formData.append(
                'available_dates_data',
                JSON.stringify(availability),
            );

            const response = await serviceProviderConfig.post(
                'update-availability/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            setSubmitLoading(false);
            setModalVisible(false);
            setModalScreens('AddProfile');
            clearAll();
            setRefreshing(!refreshing);
            setUpdate(false);
        } catch (error) {
            setSubmitLoading(false);
            if (error.response && error.response.data) {
                // console.log('Response data:', error.response.data);
                toastRef.current.show(error.response.data.message, {
                    type: 'danger',
                });
            } else {
                console.log('No response data:', error);
            }
        }
    };

    ApiSectionTrainerProviderProfile(
        setProfileData,
        setIsLoading,
        refreshing,
        setErrorStatus,
        loading,
        isFocused,
    );

    useEffect(() => {
        setName(profileData?.name);
        profileData?.image
            ? setProfileImage([profileData?.image])
            : setProfileImage([]);
        setAddressText(profileData?.location_name);
        setGeoAddressText(profileData?.location_name);
        setExactLocation(profileData?.location_data);
        setPricePerHour(profileData?.price_per_hour);
        setDescription(profileData?.description);
        setGalleryEdit(profileData?.gallery);
        setTrainingMode(
            profileData?.training_mode === '10'
                ? {id: 1, name: 'Indoor Training', value: 10}
                : profileData?.training_mode === '20'
                ? {id: 2, name: 'Outdoor Training', value: 20}
                : profileData?.training_mode === '30'
                ? {id: 3, name: 'Both Indoor and Outdoor Training', value: 30}
                : '',
        );
        setExperience(
            profileData?.experience === '10'
                ? {
                      id: 1,
                      name: '0 - 1 year',
                      value: 10,
                  }
                : profileData?.experience === '20'
                ? {
                      id: 2,
                      name: '1 - 3 years',
                      value: 20,
                  }
                : profileData?.experience === '30'
                ? {
                      id: 3,
                      name: '3 - 5 years',
                      value: 30,
                  }
                : profileData?.experience === '40'
                ? {
                      id: 4,
                      name: '5 - 10 years',
                      value: 40,
                  }
                : profileData?.experience === '50'
                ? {
                      id: 5,
                      name: '10+ years',
                      value: 50,
                  }
                : '',
        );
        setCvFileNoEdit(profileData?.curriculum_vitae);
        setAbout(profileData?.about_trainer);

        const updatedAvailability = initialAvailability.map(day => {
            const updatedDay = profileData?.service_slots?.find(
                slot =>
                    slot.day_name.toLowerCase() === day.dayName.toLowerCase(),
            );

            if (updatedDay) {
                const updatedSlots = updatedDay.slots.map(slot => {
                    const startTime = new Date(`1970-01-01T${slot.start_time}`);
                    const endTime = new Date(`1970-01-01T${slot.end_time}`);

                    return {
                        ...slot,
                        startTime: startTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        }),
                        endTime: endTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        }),
                    };
                });

                return {
                    ...day,
                    slots: updatedSlots,
                    present: updatedDay.present,
                };
            }

            return day;
        });

        setAvailability(updatedAvailability);
        profileData?.leave_days
            ? setSelectedDates(
                  profileData?.leave_days?.map(dateObj => ({
                      date: new Date(`${dateObj.day}T00:00:00.000Z`),
                      id: dateObj.id,
                  })),
              )
            : setSelectedDates([]);
    }, [profileData, modeSelected, profileData?.training_mode]);

    const clearAll = () => {
        setName('');
        setComponents([]);
        setSelectedTrainingModes([]);
        setProfileImage([]);
        setAddressText('');
        setGeoAddressText('');
        setExactLocation({});
        setPricePerHour('');
        setDescription('');
        setTrainingMode({});
        setExperience({});
        setGallery([]);
        setAbout('');
        setErrorMessage({});
        setCvFile('');
        setAvailability(initialAvailability);
    };

    const ShareUrl = () => {
        Share.share({
            message: profileData.shareable_link,
        })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    };

    const renderEmpty = () => {
        return (
            <View style={styles.emptyPageStyle}>
                <Headers headText={'Trainings'} />
                <View style={styles.spotlightMain}>
                    <View style={styles.spotlight}>
                        <EmptyTrainerLogo width={'100%'} height={'100%'} />
                    </View>
                    <View style={styles.bottom}>
                        <Text allowFontScaling={false} style={styles.mainText}>
                            Add Profile
                        </Text>
                        <Text allowFontScaling={false} style={styles.subText}>
                            Create your profile to add services
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(true);
                            }}
                            activeOpacity={0.8}
                            style={styles.button}>
                            <Text
                                allowFontScaling={false}
                                style={styles.buttonText}>
                                + Add Profile
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <>
            <>
                {isLoading ? (
                    <ActivityIndicator
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
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
                        {!state?.userData?.trainer_add ? (
                            <>{renderEmpty()}</>
                        ) : (
                            <View style={styles.profileMainContainer}>
                                <ScrollHeader
                                    scrollY={scrollY}
                                    navigation={navigation}
                                    setModalVisible={setModalVisible}
                                    setEdit={setEdit}
                                    ShareUrl={ShareUrl}
                                />
                                <ScrollView
                                    bounces={false}
                                    onScroll={handleScroll}
                                    scrollEventThrottle={16}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.subContainer}>
                                    <TrainerProfileSection
                                        profileData={profileData}
                                    />
                                    <AvailabilityButton
                                        setModalScreens={setModalScreens}
                                        setModalVisible={setModalVisible}
                                        setUpdate={setUpdate}
                                    />
                                    <View style={styles.documentContainer}>
                                        {docData.length > 0 ? (
                                            <CustomerDocument
                                                docData={docData}
                                            />
                                        ) : null}
                                    </View>
                                    {profileData?.service_details?.length >
                                    0 ? (
                                        <TrainerServices
                                            data={profileData?.service_details}
                                            setModalScreens={setModalScreens}
                                            setModalVisible={setModalVisible}
                                            setAddService={setAddService}
                                        />
                                    ) : null}
                                    {profileData?.gallery?.length > 0 ? (
                                        <TrainerProfileGallery
                                            data={profileData?.gallery}
                                        />
                                    ) : null}
                                    <TrainerAbout
                                        data={profileData?.description}
                                    />
                                    <View style={styles.locationData}>
                                        {profileData?.location_data
                                            ?.latitude ? (
                                            <AboutAndLocation
                                                trainer={true}
                                                exactLocation={
                                                    profileData?.location_data
                                                }
                                                finalLocation={
                                                    profileData?.location_data
                                                        ?.location
                                                }
                                            />
                                        ) : null}
                                    </View>
                                    {profileData?.reviews?.length > 0 ? (
                                        <View
                                            style={{
                                                marginTop: SIZE(18),
                                            }}>
                                            <Title
                                                label={'Reviews'}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        'MyReviews',
                                                        {
                                                            // from: route?.params?.type,
                                                            screen: 'Reviews',
                                                            params: {
                                                                selectedValue: {
                                                                    id: 3,
                                                                    type: 'Trainer',
                                                                    page_type:
                                                                        'trainer',
                                                                },
                                                            },
                                                        },
                                                    );
                                                }}
                                                rightText={'View All'}
                                                trainer={true}
                                            />
                                            <View
                                                style={{
                                                    marginTop: SIZE(22),
                                                }}>
                                                {profileData?.reviews
                                                    ?.slice(0, 4)
                                                    .map((item, index) => (
                                                        <ReviewsEco
                                                            key={index}
                                                            item={item}
                                                            index={index}
                                                            setLoading={
                                                                setLoading
                                                            }
                                                            trainer={true}
                                                        />
                                                    ))}
                                            </View>
                                        </View>
                                    ) : null}
                                    <View style={styles.recentBookingContainer}>
                                        {profileData?.recent_bookings?.length !=
                                        0 ? (
                                            <>
                                                <View
                                                    style={styles.reviewsHead}>
                                                    <Text
                                                        allowFontScaling={false}
                                                        style={
                                                            styles.reviewsText
                                                        }>
                                                        Recent Bookings
                                                    </Text>
                                                </View>
                                                {profileData?.recent_bookings
                                                    ?.slice(0, 4)
                                                    .map(
                                                        (
                                                            bookingData,
                                                            index,
                                                        ) => (
                                                            <TrainerBookingCard
                                                                navigation={
                                                                    navigation
                                                                }
                                                                state={state}
                                                                key={index}
                                                                detail={
                                                                    bookingData
                                                                }
                                                                index={index}
                                                                bookingID={
                                                                    bookingID
                                                                }
                                                                setBookingID={
                                                                    setBookingID
                                                                }
                                                                route={
                                                                    route?.params
                                                                }
                                                            />
                                                        ),
                                                    )}
                                            </>
                                        ) : (
                                            ''
                                        )}
                                    </View>
                                </ScrollView>
                            </View>
                        )}
                    </View>
                )}
            </>
            <ModalScreen
                isVisible={modalVisible}
                setVisible={setModalVisible}
                toastRef={toastRef}
                setEdit={setEdit}
                setModalScreens={setModalScreens}
                setUpdate={setUpdate}
                setAddService={setAddService}
                setRefreshing={setRefreshing}
                inner={
                    <>
                        {modalScreens === 'AddProfile' ? (
                            <AddProfile
                                setModalVisible={setModalVisible}
                                setModalScreens={setModalScreens}
                                name={name}
                                setName={setName}
                                profileImage={profileImage}
                                setProfileImage={setProfileImage}
                                addressText={addressText}
                                setAddressText={setAddressText}
                                geoAddressText={geoAddressText}
                                setGeoAddressText={setGeoAddressText}
                                exactLocation={exactLocation}
                                setExactLocation={setExactLocation}
                                finalLocation={finalLocation}
                                pricePerHour={pricePerHour}
                                setPricePerHour={setPricePerHour}
                                description={description}
                                setDescription={setDescription}
                                trainingMode={trainingMode}
                                setTrainingMode={setTrainingMode}
                                experience={experience}
                                setExperience={setExperience}
                                cvFile={cvFile}
                                setCvFile={setCvFile}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                                toastRef={toastRef}
                                setEdit={setEdit}
                                edit={edit}
                                setAbout={setAbout}
                                about={about}
                                setGallery={setGallery}
                                gallery={gallery}
                                cvFileNoEdit={cvFileNoEdit}
                                setRemovedGalleyImagePK={
                                    setRemovedGalleyImagePK
                                }
                                removedGalleyImagePK={removedGalleyImagePK}
                                setGalleryEdit={setGalleryEdit}
                                galleryEdit={galleryEdit}
                                setRefreshing={setRefreshing}
                                editProfile={editProfile}
                                submitLoading={submitLoading}
                                clearAll={clearAll}
                            />
                        ) : modalScreens === 'AddService' ? (
                            <AddService
                                setModalVisible={setModalVisible}
                                setModalScreens={setModalScreens}
                                components={components}
                                setComponents={setComponents}
                                setSelectedTrainingModes={
                                    setSelectedTrainingModes
                                }
                                selectedTrainingModes={selectedTrainingModes}
                                setEdit={setEdit}
                                edit={edit}
                                setAddService={setAddService}
                                addService={addService}
                                submitService={submitService}
                                submitLoading={submitLoading}
                                clearAll={clearAll}
                                setRefreshing={setRefreshing}
                            />
                        ) : modalScreens === 'AddAvailableDates' ? (
                            <AddAvailableDates
                                setModalVisible={setModalVisible}
                                setModalScreens={setModalScreens}
                                savedTime={savedTime}
                                setSavedTime={setSavedTime}
                                selected={selected}
                                setSelected={setSelected}
                                availability={availability}
                                setAvailability={setAvailability}
                                initialAvailability={initialAvailability}
                                setSelectedDates={setSelectedDates}
                                selectedDates={selectedDates}
                                setEdit={setEdit}
                                setUpdate={setUpdate}
                                edit={edit}
                                update={update}
                                submitProfile={submitProfile}
                                updateUserData={updateUserData}
                                submitLoading={submitLoading}
                                setRefreshing={setRefreshing}
                                updateAvailability={updateAvailability}
                                clearAll={clearAll}
                            />
                        ) : modalScreens === 'ConfirmTrainer' ? (
                            <ConfirmationPageTrainer
                                fromMain={false}
                                setModalContent={setModalScreens}
                                setCalModalVisible={setModalVisible}
                                submitLoading={submitLoading}
                                submitProfile={submitProfile}
                                clearAll={clearAll}
                            />
                        ) : null}
                    </>
                }
            />
        </>
    );
};

export default TrainerSingle;

const styles = StyleSheet.create({
    emptyPageStyle: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
    },
    profileMainContainer: {},
    subContainer: {
        paddingHorizontal: SIZE(16),
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
        width: SIZE(270),
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
    documentContainer: {
        marginTop: SIZE(32),
    },
    locationData: {
        marginTop: SIZE(32),
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
        fontSize: SIZE(20),
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
});
