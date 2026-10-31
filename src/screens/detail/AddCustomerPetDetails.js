import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import ChooseCategories from './includes/ChooseCategories';
import UploadPetImage from './includes/UploadPetImage';
import {EnterInputName} from './includes/EnterInput';
import VaccinationAndInsurance, {
    Vaccination,
} from './includes/VacicinationAndInsurance';
import Modal from 'react-native-modal';
import CalendarBirthDate from '../includes/calendar/CalenderBirthDate';
import {
    ApiGeneral,
    ApiGeneralAgeGroup,
    ApiGeneralBreeds,
} from '../common/ApiGeneral';
import CalendarPicker, {
    CalendarPickerThree,
    CalendarPickerTwo,
} from './includes/CalendarPicker';
import Calendar from '../includes/calendar/Calendar';

// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import CloseIcon from '../../assets/icons/close-icon-blue.svg';
import ToolTip from '../../assets/icons/tooltip.svg';

const AddCustomerPetDetails = ({
    setEditModalVisible,
    route,
    isEdit,
    forClose,
    section,
    setSection,
    breedType,
    setBreedType,
    arrival,
    setArrival,
    setPetType,
    petType,
    nameAs,
    setNameAs,
    selectedImages,
    setSelectedImages,
    insuranceDocuments,
    setInsuranceDocuments,
    vaccination,
    setVaccination,
    selectedDate,
    setSelectedDate,
    selectedDateTwo,
    setSelectedDateTwo,
    categoryValue,
    setCategoryValue,
    breedValue,
    setBreedValue,
    ckeck,
    setCheck,
    ckeckInsurance,
    setckeckInsurance,
    addMyPet,
    fromList,
    upToDateImage,
    setUpToDateImage,
    setEditableInsureDoc,
    editableInsureDoc,
    editableVaccinationDoc,
    setEditableVaccinationDoc,
    clearAll,
    removedImagePk,
    setRemovedImagePk,
    editMyPet,
    setIsLoading,
    setAgeGroup,
    sexValue,
    selectedDateThree,
    setSelectedDateThree,
    submitLoading,
}) => {
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const [calTwoModalVisible, setCalTwoModalVisible] = useState(false);
    const [isExpiry, setExpiry] = useState(false);
    const [birthCalModalVisible, setBirthCalModalVisible] = useState(false);
    const [isShowInsurance, setIsShowInsurance] = useState(false);
    const [existingInsure, setExistingInsure] = useState(false);
    const [existingVacci, setExistingVacci] = useState(false);
    const data = [''];

    useEffect(() => {
        if (editableInsureDoc) {
            setExistingInsure(true);
        } else {
            setExistingInsure(false);
        }
        if (editableVaccinationDoc) {
            setExistingVacci(true);
        } else {
            setExistingVacci(false);
        }
    }, []);

    const [errorMessage, setErrorMessage] = useState({
        is_Category: false,
        is_BreedValue: false,
        age_is: false,
        name_is: false,
        vaccination_is: false,
        isurance_is: false,
        upload_image_is: false,
        upload_image_length_is: false,
        terms_is: false,
        calendar_one: false,
        calendar_two: false,
    });

    const HandleChoose = item => {
        setErrorMessage(prevState => {
            const updatedState = {
                ...prevState,
                name_is: nameAs == '',
                is_Category: categoryValue == null,
                is_BreedValue: breedValue == null,
                age_is: selectedDateThree == '',
                sex_is: sexValue == null,
                vaccination_is:
                    ckeck && vaccination.length === 0 && !existingVacci,
                isurance_is:
                    ckeckInsurance &&
                    insuranceDocuments.length === 0 &&
                    !existingInsure,
                upload_image_is:
                    selectedImages.length === 0 && upToDateImage.length === 0,
                upload_image_length_is:
                    selectedImages.length + upToDateImage.length > 10,
                calendar_one:
                    ckeckInsurance &&
                    (selectedDate === '' || selectedDate === null),
                calendar_two:
                    ckeck &&
                    (selectedDateTwo === '' || selectedDateTwo === null),
            };

            if (
                !updatedState.is_Category &&
                !updatedState.is_BreedValue &&
                !updatedState.age_is &&
                !updatedState.upload_image_is &&
                !updatedState.upload_image_length_is &&
                !updatedState.isurance_is &&
                !updatedState.vaccination_is &&
                !updatedState.calendar_one &&
                !updatedState.calendar_two
            ) {
                if (fromList) {
                    addMyPet();
                } else if (isEdit) {
                    editMyPet();
                }
            }

            return updatedState;
        });
    };

    const handleDateSelected = date => {
        setSelectedDate(date);
    };

    const handleDateTwoSelected = date => {
        setSelectedDateTwo(date);
    };

    const handleDateThreeSelected = date => {
        setSelectedDateThree(date);
    };

    const handleDateRangeSelected = (startDate, endDate) => {
        setSelectedDateRange({startDate, endDate});
    };

    useEffect(() => {
        if (nameAs !== '') {
            setErrorMessage(prev => ({
                ...prev,
                name_is: false,
            }));
        }
    }, [nameAs]);

    useEffect(() => {
        if (arrival?.length > 0 && breedType) {
            const matchingBreed = arrival?.find(
                breed => breed.id === breedType,
            );
            if (matchingBreed) {
                setBreedValue(matchingBreed.name);
            }
        }
    }, [breedType, arrival]);

    ApiGeneral(setPetType);
    ApiGeneralBreeds(section, setArrival);
    ApiGeneralAgeGroup(setAgeGroup);

    return (
        <>
            <View
                style={{
                    marginBottom: SIZE(50),
                    borderTopRightRadius: SIZE(32),
                    borderTopLeftRadius: SIZE(32),
                    backgroundColor: '#F7F7F7',
                    width: '100%',
                }}>
                {(route?.params?.type === 'BorrowAPet' ||
                    isEdit === true ||
                    forClose === true) && (
                    <TouchableOpacity
                        disabled={submitLoading}
                        activeOpacity={0.8}
                        hitSlop={10}
                        style={styles.buttonIcon}
                        onPress={() => {
                            if (fromList) {
                                clearAll();
                                setEditModalVisible(false);
                            } else {
                                setEditModalVisible(false);
                            }
                        }}>
                        <CloseIcon width={'100%'} height={'100%'} />
                    </TouchableOpacity>
                )}
                <FlatList
                    bounces={false}
                    keyboardShouldPersistTaps={'handled'}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <View
                            style={{
                                backgroundColor: '#F7F7F7',
                                paddingHorizontal: SIZE(24),
                                flex: 1,
                                borderTopRightRadius: SIZE(32),
                                borderTopLeftRadius: SIZE(32),
                            }}>
                            <View>
                                <DoubleColorHeading
                                    firstTitle={
                                        isEdit ? 'Edit Your' : 'Add Your'
                                    }
                                    secondTitle={'Pet Details'}
                                    isCenter={true}
                                />
                                <DescriptionHeading
                                    text={'Please Enter Your Pet Details'}
                                />
                            </View>
                            <EnterInputName
                                nameAs={nameAs}
                                setNameAs={setNameAs}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                            />
                            <ChooseCategories
                                setErrorMessage={setErrorMessage}
                                setBreedType={setBreedType}
                                arrival={arrival}
                                setSection={setSection}
                                petType={petType}
                                categoryValue={categoryValue}
                                setCategoryValue={setCategoryValue}
                                setBreedValue={setBreedValue}
                                breedValue={breedValue}
                                errorMessage={errorMessage}
                                page="customer_pet_details"
                            />
                            <View style={{marginTop: SIZE(20)}}>
                                <CalendarPickerThree
                                    selectedDateThree={selectedDateThree}
                                    setCalModalVisible={setBirthCalModalVisible}
                                    errorMessage={errorMessage}
                                    setErrorMessage={setErrorMessage}
                                    setSelectedDateThree={setSelectedDateThree}
                                    setExpiry={setExpiry}
                                />
                            </View>
                            <UploadPetImage
                                removedImagePk={removedImagePk}
                                setRemovedImagePk={setRemovedImagePk}
                                upToDateImage={upToDateImage}
                                setUpToDateImage={setUpToDateImage}
                                setErrorMessage={setErrorMessage}
                                selectedImages={selectedImages}
                                setSelectedImages={setSelectedImages}
                                errorMessage={errorMessage}
                                page_is="customer_pet_add"
                            />
                            <Vaccination
                                setErrorMessage={setErrorMessage}
                                vaccination={vaccination}
                                setVaccination={setVaccination}
                                errorMessage={errorMessage}
                                ckeck={ckeck}
                                setCheck={setCheck}
                                editableVaccinationDoc={editableVaccinationDoc}
                                setEditableVaccinationDoc={
                                    setEditableVaccinationDoc
                                }
                                page_is="customer_pet_add"
                            />
                            <CalendarPickerTwo
                                setErrorMessage={setErrorMessage}
                                handleDateSelected={handleDateSelected}
                                handleDateTwoSelected={handleDateTwoSelected}
                                handleDateRangeSelected={
                                    handleDateRangeSelected
                                }
                                selectedDate={selectedDate}
                                selectedDateTwo={selectedDateTwo}
                                selectedDateRange={selectedDateRange}
                                setExpiry={setExpiry}
                                setCalModalVisible={setCalTwoModalVisible}
                                errorMessage={errorMessage}
                                page_is="customer_pet_add"
                                ckeck={ckeck}
                            />
                            <View>
                                <VaccinationAndInsurance
                                    setErrorMessage={setErrorMessage}
                                    insuranceDocuments={insuranceDocuments}
                                    setInsuranceDocuments={
                                        setInsuranceDocuments
                                    }
                                    errorMessage={errorMessage}
                                    ckeckInsurance={ckeckInsurance}
                                    setckeckInsurance={setckeckInsurance}
                                    setIsShowInsurance={setIsShowInsurance}
                                    editableInsureDoc={editableInsureDoc}
                                    setEditableInsureDoc={setEditableInsureDoc}
                                    page_is="customer_pet_add"
                                />
                                {isShowInsurance && (
                                    <View
                                        style={{
                                            borderWidth: SIZE(0.6),
                                            borderColor: '#E2E2E2',
                                            position: 'absolute',
                                            left: SIZE(10),
                                            top: SIZE(-75),
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
                                                transform: [{rotate: '180deg'}],
                                                right: SIZE(10),
                                                top: SIZE(67.5),
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
                                            Protect your beloved pets with
                                            comprehensive pet insurance coverage
                                            visit [Reference Site] today to
                                            explore our affordable plans and
                                            ensure your furry family members.
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <CalendarPicker
                                setErrorMessage={setErrorMessage}
                                handleDateSelected={handleDateSelected}
                                handleDateTwoSelected={handleDateTwoSelected}
                                handleDateRangeSelected={
                                    handleDateRangeSelected
                                }
                                selectedDate={selectedDate}
                                selectedDateTwo={selectedDateTwo}
                                selectedDateRange={selectedDateRange}
                                setExpiry={setExpiry}
                                setCalModalVisible={setCalModalVisible}
                                errorMessage={errorMessage}
                                page_is="customer_pet_add"
                                ckeckInsurance={ckeckInsurance}
                            />
                        </View>
                    )}
                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        disabled={submitLoading}
                        activeOpacity={0.8}
                        onPress={() => {
                            if (fromList) {
                                clearAll();
                                setEditModalVisible &&
                                    setEditModalVisible(false);
                            } else {
                                setEditModalVisible &&
                                    setEditModalVisible(false);
                                setIsLoading(prev => !prev);
                            }
                        }}
                        style={styles.skipContainer}>
                        <Text allowFontScaling={false} style={styles.skipText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={submitLoading}
                        onPress={() => {
                            HandleChoose();
                        }}
                        style={styles.nextContainer}>
                        {submitLoading ? (
                            <ActivityIndicator size={'small'} color={'#fff'} />
                        ) : (
                            <Text
                                allowFontScaling={false}
                                style={styles.nextText}>
                                Submit
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                isVisible={calModalVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                swipeDirection={['down']}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                onSwipeComplete={() => setCalModalVisible(false)}
                style={{margin: 0}}
                onBackdropPress={() => setCalModalVisible(false)}
                onBackButtonPress={() => setCalModalVisible(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.barContainer}></View>
                    <Calendar
                        onDateSelected={handleDateSelected}
                        setCalModalVisible={setCalModalVisible}
                        defaultDate={selectedDate}
                    />
                </View>
            </Modal>
            <Modal
                isVisible={calTwoModalVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                swipeDirection={['down']}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                onSwipeComplete={() => setCalTwoModalVisible(false)}
                style={{margin: 0}}
                onBackdropPress={() => setCalTwoModalVisible(false)}
                onBackButtonPress={() => setCalTwoModalVisible(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.barContainer}></View>
                    <Calendar
                        onDateSelected={handleDateTwoSelected}
                        setCalModalVisible={setCalTwoModalVisible}
                        defaultDate={selectedDateTwo}
                    />
                </View>
            </Modal>
            <Modal
                isVisible={birthCalModalVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                swipeDirection={['down']}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                onSwipeComplete={() => setBirthCalModalVisible(false)}
                style={{margin: 0}}
                onBackdropPress={() => setBirthCalModalVisible(false)}
                onBackButtonPress={() => setBirthCalModalVisible(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.barContainer} />
                    <CalendarBirthDate
                        onDateSelected={handleDateThreeSelected}
                        setCalModalVisible={setBirthCalModalVisible}
                        defaultDate={selectedDateThree}
                    />
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        paddingHorizontal: SIZE(32),
        paddingTop: SIZE(32),
        flex: 1,
    },
    labelText: {
        color: '#686868',
        fontWeight: '400',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        marginBottom: SIZE(10),
    },
    labelTextGender: {},
    inputBoxSub: {
        marginTop: SIZE(24),
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F7F7F7',
        paddingVertical: SIZE(20),
        paddingHorizontal: SIZE(24),
        marginBottom: SIZE(40),
    },
    skipContainer: {
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        width: SIZE(174),
    },
    skipText: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
    nextContainer: {
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        width: SIZE(174),
        backgroundColor: '#003459',
    },
    nextText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#003459',
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checked: {
        backgroundColor: '#003459',
        alignItems: 'center',
        justifyContent: 'center',
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
    barContainer: {
        backgroundColor: '#009FD3',
        width: SIZE(70),
        height: SIZE(4),
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: SIZE(16),
        marginBottom: SIZE(22),
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
    },
});

export default AddCustomerPetDetails;
