import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//packages
import ToggleSwitch from 'toggle-switch-react-native';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import Description from '../../../assets/icons/booking-details/description.svg';
import TopArrow from '../../../assets/icons/booking-details/arrow-top';
import BottomArrow from '../../../assets/icons/booking-details/bottom-arrow';
import ToolTip from '../../../assets/icons/tooltip.svg';
import ArrowDown from '../../../assets/icons/arrow-down.svg';
import Arrow from '../../../assets/icons/arrow-up.svg';
import CloseRound from '../../../assets/icons/close-circle.svg';
import TickIcon from '../../../assets/icons/tick-icon.svg';

const BookingDetails = ({
    onPress,
    bookingDate,
    setEditModalVisible,
    petDetails,
    selectedPetType,
    selectedItems,
    setSelectedItems,
    setSelected1,
    setSelected,
    setSelectedPetPk,
    state,
    setUserModal,
    setScreen,
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isShow, setIsShow] = useState(false);
    const [showFood, setShowFood] = useState(false);
    const [showInsurance, setShowInsurance] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [boxVisible, setBoxVisible] = useState(false);
    const [isOn, setIsOn] = useState(false);
    const [isOnTwo, setIsOnTwo] = useState(false);

    const handlePress = () => {
        setIsShow(true);
        const newTimeoutId = setTimeout(() => {
            setIsShow(null);
        }, 1000);
        setTimeoutId(newTimeoutId);
    };

    const handlePressFood = () => {
        setShowFood(true);
        const newTimeoutId = setTimeout(() => {
            setShowFood(null);
        }, 1000);
        setTimeoutId(newTimeoutId);
    };

    const handlePressInsurance = () => {
        setShowInsurance(true);
        const newTimeoutId = setTimeout(() => {
            setShowInsurance(null);
        }, 1000);
        setTimeoutId(newTimeoutId);
    };
    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    const toggleItem = item => {
        const isItemSelected = selectedItems.some(
            selectedItem => selectedItem.id === item.id,
        );
        if (isItemSelected) {
            setSelectedItems(prevSelectedItems =>
                prevSelectedItems.filter(
                    selectedItem => selectedItem.id !== item.id,
                ),
            );
            setSelectedPetPk(prevSelectedPetPks =>
                prevSelectedPetPks.filter(petPk => petPk !== item.id),
            );
        } else {
            setSelectedItems(prevSelectedItems => [
                ...prevSelectedItems,
                {
                    id: item.id,
                    pet_name: item.pet_name,
                    breed_name: item.breed_name,
                },
            ]);
            setSelectedPetPk(prevSelectedPetPks => [
                ...prevSelectedPetPks,
                item.id,
            ]);
        }
    };

    return (
        <View
            style={{
                borderWidth: SIZE(1),
                borderColor: '#E2E2E2',
                padding: SIZE(13),
                borderRadius: SIZE(8),
                marginTop: SIZE(30),
                marginBottom: SIZE(20),
                backgroundColor: '#fff',
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => [setIsVisible(!isVisible)]}
                style={[
                    styles.topBox,
                    {
                        borderBottomWidth: isVisible ? SIZE(1) : 0,
                        paddingBottom: !isVisible ? 0 : SIZE(15),
                    },
                ]}>
                <Text style={styles.subContent2}>Booking Details</Text>
                <View>{isVisible ? <TopArrow /> : <BottomArrow />}</View>
            </TouchableOpacity>
            {isVisible && (
                <View>
                    <View
                        style={[
                            styles.contentBox,
                            {marginTop: SIZE(10), zIndex: 1},
                        ]}>
                        <Text style={styles.subContent}>Selected Category</Text>
                        <View
                            style={[
                                styles.boxOfWidth,
                                {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    backgroundColor: '#F7F7F7',
                                },
                            ]}>
                            <Text
                                style={[
                                    styles.subContent,
                                    {marginRight: SIZE(5)},
                                ]}>
                                {selectedPetType.name}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => {
                                    handlePress();
                                }}>
                                <Description
                                    height={SIZE(16)}
                                    width={SIZE(16)}
                                />
                            </TouchableOpacity>
                        </View>
                        {isShow && (
                            <View
                                style={{
                                    borderWidth: SIZE(0.6),
                                    borderColor: '#E2E2E2',
                                    position: 'absolute',
                                    right: 0,
                                    top: SIZE(47),
                                    width: SIZE(180),
                                    height: SIZE(70),
                                    zIndex: 100,
                                    backgroundColor: '#fff',
                                    borderRadius: SIZE(8),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: SIZE(68),
                                        zIndex: -100,
                                        left: SIZE(152),
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
                                    At a time, only one category can be
                                    accommodated.
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.addPet}>
                        <Text style={styles.subContent}>Pet</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                if (state.userData.is_login) {
                                    setEditModalVisible(true);
                                } else {
                                    setUserModal(true);
                                    setScreen('login');
                                }
                            }}>
                            <Text
                                style={[
                                    styles.subContent,
                                    {
                                        color: '#009FD3',
                                        fontFamily: FONTS.bold,
                                    },
                                ]}>
                                + Add Pet
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            marginBottom: SIZE(10),
                        }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                setBoxVisible(!boxVisible);
                            }}
                            style={[styles.dropBox]}>
                            <TouchableOpacity
                                onPress={() => {
                                    setBoxVisible(!boxVisible);
                                }}
                                activeOpacity={0.8}
                                style={styles.ChooseBox}>
                                {selectedItems?.length !== 0 ? (
                                    <ScrollView
                                        bounces={false}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}>
                                        {selectedItems.map(item => (
                                            <TouchableOpacity
                                                key={item.id}
                                                activeOpacity={1}
                                                style={{
                                                    borderWidth: SIZE(1),
                                                    marginRight: SIZE(10),
                                                    paddingHorizontal: SIZE(10),
                                                    borderRadius: SIZE(5),
                                                    borderColor: '#009FD3',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'row',
                                                }}>
                                                <Text style={styles.dropText}>
                                                    {item.breed_name} -{' '}
                                                    {item.pet_name}
                                                </Text>
                                                <TouchableOpacity
                                                    hitSlop={SIZE(10)}
                                                    activeOpacity={0.8}
                                                    onPress={() =>
                                                        toggleItem(item)
                                                    }
                                                    style={styles.closeButton}>
                                                    <CloseRound
                                                        width={SIZE(16)}
                                                        height={SIZE(16)}
                                                    />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                ) : (
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.ChooseBox}>
                                        Choose pet
                                    </Text>
                                )}
                            </TouchableOpacity>
                            {boxVisible ? (
                                <Arrow width={SIZE(24)} height={SIZE(24)} />
                            ) : (
                                <ArrowDown width={SIZE(24)} height={SIZE(24)} />
                            )}
                        </TouchableOpacity>
                        {boxVisible && (
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    borderWidth: SIZE(1),
                                    borderColor: '#ccc',
                                    borderRadius: SIZE(8),
                                    marginTop: SIZE(4),
                                    padding: SIZE(16),
                                    gap: SIZE(16),
                                }}>
                                {petDetails &&
                                    petDetails.map(item => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            key={item.id}
                                            style={{
                                                paddingVertical: SIZE(12),
                                                paddingHorizontal: SIZE(16),
                                                borderWidth: SIZE(1),
                                                borderColor: '#EDEDED',
                                                borderRadius: SIZE(6),
                                                backgroundColor: '#F7F7F7',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                flex: 1,
                                            }}
                                            onPress={() => toggleItem(item)}>
                                            <Text
                                                numberOfLines={1}
                                                style={[
                                                    styles.dropText,
                                                    {width: '85%'},
                                                ]}>
                                                {item.breed_name} -{' '}
                                                {item.pet_name}
                                            </Text>
                                            {selectedItems.some(
                                                selectedItem =>
                                                    selectedItem.id === item.id,
                                            ) ? (
                                                <View
                                                    style={
                                                        styles.tickIconContainer
                                                    }>
                                                    <TickIcon
                                                        width={SIZE(15)}
                                                        height={SIZE(15)}
                                                    />
                                                </View>
                                            ) : (
                                                <View
                                                    style={[
                                                        styles.tickIconContainer,
                                                        {
                                                            backgroundColor:
                                                                '#fff',
                                                            borderWidth:
                                                                SIZE(0.5),
                                                        },
                                                    ]}></View>
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                <TouchableOpacity
                                    onPress={() => {
                                        setBoxVisible(false);
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
                    <View style={styles.contentBox}>
                        <View>
                            <Text
                                style={[
                                    styles.subContent,
                                    {marginBottom: SIZE(10)},
                                ]}>
                                Dates
                            </Text>
                            {bookingDate && (
                                <Text
                                    style={[
                                        styles.subContent,
                                        {
                                            color: '#232323',
                                            fontFamily: FONTS.semiBold,
                                        },
                                    ]}>
                                    {/* 16 Jan - 22 Jan 2023 */}
                                    {`${bookingDate.startDate.getDate()} ${bookingDate.startDate.toLocaleString(
                                        'default',
                                        {month: 'short'},
                                    )} - ${bookingDate.endDate.getDate()} ${bookingDate.endDate.toLocaleString(
                                        'default',
                                        {month: 'short'},
                                    )} ${bookingDate.endDate.getFullYear()}`}{' '}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                            <Text
                                style={[
                                    styles.subContent,
                                    {fontFamily: FONTS.bold, color: '#009FD3'},
                                ]}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.contentBox, {marginBottom: SIZE(0)}]}>
                        <View
                            style={[
                                styles.boxOfWidth,
                                {borderWidth: 0, paddingHorizontal: 0},
                            ]}>
                            <Text
                                style={[
                                    styles.subContent,
                                    {marginRight: SIZE(5)},
                                ]}>
                                Food
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    handlePressFood();
                                }}>
                                <Description
                                    height={SIZE(16)}
                                    width={SIZE(16)}
                                />
                            </TouchableOpacity>
                        </View>
                        {showFood && (
                            <View
                                style={{
                                    borderWidth: SIZE(0.6),
                                    borderColor: '#E2E2E2',
                                    position: 'absolute',
                                    top: SIZE(-70),
                                    left: SIZE(-10),
                                    width: SIZE(180),
                                    height: SIZE(60),
                                    zIndex: 100,
                                    backgroundColor: '#fff',
                                    borderRadius: SIZE(8),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View
                                    style={{
                                        position: 'absolute',
                                        transform: [{rotate: '180deg'}],
                                        top: SIZE(58),
                                        zIndex: -100,
                                        left: SIZE(47),
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
                                    Food Details
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity activeOpacity={0.8}>
                            <ToggleSwitch
                                isOn={isOnTwo}
                                onColor="#009FD3"
                                offColor="#E2E2E2"
                                size="small"
                                animationSpeed={200}
                                onToggle={() => {
                                    setIsOnTwo(!isOnTwo);
                                    setSelected(isOnTwo ? 1 : 2);
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.contentBox, {marginBottom: 0}]}>
                        <View
                            style={[
                                styles.boxOfWidth,
                                {borderWidth: 0, paddingHorizontal: 0},
                            ]}>
                            <Text
                                style={[
                                    styles.subContent,
                                    {marginRight: SIZE(5)},
                                ]}>
                                Insurance
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    handlePressInsurance();
                                }}>
                                <Description
                                    height={SIZE(16)}
                                    width={SIZE(16)}
                                />
                            </TouchableOpacity>
                        </View>
                        {showInsurance && (
                            <View
                                style={{
                                    borderWidth: SIZE(0.6),
                                    borderColor: '#E2E2E2',
                                    position: 'absolute',
                                    left: SIZE(18),
                                    top: SIZE(-68),
                                    width: SIZE(180),
                                    height: SIZE(60),
                                    zIndex: 100,
                                    backgroundColor: '#fff',
                                    borderRadius: SIZE(8),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View
                                    style={{
                                        position: 'absolute',
                                        transform: [{rotate: '180deg'}],
                                        top: SIZE(58),
                                        zIndex: -100,
                                        left: SIZE(49),
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
                                    Insurance Details
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity activeOpacity={0.8}>
                            <ToggleSwitch
                                isOn={isOn}
                                onColor="#009FD3"
                                offColor="#E2E2E2"
                                size="small"
                                animationSpeed={200}
                                onToggle={() => {
                                    setIsOn(!isOn);
                                    setSelected1(prev => !prev);
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.insuranceSuggestion}>
                        <Text style={styles.subContent}>
                            To take insurance for your pet{' '}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                Linking.openURL('https://www.example.com');
                            }}>
                            <Text
                                style={[
                                    styles.subContent,
                                    {
                                        color: '#009FD3',
                                        fontFamily: FONTS.semiBold,
                                        fontWeight: '600',
                                    },
                                ]}>
                                Click here
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default BookingDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(16),
    },
    subContent2: {
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
    },
    headercontainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        borderBottomWidth: SIZE(1),
        borderColor: '#0000001A',
    },
    backButton: {
        width: SIZE(40),
        height: SIZE(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(100),
        backgroundColor: '#fff',
        marginRight: SIZE(20),
    },
    headerRight: {
        flex: 1,
    },
    subContent: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
    },
    toggleContainer: {
        flexDirection: 'row',
        width: SIZE(60),
        borderWidth: SIZE(1),
        borderRadius: SIZE(30),
    },
    toggleButton: {
        width: SIZE(30),
        height: SIZE(30),
        borderRadius: SIZE(15),
    },
    contentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(10),
    },
    addPet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(10),
    },
    boxOfWidth: {
        flexDirection: 'row',
        borderWidth: SIZE(1),
        justifyContent: 'space-between',
        paddingVertical: SIZE(6),
        paddingHorizontal: SIZE(8),
        borderRadius: SIZE(4),
        borderColor: '#E2E2E2',
        alignItems: 'center',
    },
    foodOption: {
        flexDirection: 'row',
        borderWidth: SIZE(1),
        justifyContent: 'space-between',
        paddingVertical: SIZE(6),
        paddingHorizontal: SIZE(8),
        borderRadius: SIZE(4),
        borderColor: '#E2E2E2',
    },
    bottomBox: {
        flexDirection: 'row',
        // width: SIZE(50),
        padding: SIZE(3),
        borderRadius: SIZE(30),
    },
    topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: SIZE(1),
        borderBlockColor: '#E2E2E2',
        paddingBottom: SIZE(10),
    },

    dropBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: SIZE(1),
        padding: SIZE(8),
        borderRadius: SIZE(8),
        justifyContent: 'space-between',
        borderColor: '#009FD3',
        alignSelf: 'center',
    },

    ChooseBox: {
        textAlign: 'left',
        color: '#242424',
        fontFamily: FONTS.regular,
        width: '90%',
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
        borderRadius: SIZE(8),
        padding: SIZE(10),
        backgroundColor: '#003459',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: FONTS.semiBold,
    },
    dropText: {
        fontFamily: FONTS.medium,
        color: '#000',
        fontSize: SIZE(14),
    },
    closeButton: {
        marginLeft: SIZE(10),
    },
    tickIconContainer: {
        backgroundColor: '#009FD3',
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE(20),
        height: SIZE(20),
        borderRadius: SIZE(4),
        borderWidth: SIZE(0.5),
    },
    insuranceSuggestion: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZE(5),
    },
});
