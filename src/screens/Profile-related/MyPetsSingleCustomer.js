import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Platform,
    NativeModules,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import {useNavigation, useRoute} from '@react-navigation/native';
import Modal from 'react-native-modal';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {Context} from '../../contexts/Store';
import {ApiSectionCustomerMyPetSingle} from '../main/ApiSection';
import {usersConfigCustomer} from '../../../axiosConfig';

//components
import Spotlight from '../homeScreens/includes/Spotlight';
import AddCustomerPetDetails from '../detail/AddCustomerPetDetails';
import PriceTo from '../homeScreens/includes/PriceTo';
import BookingFoodDetails from '../booking/includes/BookingFoodDetails';
import CustomerDocument from './includes/CustomerDocument';
import MyPetMore from './MyPetMore';
import InternalServerError from '../error/InternalServerError';
import PageNotFound from '../error/PageNotFound';

//images and logos
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import Edit from '../../assets/icons/edit.svg';
import CloseIcon from '../../assets/icons/close-icon-blue.svg';

const MyPetsSingleCustomer = () => {
    const {state} = useContext(Context);
    const {StatusBarManager} = NativeModules;
    const route = useRoute();
    const pk = route?.params?.pk;
    const navigation = useNavigation();
    //states
    const [scrollY, setScrollY] = useState(0);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [petSingle, setPetSingle] = useState([]);
    const [arrival, setArrival] = useState();
    const [petType, setPetType] = useState([]);
    const [section, setSection] = useState(null);
    const [breedType, setBreedType] = useState([]);
    const [ageValue, setAgeValue] = useState(null);
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
    const [upToDateImage, setUpToDateImage] = useState([]);
    const [editableInsureDoc, setEditableInsureDoc] = useState([]);
    const [editableVaccinationDoc, setEditableVaccinationDoc] = useState([]);
    const [removedImagePk, setRemovedImagePk] = useState([]);
    const [ageGroup, setAgeGroup] = useState([]);
    const [sexValue, setSexValue] = useState(null);
    const [respondData, setRespondData] = useState('');
    const [likesData, setLikesData] = useState('');
    const [habitsData, setHabitsData] = useState('');
    const [modalContent, setModalContent] = useState('my-pet');
    const [docData, setDocData] = useState([]);
    const [errorStatus, setErrorStatus] = useState();

    useEffect(() => {
        setUpToDateImage(petSingle.gallery);
        setNameAs(petSingle.pet_name);
        setEditableVaccinationDoc(petSingle.vaccination_document);
        setEditableInsureDoc(petSingle.insurance_document);
        setSelectedDate(petSingle.insurance_expiry);
        setSelectedDateTwo(petSingle.vaccination_expiry);
        setCategoryValue(petSingle.pet_type_name);
        setBreedType(petSingle.pet_breed);
        setBreedValue(petSingle.breed_name);
        setSection(petSingle.pet_type);
        setCheck(petSingle.is_vaccinated);
        setckeckInsurance(petSingle.is_insured);
        setAgeValue(petSingle.age);
        setSelectedDateThree(petSingle.date_of_birth);
    }, [petSingle]);

    //demo array
    const petPriceData = [
        {
            id: 1,
            name: categoryValue,
            option: 'Type',
        },
        {
            id: 2,
            name: breedValue,
            option: 'Breed',
        },
        {
            id: 3,
            name: ageValue,
            option: 'Age',
        },
    ];

    // get vaccination name function
    const vaccinationName =
        editableVaccinationDoc && typeof editableVaccinationDoc === 'string'
            ? editableVaccinationDoc.substring(
                  editableVaccinationDoc.lastIndexOf('/') + 1,
              )
            : 'unknown';

    // get insurance name
    const insureName =
        editableInsureDoc && typeof editableInsureDoc === 'string'
            ? editableInsureDoc.substring(
                  editableInsureDoc.lastIndexOf('/') + 1,
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
            const vaccinationSize = await getDocumentSize(
                editableVaccinationDoc,
            );
            const insureSize = await getDocumentSize(editableInsureDoc);
            const newDocData = [
                vaccinationName !== 'unknown'
                    ? {
                          id: 1,
                          name: vaccinationName,
                          size: vaccinationSize,
                      }
                    : null,
                insureName !== 'unknown'
                    ? {
                          id: 2,
                          name: insureName,
                          size: insureSize,
                      }
                    : null,
            ].filter(item => item !== null);

            setDocData(newDocData);
        };
        fetchDocumentSizes();
    }, [editableVaccinationDoc, editableInsureDoc]);

    ApiSectionCustomerMyPetSingle(
        setPetSingle,
        isLoading,
        pk,
        setRefreshing,
        setErrorStatus,
    );

    //edit my pet api
    const editMyPet = async () => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;
        const pk = route.params.pk;
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

        const formData = new FormData();
        formData.append('pet_name', nameAs);
        formData.append('pet_type', section);
        formData.append('pet_breed', breedType);
        formData.append('date_of_birth', formattedDateStringDOB);
        formData.append('is_vaccinated', ckeck);
        formData.append('vaccination_expiry', formattedDateStringVaccination);
        formData.append('is_insured', ckeckInsurance);
        formData.append('insurance_expiry', formattedDateString);
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
        if (ckeck && Array.isArray(vaccination) && vaccination.length !== 0) {
            formData.append('vaccination_document', {
                uri: vaccination[0].uri,
                type: vaccination[0].type,
                name: vaccination[0].name,
            });
        }

        usersConfigCustomer
            .put(`edit-pet/${pk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                // console.log('response -> ', response.data);
                setSubmitLoading(false);
                setEditModalVisible(false);
                setIsLoading(prev => !prev);
            })
            .catch(error => {
                setSubmitLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

    const handleScroll = event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrollY(offsetY);
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
                                    // navigation.navigate('BottomSheet');
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
                                onPress={() => {
                                    setEditModalVisible(true);
                                }}
                                activeOpacity={0.8}
                                style={styles.commonButtonMain}>
                                <View style={styles.commonTopButtons}>
                                    <Edit width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView
                        onScroll={handleScroll}
                        bounces={false}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        style={styles.subContainer}>
                        <Spotlight
                            my_pet={true}
                            is_customer={true}
                            images={upToDateImage}
                        />
                        <View style={styles.dataContainer}>
                            <PriceTo
                                item={petPriceData}
                                is_customer={true}
                                petSingle={petSingle}
                            />
                            <BookingFoodDetails
                                route={route}
                                is_customer={true}
                                bookingData={petSingle}
                            />
                            <View style={styles.documentContainer}>
                                <CustomerDocument docData={docData} />
                            </View>
                        </View>
                    </ScrollView>
                    <Modal
                        isVisible={editModalVisible}
                        animationInTiming={400}
                        animationOutTiming={400}
                        animationIn={'slideInUp'}
                        backdropOpacity={0.2}
                        useNativeDriver={false}
                        useNativeDriverForBackdrop={true}
                        onBackButtonPress={() => {
                            setEditModalVisible(false);
                            setModalContent('my-pet');
                        }}
                        onBackdropPress={() => {
                            setEditModalVisible(false);
                            setModalContent('my-pet');
                        }}
                        style={{
                            margin: 0,
                            marginTop:
                                Platform.OS === 'ios'
                                    ? StatusBarManager.HEIGHT +
                                      SIZES.height * 0.04
                                    : StatusBarManager.HEIGHT + SIZE(20),
                        }}
                        propagateSwipe={true}
                        avoidKeyboard={true}>
                        {modalContent === 'my-pet' && (
                            <AddCustomerPetDetails
                                setIsLoading={setIsLoading}
                                isEdit={true}
                                setEditModalVisible={setEditModalVisible}
                                editMyPet={editMyPet}
                                setArrival={setArrival}
                                arrival={arrival}
                                setPetType={setPetType}
                                petType={petType}
                                setSection={setSection}
                                section={section}
                                setBreedType={setBreedType}
                                breedType={breedType}
                                setAgeValue={setAgeValue}
                                ageValue={ageValue}
                                setNameAs={setNameAs}
                                nameAs={nameAs}
                                setVaccination={setVaccination}
                                vaccination={vaccination}
                                setInsuranceDocuments={setInsuranceDocuments}
                                insuranceDocuments={insuranceDocuments}
                                setSelectedImages={setSelectedImages}
                                selectedImages={selectedImages}
                                setSelectedDate={setSelectedDate}
                                selectedDate={selectedDate}
                                setSelectedDateTwo={setSelectedDateTwo}
                                selectedDateTwo={selectedDateTwo}
                                setCategoryValue={setCategoryValue}
                                categoryValue={categoryValue}
                                setBreedValue={setBreedValue}
                                breedValue={breedValue}
                                setCheck={setCheck}
                                ckeck={ckeck}
                                ckeckInsurance={ckeckInsurance}
                                setckeckInsurance={setckeckInsurance}
                                setCkeckTerms={setCkeckTerms}
                                ckeckTerms={ckeckTerms}
                                setUpToDateImage={setUpToDateImage}
                                upToDateImage={upToDateImage}
                                setEditableInsureDoc={setEditableInsureDoc}
                                editableInsureDoc={editableInsureDoc}
                                editableVaccinationDoc={editableVaccinationDoc}
                                setEditableVaccinationDoc={
                                    setEditableVaccinationDoc
                                }
                                removedImagePk={removedImagePk}
                                setRemovedImagePk={setRemovedImagePk}
                                ageGroup={ageGroup}
                                setAgeGroup={setAgeGroup}
                                modalContent={modalContent}
                                setModalContent={setModalContent}
                                sexValue={sexValue}
                                setSexValue={setSexValue}
                                selectedDateThree={selectedDateThree}
                                setSelectedDateThree={setSelectedDateThree}
                                submitLoading={submitLoading}
                            />
                        )}
                        {modalContent === 'add-more' && (
                            <>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    hitSlop={10}
                                    style={styles.buttonIcon}
                                    onPress={() => {
                                        clearAll();
                                        setEditModalVisible(false);
                                        setModalContent('my-pet');
                                    }}>
                                    <CloseIcon width={'100%'} height={'100%'} />
                                </TouchableOpacity>
                                <MyPetMore
                                    nameAs={nameAs}
                                    setNameAs={setNameAs}
                                    setRespondData={setRespondData}
                                    setHabitsData={setHabitsData}
                                    setLikesData={setLikesData}
                                    habitsData={habitsData}
                                    likesData={likesData}
                                    respondData={respondData}
                                    modalContent={modalContent}
                                    setModalContent={setModalContent}
                                    editMyPet={editMyPet}
                                    route={route}
                                    isEdit={true}
                                    setIsLoading={setIsLoading}
                                    setEditModalVisible={setEditModalVisible}
                                />
                            </>
                        )}
                    </Modal>
                </View>
            )}
        </>
    );
};

export default MyPetsSingleCustomer;

const styles = StyleSheet.create({
    mainContainer: {},
    subContainer: {},
    dataContainer: {
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(24),
    },
    documentContainer: {
        marginTop: SIZE(24),
    },
    commonButtonContainer: {
        position: 'absolute',
        zIndex: 1000,
        padding: SIZE(16),
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
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
        position: 'absolute',
        top: SIZE(-5),
        right: SIZE(-5),
        zIndex: 100,
    },
});
