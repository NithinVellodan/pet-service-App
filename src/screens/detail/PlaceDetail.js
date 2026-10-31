import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    StatusBar,
    Animated,
    Alert,
    ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
//packages
import ImagePicker from 'react-native-image-crop-picker';
// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import NormalForm from '../../components/forms/NormalForm';
import PetBasicDetails from './includes/PetBasicDetails';
import {Context} from '../../contexts/Store';
import UploadImageContainer from './includes/UploadImageContainer';
import CloseRound from '../../assets/icons/close-circle.svg';

export default function PlaceDetail({
    setDetailScreens,
    setTitle,
    setPhone,
    setDescription,
    setAboutService,
    setAddressText,
    setImages,
    title,
    phone,
    description,
    aboutService,
    addressText,
    images,
    setGeoAddressText,
    setExactLocation,
    geoAddressText,
    exactLocation,
    finalLocation,
    toastRef,
}) {
    const {dispatch} = useContext(Context);
    const [errorMessage, setErrorMessage] = useState({});
    const [phoneValid, setPhoneValid] = useState(false);

    // Animate
    const [animation] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }).start();
    }, []);

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0],
    });
    // Animate

    useEffect(() => {
        const phoneRegex = /^\d{7,}$/;
        setPhoneValid(phoneRegex.test(phone));
    }, [phone]);

    const openImagePicker = async () => {
        Alert.alert(
            'Choose Image Source',
            'Do you want to pick an image from the gallery or take a photo?',
            [
                {
                    text: 'Cancel',
                    onPress: () => 'User cancelled image picker',
                    style: 'cancel',
                },
                {
                    text: 'Gallery',
                    onPress: () => pickFromGallery(),
                },
                {
                    text: 'Camera',
                    onPress: () => pickFromCamera(),
                },
            ],
            {cancelable: false},
        );
    };
    const pickFromCamera = async () => {
        try {
            const results = await ImagePicker.openCamera({
                mediaType: 'photo',
            });
            handleImageResults(results);
        } catch (err) {
            console.log('Error picking images from camera:', err);
        }
    };

    const pickFromGallery = async () => {
        try {
            const results = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
            });
            handleImageResults(results);
        } catch (err) {
            console.log('Error picking images from gallery:', err);
        }
    };

    const handleImageResults = results => {
        if (Array.isArray(results)) {
            const newImages = results.map(image => ({
                path: image.path,
                name: image.filename || image.path.split('/').pop(),
                type: image.mime,
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
        } else {
            const newImage = {
                path: results.path,
                name: results.filename || results.path.split('/').pop(),
                type: results.mime,
            };
            setImages(prevImages => [...prevImages, newImage]);
        }
    };

    const removeImageNew = pathToRemove => {
        setImages(prevImages =>
            prevImages.filter(image => image.path !== pathToRemove),
        );
    };

    return (
        <ScrollView
            bounces={false}
            style={styles.container}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            <Animated.View style={{transform: [{translateX}]}}>
                <KeyboardAvoidingView showsVerticalScrollIndicator={false}>
                    <View>
                        <DoubleColorHeading
                            firstTitle={'Add Your'}
                            secondTitle={'Place Details'}
                            isCenter={true}
                        />
                        <DescriptionHeading
                            text={'Please Enter Your Place Details'}
                        />
                        <NormalForm
                            label={'Title'}
                            // star={'*'}
                            type={'Text'}
                            placeholder={'Enter Title'}
                            setvalue={setTitle}
                            dataValue={title}
                            setError={setErrorMessage}
                        />
                        {errorMessage?.title && (
                            <Text
                                allowFontScaling={false}
                                style={styles.errorMessage}>
                                {errorMessage?.title}
                            </Text>
                        )}

                        <View style={{}}>
                            <PetBasicDetails
                                setGeoAddressText={setGeoAddressText}
                                geoAddressText={geoAddressText}
                                setAddressText={setAddressText}
                                addressText={addressText}
                                setExactLocation={setExactLocation}
                                exactLocation={exactLocation}
                                errorMessage={errorMessage}
                                finalLocation={finalLocation}
                                toastRef={toastRef}
                            />
                        </View>
                        {errorMessage?.location && (
                            <Text
                                allowFontScaling={false}
                                style={styles.errorMessage}>
                                {errorMessage?.location}
                            </Text>
                        )}
                        <NormalForm
                            label={'Phone Number'}
                            type={'phone'}
                            placeholder={'Enter Your Phone Number'}
                            setvalue={setPhone}
                            dataValue={phone}
                            setError={setErrorMessage}
                        />
                        {errorMessage?.phone
                            ? errorMessage?.phone && (
                                  <Text
                                      allowFontScaling={false}
                                      style={styles.errorMessage}>
                                      {errorMessage?.phone}
                                  </Text>
                              )
                            : errorMessage?.phoneValid && (
                                  <Text style={styles.errorMessage}>
                                      {errorMessage?.phoneValid}
                                  </Text>
                              )}
                        {images.length > 0 ? (
                            <View style={styles.uploadedContainer}>
                                {images.map((image, index) => (
                                    <View
                                        key={index}
                                        style={styles.uploadedImageContainer}>
                                        <Image
                                            key={index}
                                            style={styles.uploadedImage}
                                            source={{uri: image.path}}
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
                        ) : (
                            <View></View>
                        )}
                        <UploadImageContainer
                            openImagePicker={openImagePicker}
                        />
                        {errorMessage?.imageList && (
                            <Text
                                allowFontScaling={false}
                                style={styles.errorMessage}>
                                {errorMessage?.imageList}
                            </Text>
                        )}
                        <View>
                            <NormalForm
                                label={'Description'}
                                type={'Text'}
                                placeholder={'Enter Description'}
                                multiline={true}
                                numberOfLines={3}
                                descriptionForm={true}
                                setvalue={setDescription}
                                dataValue={description}
                                setError={setErrorMessage}
                            />
                        </View>
                        {errorMessage?.description && (
                            <Text
                                allowFontScaling={false}
                                style={styles.errorMessage}>
                                {errorMessage?.description}
                            </Text>
                        )}
                        <NormalForm
                            label={'About Services'}
                            type={'Text'}
                            placeholder={'Enter Services'}
                            descriptionForm={true}
                            setvalue={setAboutService}
                            dataValue={aboutService}
                            setError={setErrorMessage}
                        />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                setDetailScreens('addPet');
                            }}
                            activeOpacity={0.8}
                            style={styles.skipContainer}>
                            <Text style={styles.skipText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                if (
                                    title &&
                                    phone &&
                                    description &&
                                    phoneValid &&
                                    finalLocation &&
                                    images.length !== 0 &&
                                    images.length <= 10
                                ) {
                                    setDetailScreens('breedDetail');
                                } else {
                                    setErrorMessage({
                                        title:
                                            title == ('' || null) &&
                                            'Title required',
                                        location:
                                            finalLocation == '' &&
                                            'Location required',
                                        phone:
                                            phone == ('' || null) &&
                                            'Phone required',
                                        description:
                                            description == ('' || null) &&
                                            'Description required',
                                        phoneValid:
                                            phoneValid == false &&
                                            'Please enter a valid phone number',
                                        imageList:
                                            images.length === 0
                                                ? 'Select at least one image'
                                                : images.length > 10
                                                ? 'Only 10 images are allowed'
                                                : null,
                                    });
                                }
                            }}
                            style={styles.nextContainer}>
                            <Text
                                allowFontScaling={false}
                                style={styles.nextText}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Animated.View>
            <View style={{height: SIZE(100)}}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: SIZE(32),
        paddingTop: SIZE(100),
    },
    uploadedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SIZE(10),
        marginTop: SIZE(24),
        borderStyle: 'dashed',
        padding: SIZE(16),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#003459',
    },
    imageMainContainer: {
        paddingTop: SIZE(24),
    },
    uploadedImageContainer: {
        width: SIZE(100),
        height: SIZE(100),
        marginBottom: SIZE(15),
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: SIZE(8),
    },
    imageContainer: {
        backgroundColor: '#EAF7FF',
        borderWidth: 1,
        borderRadius: SIZE(8),
        borderColor: '#003459',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(32),
        borderStyle: 'dashed',
        alignItems: 'center',
    },
    imageContent: {
        backgroundColor: '#fff',
        width: SIZE(56),
        height: SIZE(56),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(40),
    },
    uploadContainer: {
        width: SIZE(24),
        height: SIZE(24),
        fontFamily: FONTS.bold,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(32),
    },
    uploadText: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#003459',
    },
    skipContainer: {
        backgroundColor: '#F7F7F7',
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: 1,
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
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        width: SIZE(174),
        paddingHorizontal: SIZE(16),
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
        fontSize: SIZE(13),
        marginTop: SIZE(5),
        textAlign: 'right',
    },
    textInput: {
        fontSize: 20,
        marginLeft: 15,
        marginRight: 30,
        paddingTop: 2,
    },
});
