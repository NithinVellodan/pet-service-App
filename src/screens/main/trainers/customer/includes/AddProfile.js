import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//packages
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//constants
import {SIZE, SIZES} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

//components
import DoubleColorHeading from '../../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../../components/headings/DescriptionHeading';
import NormalForm from '../../../../../components/forms/NormalForm';
import DropDown from '../../../ecommerce/includes/DropDown';
import PickImage from '../../../ecommerce/includes/PickImage';
import DescriptionInput from '../../../ecommerce/includes/DescriptionInput';
import TwoButton from '../../../ecommerce/includes/TwoButton';
import PetBasicDetails from '../../../../detail/includes/PetBasicDetails';

//images and logos
import CloseIcon from '../../../../../assets/icons/close-icon-blue.svg';
import CloseRound from '../../../../../assets/icons/close-circle.svg';
import DocumentUpload from './DocumentUpload';
import LongPriceForm from '../../../../../components/forms/LongPriceForm';

const AddProfile = ({
    setModalVisible,
    setModalScreens,
    name,
    setName,
    profileImage,
    setProfileImage,
    addressText,
    setAddressText,
    geoAddressText,
    setGeoAddressText,
    exactLocation,
    setExactLocation,
    finalLocation,
    pricePerHour,
    setPricePerHour,
    description,
    setDescription,
    trainingMode,
    setTrainingMode,
    experience,
    setExperience,
    cvFile,
    setCvFile,
    errorMessage,
    setErrorMessage,
    toastRef,
    editProfile,
    setEdit,
    edit,
    setAbout,
    about,
    setGallery,
    gallery,
    cvFileNoEdit,
    setRemovedGalleyImagePK,
    setGalleryEdit,
    galleryEdit,
    setRefreshing,
    removedGalleyImagePK,
    submitLoading,
    clearAll,
    fromMain,
}) => {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [trainingVisible, setTrainingVisible] = useState(false);
    const [priceValid, setPriceValid] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const removeImageNew = (pathToRemove, pkToRemove) => {
        setProfileImage(prevProfileImage =>
            prevProfileImage.filter(image => image.path !== pathToRemove),
        );
    };

    const removeImageGalleryNew = pkToRemove => {
        setGalleryEdit(prevImages =>
            prevImages.filter(image => image.id !== pkToRemove),
        );
        setRemovedGalleyImagePK(prevSet => new Set(prevSet).add(pkToRemove));
    };

    const removeImageGallery = pathToRemove => {
        setGallery(prevGallery =>
            prevGallery.filter(image => image.path !== pathToRemove),
        );
    };

    const removeCv = pathToRemove => {
        setProfileImage(prevCv =>
            prevCv.filter(image => image.path !== pathToRemove),
        );
    };

    const handlePressOutside = () => {
        if (categoryVisible) {
            setCategoryVisible(false);
        }
        if (trainingVisible) {
            setTrainingVisible(false);
        }
    };
    const experienceDummy = [
        {
            id: 1,
            name: '0 - 1 year',
            value: 10,
        },
        {
            id: 2,
            name: '1 - 3 years',
            value: 20,
        },
        {
            id: 3,
            name: '3 - 5 years',
            value: 30,
        },
        {
            id: 4,
            name: '5 - 10 years',
            value: 40,
        },
        {
            id: 5,
            name: '10+ years',
            value: 50,
        },
    ];
    const trainingDummy = [
        {
            id: 1,
            name: 'Indoor Training',
            value: 10,
        },
        {
            id: 2,
            name: 'Outdoor Training',
            value: 20,
        },
        {
            id: 3,
            name: 'Both Indoor and Outdoor Training',
            value: 30,
        },
    ];

    useEffect(() => {
        const priceNumberRegex = /^\d+(\.\d{1,2})?$/;
        if (pricePerHour && priceNumberRegex.test(pricePerHour)) {
            setPriceValid(true);
        } else {
            setPriceValid(false);
        }
    }, [pricePerHour]);

    return (
        <View style={{flex: 1, backgroundColor: '#F7F7F7', width: SIZES.width}}>
            <View style={{height: SIZE(60)}}>
                {!fromMain ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setModalVisible(false);
                            setEdit && setEdit(false);
                            setRefreshing && setRefreshing(prev => !prev);
                            clearAll && clearAll();
                        }}
                        hitSlop={SIZE(5)}
                        style={{
                            position: 'absolute',
                            top: SIZE(20),
                            right: SIZE(20),
                        }}>
                        <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                    </TouchableOpacity>
                ) : null}
            </View>
            <KeyboardAwareScrollView
                extraScrollHeight={SIZE(100)}
                keyboardShouldPersistTaps={'handled'}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <TouchableWithoutFeedback onPress={handlePressOutside}>
                    <View style={styles.mainContainer}>
                        <View>
                            <DoubleColorHeading
                                firstTitle={edit ? 'Edit' : 'Add'}
                                secondTitle={'Profile'}
                                isCenter={true}
                            />
                        </View>
                        <View>
                            <DescriptionHeading
                                text={
                                    edit
                                        ? 'Edit Your Profile Details'
                                        : 'Enter Your Profile Details'
                                }
                                isCenter={true}
                            />
                        </View>
                        <View>
                            <View style={{marginTop: SIZE(24)}}>
                                <View>
                                    <Text style={styles.labelText}>
                                        Enter Your Name
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        ...styles.inputBox,
                                        borderColor: isFocused
                                            ? '#009FD3'
                                            : styles.inputBox.borderColor,
                                    }}>
                                    <TextInput
                                        paddingVertical={
                                            Platform.OS === 'ios'
                                                ? SIZE(15)
                                                : null
                                        }
                                        placeholderTextColor={
                                            'rgba(36, 36, 36, 0.5)'
                                        }
                                        value={name}
                                        placeholder="Name"
                                        onChangeText={text => {
                                            const formattedText = text
                                                .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphabetic characters except spaces
                                                .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
                                                .replace(/^\s/, ''); // Remove leading space

                                            // Only allow space if there's a letter before it
                                            if (
                                                text.endsWith(' ') &&
                                                !/[a-zA-Z]\s$/.test(
                                                    formattedText,
                                                )
                                            ) {
                                                setName(formattedText.trim());
                                            } else {
                                                setName(formattedText);
                                            }
                                        }}
                                        onFocus={() => {
                                            setIsFocused(true);
                                        }}
                                        onBlur={() => setIsFocused(false)}
                                        style={[styles.textInputStyle]}
                                    />
                                </View>
                            </View>
                            {errorMessage?.name && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.name}
                                </Text>
                            )}
                        </View>
                        <View>
                            {profileImage?.length > 0 ? (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        padding: SIZE(10),
                                        marginTop: SIZE(12),
                                    }}>
                                    {profileImage?.map((image, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                marginRight: SIZE(10),
                                                marginBottom: SIZE(8),
                                                borderStyle: 'dashed',
                                                borderWidth: 1,
                                                borderRadius: SIZE(8),
                                                borderColor: '#003459',
                                            }}>
                                            <Image
                                                style={{
                                                    width: SIZE(70),
                                                    height: SIZE(70),
                                                    borderRadius: SIZE(8),
                                                }}
                                                source={{
                                                    uri: image?.path || image,
                                                }}
                                            />
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={{
                                                    position: 'absolute',
                                                    top: SIZE(-5),
                                                    right: SIZE(-5),
                                                    backgroundColor: '#eee',
                                                    borderRadius: SIZE(30),
                                                }}
                                                onPress={() =>
                                                    removeImageNew(image.path)
                                                }>
                                                <CloseRound
                                                    height={SIZE(22)}
                                                    width={SIZE(22)}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            ) : null}
                            <View
                                style={{
                                    marginTop:
                                        profileImage?.length > 0 ? 0 : SIZE(24),
                                }}>
                                <PickImage
                                    setImages={setProfileImage}
                                    setError={setErrorMessage}
                                    images={profileImage}
                                    profile={true}
                                    single={true}
                                />
                                {errorMessage?.image && (
                                    <Text style={styles.errorMessage}>
                                        {errorMessage?.image}
                                    </Text>
                                )}
                            </View>
                        </View>
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
                        {errorMessage?.location && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.location}
                            </Text>
                        )}
                        <LongPriceForm
                            label={'Per hour price'}
                            setErrorMessage={setErrorMessage}
                            setField={setPricePerHour}
                            field={pricePerHour}
                            placeholderText={'Enter'}
                        />
                        {errorMessage?.pricePerHour && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.pricePerHour}
                            </Text>
                        )}
                        <View>
                            <DescriptionInput
                                label={'Description'}
                                placeholder={'Description'}
                                description={description}
                                setDescription={setDescription}
                                setError={setErrorMessage}
                            />
                            {errorMessage?.description && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.description}
                                </Text>
                            )}
                        </View>
                        <View>
                            {galleryEdit?.length > 0 || gallery?.length > 0 ? (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        padding: SIZE(10),
                                        marginTop: SIZE(12),
                                    }}>
                                    {galleryEdit?.map((image, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                marginRight: SIZE(10),
                                                marginBottom: SIZE(8),
                                                borderStyle: 'dashed',
                                                borderWidth: 1,
                                                borderRadius: SIZE(8),
                                                borderColor: '#003459',
                                            }}>
                                            <Image
                                                style={{
                                                    width: SIZE(70),
                                                    height: SIZE(70),
                                                    borderRadius: SIZE(8),
                                                }}
                                                source={{
                                                    uri: image.image,
                                                }}
                                            />
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={{
                                                    position: 'absolute',
                                                    top: SIZE(-5),
                                                    right: SIZE(-5),
                                                    backgroundColor: '#eee',
                                                    borderRadius: SIZE(30),
                                                }}
                                                onPress={() =>
                                                    removeImageGalleryNew(
                                                        image.id,
                                                    )
                                                }>
                                                <CloseRound
                                                    height={SIZE(22)}
                                                    width={SIZE(22)}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    {gallery?.map((image, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                marginRight: SIZE(10),
                                                marginBottom: SIZE(8),
                                                borderStyle: 'dashed',
                                                borderWidth: 1,
                                                borderRadius: SIZE(8),
                                                borderColor: '#003459',
                                            }}>
                                            <Image
                                                style={{
                                                    width: SIZE(70),
                                                    height: SIZE(70),
                                                    borderRadius: SIZE(8),
                                                }}
                                                source={{
                                                    uri: image.path,
                                                }}
                                            />
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={{
                                                    position: 'absolute',
                                                    top: SIZE(-5),
                                                    right: SIZE(-5),
                                                    backgroundColor: '#eee',
                                                    borderRadius: SIZE(30),
                                                }}
                                                onPress={() =>
                                                    removeImageGallery(
                                                        image.path,
                                                    )
                                                }>
                                                <CloseRound
                                                    height={SIZE(22)}
                                                    width={SIZE(22)}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <View></View>
                            )}
                            <View
                                style={{
                                    marginTop:
                                        gallery?.length > 0 ? 0 : SIZE(24),
                                }}>
                                <PickImage
                                    setImages={setGallery}
                                    setError={setErrorMessage}
                                    images={gallery}
                                    profile={false}
                                    single={false}
                                    training={true}
                                />
                                {errorMessage?.gallery && (
                                    <Text style={styles.errorMessage}>
                                        {errorMessage?.gallery}
                                    </Text>
                                )}
                            </View>
                        </View>
                        <View>
                            <DropDown
                                label={'Training Mode'}
                                choose={'Choose'}
                                data={trainingDummy}
                                setCategoryValue={setTrainingMode}
                                categoryValue={trainingMode}
                                setError={setErrorMessage}
                                categoryVisible={trainingVisible}
                                setCategoryVisible={setTrainingVisible}
                                dropDownHide={() => handlePressOutside()}
                            />
                            {errorMessage?.trainingMode && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.trainingMode}
                                </Text>
                            )}
                        </View>
                        <View>
                            <DropDown
                                label={'Experience'}
                                choose={'Choose'}
                                data={experienceDummy}
                                setCategoryValue={setExperience}
                                categoryValue={experience}
                                setError={setErrorMessage}
                                categoryVisible={categoryVisible}
                                setCategoryVisible={setCategoryVisible}
                                dropDownHide={() => handlePressOutside()}
                            />
                            {errorMessage?.experience && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.experience}
                                </Text>
                            )}
                        </View>
                        <View style={{marginTop: SIZE(24)}}>
                            <DocumentUpload
                                cvFile={cvFile}
                                setCvFile={setCvFile}
                                cvFileNoEdit={cvFileNoEdit}
                            />
                            {errorMessage?.cv && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.cv}
                                </Text>
                            )}
                        </View>
                        <View>
                            <DescriptionInput
                                label={'About Trainer'}
                                placeholder={'Enter'}
                                description={about}
                                setDescription={setAbout}
                                setError={setErrorMessage}
                            />
                            {errorMessage?.about && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.about}
                                </Text>
                            )}
                        </View>
                        <View style={{marginTop: SIZE(40)}}>
                            <TwoButton
                                buttonLoader={submitLoading}
                                leftText={'Cancel'}
                                onPressL={() => {
                                    if (fromMain) {
                                        clearAll && clearAll();
                                        setModalScreens('addPet');
                                    } else {
                                        clearAll && clearAll();
                                        setEdit && setEdit(false);
                                        setRefreshing &&
                                            setRefreshing(prev => !prev);
                                        setModalVisible(false);
                                    }
                                }}
                                rightText={edit ? 'Submit' : 'Next'}
                                onPressR={() => {
                                    const totalImages =
                                        (gallery?.length || 0) +
                                        (galleryEdit?.length || 0);
                                    if (
                                        name &&
                                        profileImage?.length > 0 &&
                                        exactLocation &&
                                        finalLocation &&
                                        pricePerHour &&
                                        description &&
                                        totalImages > 0 &&
                                        totalImages <= 10 &&
                                        experience &&
                                        trainingMode &&
                                        priceValid &&
                                        (cvFile?.length > 0 ||
                                            cvFileNoEdit?.length > 0) &&
                                        about
                                    ) {
                                        if (edit) {
                                            editProfile();
                                        } else {
                                            setModalScreens('AddService');
                                        }
                                    } else {
                                        setErrorMessage({
                                            ...errorMessage,
                                            name: name
                                                ? ''
                                                : 'Name is required',
                                            experience: experience
                                                ? ''
                                                : 'Please select your Experience',
                                            image:
                                                profileImage?.length > 0
                                                    ? ''
                                                    : 'Please add Profile Image',
                                            description: description
                                                ? ''
                                                : 'Please enter Description',
                                            gallery:
                                                totalImages > 10
                                                    ? 'Gallery image limit exceeded'
                                                    : totalImages > 0
                                                    ? ''
                                                    : 'Please add Gallery Images',
                                            location:
                                                exactLocation?.latitude &&
                                                finalLocation
                                                    ? ''
                                                    : 'Please select Location',
                                            pricePerHour: priceValid
                                                ? ''
                                                : 'Please enter valid Price',
                                            trainingMode: trainingMode
                                                ? ''
                                                : 'Please select Training Mode',
                                            cv:
                                                cvFile.length > 0 ||
                                                cvFileNoEdit?.length > 0
                                                    ? ''
                                                    : 'Please add CV file',
                                            about: about
                                                ? ''
                                                : 'Please enter About Trainer',
                                        });
                                    }
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default AddProfile;

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        paddingBottom: SIZE(30),
    },
    mainContainer: {
        paddingHorizontal: SIZE(32),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    labelText: {
        fontFamily: FONTS.medium,
        fontSize: SIZE(16),
        color: '#686868',
        marginBottom: SIZE(8),
    },
    inputBox: {
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#D3D3D3',
        paddingHorizontal: SIZE(10),
        backgroundColor: '#f7f7f7',
    },
    textInputStyle: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#242424',
    },
});
