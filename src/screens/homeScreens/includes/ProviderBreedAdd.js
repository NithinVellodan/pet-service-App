import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Animated,
} from 'react-native';
import {useState, React, useEffect, useContext} from 'react';

//packages//

// theme
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//svg
import CheckBoxIcon from '../../../assets/icons/Checkbox.svg';
import CloseButton from '../../../assets/icons/close-circle.svg';
import ArrowDown from '../../../assets/icons/arrow-down.svg';
import Arrow from '../../../assets/icons/arrow-up.svg';

// components
import DoubleColorHeading from '../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../components/headings/DescriptionHeading';

// import CheckBoxCommon from '../..common/CheckBox';
import {Context} from '../../../contexts/Store';
import BreedAccommodation from '../../detail/includes/BreedAccommodation';

// import CountButton from './includes/CountButton';

export default function ProviderBreedAdd({
    breedModal,
    selectedCategories,
    setSelectedCategories,
    addPBreed,
    fromList,
    setBreedModalVisible,
    breedList,
}) {
    const {state} = useContext(Context);
    const [categoriesItem, setCategoriesItem] = useState([]);
    const [boxVisible, setBoxVisible] = useState(
        state.userData.breed_boxVisible
            ? state.userData.breed_boxVisible
            : false || (breedModal && false),
    );
    const [errorMessage, setErrorMessage] = useState({});
    const [isShow, setIsShow] = useState(false);
    const [timeoutIdOne, setTimeoutIdOne] = useState(null);
    const [timeoutIdTwo, setTimeoutIdTwo] = useState(null);
    const [itemIsShowing, setItemIsShowing] = useState({});
    const [visibleStates, setVisibleStates] = useState({});

    // Animate
    const [animation] = useState(new Animated.Value(0));
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

    //states

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

    useEffect(() => {
        return () => {
            clearTimeout(timeoutIdOne);
            clearTimeout(timeoutIdTwo);
        };
    }, [timeoutIdOne, timeoutIdTwo]);

    //handleToggleVisibility function
    const handleToggleVisibility = categoryId => {
        setVisibleStates(prevStates => ({
            ...prevStates,
            [categoryId]: !prevStates[categoryId],
        }));
    };

    const handlePressSubmit = () => {
        let is_details_screen = false;
        const errorData = selectedCategories.map(item => {
            if (item.price_per_day == '') {
                is_details_screen = false;
                return {
                    ...item,
                    per_day_error: 'Enter Price per day',
                };
            } else {
                is_details_screen = true;
            }

            if (item.food_available === true && item.food_price == '') {
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
        if (is_details_screen) {
            addPBreed();
            setBreedModalVisible(false);
            setSelectedCategories([]);
        }
    };

    const CustomDropDown = () => {
        const handleCategorySelection = item => {
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
                    food_price: '',
                    price_per_day: '',
                    remarks: '',
                    name: item.name,
                };
                setSelectedCategories([newData]);
            }
        };

        //formatSelectedCategories function
        const formatSelectedCategories = () => {
            const categoriesString = selectedCategories.map(category => (
                <View style={styles.chooseMainContainer} key={category.id}>
                    <View style={styles.chooseCategory}>
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
                            activeOpacity={0.8}
                            onPress={() => {
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
            ));

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
                          no_of_pets: (category.no_of_pets || 0) + 1,
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
                          no_of_pets: Math.max(
                              (category.no_of_pets || 0) - 1,
                              1,
                          ),
                      }
                    : category,
            );
            setSelectedCategories(updatedCategories);
        };
        const isFormatSelectedCategoriesActive = selectedCategories.length > 0;

        return (
            <View style={{flex: 1}}>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setBoxVisible(!boxVisible);
                        }}
                        style={[
                            styles.dropBox,
                            isFormatSelectedCategoriesActive && {
                                paddingVertical: SIZE(13.5),
                            },
                        ]}>
                        <Text allowFontScaling={false} style={styles.ChooseBox}>
                            {selectedCategories.length > 0
                                ? formatSelectedCategories()
                                : 'Choose'}
                        </Text>
                        {boxVisible ? (
                            <Arrow width={SIZE(24)} height={SIZE(24)} />
                        ) : (
                            <ArrowDown width={SIZE(24)} height={SIZE(24)} />
                        )}
                    </TouchableOpacity>
                    {boxVisible && (
                        <View style={styles.visibleBox}>
                            {breedList.map((item, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    key={item.id}
                                    onPress={() => {
                                        handleCategorySelection(item);
                                    }}
                                    style={styles.visibleTouch}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.contentText}>
                                        {item.name}
                                    </Text>
                                    <View
                                        style={[
                                            styles.buttonBox,
                                            {
                                                backgroundColor:
                                                    selectedCategories.some(
                                                        category =>
                                                            category.id ===
                                                            item.id,
                                                    )
                                                        ? ''
                                                        : '#F7F7F7',
                                                borderColor:
                                                    selectedCategories.some(
                                                        category =>
                                                            category.id ===
                                                            item.id,
                                                    )
                                                        ? '#fff'
                                                        : '#969696',
                                                borderWidth: SIZE(1),
                                            },
                                        ]}>
                                        {selectedCategories.some(
                                            category => category.id === item.id,
                                        ) && (
                                            <CheckBoxIcon
                                                width={SIZE(20)}
                                                height={SIZE(20)}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                onPress={() => {
                                    setBoxVisible(!boxVisible);
                                }}
                                activeOpacity={0.8}
                                style={styles.doneButton}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.buttonText}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
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

    return (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.container}>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={'#007EA7'}
                />
                <Animated.View style={{transform: [{translateX}]}}>
                    <ScrollView
                        contentContainerStyle={{
                            minHeight: '100%',
                        }}
                        bounces={false}
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
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setBreedModalVisible(false);
                                    setSelectedCategories([]);
                                }}
                                style={styles.skipContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.skipText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    if (selectedCategories.length > 0) {
                                        if (fromList === true) {
                                            handlePressSubmit();
                                            // setEditModalVisible(false);
                                            // setModalContent('ConfirmationPage');
                                        } else {
                                            handlePressSubmit();
                                            // setDetailScreens('confirm');
                                        }
                                        // setDetailScreens('confirm');
                                    } else {
                                        setErrorMessage({
                                            ...errorMessage,
                                            petCategory:
                                                selectedCategories &&
                                                selectedCategories.length ===
                                                    0 &&
                                                'Please select at least one Pet',
                                        });
                                    }
                                }}
                                style={styles.nextContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.nextText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
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
    dropBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: SIZE(1),
        padding: SIZE(16),
        borderRadius: SIZE(8),
        justifyContent: 'space-between',
        borderColor: '#009FD3',
    },
    ChooseBox: {
        textAlign: 'center',
        color: '#242424',
        fontFamily: FONTS.regular,
    },
    buttonBox: {
        width: SIZE(20),
        height: SIZE(20),
        borderRadius: SIZE(5),
    },
    doneButton: {
        borderWidth: SIZE(1),
        width: SIZES.width * 0.75,
        borderRadius: SIZE(8),
        padding: SIZE(10),
        backgroundColor: '#003459',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: FONTS.semiBold,
    },
});
