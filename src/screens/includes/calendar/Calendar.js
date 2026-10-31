import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';

//packages
import {
    isSameDay,
    isSameMonth,
    isAfter,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isBefore,
} from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

//constants
import {FONTS} from '../../../theme/fonts';
import {SIZE} from '../../../theme/theme';

//images and logos
import ArrowLeftIcon from '../../../assets/icons/arrow-left-black.svg';
import ArrowRightIcon from '../../../assets/icons/arrow-right-black.svg';
import ArrowDownThick from '../../../assets/icons/arrow-down-thick.svg';

const Calendar = ({
    setCalModalVisible,
    onDateSelected,
    defaultDate,
    timePicker,
}) => {
    const [selectedDate, setSelectedDate] = useState(
        defaultDate ? new Date(defaultDate) : new Date(),
    );
    const [currentMonth, setCurrentMonth] = useState(
        defaultDate ? new Date(defaultDate) : new Date(),
    );
    const [showYearSelector, setShowYearSelector] = useState(false);

    const [showMonthSelector, setShowMonthSelector] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [timeShow, setTimeShow] = useState(false);
    const [timeText, setTimeText] = useState(
        defaultDate
            ? new Date(defaultDate).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
              })
            : 'Select time',
    );

    useEffect(() => {
        if (defaultDate) {
            const convertedDate = new Date(defaultDate);
            setSelectedDate(convertedDate);
            setCurrentMonth(convertedDate);
        }
    }, [defaultDate]);

    const onChange = (event, selecttime) => {
        const currentdate = selecttime || selectedDate;
        setTimeShow(Platform.OS === 'ios');
        setSelectedDate(currentdate);

        let tempDate = new Date(currentdate);
        let fTime = new Date(tempDate).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
        });

        setTimeText(fTime);
        onDateSelected(tempDate);
    };

    const handleSave = () => {
        const today = new Date();
        const midnightToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
        );

        if (isBefore(selectedDate, today) && timePicker) {
            setErrorMessage('Please select a valid date and time in future.');
        } else if (isBefore(selectedDate, midnightToday) && !timePicker) {
            setErrorMessage('Please select a valid date in future.');
        } else {
            onDateSelected(selectedDate);
            setCalModalVisible(false);
        }
    };

    // const handleDateChange = date => {
    //     setShowYearSelector(false);
    //     const today = new Date();
    //     if (date > today) {
    //         return;
    //     }
    //     setSelectedDate(date);
    // };
    const handleDateChange = date => {
        setShowYearSelector(false);
        setSelectedDate(date);
    };

    const handleMonthChange = direction => {
        setShowYearSelector(false);
        const newMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + direction,
            1,
        );
        setCurrentMonth(newMonth);
    };

    const handleYearChange = year => {
        const newDate = new Date(year, currentMonth.getMonth(), 1);
        setCurrentMonth(newDate);
        setShowYearSelector(false);
    };

    const DaysOfWeek = () => {
        const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        return (
            <View style={styles.daysOfWeekRow}>
                {daysOfWeek.map((day, index) => (
                    <Text key={index} style={styles.dayOfWeekText}>
                        {day}
                    </Text>
                ))}
            </View>
        );
    };

    const renderDates = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const startDate = new Date(
            monthStart.getFullYear(),
            monthStart.getMonth(),
            monthStart.getDate() - monthStart.getDay(),
        );
        const endDate = new Date(
            monthEnd.getFullYear(),
            monthEnd.getMonth(),
            monthEnd.getDate() + (6 - monthEnd.getDay()),
        );

        const dateArray = eachDayOfInterval({
            start: startDate,
            end: endDate,
        });

        return dateArray.map(date => {
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const isDisabled = !isCurrentMonth;
            const isSelected = isSameDay(date, selectedDate) && isCurrentMonth;

            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={date.toISOString()}
                    style={[
                        styles.day,
                        {
                            backgroundColor: isSelected ? '#009FD3' : '#F7F7F7',
                            borderRadius: isSelected ? SIZE(8) : 0,
                        },
                    ]}
                    onPress={() => handleDateChange(date)}
                    disabled={isDisabled}>
                    <Text
                        style={[
                            styles.dayText,
                            {
                                opacity: isCurrentMonth ? 1 : 0,
                                color: isSelected ? '#FFFFFF' : '#242424',
                            },
                        ]}>
                        {date.getDate()}
                    </Text>
                </TouchableOpacity>
            );
        });
    };

    const renderYearSelector = () => {
        const currentYear = currentMonth.getFullYear();
        const years = Array.from({length: 10}, (_, i) => currentYear - 5 + i);

        return (
            <View style={styles.monthViewStyle}>
                <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={years}
                    renderItem={({item: year}) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                styles.selectorOptionContainer,
                                {
                                    backgroundColor:
                                        year === currentYear
                                            ? '#009FD3'
                                            : '#EAF7FF',
                                },
                            ]}
                            onPress={() => handleYearChange(year)}>
                            <Text
                                style={[
                                    styles.selectorOption,
                                    {
                                        color:
                                            year === currentYear
                                                ? '#fff'
                                                : '#000',
                                    },
                                ]}>
                                {year}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.toString()}
                />
            </View>
        );
    };

    const renderItem = ({item: year}) => {
        const isSelected = year === selectedItem;
        const backgroundColor = isSelected ? '#009FD3' : '#EAF7FF';
        const textColor = isSelected ? '#fff' : '#000';
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.selectorOptionContainer, {backgroundColor}]}
                key={year}
                onPress={() => {
                    handleYearChange(year);
                    setSelectedItem(year);
                }}>
                <Text style={[styles.selectorOption, {color: textColor}]}>
                    {year}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={() => setShowYearSelector(false)}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text
                            allowFontScaling={false}
                            style={styles.monthLabel}>
                            {currentMonth.toLocaleDateString('en-US', {
                                month: 'long',
                            })}
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={styles.monthLabel}>
                            ,{' '}
                        </Text>
                        <TouchableOpacity
                            style={{flexDirection: 'row', alignItems: 'center'}}
                            activeOpacity={0.8}
                            onPress={() =>
                                setShowYearSelector(!showYearSelector)
                            }>
                            <Text
                                allowFontScaling={false}
                                style={styles.monthLabel}>
                                {currentMonth.getFullYear()}
                            </Text>
                            <ArrowDownThick
                                style={{
                                    marginLeft: SIZE(8),
                                    transform: showYearSelector
                                        ? [{rotate: '180deg'}]
                                        : [{rotate: '0deg'}],
                                }}
                                width={SIZE(14)}
                                height={SIZE(14)}
                            />
                        </TouchableOpacity>
                    </View>
                    {timePicker && (
                        <TouchableOpacity
                            style={styles.time_textContain}
                            activeOpacity={0.8}
                            onPress={() => {
                                setTimeShow(true);
                            }}>
                            <Text style={styles.time_text}>{timeText}</Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.arrowIconContainer}
                            onPress={() => handleMonthChange(-1)}>
                            <View style={styles.arrowIcon}>
                                <ArrowLeftIcon width={'100%'} height={'100%'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                styles.arrowIconContainer,
                                {marginLeft: SIZE(21)},
                            ]}
                            onPress={() => handleMonthChange(1)}>
                            <View style={styles.arrowIcon}>
                                <ArrowRightIcon
                                    width={'100%'}
                                    height={'100%'}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {showYearSelector && renderYearSelector()}

                <View style={styles.BirthCalendarBirthDate}>
                    <DaysOfWeek />
                    <View style={styles.dateContainer}>{renderDates()}</View>
                    {errorMessage && (
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    )}
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            onPress={() => setCalModalVisible(false)}
                            activeOpacity={0.8}
                            style={styles.leftButton}>
                            <Text
                                allowFontScaling={false}
                                style={styles.leftText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSave}
                            activeOpacity={0.8}
                            style={styles.rightButton}>
                            <Text
                                allowFontScaling={false}
                                style={styles.rightText}>
                                Select
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {timeShow && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="time"
                        is24Hour={false}
                        display="spinner"
                        onChange={onChange}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SIZE(16),
        justifyContent: 'flex-end',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: SIZE(16),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
        justifyContent: 'space-between',
        marginBottom: SIZE(20),
    },
    headerLeft: {
        flexDirection: 'row',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(4),
    },

    monthLabel: {
        fontSize: SIZE(20),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        color: '#242424',
    },
    arrowIconContainer: {
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(8),
        width: SIZE(48),
        height: SIZE(48),
        paddingHorizontal: SIZE(17),
        paddingVertical: SIZE(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowIcon: {
        width: SIZE(24),
        height: SIZE(24),
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    monthViewStyle: {
        position: 'absolute',
        height: SIZE(200),
        top: SIZE(55),
        left: SIZE(50),
        backgroundColor: '#EAF7FF',
        zIndex: 5000,
        width: SIZE(80),
        alignItems: 'center',
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        padding: SIZE(16),
        marginBottom: SIZE(16),
        flexWrap: 'wrap',
    },
    selectorOptionContainer: {
        paddingVertical: SIZE(8),
        borderRadius: SIZE(6),
    },
    selectorOption: {
        textAlign: 'center',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#242424',
        paddingHorizontal: SIZE(10),
    },

    calendar: {
        flexDirection: 'column',
    },

    daysOfWeekRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: SIZE(8),
    },

    dayOfWeekText: {
        width: '14.28%',
        textAlign: 'center',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },

    dateContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },

    day: {
        width: '14.28%',
        height: SIZE(48),
        justifyContent: 'center',
        alignItems: 'center',
    },

    dayText: {
        fontSize: SIZE(16),
        color: '#242424',
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },

    footer: {
        flexDirection: 'row',
        marginVertical: SIZE(24),
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    dateLabel: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#686868',
        marginBottom: SIZE(8),
    },
    dateLeft: {
        paddingHorizontal: SIZE(17),
        paddingVertical: SIZE(12),
        backgroundColor: '#EAF7FF',
        width: '48%',
        borderRadius: SIZE(8),
    },

    dateText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    time_textContain: {
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
        paddingVertical: SIZE(5),
        paddingHorizontal: SIZE(10),
    },
    time_text: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#FFF',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(24),
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
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    rightButton: {
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        alignItems: 'center',
        borderRadius: SIZE(8),
        backgroundColor: '#009FD3',
        flex: 1,
    },
    rightText: {
        color: '#FFF',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        marginTop: SIZE(5),
        textAlign: 'right',
    },
});

export default Calendar;
