import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import {
    startOfWeek,
    addDays,
    format,
    isSameDay,
    subMonths,
    addMonths,
    startOfMonth,
    endOfMonth,
    isSameMonth,
    isWithinInterval,
} from 'date-fns';
import {
    ApiSectionCustomerTrainerWirkingHours,
    ApiSectionTrainerAvailability,
} from '../../main/TrainerApiSection';
import {FONTS} from '../../../theme/fonts';
import {SIZE, SIZES} from '../../../theme/theme';
import ArrowRight from '../../../assets/icons/arrow-right-black.svg';

const CalenderForTrainerCustomer = ({
    pk,
    setCalModalVisible,
    setDateSelection,
    selectedItems,
    setAvailableTime,
    availableTime,
    toastRef,
    savedDates,
    setSavedDates,
    selectedDatesArray,
    setSelectedDatesArray,
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonthStartDate, setCurrentMonthStartDate] = useState(
        startOfMonth(new Date()),
    );
    const [currentMonthEndDate, setCurrentMonthEndDate] = useState(
        endOfMonth(new Date()),
    );
    const [nextMonthEndDate, setNextMonthEndDate] = useState(
        endOfMonth(addMonths(new Date(), 2)),
    );

    const [availability, setAvailability] = useState([]);
    // const [savedDates, setSavedDates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    ApiSectionTrainerAvailability(
        pk,
        currentMonthStartDate,
        nextMonthEndDate,
        setAvailability,
    );

    const [totalHours, setTotalHours] = useState(0);

    useEffect(() => {
        const total = selectedItems.reduce((total, item) => {
            return total + parseFloat(item.no_of_hours);
        }, 0);
        setTotalHours(total);
    }, [selectedItems]);

    const updateCurrentMonthDates = date => {
        setCurrentMonthStartDate(startOfMonth(date));
        setCurrentMonthEndDate(endOfMonth(date));
        setNextMonthEndDate(endOfMonth(addMonths(date, 2)));
    };

    const formatTime = timeString => {
        const time = new Date('1970-01-01T' + timeString);
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight
        const formattedTime = `${hours}:${
            minutes < 10 ? '0' + minutes : minutes
        } ${ampm}`;
        return formattedTime;
    };

    const handleSave = () => {
        setSavedDates(selectedDatesArray);
        setCalModalVisible(false);
    };

    const AvailableTime = () => {
        return (
            <View style={{marginTop: SIZE(20), marginBottom: SIZE(30)}}>
                {availableTime?.length !== 0 ? (
                    <Text style={styles.timeSection}>Available Time</Text>
                ) : null}
                {availableTime?.map((item, index) => (
                    <View key={index} style={styles.highLightButton}>
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                // width: SIZES.width * 0.5,
                            }}>
                            <Text
                                style={[
                                    styles.contentName,
                                    {marginRight: SIZE(10)},
                                ]}>
                                {item.day_name}
                            </Text>
                            {item?.slots?.map((time, index) => (
                                <View
                                    key={index}
                                    style={{flexDirection: 'row'}}>
                                    <Text style={styles.contentName}>
                                        {formatTime(time?.start_time)} -{' '}
                                        {formatTime(time?.end_time)}{' '}
                                        {index !== item?.slots?.length - 1 &&
                                            ' & '}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    const renderHeader = () => {
        const dateFormat = 'MMMM yyyy';
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                }}>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={styles.currentMonth}>
                        {format(currentDate, dateFormat)}
                    </Text>
                </View>
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.monthEnd}
                        onPress={() => handleMonthChange(-1)}>
                        <ArrowRight
                            style={{
                                transform: [
                                    {
                                        rotate: '180deg',
                                    },
                                ],
                            }}
                            width={SIZE(24)}
                            height={SIZE(24)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.monthEnd, {marginLeft: SIZE(20)}]}
                        onPress={() => handleMonthChange(1)}>
                        <ArrowRight
                            style={{
                                transform: [
                                    {
                                        rotate: '360deg',
                                    },
                                ],
                            }}
                            width={SIZE(24)}
                            height={SIZE(24)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const handleMonthChange = value => {
        const newDate =
            value === 1 ? addMonths(currentDate, 1) : subMonths(currentDate, 1);
        setCurrentDate(newDate);
        updateCurrentMonthDates(newDate);
    };

    const renderDayNames = () => {
        const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        return (
            <View style={styles.weekNames}>
                {dayNames.map((dayName, index) => (
                    <Text key={index} style={styles.weekNameText}>
                        {dayName}
                    </Text>
                ))}
            </View>
        );
    };

    const [nextDay, setNextDay] = useState([]);

    const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(currentMonthStartDate);
        const endDate = endOfMonth(currentMonthEndDate);
        for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
            const isDateSelected = selectedDatesArray.some(selectedDate =>
                isSameDay(date, selectedDate),
            );

            const isAvailable = availability.some(
                range =>
                    isWithinInterval(date, {
                        start: new Date(range.start_date),
                        end: addDays(new Date(range.end_date), 0),
                    }) ||
                    isSameDay(date, new Date(range.start_date)) ||
                    isSameDay(date, new Date(range.end_date)),
            );

            days.push(
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={date.toString()}
                    style={[
                        styles.dayContainer,
                        !isSameMonth(date, currentMonthStartDate) &&
                            styles.notCurrentMonth,
                        // isSelectedDay && styles.selectedDay,
                        isAvailable && styles.availableDay,
                        isDateSelected && styles.multiSelectedDay,
                    ]}
                    onPress={() => handleDateSelect(date)}
                    disabled={!isAvailable}>
                    {isSameDay(date, selectedDate) && isLoading ? (
                        <ActivityIndicator
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            size={'small'}
                            color={'#009fd3'}
                        />
                    ) : (
                        <Text
                            style={[
                                styles.dayText,
                                !isSameMonth(date, currentMonthStartDate) &&
                                    styles.notCurrentMonthText,
                                isAvailable && styles.availableDayText,
                                // isSelectedDay && styles.selectedDayText,
                                isDateSelected && styles.multiSelectedDayText,
                            ]}>
                            {format(date, 'd')}
                        </Text>
                    )}
                </TouchableOpacity>,
            );
        }

        return <View style={styles.daysContainer}>{days}</View>;
    };

    const findNextAvailableDate = startDate => {
        const endDate = endOfMonth(addMonths(startDate, 1));

        for (
            let date = addDays(startDate, 1);
            date <= endDate;
            date = addDays(date, 1)
        ) {
            const isAvailable = availability.some(
                range =>
                    isWithinInterval(date, {
                        start: new Date(range.start_date),
                        end: new Date(range.end_date),
                    }) ||
                    isSameDay(date, new Date(range.start_date)) ||
                    isSameDay(date, new Date(range.end_date)),
            );
            if (isAvailable) {
                return date;
            }
        }
        return null;
    };

    const handleDateSelect = date => {
        setIsLoading(true);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

        if (selectedDate < today) {
            toastRef.current.show('Cannot select a date before today.', {
                type: 'warning',
            });
            return;
        }

        setDateSelection(date);
        setSelectedDate(date);
        setCurrentDate(date);
        updateCurrentMonthDates(date);
        let selectedDates = [date];

        ApiSectionCustomerTrainerWirkingHours(
            pk,
            date,
            totalHours,
            response => {
                const {
                    next_day_required,
                    total_days_needed,
                    working_slots,
                    message,
                } = response;
                setAvailableTime(working_slots);

                if (next_day_required && total_days_needed > 0) {
                    let lastSelectedDate = date;
                    for (let i = 0; i < total_days_needed; i++) {
                        const nextAvailableDate =
                            findNextAvailableDate(lastSelectedDate);
                        if (nextAvailableDate) {
                            selectedDates.push(nextAvailableDate);
                            lastSelectedDate = nextAvailableDate;
                        } else {
                            console.log('No next available date found');
                            break;
                        }
                    }
                }
                setSelectedDatesArray(selectedDates);
            },
            responses => {
                console.log(responses, 'is____not available ');
                const {message} = responses;
                toastRef.current.show(message, {
                    type: 'warning',
                });
            },
            setIsLoading,
        );
    };

    // const handleSave = () => {};

    return (
        <View style={styles.container}>
            {renderHeader()}
            {AvailableTime()}
            {renderDayNames()}
            {renderDays()}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setCalModalVisible(false);
                        // setSelectedDatesArray([]);
                    }}
                    activeOpacity={0.8}
                    style={styles.leftButton}>
                    <Text allowFontScaling={false} style={styles.leftText}>
                        Cancel
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    // disabled={!startDate || !endDate}
                    onPress={() => {
                        // setCalModalVisible(false);
                        handleSave();
                    }}
                    activeOpacity={0.8}
                    style={styles.rightButton}>
                    <Text allowFontScaling={false} style={styles.rightText}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: SIZE(20),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentMonth: {
        fontSize: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    arrowText: {
        fontSize: 24,
    },
    weekNames: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: SIZE(10),
    },
    weekNameText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayContainer: {
        width: '14.28%',
        height: SIZE(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText: {
        fontSize: SIZE(16),
        color: '#aaa',
        fontFamily: FONTS.regular,
    },
    notCurrentMonth: {
        opacity: 0.5,
    },
    notCurrentMonthText: {
        color: 'gray',
    },
    selectedDay: {
        backgroundColor: '#009FD3',
        borderRadius: SIZE(25),
    },
    availableDayText: {
        color: '#242424',
        fontFamily: FONTS.regular,
    },
    availableDay: {},
    selectedDayText: {
        color: '#fff',
    },

    leftText: {
        color: '#003459',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    leftButton: {
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(12),
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        flex: 1,
        marginRight: SIZE(24),
    },
    leftText: {
        color: '#003459',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    rightButton: {
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(8),
        backgroundColor: '#009FD3',
        flex: 1,
    },
    rightText: {
        color: '#fff',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginTop: SIZE(24),
    },
    timeSection: {
        color: '#686868',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '600',
        marginBottom: SIZE(5),
    },
    highLightButton: {
        borderWidth: SIZE(1),
        borderRadius: SIZE(100),
        paddingHorizontal: SIZE(10),
        paddingVertical: SIZE(10),
        backgroundColor: '#FFFFFF',
        width: SIZES.width * 0.92,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#EDEDED',
    },

    multiSelectedDay: {
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
        borderColor: '#fff',
        borderWidth: SIZE(1),
    },
    multiSelectedDayText: {
        color: '#fff',
    },
    contentName: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '600',
    },
    redAvailableDayText: {
        color: '#ddd', // Define the red color for available dates before today
    },
    monthEnd: {
        backgroundColor: '#EAF7FF',
        height: SIZE(48),
        width: SIZE(48),
        borderRadius: SIZE(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CalenderForTrainerCustomer;
