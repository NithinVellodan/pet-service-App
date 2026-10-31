import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import ChooseCategories, {MedicalCondition} from './includes/ChooseCategories';
import UploadPetImage from './includes/UploadPetImage';
import PetCommonDetails from './includes/PetCommonDetails';
import PetBasicDetails from './includes/PetBasicDetails';
import EnterInput, {EnterInputPrice} from './includes/EnterInput';
import VaccinationAndInsurance, {
    Vaccination,
} from './includes/VacicinationAndInsurance';
import TickIcon from '../../assets/icons/tick-icon.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import ToolTip from '../../assets/icons/tooltip.svg';

// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import InfoCircle from '../../assets/icons/infocircle.svg';
import Characteristics from './includes/Characteristics';
import CalendarPicker, {CalendarPickerTwo} from './includes/CalendarPicker';
import Calendar from '../includes/calendar/Calendar';
import {
    ApiGeneral,
    ApiGeneralAgeGroup,
    ApiGeneralBreeds,
    ApiGeneralCharacteristics,
    ApiGeneralMedicalGroup,
} from '../common/ApiGeneral';
import NormalForm from '../../components/forms/NormalForm';
import CalendarBirthDate from '../includes/calendar/CalenderBirthDate';

const AddYourPetDetails = ({
    setEditModalVisible,
    route,
    isEdit,
    isEditModal,
    setDetailScreens,
    setModalContent,
    fromList,
    characteristics,
    upToDateImage,
    setUpToDateImage,
    removedImagePk,
    setRemovedImagePk,
    petType,
    setPetType,
    petCharacteristics,
    setPetCharacteristics,
    breedType,
    setBreedType,
    section,
    setSection,
    arrival,
    setArrival,
    categoryValue,
    setCategoryValue,
    breedValue,
    setBreedValue,
    selectedPets,
    setSelectedPets,
    ckeck,
    setCheck,
    ckeckInsurance,
    setckeckInsurance,
    ckeckTerms,
    setCkeckTerms,
    selectedDate,
    setSelectedDate,
    selectedDateTwo,
    setSelectedDateTwo,
    geoAddressText,
    setGeoAddressText,
    addressText,
    setAddressText,
    exactLocation,
    setExactLocation,
    ageValue,
    setAgeValue,
    sexValue,
    setSexValue,
    colorValue,
    setColorValue,
    weight,
    setWeight,
    pricePerDay,
    setPricePerDay,
    description,
    setDescription,
    medicalCondition,
    setMedicalCondition,
    vaccination,
    setVaccination,
    insuranceDocuments,
    setInsuranceDocuments,
    selectedImages,
    setSelectedImages,
    finalLocation,
    setEditableInsureDoc,
    editableInsureDoc,
    editableVaccinationDoc,
    setEditableVaccinationDoc,
    clearAll,
    isMain,
    ageGroup,
    setAgeGroup,
    medicalGroup,
    setMedicalGroup,
    petName,
    setPetName,
    selectedDateThree,
    setSelectedDateThree,
    toastRef,
}) => {
    const data = [''];
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [calTwoModalVisible, setCalTwoModalVisible] = useState(false);
    const [birthCalModalVisible, setBirthCalModalVisible] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const [isExpiry, setExpiry] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isShowInsurance, setIsShowInsurance] = useState(false);
    const [priceValid, setPriceValid] = useState(false);
    const [ageVisible, setAgeVisible] = useState(false);
    const [sexVisible, setSexVisible] = useState(false);
    const [existingInsure, setExistingInsure] = useState(false);
    const [existingVacci, setExistingVacci] = useState(false);

    const [errorMessage, setErrorMessage] = useState({
        is_Category: false,
        is_BreedValue: false,
        age_is: false,
        sex_is: false,
        color_is: false,
        weight_is: false,
        price_is: false,
        description_is: false,
        medical_is: false,
        vaccination_is: false,
        isurance_is: false,
        upload_image_is: false,
        upload_image_length_is: false,
        terms_is: false,
        calendar_one: false,
        calendar_two: false,
        price_regex_is: false,
        is_petName: false,
    });

    useEffect(() => {
        const priceRegex = /^[1-9]\d{0,14}(\.\d{1,2})?$|^0\.\d{1,2}$/;
        setPriceValid(priceRegex.test(pricePerDay));
    }, [pricePerDay]);

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

    const HandleChoose = item => {
        setErrorMessage(prevState => {
            const updatedState = {
                ...prevState,
                is_Category: categoryValue == null,
                is_BreedValue: breedValue == null,
                age_is: selectedDateThree == '',
                sex_is: sexValue == null,
                color_is: colorValue === '',
                weight_is: weight === '',
                price_is: pricePerDay === '',
                description_is: description === '',
                medical_is: medicalCondition == null,
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
                terms_is: !ckeckTerms,
                calendar_one:
                    ckeckInsurance &&
                    (selectedDate === '' || selectedDate === null),
                calendar_two:
                    ckeck &&
                    (selectedDateTwo === '' || selectedDateTwo === null),
                location_is: finalLocation === '',
                characteristics_is: selectedPets.length === 0,
                price_regex_is: !priceValid,
                is_petName: petName === '',
            };

            if (
                !updatedState.is_Category &&
                !updatedState.is_BreedValue &&
                !updatedState.age_is &&
                !updatedState.sex_is &&
                !updatedState.color_is &&
                !updatedState.weight_is &&
                !updatedState.price_is &&
                !updatedState.description_is &&
                !updatedState.medical_is &&
                !updatedState.upload_image_is &&
                !updatedState.upload_image_length_is &&
                !updatedState.terms_is &&
                !updatedState.location_is &&
                !updatedState.characteristics_is &&
                (colorValue !== '' || null) &&
                (weight !== '' || null) &&
                selectedPets.length !== 0 &&
                priceValid &&
                (description !== '' || null) &&
                (finalLocation !== '' || null) &&
                (pricePerDay !== '' || null) &&
                !updatedState.isurance_is &&
                !updatedState.vaccination_is &&
                !updatedState.calendar_one &&
                !updatedState.calendar_two &&
                (petName !== '' || null)
            ) {
                if (fromList) {
                    setModalContent && setModalContent('add-more');
                } else if (isEdit) {
                    setModalContent('add-more');
                } else {
                    setDetailScreens && setDetailScreens('add-more');
                    setEditModalVisible && setEditModalVisible(false);
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

    const handlePress = itemId => {
        clearTimeout(timeoutId);
        setIsShow(itemId);
        const newTimeoutId = setTimeout(() => {
            setIsShow(null);
        }, 1000);
        setTimeoutId(newTimeoutId);
    };
    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, [timeoutId]);

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
    ApiGeneralCharacteristics(setPetCharacteristics);
    ApiGeneralAgeGroup(setAgeGroup);
    ApiGeneralMedicalGroup(setMedicalGroup);

    return (
        <>
            <FlatList
                bounces={false}
                contentContainerStyle={{minHeight: '100%'}}
                scrollEnabled={
                    isEditModal ? true : false || isMain ? true : false
                }
                keyboardShouldPersistTaps={'handled'}
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <KeyboardAwareScrollView
                        scrollEnabled={
                            route?.params?.type === 'BorrowAPet' ? false : true
                        }
                        keyboardShouldPersistTaps={'handled'}
                        bounces={false}
                        showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                backgroundColor: '#F7F7F7',
                                paddingHorizontal: SIZE(24),
                                paddingTop: SIZE(50),
                                flex: 1,
                                borderTopRightRadius: SIZE(32),
                                borderTopLeftRadius: SIZE(32),
                                paddingBottom: isEdit && SIZE(100),
                            }}>
                            <View>
                                <DoubleColorHeading
                                    firstTitle={
                                        isEditModal ? 'Edit Your' : 'Add Your'
                                    }
                                    secondTitle={'Pet Details'}
                                    isCenter={true}
                                />
                                <DescriptionHeading
                                    text={'Please Enter Your Pet Details'}
                                />
                            </View>
                            <View>
                                <NormalForm
                                    label={'Pet Name'}
                                    placeholder={'Enter Your Pet Name'}
                                    name={petName}
                                    setName={setPetName}
                                    setError={setErrorMessage}
                                />
                                {errorMessage.is_petName == true && (
                                    <Text style={styles.errorMessage}>
                                        Pet name is required
                                    </Text>
                                )}
                            </View>
                            <ChooseCategories
                                setBreedType={setBreedType}
                                arrival={arrival}
                                setSection={setSection}
                                petType={petType}
                                categoryValue={categoryValue}
                                setCategoryValue={setCategoryValue}
                                setBreedValue={setBreedValue}
                                breedValue={breedValue}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                            />
                            <UploadPetImage
                                selectedImages={selectedImages}
                                setSelectedImages={setSelectedImages}
                                errorMessage={errorMessage}
                                upToDateImage={upToDateImage}
                                setUpToDateImage={setUpToDateImage}
                                removedImagePk={removedImagePk}
                                setRemovedImagePk={setRemovedImagePk}
                                setErrorMessage={setErrorMessage}
                            />
                            <PetCommonDetails
                                ageValue={ageValue}
                                setAgeValue={setAgeValue}
                                sexValue={sexValue}
                                setSexValue={setSexValue}
                                colorValue={colorValue}
                                setColorValue={setColorValue}
                                weight={weight}
                                setWeight={setWeight}
                                setErrorMessage={setErrorMessage}
                                errorMessage={errorMessage}
                                ageVisible={ageVisible}
                                setAgeVisible={setAgeVisible}
                                sexVisible={sexVisible}
                                setSexVisible={setSexVisible}
                                ageGroup={ageGroup}
                                setCalModalVisible={setBirthCalModalVisible}
                                selectedDateThree={selectedDateThree}
                                setExpiry={setExpiry}
                            />
                            {/* <KeyboardAwareScrollView
                            keyboardShouldPersistTaps={'handled'}> */}
                            <PetBasicDetails
                                setGeoAddressText={setGeoAddressText}
                                geoAddressText={geoAddressText}
                                setAddressText={setAddressText}
                                addressText={addressText}
                                setExactLocation={setExactLocation}
                                exactLocation={exactLocation}
                                errorMessage={errorMessage}
                                finalLocation={finalLocation}
                                setErrorMessage={setErrorMessage}
                                toastRef={toastRef}
                            />
                            {/* </KeyboardAwareScrollView> */}
                            <EnterInputPrice
                                pricePerDay={pricePerDay}
                                setPricePerDay={setPricePerDay}
                            />
                            {errorMessage.price_is == true && (
                                <Text style={styles.errorMessage}>
                                    Please Enter Price
                                </Text>
                            )}
                            {errorMessage.price_regex_is == true &&
                                errorMessage.price_is == false && (
                                    <Text style={styles.errorMessage}>
                                        Please Enter Valid Price
                                    </Text>
                                )}
                            <EnterInput
                                description={description}
                                setDescription={setDescription}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                            />
                            <Characteristics
                                setSelectedPets={setSelectedPets}
                                selectedPets={selectedPets}
                                errorMessage={errorMessage}
                                petCharacteristics={petCharacteristics}
                                characteristics={characteristics}
                                setErrorMessage={setErrorMessage}
                            />
                            <Vaccination
                                vaccination={vaccination}
                                setVaccination={setVaccination}
                                errorMessage={errorMessage}
                                ckeck={ckeck}
                                setCheck={setCheck}
                                editableVaccinationDoc={editableVaccinationDoc}
                                setEditableVaccinationDoc={
                                    setEditableVaccinationDoc
                                }
                                setErrorMessage={setErrorMessage}
                            />
                            <CalendarPickerTwo
                                setErrorMessage={setErrorMessage}
                                ckeck={ckeck}
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
                            />
                            <View>
                                <VaccinationAndInsurance
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
                                    setErrorMessage={setErrorMessage}
                                />
                                {isShowInsurance && (
                                    <View
                                        style={{
                                            borderWidth: 0.6,
                                            borderColor: '#E2E2E2',
                                            position: 'absolute',
                                            left: SIZE(150),
                                            top: SIZE(-18),
                                            width: SIZE(180),
                                            height: SIZE(70),
                                            zIndex: 100,
                                            backgroundColor: '#fff',
                                            borderRadius: SIZE(8),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: SIZE(10),
                                        }}>
                                        <View
                                            style={{
                                                position: 'absolute',
                                                transform: [{rotate: '90deg'}],
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
                                            Select to upload Insurance
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <CalendarPicker
                                ckeckInsurance={ckeckInsurance}
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
                                setErrorMessage={setErrorMessage}
                                ckeck={ckeck}
                            />
                            <MedicalCondition
                                medicalCondition={medicalCondition}
                                setMedicalCondition={setMedicalCondition}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                                medicalGroup={medicalGroup}
                            />
                            <View
                                style={{
                                    marginTop: SIZE(16),
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingBottom: SIZE(10),
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <View style={{marginRight: SIZE(8)}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setCkeckTerms(!ckeckTerms);
                                                setErrorMessage(prev => ({
                                                    ...prev,
                                                    terms_is: false,
                                                }));
                                            }}>
                                            <View
                                                style={
                                                    styles.checkboxContainer
                                                }>
                                                <View
                                                    style={[
                                                        styles.checkbox,
                                                        ckeckTerms &&
                                                            styles.checked,
                                                    ]}>
                                                    <TickIcon
                                                        width={10}
                                                        height={10}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={styles.labelText}>
                                            I Accept the Terms & Conditions
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        handlePress();
                                    }}
                                    style={{width: SIZE(24), height: SIZE(24)}}>
                                    <InfoCircle width="100%" height="100%" />
                                </TouchableOpacity>
                                {isShow === item.id && (
                                    <View
                                        style={{
                                            borderWidth: SIZE(0.6),
                                            borderColor: '#E2E2E2',
                                            position: 'absolute',
                                            left: SIZE(150),
                                            bottom: SIZE(-5),
                                            width: SIZE(180),
                                            height: SIZE(70),
                                            zIndex: 100,
                                            backgroundColor: '#fff',
                                            borderRadius: SIZE(8),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: SIZE(10),
                                        }}>
                                        <View
                                            style={{
                                                position: 'absolute',
                                                transform: [{rotate: '90deg'}],
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
                                            Accept terms and conditions here
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <View style={{paddingBottom: SIZE(10)}}>
                                {errorMessage.terms_is == true && (
                                    <Text style={styles.errorMessage}>
                                        Please accept terms and conditions
                                    </Text>
                                )}
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                )}
            />
            <View
                style={[
                    styles.buttonsContainer,
                    {
                        position: isEdit && 'absolute',
                        bottom: isEdit && 0,
                        width: isEdit && '100%',
                        paddingBottom: isEdit && SIZE(20),
                    },
                ]}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        if (fromList === true) {
                            clearAll();
                        } else {
                            setModalContent && setModalContent('add-pet');
                        }
                        setDetailScreens && setDetailScreens('addPet');
                        setEditModalVisible && setEditModalVisible(false);
                    }}
                    style={styles.skipContainer}>
                    <Text allowFontScaling={false} style={styles.skipText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setSexVisible(false);
                        setAgeVisible(false);
                        HandleChoose();
                    }}
                    style={styles.nextContainer}>
                    <Text allowFontScaling={false} style={styles.nextText}>
                        Next
                    </Text>
                </TouchableOpacity>
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
                    <View style={styles.barContainer} />
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
                    <View style={styles.barContainer} />
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
        fontWeight: '500',
        fontFamily: FONTS.medium,
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
        marginBottom: SIZE(10),
    },
    checkbox: {
        width: SIZE(20),
        height: SIZE(20),
        borderWidth: SIZE(1),
        borderColor: '#969696',
        borderRadius: SIZE(5),
        marginRight: SIZE(10),
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
        position: 'absolute',
        top: SIZE(-5),
        right: SIZE(-5),
    },
});

export default AddYourPetDetails;
