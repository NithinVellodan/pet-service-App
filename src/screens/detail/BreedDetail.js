import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Animated,
    Alert,
} from 'react-native';
import {useState, React, useEffect, useContext} from 'react';

//packages//
import ImagePicker from 'react-native-image-crop-picker';

// theme
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
//svg
import UploadOn from '../../assets/icons/uploadOn.svg';
import PlusButton from '../../assets/icons/plusButton.svg';
import CloseButton from '../../assets/icons/close-circle.svg';
import ToolTip from '../../assets/icons/tooltip.svg';
// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import {Context} from '../../contexts/Store';
import PetCategoryInput from './includes/PetCategoryInput';
import PetFacilities from './includes/PetFacilities';
import BreedAccommodation from './includes/BreedAccommodation';
import AcceptTerms from './includes/AcceptTerms';
import CancelSubmit from './includes/CancelSubmit';
import UploadImages from './includes/UploadImages';
import {ApiGeneral, ApiGeneralBreeds} from '../common/ApiGeneral';
import {serviceProviderFacilities} from '../main/ApiSectionServiceProvider';

export default function BreedDetail({
    setDetailScreens,
    close,
    breedModal,
    selectedCategories,
    setSelectedCategories,
    addPBreed,
    facilityImages,
    setFacilityImages,
    setFacilityPK,
    fromList,
    fromSingle,
    setEditModalVisible,
    setModalContent,
    selectedFacilities,
    setSelectedFacilities,
    setRemovedFAcilityPk,
    clearAll,
    isSelectedCategories,
    submitLoading,
}) {
    const {state, dispatch} = useContext(Context);
    const [categoryData, setPetCategory] = useState([]);
    const [facility, setFacility] = useState([]);
    const [arrival, SetArrival] = useState([]);
    //states
    const [categoriesItem, setCategoriesItem] = useState([]);
    const [perDay, setPerDay] = useState('');
    const [foodAmount, setFoodAmount] = useState('');
    const [boxVisible, setBoxVisible] = useState(
        state.userData.breed_boxVisible
            ? state.userData.breed_boxVisible
            : false || (breedModal && false),
    );
    const [isChecked, setChecked] = useState(
        state.userData.breed_isChecked
            ? state.userData.breed_isChecked
            : false || (breedModal && false),
    );
    const [errorMessage, setErrorMessage] = useState({});
    const [isChecked2, setChecked2] = useState(false);
    const [categoryValue, setCategoryValue] = useState(
        state.userData.breed_categoryValue
            ? state.userData.breed_categoryValue
            : null || (breedModal && null),
    );
    const [select, setSelect] = useState(
        state.userData.breed_select
            ? state.userData.breed_select
            : false || (breedModal && false),
    );
    const [typeValue, setTypeValue] = useState(
        state.userData.breed_typeValue
            ? state.userData.breed_typeValue
            : null || (breedModal && null),
    );
    const [nosValue, setNosValue] = useState(
        state.userData.breed_nosValue
            ? state.userData.breed_nosValue
            : null || (breedModal && null),
    );
    const [isShow, setIsShow] = useState(false);
    const [inputText, setInputText] = useState('');
    const [timeoutIdOne, setTimeoutIdOne] = useState(null);
    const [timeoutIdTwo, setTimeoutIdTwo] = useState(null);
    const [itemIsShowing, setItemIsShowing] = useState({});
    const [visibleStates, setVisibleStates] = useState({});
    const [animation] = useState(new Animated.Value(0));

    ApiGeneral(setPetCategory);
    serviceProviderFacilities(setFacility);
    ApiGeneralBreeds('section', SetArrival);

    // Animate
    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0],
    });

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }).start();

        const timeoutId = setTimeout(() => {
            setIsShow(false);
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [animation]);

    const handlePressShowing = itemId => {
        clearTimeout(timeoutIdOne);

        setItemIsShowing(prevIsShowing => ({
            ...prevIsShowing,
            [itemId]: true,
        }));

        const newTimeoutIdOne = setTimeout(() => {
            setItemIsShowing(prevIsShowing => ({
                ...prevIsShowing,
                [itemId]: false,
            }));
        }, 1000);

        setTimeoutIdOne(newTimeoutIdOne);
    };

    const handlePress = () => {
        clearTimeout(timeoutIdTwo);
        setIsShow(true);
        const newTimeoutIdTwo = setTimeout(() => {
            setIsShow(false);
        }, 1000);
        setTimeoutIdTwo(newTimeoutIdTwo);
    };

    useEffect(() => {
        if (!isChecked) {
            setInputText('');
        }
    }, [isChecked]);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutIdOne);
            clearTimeout(timeoutIdTwo);
        };
    }, [timeoutIdOne, timeoutIdTwo]);

    useEffect(() => {
        if (categoryValue > 0) {
            setErrorMessage({
                petCategory: '',
            });
        }
        if (typeValue > 0) {
            setErrorMessage({
                breedType: '',
            });
        }
        if (nosValue > 0) {
            setErrorMessage({
                noBreed: '',
            });
        }
        if (isChecked2 && true) {
            setErrorMessage({
                terms: '',
            });
        }
        if (typeValue > 0) {
            setErrorMessage({
                petSelection: '',
            });
        }
        if (selectedFacilities && selectedFacilities.image > 0) {
            setErrorMessage({
                facilities: '',
            });
        }
    }, [categoryValue, typeValue, selectedFacilities]);

    const getImageNameFromPath = path => {
        const pathParts = path.split('/');
        const fileName = pathParts[pathParts.length - 1];

        return fileName;
    };

    const handleToggleVisibility = categoryId => {
        setVisibleStates(prevStates => ({
            ...prevStates,
            [categoryId]: !prevStates[categoryId],
        }));
    };

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    //CustomDropDown function
    const CustomDropDown = () => {
        const actions = item => {
            const isSelected = selectedCategories.some(
                val => val.id === item.id,
            );
            setErrorMessage({
                ...errorMessage,
                petCategory: '',
            });
            if (isSelected) {
                const updatedSelection = selectedCategories.filter(
                    val => val.id !== item.id,
                );
                setSelectedCategories(updatedSelection);
            } else {
                const newData = {
                    ...item,
                    no_of_pets: 1,
                    id: item.id,
                    food_available: false,
                    food_price: item?.food_price ? item?.food_price : '0',
                    price_per_day: item.price_per_day,
                    remarks: item?.remarks ? item?.remarks : '',
                    name: item.name,
                };
                setSelectedCategories([...selectedCategories, newData]);
            }
        };

        //formatSelectedCategories function
        const formatSelectedCategories = () => {
            const categoriesString = selectedCategories.map(category => {
                const filteredCategory = isSelectedCategories?.filter(
                    item => item.id === category.id,
                );
                return (
                    <View style={styles.chooseMainContainer} key={category.id}>
                        <View
                            style={[
                                styles.chooseCategory,
                                {
                                    opacity:
                                        filteredCategory &&
                                        filteredCategory[0]?.id
                                            ? 0.2
                                            : 1,
                                },
                            ]}>
                            <Text
                                style={{
                                    fontSize: SIZE(14),
                                    fontFamily: FONTS.medium,
                                    color: '#003459',
                                }}
                                allowFontScaling={false}>
                                {category.name}
                            </Text>
                            <TouchableOpacity
                                disabled={
                                    filteredCategory && filteredCategory[0]?.id
                                        ? true
                                        : false
                                }
                                activeOpacity={0.8}
                                onPress={() => {
                                    if (fromList === true) {
                                        clearAll();
                                    }
                                    actions(category);
                                }}
                                hitSlop={0.7}
                                style={{
                                    width: SIZE(20),
                                    height: SIZE(20),
                                    marginLeft: SIZE(8),
                                }}>
                                <CloseButton width="100%" height="100%" />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            });

            return (
                <View style={styles.chooseContainer}>{categoriesString}</View>
            );
        };

        // handleIncrement function
        const handleIncrement = categoryId => {
            const updatedCategories = selectedCategories.map(category =>
                category.id === categoryId
                    ? {
                          ...category,
                          no_of_pets: Math.min(category.no_of_pets + 1, 10),
                      }
                    : category,
            );
            setSelectedCategories(updatedCategories);
        };

        // handleDecrement function
        const handleDecrement = categoryId => {
            const updatedCategories = selectedCategories.map(category =>
                category.id === categoryId
                    ? {
                          ...category,
                          no_of_pets: Math.max(category.no_of_pets - 1, 1),
                      }
                    : category,
            );
            setSelectedCategories(updatedCategories);
        };

        const isFormatSelectedCategoriesActive = selectedCategories.length > 0;

        return (
            <View style={{flex: 1}}>
                <PetCategoryInput
                    isSelectedCategories={isSelectedCategories}
                    isFormatSelectedCategoriesActive={
                        isFormatSelectedCategoriesActive
                    }
                    selectedCategories={selectedCategories}
                    boxVisible={boxVisible}
                    setBoxVisible={setBoxVisible}
                    formatSelectedCategories={formatSelectedCategories}
                    categoryData={categoryData}
                    actions={actions}
                />
                <>
                    {errorMessage?.petCategory && (
                        <View>
                            <Text style={styles.errorMessage}>
                                {errorMessage?.petCategory}
                            </Text>
                        </View>
                    )}
                    {selectedCategories.length !== 0 && (
                        <View>
                            <BreedAccommodation
                                selectedCategories={selectedCategories}
                                visibleStates={visibleStates}
                                handleToggleVisibility={handleToggleVisibility}
                                itemIsShowing={itemIsShowing}
                                handlePressShowing={handlePressShowing}
                                handleIncrement={handleIncrement}
                                handleDecrement={handleDecrement}
                                setSelectedCategories={setSelectedCategories}
                                setErrorMessage={setErrorMessage}
                            />
                        </View>
                    )}
                </>
            </View>
        );
    };

    const handlePressSubmit = () => {
        let is_details_screen = false;
        const errorData = selectedCategories.map(item => {
            if (
                item.price_per_day === undefined ||
                item.price_per_day === null ||
                item.price_per_day === ''
            ) {
                is_details_screen = false;
                return {
                    ...item,
                    per_day_error: 'Enter Price per day',
                };
            } else {
                is_details_screen = true;
            }

            if (
                item.food_available === true &&
                (item.food_price === '0' ||
                    item.food_price === '' ||
                    item.food_price === null)
            ) {
                is_details_screen = false;
                return {
                    ...item,
                    food_amount_error: 'Enter Food Amount',
                };
            } else {
                is_details_screen = true;
            }

            return item;
        });
        setSelectedCategories(errorData);

        const facilityErrorData = selectedFacilities.map(facility => {
            if (!facility.image) {
                is_details_screen = false;
                return {
                    ...facility,
                    facility_image_error: `Please upload an image for ${facility.title}`,
                };
            }
            return {...facility, facility_image_error: ''};
        });
        setSelectedFacilities(facilityErrorData);

        let newErrorMessages = {...errorMessage};
        newErrorMessages.facilities = facilityErrorData
            .filter(facility => facility.facility_image_error)
            .map(facility => facility.facility_image_error)
            .join(', ');

        setErrorMessage(newErrorMessages);

        if (is_details_screen === true) {
            if (breedModal) {
                close(false);
            } else if (fromList === true) {
                setModalContent('ConfirmationPage');
            } else if (fromSingle === true) {
                addPBreed();
            } else {
                setDetailScreens('confirm');
            }
        }
    };

    const handleItemPress2 = item => {
        const isSelected = selectedFacilities.some(
            selectedItem => selectedItem.id === item.id,
        );
        if (isSelected) {
            const updatedSelected = selectedFacilities.filter(
                selectedItem => selectedItem.id !== item.id,
            );
            setSelectedFacilities(updatedSelected);
            setFacilityPK(prevFacilityPK =>
                prevFacilityPK.filter(id => id !== item.id),
            );
            setRemovedFAcilityPk(prevRemovedFacilityPK => [
                ...prevRemovedFacilityPK,
                item.id,
            ]);
        } else {
            setSelectedFacilities([...selectedFacilities, item]);
            setFacilityPK(prevFacilityPK => [...prevFacilityPK, item.id]);
            setRemovedFAcilityPk(prevRemovedFacilityPK =>
                prevRemovedFacilityPK.filter(id => id !== item.id),
            );
        }
    };

    const actions3 = async item => {
        const isSelected = selectedFacilities.some(
            selectedItem => selectedItem.id === item.id,
        );

        if (isSelected) {
            Alert.alert(
                'Choose Image Source',
                'Do you want to pick an image from the gallery or take a photo?',
                [
                    {
                        text: 'Cancel',
                        onPress: () =>
                            console.log('User cancelled image picker'),
                        style: 'cancel',
                    },
                    {
                        text: 'Gallery',
                        onPress: () => pickFromGallery(item),
                    },
                    {
                        text: 'Camera',
                        onPress: () => pickFromCamera(item),
                    },
                ],
                {cancelable: false},
            );
        } else {
            setSelectedFacilities([...selectedFacilities, item]);
        }
    };

    const pickFromCamera = async item => {
        try {
            const result = await ImagePicker.openCamera({
                mediaType: 'photo',
            });
            handleImageResult(result, item);
        } catch (err) {
            console.log('Error picking image from camera:', err);
        }
    };

    const pickFromGallery = async item => {
        try {
            const result = await ImagePicker.openPicker({
                multiple: false,
                mediaType: 'photo',
                cropping: false,
            });
            handleImageResult(result, item);
        } catch (err) {
            console.log('Error picking image from gallery:', err);
        }
    };

    const handleImageResult = (result, item) => {
        const newImage = {
            id: result.filename || result.path.split('/').pop(),
            path: result.path,
            type: result.mime,
            name: result.filename || result.path.split('/').pop(),
        };

        setFacilityImages(prevImages => {
            const imageSet = new Set(prevImages.map(image => image.id));
            if (!imageSet.has(item.id)) {
                return [
                    ...prevImages,
                    {
                        id: item.id,
                        path: result.path,
                        type: result.mime,
                        name: result.path,
                    },
                ];
            }

            return prevImages;
        });

        const updatedSelected = selectedFacilities.map(selectedItem =>
            selectedItem.id === item.id
                ? {...selectedItem, image: newImage}
                : selectedItem,
        );

        setSelectedFacilities(updatedSelected);
    };

    const removeImage = item => {
        const updatedSelected = selectedFacilities.map(selectedItem =>
            selectedItem.id === item.id
                ? {...selectedItem, image: null}
                : selectedItem,
        );

        setSelectedFacilities(updatedSelected);
    };

    const upLoadImageContent = () => {
        return (
            <View style={{flex: 1}}>
                <PetFacilities
                    selectedFacilities={selectedFacilities}
                    errorMessage={errorMessage}
                    setSelect={setSelect}
                    facility={facility}
                    handleItemPress2={handleItemPress2}
                    setFacilityPK={setFacilityPK}
                />
                {selectedFacilities && selectedFacilities.length !== 0 && (
                    <>
                        <Text allowFontScaling={false} style={styles.labelText}>
                            Upload Images
                        </Text>
                        {selectedFacilities.map((item, index) => (
                            <View key={index}>
                                {item.image ? (
                                    <UploadImages
                                        item={item}
                                        images={facilityImages}
                                        getImageNameFromPath={
                                            getImageNameFromPath
                                        }
                                        index={index}
                                        removeImage={removeImage}
                                    />
                                ) : (
                                    <>
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                actions3(item);
                                            }}
                                            activeOpacity={0.8}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: '#FFF',
                                                padding: SIZE(6),
                                                borderRadius: SIZE(10),
                                                justifyContent: 'space-between',
                                                borderWidth: SIZE(1),
                                                borderColor: '#D3D3D3',
                                                marginBottom: SIZE(16),
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                <View
                                                    style={{
                                                        width: SIZE(40),
                                                        height: SIZE(40),
                                                        marginRight: SIZE(8),
                                                    }}>
                                                    <UploadOn
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent:
                                                            'space-between',
                                                    }}>
                                                    <View>
                                                        <Text
                                                            allowFontScaling={
                                                                false
                                                            }
                                                            style={{
                                                                color: '#003459',
                                                                fontSize:
                                                                    SIZE(12),
                                                                fontWeight:
                                                                    '700',
                                                                fontFamily:
                                                                    FONTS.regular,
                                                            }}>
                                                            Upload {item.title}{' '}
                                                            Image
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: '#F7F7F7',
                                                    borderRadius: SIZE(40),
                                                    padding: SIZE(6),
                                                    width: SIZE(40),
                                                    height: SIZE(40),
                                                }}
                                                onPress={() => {
                                                    actions3(item);
                                                }}
                                                activeOpacity={0.8}>
                                                <PlusButton
                                                    width="100%"
                                                    height="100%"
                                                />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                        {item.facility_image_error && (
                                            <Text
                                                style={[
                                                    styles.errorMessage,
                                                    {
                                                        marginTop: SIZE(-10),
                                                        marginBottom: SIZE(10),
                                                    },
                                                ]}>
                                                {item.facility_image_error}
                                            </Text>
                                        )}
                                    </>
                                )}
                            </View>
                        ))}
                    </>
                )}
            </View>
        );
    };
    return (
        <ScrollView
            bounces={false}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <View>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={'#007EA7'}
                />
                <Animated.View style={{transform: [{translateX}]}}>
                    <ScrollView
                        bounces={false}
                        contentContainerStyle={{
                            minHeight: '100%',
                        }}
                        showsVerticalScrollIndicator={false}>
                        <View>
                            <DoubleColorHeading
                                firstTitle={'Add'}
                                secondTitle={'Breed Details'}
                                isCenter={true}
                            />
                            <DescriptionHeading
                                text={'Enter Breed Accommodation Details'}
                            />
                            <View style={styles.inputBox}>
                                <View style={styles.inputBoxSub}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.labelText}>
                                        Pet Category
                                    </Text>
                                    {CustomDropDown()}
                                </View>
                            </View>
                        </View>
                        {upLoadImageContent()}
                        <View>
                            <AcceptTerms
                                isChecked2={isChecked2}
                                errorMessage={errorMessage}
                                setChecked2={setChecked2}
                                handlePress={handlePress}
                            />
                            {isShow && (
                                <View
                                    style={{
                                        borderWidth: SIZE(0.6),
                                        borderColor: '#E2E2E2',
                                        position: 'absolute',
                                        right: SIZE(40),
                                        top: SIZE(0),
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
                                        accept terms and condition message
                                        here!!!
                                    </Text>
                                </View>
                            )}
                        </View>
                        {!isChecked2 && errorMessage?.isChecked2 && (
                            <Text
                                allowFontScaling={false}
                                style={styles.errorMessage}>
                                {errorMessage?.isChecked2}
                            </Text>
                        )}
                        <CancelSubmit
                            clearAll={clearAll}
                            setEditModalVisible={setEditModalVisible}
                            fromList={fromList}
                            fromSingle={fromSingle}
                            updateUserDate={updateUserDate}
                            state={state}
                            selectedCategories={selectedCategories}
                            boxVisible={boxVisible}
                            isChecked={isChecked}
                            selectedFacilities={selectedFacilities}
                            select={select}
                            categoryValue={categoryValue}
                            typeValue={typeValue}
                            nosValue={nosValue}
                            isChecked2={isChecked2}
                            setErrorMessage={setErrorMessage}
                            errorMessage={errorMessage}
                            setDetailScreens={setDetailScreens}
                            setModalContent={setModalContent}
                            handlePressSubmit={handlePressSubmit}
                            submitLoading={submitLoading}
                            setSelectedCategories={setSelectedCategories}
                        />
                    </ScrollView>
                </Animated.View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: SIZE(32),
        paddingTop: SIZE(32),
        paddingBottom: SIZE(23),
    },
    checkBoxContainer: {
        flex: 1,
    },

    uploadedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SIZE(32),
        borderStyle: 'dashed',
        padding: SIZE(10),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#003459',
    },
    uploadedImageContainer: {
        width: SIZE(100),
        height: SIZE(100),
        marginBottom: SIZE(15),
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
    },
    imageMainContainer: {
        paddingVertical: SIZE(24),
        marginTop: SIZE(24),
    },
    imageContainer: {
        backgroundColor: '#EAF7FF',
        borderWidth: SIZE(1),
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(20),
    },
    uploadText: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#003459',
    },
    skipContainer: {
        backgroundColor: '#f7f7f7',
        marginTop: SIZE(24),
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
        marginTop: SIZE(24),
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

    inputBox: {
        marginTop: SIZE(40),
    },
    labelText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.medium,
        marginBottom: SIZE(10),
        marginTop: SIZE(24),
    },
    inputBoxSub: {
        marginBottom: SIZE(24),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    visibleBox: {
        alignItems: 'center',
        borderRadius: SIZE(8),
        padding: SIZE(15),
        backgroundColor: '#fff',
        marginTop: SIZE(10),
    },
    visibleTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width * 0.75,
        borderWidth: SIZE(1),
        padding: SIZE(10),
        borderRadius: SIZE(8),
        justifyContent: 'space-between',
        marginBottom: SIZE(20),
        borderColor: '#EDEDED',
        backgroundColor: '#F7F7F7',
    },
    contentText: {
        textAlign: 'center',
        color: '#242424',
        fontFamily: FONTS.semiBold,
    },

    ChooseBoxTwo: {
        textAlign: 'center',
        color: '#242424',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '500',
    },

    chooseContainer: {
        flexDirection: 'row',
    },
    chooseCategory: {
        borderWidth: SIZE(1),
        borderColor: '#98C1D9',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(4),
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(6),
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SIZE(8),
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
