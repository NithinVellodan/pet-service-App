import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StatusBar,
    Animated,
} from 'react-native';
import {useState, React, useEffect, useContext} from 'react';

//packages//
import ImagePicker from 'react-native-image-crop-picker';

// theme
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//svg
import ArrowDown from '../../../assets/icons/arrow-down.svg';
import Arrow from '../../../assets/icons/arrow-up.svg';
import UploadOn from '../../../assets/icons/uploadOn.svg';
import PlusButton from '../../../assets/icons/plusButton.svg';
import CheckBoxIcon from '../../../assets/icons/Checkbox.svg';
import CloseButton from '../../../assets/icons/close-circle.svg';
import InfoCircle from '../../../assets/icons/info-circle.svg';
import ToolTip from '../../../assets/icons/tooltip.svg';

// components
import DoubleColorHeading from '../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../components/headings/DescriptionHeading';
import CheckBoxCommon from '../../common/CheckBox';
import {Context} from '../../../contexts/Store';

export default function AddBreedModal({setDetailScreens}) {
    const {state, dispatch} = useContext(Context);
    const [animation] = useState(new Animated.Value(0));
    const [perDay, setPerDay] = useState('');
    const [foodAmount, setFoodAmount] = useState('');
    const [boxVisible, setBoxVisible] = useState(
        state.userData.breed_boxVisible
            ? state.userData.breed_boxVisible
            : false,
    );
    const [isChecked, setChecked] = useState(
        state.userData.breed_isChecked ? state.userData.breed_isChecked : false,
    );
    const [errorMessage, setErrorMessage] = useState({});
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [isChecked2, setChecked2] = useState(false);
    const [images, setImages] = useState(
        state.userData.breed_images ? state.userData.breed_images : [],
    );
    const [categoryValue, setCategoryValue] = useState(
        state.userData.breed_categoryValue
            ? state.userData.breed_categoryValue
            : null,
    );
    const [select, setSelect] = useState(
        state.userData.breed_select ? state.userData.breed_select : false,
    );
    const [typeValue, setTypeValue] = useState(
        state.userData.breed_typeValue ? state.userData.breed_typeValue : null,
    );
    const [nosValue, setNosValue] = useState(
        state.userData.breed_nosValue ? state.userData.breed_nosValue : null,
    );
    const [isShow, setIsShow] = useState(false);
    const [inputText, setInputText] = useState('');
    const [timeoutIdOne, setTimeoutIdOne] = useState(null);
    const [timeoutIdTwo, setTimeoutIdTwo] = useState(null);
    const [itemIsShowing, setItemIsShowing] = useState({});
    const [visibleStates, setVisibleStates] = useState({});

    const facilitiesData = [
        {
            id: 1,
            name: 'Playground',
        },
        {
            id: 2,
            name: 'Pool',
        },
        {
            id: 3,
            name: 'Place',
        },
        {
            id: 4,
            name: 'Park',
        },
        {
            id: 5,
            name: 'Pool',
        },
        {
            id: 6,
            name: 'Playstation',
        },
        {
            id: 7,
            name: 'others',
        },
    ];
    const categoryData = [
        {
            name: 'Dogs',
            id: 1,
            count: 1,
        },
        {
            name: 'Cats',
            id: 2,
            count: 1,
        },
        {
            name: 'Birds',
            id: 3,
            count: 1,
        },
    ];
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
        if (selectedFacilities > 0) {
            setErrorMessage({
                facilities: '',
            });
        }
    }, [categoryValue, typeValue, selectedFacilities]);

    //getImageNameFromPath function
    const getImageNameFromPath = path => {
        const pathParts = path.split('/');
        const fileName = pathParts[pathParts.length - 1];

        return fileName;
    };

    //handleToggleVisibility function
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

    //openImagePicker function
    const openImagePicker = name => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 10,
            mediaType: 'any',
            includeBase64: true,
        })

            .then(response => {
                response.map(image => {
                    setImages(prevImages => [
                        ...prevImages,
                        {
                            name: name,
                            filename: image.filename,
                            path: image.path,
                            data: image.data,
                        },
                    ]);
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    //facActions function
    const facActions = item => {
        const isSelected = selectedFacilities.some(val => val.id === item.id);
        if (isSelected) {
            const updatedSelection = selectedFacilities.filter(
                val => val.id !== item.id,
            );
            setSelectedFacilities(updatedSelection);
        } else {
            setSelectedFacilities([...selectedFacilities, item]);
        }
        return selectedFacilities.map(facility => facility.name);
    };

    //removeImage function
    const removeImage = imageName => {
        const updatedSelectedFacilities = selectedFacilities.filter(
            item => item.name !== imageName,
        );
        setSelectedFacilities(updatedSelectedFacilities);
        const updatedImages = images.filter(data => data.name !== imageName);
        setImages(updatedImages);
    };

    const [selectedCategories, setSelectedCategories] = useState(
        state.userData.breed_selectedCategories
            ? state.userData.breed_selectedCategories
            : [],
    );

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
                setSelectedCategories([...selectedCategories, item]);
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

        //handleIncrement function
        const handleIncrement = categoryId => {
            const updatedCategories = selectedCategories.map(category =>
                category.id === categoryId
                    ? {...category, count: category.count + 1}
                    : category,
            );
            setSelectedCategories(updatedCategories);
        };

        //handleDecrement function
        const handleDecrement = categoryId => {
            const updatedCategories = selectedCategories.map(category =>
                category.id === categoryId && category.count > 1
                    ? {...category, count: category.count - 1}
                    : category,
            );
            setSelectedCategories(updatedCategories);
        };
        const isFormatSelectedCategoriesActive = selectedCategories.length > 0;

        return (
            <View style={{flex: 1}}>
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
                        {categoryData.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={item.id}
                                onPress={() => {
                                    actions(item);
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
                                                        category.id === item.id,
                                                )
                                                    ? ''
                                                    : '#F7F7F7',
                                            borderColor:
                                                selectedCategories.some(
                                                    category =>
                                                        category.id === item.id,
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
                {errorMessage?.petCategory && (
                    <View>
                        <Text style={styles.errorMessage}>
                            {errorMessage?.petCategory}
                        </Text>
                    </View>
                )}
                {selectedCategories.length !== 0 && (
                    <View>
                        <View style={{paddingVertical: SIZE(24)}}>
                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: SIZE(16),
                                        color: '#686868',
                                        fontFamily: FONTS.regular,
                                    }}>
                                    Breeds can Accommodate
                                </Text>
                            </View>

                            <View>
                                {selectedCategories.map((item, index) => (
                                    <View
                                        style={{
                                            backgroundColor: '#fff',
                                            borderWidth: SIZE(1),
                                            borderColor: '#E2E2E2',
                                            borderRadius: SIZE(8),
                                            marginTop: SIZE(8),
                                        }}
                                        key={item.id}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() =>
                                                handleToggleVisibility(item.id)
                                            }
                                            style={[
                                                styles.dropBoxTwo,
                                                visibleStates[item.id] &&
                                                    styles.activeDropBoxTwo,
                                            ]}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.ChooseBoxTwo}>
                                                {item.name}
                                            </Text>

                                            {visibleStates[item.id] ? (
                                                <Arrow />
                                            ) : (
                                                <ArrowDown />
                                            )}
                                        </TouchableOpacity>

                                        {visibleStates[item.id] && (
                                            <View
                                                style={{
                                                    borderColor: '#D3D3D3',
                                                    marginTop: SIZE(10),
                                                    padding: SIZE(16),
                                                    borderBottomLeftRadius:
                                                        SIZE(8),
                                                    borderBottomRightRadius:
                                                        SIZE(8),
                                                    backgroundColor: '#fff',
                                                }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent:
                                                            'space-between',
                                                        alignItems: 'center',
                                                        marginVertical:
                                                            SIZE(10),
                                                    }}>
                                                    <Text
                                                        allowFontScaling={false}
                                                        style={{
                                                            color: '#242424',
                                                            opacity: 0.5,
                                                            fontFamily:
                                                                FONTS.semiBold,
                                                            fontSize: SIZE(14),
                                                        }}>
                                                        {item.name}:
                                                    </Text>
                                                    <View
                                                        style={
                                                            styles.container1
                                                        }>
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            onPress={() =>
                                                                handleDecrement(
                                                                    item.id,
                                                                )
                                                            }
                                                            style={
                                                                styles.button
                                                            }>
                                                            <Text
                                                                allowFontScaling={
                                                                    false
                                                                }
                                                                style={
                                                                    styles.buttonText2
                                                                }>
                                                                -
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <View
                                                            style={
                                                                styles.ChooseBoxCount
                                                            }>
                                                            <Text
                                                                allowFontScaling={
                                                                    false
                                                                }
                                                                style={
                                                                    styles.countText
                                                                }>
                                                                {item.count}
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            onPress={() =>
                                                                handleIncrement(
                                                                    item.id,
                                                                )
                                                            }
                                                            style={
                                                                styles.button
                                                            }>
                                                            <Text
                                                                allowFontScaling={
                                                                    false
                                                                }
                                                                style={
                                                                    styles.buttonText2
                                                                }>
                                                                +
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View>
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                'row',
                                                            justifyContent:
                                                                'space-between',
                                                        }}>
                                                        <View
                                                            style={{
                                                                marginVertical:
                                                                    SIZE(8),
                                                            }}>
                                                            <Text
                                                                allowFontScaling={
                                                                    false
                                                                }
                                                                style={{
                                                                    color: '#000',
                                                                    fontSize:
                                                                        SIZE(
                                                                            12,
                                                                        ),
                                                                    fontFamily:
                                                                        FONTS.regular,
                                                                }}>
                                                                Price Per Day
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            // activeOpacity={0.8}
                                                            hitSlop={8}
                                                            style={{
                                                                width: SIZE(20),
                                                                height: SIZE(
                                                                    20,
                                                                ),
                                                            }}
                                                            onPress={() => {
                                                                handlePressShowing(
                                                                    item.id,
                                                                );
                                                            }}>
                                                            <InfoCircle
                                                                width="100%"
                                                                height="100%"
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                    {itemIsShowing[item.id] &&
                                                        visibleStates[
                                                            item.id
                                                        ] && (
                                                            <View
                                                                style={{
                                                                    borderWidth:
                                                                        SIZE(
                                                                            0.6,
                                                                        ),
                                                                    borderColor:
                                                                        '#E2E2E2',
                                                                    position:
                                                                        'absolute',
                                                                    right: -8,
                                                                    top: SIZE(
                                                                        35,
                                                                    ),
                                                                    width: SIZE(
                                                                        180,
                                                                    ),
                                                                    height: SIZE(
                                                                        70,
                                                                    ),
                                                                    zIndex: 100,
                                                                    backgroundColor:
                                                                        '#fff',
                                                                    borderRadius:
                                                                        SIZE(8),
                                                                    alignItems:
                                                                        'center',
                                                                    justifyContent:
                                                                        'center',
                                                                    padding:
                                                                        SIZE(
                                                                            10,
                                                                        ),
                                                                }}>
                                                                <View
                                                                    style={{
                                                                        position:
                                                                            'absolute',
                                                                        right: SIZE(
                                                                            10,
                                                                        ),
                                                                        bottom: SIZE(
                                                                            69,
                                                                        ),
                                                                        zIndex: -100,
                                                                    }}>
                                                                    <ToolTip
                                                                        width={SIZE(
                                                                            18,
                                                                        )}
                                                                        height={SIZE(
                                                                            18,
                                                                        )}
                                                                    />
                                                                </View>
                                                                <Text
                                                                    style={{
                                                                        color: '#969696',
                                                                        fontFamily:
                                                                            FONTS.medium,
                                                                        fontSize:
                                                                            SIZE(
                                                                                12,
                                                                            ),
                                                                    }}>
                                                                    pet price
                                                                    per day
                                                                    info.
                                                                    message
                                                                    here!!!
                                                                </Text>
                                                            </View>
                                                        )}
                                                </View>
                                                <View
                                                    style={{
                                                        marginBottom: SIZE(16),
                                                    }}>
                                                    <TextInput
                                                        value={perDay}
                                                        onChangeText={setPerDay}
                                                        maxLength={5}
                                                        placeholder="Enter"
                                                        placeholderTextColor={
                                                            '#686868'
                                                        }
                                                        keyboardType="numeric"
                                                        style={{
                                                            fontSize: SIZE(12),
                                                            padding: SIZE(8),
                                                            backgroundColor:
                                                                '#F7F7F7',
                                                            borderRadius:
                                                                SIZE(8),
                                                            borderWidth:
                                                                SIZE(1),
                                                            borderColor:
                                                                '#D3D3D3',
                                                            fontFamily:
                                                                FONTS.regular,
                                                        }}
                                                    />
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}>
                                                    <View>
                                                        <CheckBoxCommon
                                                            setState={
                                                                setChecked
                                                            }
                                                            setErrorMessage={
                                                                setErrorMessage
                                                            }
                                                            isChecked={
                                                                isChecked
                                                            }
                                                            setChecked={
                                                                setChecked
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginRight:
                                                                SIZE(16),
                                                        }}>
                                                        <Text
                                                            allowFontScaling={
                                                                false
                                                            }
                                                            style={{
                                                                color: '#686868',
                                                                fontSize:
                                                                    SIZE(12),
                                                            }}>
                                                            Food
                                                        </Text>
                                                    </View>

                                                    <View
                                                        style={{
                                                            padding: SIZE(8),
                                                            backgroundColor:
                                                                '#F7F7F7',
                                                            borderRadius:
                                                                SIZE(8),
                                                            borderWidth:
                                                                SIZE(1),
                                                            borderColor:
                                                                '#D3D3D3',
                                                            flexDirection:
                                                                'row',
                                                            alignItems:
                                                                'center',
                                                            flex: 1,
                                                        }}>
                                                        <Text
                                                            style={{
                                                                fontFamily:
                                                                    FONTS.semiBold,
                                                                fontWeight:
                                                                    '600',
                                                                color: '#242424',
                                                                fontSize:
                                                                    SIZE(12),
                                                                lineHeight:
                                                                    SIZE(15),
                                                            }}>
                                                            AED
                                                        </Text>
                                                        <TextInput
                                                            value={foodAmount}
                                                            onChangeText={
                                                                setFoodAmount
                                                            }
                                                            maxLength={8}
                                                            editable={
                                                                isChecked
                                                                    ? true
                                                                    : false
                                                            }
                                                            placeholder="Enter Amount"
                                                            keyboardType="numeric"
                                                            placeholderTextColor="#686868"
                                                            style={{
                                                                fontSize:
                                                                    SIZE(12),

                                                                fontFamily:
                                                                    FONTS.regular,
                                                                lineHeight:
                                                                    SIZE(15),
                                                                fontWeight:
                                                                    '400',
                                                                width: SIZE(
                                                                    170,
                                                                ),
                                                                padding: 0,
                                                                marginLeft:
                                                                    SIZE(8),
                                                            }}
                                                        />
                                                    </View>
                                                </View>

                                                <View>
                                                    <View
                                                        style={{
                                                            marginBottom:
                                                                SIZE(8),
                                                        }}>
                                                        <Text
                                                            allowFontScaling={
                                                                false
                                                            }
                                                            style={{
                                                                color: '#000',
                                                                fontSize:
                                                                    SIZE(12),
                                                                fontFamily:
                                                                    FONTS.regular,
                                                            }}>
                                                            Remarks
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View
                                                    style={{
                                                        marginBottom: SIZE(16),
                                                    }}>
                                                    <TextInput
                                                        placeholder="Enter Remarks"
                                                        placeholderTextColor="#686868"
                                                        multiline={true}
                                                        style={{
                                                            fontSize: SIZE(12),
                                                            paddingHorizontal:
                                                                SIZE(7),
                                                            backgroundColor:
                                                                '#F7F7F7',
                                                            borderRadius:
                                                                SIZE(8),
                                                            borderWidth:
                                                                SIZE(1),
                                                            borderColor:
                                                                '#D3D3D3',
                                                            fontFamily:
                                                                FONTS.regular,
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                )}
            </View>
        );
    };

    //upLoadImageContent function
    const upLoadImageContent = () => {
        return (
            <View style={{flex: 1, marginTop: SIZE(24)}}>
                {selectedFacilities.length !== 0 && (
                    <>
                        <Text allowFontScaling={false} style={styles.labelText}>
                            Upload Images
                        </Text>
                        {selectedFacilities.map(
                            (item, index) =>
                                !images.some(
                                    data => data.name === item.name,
                                ) && (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            openImagePicker(item.name);
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
                                                        allowFontScaling={false}
                                                        style={{
                                                            color: '#003459',
                                                            fontSize: SIZE(12),
                                                            fontWeight: '700',
                                                            fontFamily:
                                                                FONTS.regular,
                                                        }}>
                                                        Upload {item.name} Image
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
                                                openImagePicker();
                                            }}
                                            activeOpacity={0.8}>
                                            <PlusButton
                                                width="100%"
                                                height="100%"
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ),
                        )}
                    </>
                )}
            </View>
        );
    };
    return (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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

                        <View>
                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        color: '#686868',
                                        fontWeight: '500',
                                        fontFamily: FONTS.regular,
                                    }}>
                                    Facilities
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                }}>
                                {facilitiesData.map(item => (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        key={item.id}
                                        style={[
                                            styles.facilitiesContainer,
                                            selectedFacilities.some(
                                                facility =>
                                                    facility.id === item.id,
                                            ) && {
                                                backgroundColor: '#EAF7FF',
                                                borderColor: '#98C1D9',
                                            },
                                        ]}
                                        onPress={() => {
                                            facActions(item);
                                            setSelect(true);
                                        }}>
                                        <View>
                                            <Text
                                                allowFontScaling={false}
                                                style={[
                                                    styles.fontFacility,
                                                    selectedFacilities.some(
                                                        facility =>
                                                            facility.id ===
                                                            item.id,
                                                    ) && {color: '#003459'},
                                                ]}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            {errorMessage?.facilities && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.facilities}
                                </Text>
                            )}
                            {/* {console.log(
                                'Selected Facilities:',
                                selectedFacilities,
                            )} */}
                        </View>
                        {upLoadImageContent()}
                        {images.length > 0 &&
                            selectedFacilities.map(
                                (item, index) =>
                                    images.some(
                                        data => data.name === item.name,
                                    ) && (
                                        <View
                                            key={index}
                                            style={{
                                                fontSize: SIZE(12),
                                                padding: SIZE(12),
                                                backgroundColor: '#fff',
                                                borderRadius: SIZE(8),
                                                borderWidth: SIZE(1),
                                                borderColor: '#D3D3D3',
                                                fontFamily: FONTS.regular,
                                                marginBottom: SIZE(16),
                                            }}>
                                            <View>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={{
                                                        fontSize: SIZE(12),
                                                        fontFamily:
                                                            FONTS.regular,
                                                    }}>
                                                    {item.name}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    fontSize: SIZE(12),
                                                    paddingHorizontal: SIZE(12),
                                                    paddingVertical: SIZE(8),
                                                    backgroundColor: '#EAF7FF',
                                                    borderRadius: SIZE(8),
                                                    borderWidth: SIZE(1),
                                                    borderColor: '#98C1D9',
                                                    fontFamily: FONTS.regular,
                                                    alignSelf: 'flex-start',
                                                    flexDirection: 'row',
                                                    marginTop: SIZE(12),
                                                }}>
                                                <View
                                                    style={{
                                                        marginRight: SIZE(10),
                                                    }}>
                                                    {images &&
                                                        images.length > 0 &&
                                                        images
                                                            .filter(
                                                                data =>
                                                                    data.name ===
                                                                    item.name,
                                                            )
                                                            .map(
                                                                (
                                                                    image,
                                                                    index,
                                                                ) => (
                                                                    <Text
                                                                        allowFontScaling={
                                                                            false
                                                                        }
                                                                        style={{
                                                                            fontSize:
                                                                                SIZE(
                                                                                    14,
                                                                                ),
                                                                            fontWeight:
                                                                                '600',
                                                                            color: '#003459',
                                                                            fontFamily:
                                                                                FONTS.bold,
                                                                        }}
                                                                        key={
                                                                            index
                                                                        }>
                                                                        {getImageNameFromPath(
                                                                            image.path,
                                                                        )}
                                                                    </Text>
                                                                ),
                                                            )}
                                                </View>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        removeImage(item.name);
                                                    }}
                                                    activeOpacity={0.8}
                                                    hitSlop={0.7}
                                                    style={{
                                                        width: SIZE(20),
                                                        height: SIZE(20),
                                                    }}>
                                                    <CloseButton
                                                        //  onPress={() => handleClose()}
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ),
                            )}
                        {/* )} */}
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: SIZE(20),
                                    marginBottom:
                                        !isChecked2 && errorMessage?.isChecked2
                                            ? 0
                                            : SIZE(20),
                                    flex: 1,
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <CheckBoxCommon setState={setChecked2} />
                                    <View>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                color: '#686868',
                                                fontFamily: FONTS.medium,
                                            }}>
                                            Accept the Terms & Condition
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    hitSlop={0.7}
                                    style={{width: SIZE(20), height: SIZE(20)}}>
                                    <InfoCircle
                                        width={'100%'}
                                        height={'100%'}
                                        onPress={() => {
                                            handlePress();
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
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
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setDetailScreens('addPet');
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
                                    updateUserDate({
                                        ...state.userData,
                                        breed_selectedCategories:
                                            selectedCategories,
                                        breed_boxVisible: boxVisible,
                                        breed_isChecked: isChecked,
                                        breed_selectedFacilities:
                                            selectedFacilities,
                                        breed_select: select,
                                        breed_categoryValue: categoryValue,
                                        breed_typeValue: typeValue,
                                        breed_nosValue: nosValue,
                                    });
                                    if (
                                        isChecked2 &&
                                        selectedCategories.length > 0 &&
                                        selectedFacilities.length > 0
                                    ) {
                                        setDetailScreens('confirm');
                                    } else {
                                        setErrorMessage({
                                            ...errorMessage,
                                            petCategory:
                                                selectedCategories &&
                                                selectedCategories.length ===
                                                    0 &&
                                                'Please select at least one Pet category',
                                            pets:
                                                selectedCategories &&
                                                selectedCategories.length ===
                                                    0 &&
                                                'Please select at least one Pet',
                                            facilities:
                                                selectedFacilities &&
                                                selectedFacilities.length ===
                                                    0 &&
                                                'Please select at least one Facility',
                                            isChecked2:
                                                !isChecked2 &&
                                                'Accept Terms & Conditions is required',
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
    facilitiesContainer: {
        // flex: 1,
        paddingHorizontal: SIZE(9),
        paddingVertical: SIZE(8),
        marginRight: SIZE(12),
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderRadius: SIZE(6),
        borderColor: '#D3D3D3',
        marginTop: SIZE(12),
        fontSize: SIZE(12),
        alignItems: 'center',
    },
    fontFacility: {
        fontFamily: FONTS.regular,
        color: '#242424',
        fontWeight: '600',
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
    //dropBox
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
    dropBoxTwo: {
        flexDirection: 'row',
        width: '100%',
        padding: SIZE(13),
        borderRadius: SIZE(8),
        justifyContent: 'space-between',
        borderColor: '#E2E2E2',
    },
    activeDropBoxTwo: {
        borderBottomWidth: 1,
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
    ChooseBox: {
        textAlign: 'center',
        color: '#242424',
        fontFamily: FONTS.regular,
    },
    ChooseBoxTwo: {
        textAlign: 'center',
        color: '#242424',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '500',
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: SIZE(5),
        width: SIZE(30),
        height: SIZE(30),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText2: {
        color: '#000',
        fontSize: SIZE(16),
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
    },
    countText: {
        textAlign: 'center',
        color: '#242424',
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
    },
    ChooseBoxCount: {
        marginHorizontal: SIZE(10),
        borderWidth: SIZE(1),
        width: SIZE(30),
        height: SIZE(30),
        borderRadius: SIZE(4),
        borderColor: '#98C1D9',
        backgroundColor: '#EAF7FF',
        alignItems: 'center',
        justifyContent: 'center',
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
    categoryContainer: {
        marginRight: SIZE(8),
        flexDirection: 'row',
    },
});
