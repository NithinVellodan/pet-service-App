import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import React, {useContext, useState} from 'react';

//packages
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ToggleSwitch from 'toggle-switch-react-native';

//constants
import {SIZE, SIZES} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';
import {Context} from '../../../../../contexts/Store';

//components
import DoubleColorHeading from '../../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../../components/headings/DescriptionHeading';
import TwoButton from '../../../ecommerce/includes/TwoButton';
import Clock from './Clock';
import CalendarLeave from '../../../../includes/calendar/CalendarLeave';

//images and logos
import CloseIcon from '../../../../../assets/icons/close-icon-blue.svg';
import TrashIcon from '../../../../../assets/icons/trashlight.svg';

const AddAvailableDates = ({
    editProfile,
    setModalVisible,
    setModalScreens,
    availability,
    setAvailability,
    initialAvailability,
    setSelectedDates,
    selectedDates,
    setEdit,
    edit,
    setUpdate,
    update,
    submitProfile,
    updateUserData,
    submitLoading,
    clearAll,
    setRefreshing,
    updateAvailability,
    fromMain,
}) => {
    const {state} = useContext(Context);
    const [dayStates, setDayStates] = useState(
        initialAvailability.map(() => ({present: false, slotAdd: false})),
    );
    const [errorMessage, setErrorMessage] = useState();

    const handleDeleteSlot = (dayIndex, slotId) => {
        const updatedAvailability = availability.map((day, index) => {
            if (index === dayIndex) {
                return {
                    ...day,
                    slots: day.slots.filter(slot => slot.id !== slotId),
                };
            }
            return day;
        });
        setAvailability(updatedAvailability);
    };

    const handleToggleDay = index => {
        const updatedAvailability = [...availability];
        updatedAvailability[index].present =
            !updatedAvailability[index].present;
        setAvailability(updatedAvailability);
    };

    const handleAddSlot = (dayIndex, slot) => {
        const updatedAvailability = availability.map((day, index) => {
            if (index === dayIndex) {
                return {
                    ...day,
                    slots: [...day.slots, {...slot, id: new Date().getTime()}],
                };
            }
            return day;
        });
        setAvailability(updatedAvailability);
    };

    // const onPressR = () => {
    //     const hasEmptyTimeSlots = availability.some(
    //         day => day.present && day.slots.length === 0,
    //     );

    //     if (hasEmptyTimeSlots) {
    //         setErrorMessage('Please add time slots for available days.');
    //     } else {
    //         setErrorMessage();
    //         if (update) {
    //             updateAvailability();
    //         } else {
    //             // submitProfile();
    //             setModalScreens('ConfirmTrainer');
    //         }
    //     }
    // };

    const validateAvailability = () => {
        const hasAnyDayPresent = availability.some(day => day.present);
        const hasEmptyTimeSlots = availability.some(
            day => day.present && day.slots.length === 0,
        );

        if (!hasAnyDayPresent) {
            setErrorMessage('Please mark at least one day as available.');
            return false;
        }

        if (hasEmptyTimeSlots) {
            setErrorMessage('Please add time slots for available days.');
            return false;
        }

        setErrorMessage();
        return true;
    };

    const onPressR = () => {
        if (validateAvailability()) {
            if (update) {
                updateAvailability();
            } else {
                setModalScreens('ConfirmTrainer');
            }
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: '#F7F7F7', width: SIZES.width}}>
            <View style={{height: SIZE(60)}}>
                {!fromMain ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            clearAll && clearAll();
                            setEdit && setEdit(false);
                            setUpdate && setUpdate(false);
                            setModalVisible(false);
                            setModalScreens && setModalScreens('AddProfile');
                            setRefreshing && setRefreshing(prev => !prev);
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
                contentContainerStyle={{}}>
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.mainContainer}>
                        <View>
                            <DoubleColorHeading
                                firstTitle={
                                    edit ? 'Edit' : update ? 'Update' : 'Add'
                                }
                                secondTitle={'Available Dates'}
                                isCenter={true}
                            />
                        </View>
                        <View style={{marginBottom: SIZE(24)}}>
                            <DescriptionHeading
                                text={
                                    edit
                                        ? 'Update the available date and time'
                                        : 'Add the available date and time'
                                }
                                isCenter={true}
                            />
                        </View>
                        <View style={styles.daysContainer}>
                            {availability.map((day, index) => (
                                <View key={index} style={styles.dayContainer}>
                                    <View style={styles.dayClosed}>
                                        <View style={styles.dayTop}>
                                            <Text style={styles.dayText}>
                                                {day.dayName}
                                            </Text>
                                            <ToggleSwitch
                                                isOn={day.present}
                                                onColor="#009FD3"
                                                offColor="#E2E2E2"
                                                size="small"
                                                animationSpeed={200}
                                                onToggle={() =>
                                                    handleToggleDay(index)
                                                }
                                            />
                                        </View>
                                        {day.present && (
                                            <>
                                                {day.slots.length > 0 && (
                                                    <View
                                                        style={
                                                            styles.savedTimeContainer
                                                        }>
                                                        {day.slots.map(
                                                            (
                                                                slot,
                                                                slotIndex,
                                                            ) => (
                                                                <View
                                                                    key={
                                                                        slot.id
                                                                    }
                                                                    style={
                                                                        styles.savedTimeMain
                                                                    }>
                                                                    <Text
                                                                        style={
                                                                            styles.savedTimes
                                                                        }>
                                                                        {
                                                                            slot.startTime
                                                                        }{' '}
                                                                        -{' '}
                                                                        {
                                                                            slot.endTime
                                                                        }
                                                                    </Text>
                                                                    <TouchableOpacity
                                                                        activeOpacity={
                                                                            0.8
                                                                        }
                                                                        onPress={() =>
                                                                            handleDeleteSlot(
                                                                                index,
                                                                                slot.id,
                                                                            )
                                                                        }>
                                                                        <TrashIcon
                                                                            width={SIZE(
                                                                                16,
                                                                            )}
                                                                            height={SIZE(
                                                                                16,
                                                                            )}
                                                                        />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            ),
                                                        )}
                                                    </View>
                                                )}
                                                {!dayStates[index].slotAdd && (
                                                    <TouchableOpacity
                                                        style={
                                                            styles.addSlotContainer
                                                        }
                                                        activeOpacity={0.8}
                                                        onPress={() => {
                                                            const updatedDayStates =
                                                                dayStates.map(
                                                                    (
                                                                        dayState,
                                                                        dayIndex,
                                                                    ) => {
                                                                        if (
                                                                            dayIndex ===
                                                                            index
                                                                        ) {
                                                                            return {
                                                                                ...dayState,
                                                                                slotAdd: true,
                                                                            };
                                                                        }
                                                                        return dayState;
                                                                    },
                                                                );
                                                            setDayStates(
                                                                updatedDayStates,
                                                            );
                                                        }}>
                                                        <Text
                                                            style={
                                                                styles.addSlotText
                                                            }>
                                                            +Add Slot
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                                {dayStates[index].slotAdd && (
                                                    <Clock
                                                        setSlotAdd={value => {
                                                            const updatedDayStates =
                                                                dayStates.map(
                                                                    (
                                                                        dayState,
                                                                        dayIndex,
                                                                    ) => {
                                                                        if (
                                                                            dayIndex ===
                                                                            index
                                                                        ) {
                                                                            return {
                                                                                ...dayState,
                                                                                slotAdd:
                                                                                    value,
                                                                            };
                                                                        }
                                                                        return dayState;
                                                                    },
                                                                );
                                                            setDayStates(
                                                                updatedDayStates,
                                                            );
                                                        }}
                                                        setSavedTime={newSlot =>
                                                            handleAddSlot(
                                                                index,
                                                                newSlot,
                                                            )
                                                        }
                                                        savedTime={day.slots}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>
                        {errorMessage && (
                            <Text style={styles.errorMessage}>
                                {errorMessage}
                            </Text>
                        )}
                        <View style={styles.calenderDivider}>
                            <Text
                                allowFontScaling={false}
                                style={styles.dividerText}>
                                Add Unavailable Dates
                            </Text>
                            <View style={styles.dividerLine}></View>
                        </View>
                        <View style={styles.calendarSection}>
                            <CalendarLeave
                                setSelectedDates={setSelectedDates}
                                selectedDates={selectedDates}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
            <View
                style={{
                    paddingVertical: SIZE(32),
                    paddingHorizontal: SIZE(16),
                }}>
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
                            setUpdate && setUpdate(false);
                            setModalVisible(false);
                            setModalScreens && setModalScreens('AddProfile');
                            setRefreshing && setRefreshing(prev => !prev);
                        }
                    }}
                    rightText={update ? 'Submit' : 'Next'}
                    onPressR={() => {
                        onPressR();
                    }}
                />
            </View>
        </View>
    );
};

export default AddAvailableDates;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: SIZE(16),
    },
    daysContainer: {
        borderTopWidth: SIZE(1),
        borderTopColor: '#e2e2e2',
        paddingTop: SIZE(16),
    },
    dayContainer: {
        marginBottom: SIZE(16),
    },
    dayText: {
        fontWeight: '600',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(20),
        color: '#242424',
    },
    dayClosed: {
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#e2e2e2',
        backgroundColor: '#fff',
    },
    dayTop: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        height: SIZE(48),
        paddingHorizontal: SIZE(12),
    },
    savedTimeContainer: {
        paddingHorizontal: SIZE(12),
    },
    savedTimeMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: SIZE(53),
        paddingVertical: SIZE(8),
        borderWidth: SIZE(1),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        width: '55%',
        marginBottom: SIZE(12),
    },
    savedTimes: {
        fontWeight: '500',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        color: '#969696',
    },
    addSlotContainer: {
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(8),
        borderRadius: SIZE(53),
        backgroundColor: '#EAF7FF',
        width: SIZE(140),
        alignItems: 'center',
        marginBottom: SIZE(12),
        marginLeft: SIZE(12),
    },
    addSlotText: {
        fontWeight: '600',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        color: '#003459',
    },
    calenderDivider: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dividerText: {
        color: '#3E3E53',
        fontWeight: '600',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
    },
    dividerLine: {
        height: SIZE(1),
        backgroundColor: '#E2E2E2',
        marginLeft: SIZE(12),
        width: SIZE(223),
    },
    calendarSection: {},
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        marginBottom: SIZE(10),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});
