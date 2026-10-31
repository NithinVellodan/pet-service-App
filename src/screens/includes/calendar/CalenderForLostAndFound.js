import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {isSameDay, isSameMonth, startOfMonth, endOfMonth} from 'date-fns';
import moment from 'moment';

import ArrowLeftIcon from '../../../assets/icons/arrow-left-black.svg';
import ArrowRightIcon from '../../../assets/icons/arrow-right-black.svg';
import {FONTS} from '../../../theme/fonts';
import {SIZE} from '../../../theme/theme';

const CalendarFilter = ({
    setCalModalVisible,
    onDateRangeSelected,
    defaultDateRange,
    singleDateMode,
    onDateSelected,
    onDateTwoSelected,
    isExpiry,
}) => {
    // const [selectedDate, setSelectedDate] = useState(new Date());
    // const [startDate, setStartDate] = useState(
    //     defaultDateRange ? defaultDateRange.startDate : new Date(),
    // );
    // const [endDate, setEndDate] = useState(
    //     defaultDateRange ? defaultDateRange.endDate : null,
    // );
    // const [showYearSelector, setShowYearSelector] = useState(false);
    // const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    // const [showMonthSelector, setShowMonthSelector] = useState(false);

    // const [startDateTwo, setStartDateTwo] = useState(startOfMonth(new Date()));
    // const [endDateTwo, setEndDateTwo] = useState(endOfMonth(new Date()));
    // const [error, setError] = useState();

    // const handleSave = () => {
    //     onDateRangeSelected(startDate, endDate);
    //     setCalModalVisible(false);
    // };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showYearSelector, setShowYearSelector] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [showMonthSelector, setShowMonthSelector] = useState(false);

    const [startDateTwo, setStartDateTwo] = useState(startOfMonth(new Date()));
    const [endDateTwo, setEndDateTwo] = useState(endOfMonth(new Date()));
    const [error, setError] = useState();

    const handleSave = () => {
        onDateRangeSelected(startDate, endDate);
        setCalModalVisible(false);
    };

    const handleDateChange = date => {
        const today = new Date();
        if (date > today.setHours(23, 59, 59, 999)) {
            return;
        }

        if (isSameDay(date, startDate) && !endDate) {
            // If the selected date is the same as startDate and no endDate is set, unselect it
            setStartDate(null);
            setEndDate(null);
        } else if (!startDate || (startDate && endDate)) {
            // If no startDate is set or both startDate and endDate are set, set startDate to the selected date and reset endDate
            setStartDate(date);
            setEndDate(null);
        } else if (date < startDate) {
            // If the selected date is before startDate, set it as startDate and the previous startDate as endDate
            setEndDate(startDate);
            setStartDate(date);
        } else {
            // Otherwise, set the selected date as endDate
            setEndDate(date);
        }
    };

    const handleMonthChange = direction => {
        let newMonth;
        if (direction === 1 && selectedDate.getMonth() === 11) {
            newMonth = new Date(selectedDate.getFullYear() + 1, 0, 1);
            setSelectedYear(selectedDate.getFullYear() + 1);
        } else if (direction === -1 && selectedDate.getMonth() === 0) {
            newMonth = new Date(selectedDate.getFullYear() - 1, 11, 1);
            setSelectedYear(selectedDate.getFullYear() - 1);
        } else {
            newMonth = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + direction,
                1,
            );
        }

        setSelectedDate(newMonth);
        setShowMonthSelector(false);

        const startOfMonthFormatted = moment(startOfMonth(newMonth)).format(
            'YYYY-MM-DD',
        );
        const endOfMonthFormatted = moment(endOfMonth(newMonth)).format(
            'YYYY-MM-DD',
        );
        setStartDateTwo(startOfMonth(newMonth));
        setEndDateTwo(endOfMonth(newMonth));
        setStartDateTwo(startOfMonthFormatted);
        setEndDateTwo(endOfMonthFormatted);
    };

    const getBackgroundColor = date => {
        const today = new Date();
        if (date > today.setHours(23, 59, 59, 999)) {
            return {backgroundColor: '#F7F7F7', textColor: '#CCCCCC'};
        } else if (startDate && isSameDay(date, startDate)) {
            return {backgroundColor: '#009FD3', textColor: '#FFFFFF'};
        } else if (endDate && isSameDay(date, endDate)) {
            return {backgroundColor: '#009FD3', textColor: '#FFFFFF'};
        } else if (startDate && endDate && date > startDate && date < endDate) {
            return {backgroundColor: '#EAF7FF', textColor: '#000'};
        } else if (isSameDay(date, today)) {
            return {backgroundColor: '#F7F7F7', textColor: '#009FD3'};
        } else if (isSameMonth(date, selectedDate)) {
            return {backgroundColor: '#F7F7F7', textColor: '#242424'};
        } else {
            return {backgroundColor: '#F7F7F7', textColor: '#CCCCCC'};
        }
    };

    const getBorderRadius = date => {
        const isStartSelected = startDate && isSameDay(date, startDate);
        const isEndSelected = endDate && isSameDay(date, endDate);

        if (isStartSelected && isEndSelected) {
            return {
                borderTopLeftRadius: SIZE(8),
                borderBottomLeftRadius: SIZE(8),
                borderTopRightRadius: SIZE(8),
                borderBottomRightRadius: SIZE(8),
            };
        } else if (isStartSelected && !singleDateMode) {
            return {
                borderTopLeftRadius: SIZE(8),
                borderBottomLeftRadius: SIZE(8),
            };
        } else if (isEndSelected) {
            return {
                borderTopRightRadius: SIZE(8),
                borderBottomRightRadius: SIZE(8),
            };
        }

        return {};
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
        const firstDayOfMonth = new Date(
            selectedYear,
            selectedDate.getMonth(),
            1,
        );
        const startDay = firstDayOfMonth.getDay();
        const lastDayOfMonth = new Date(
            selectedYear,
            selectedDate.getMonth() + 1,
            0,
        );
        const totalDaysInMonth = lastDayOfMonth.getDate();
        const totalWeeksInMonth = Math.ceil((totalDaysInMonth + startDay) / 7);

        const daysInMonth = Array.from(
            {length: totalWeeksInMonth * 7},
            (_, i) => {
                const day = new Date(
                    selectedYear,
                    selectedDate.getMonth(),
                    i + 1 - startDay,
                );
                return day;
            },
        );
        return daysInMonth.map((date, index) => {
            const backgroundColor = getBackgroundColor(date).backgroundColor;

            return (
                <TouchableOpacity
                    onPress={() => {
                        handleDateChange(date);
                        setError && setError('');
                    }}
                    activeOpacity={0.8}
                    key={date.toISOString()}
                    style={[
                        styles.day,
                        {backgroundColor, ...getBorderRadius(date)},
                    ]}>
                    <View style={styles.touchableOpacity}>
                        <Text
                            style={[
                                styles.dayText,
                                {color: getBackgroundColor(date).textColor},
                            ]}>
                            {date.getDate()}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        disabled
                        activeOpacity={0.8}
                        onPress={() =>
                            setShowMonthSelector(!showMonthSelector)
                        }>
                        <Text
                            allowFontScaling={false}
                            style={styles.monthLabel}>
                            {selectedDate.toLocaleDateString('en-US', {
                                month: 'long',
                            })}
                        </Text>
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.monthLabel}>
                        ,{' '}
                    </Text>
                    <TouchableOpacity
                        disabled
                        activeOpacity={0.8}
                        onPress={() => setShowYearSelector(!showYearSelector)}>
                        <Text
                            allowFontScaling={false}
                            style={styles.monthLabel}>
                            {selectedYear}
                        </Text>
                    </TouchableOpacity>
                </View>
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
                            <ArrowRightIcon width={'100%'} height={'100%'} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <DaysOfWeek />
            <View style={styles.calendarContainer}>{renderDates()}</View>
            {error && (
                <Text allowFontScaling={false} style={styles.errorMessage}>
                    {error}
                </Text>
            )}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setCalModalVisible(false);
                        isExpiry
                            ? onDateTwoSelected && onDateTwoSelected('')
                            : onDateSelected && onDateSelected('');
                    }}
                    activeOpacity={0.8}
                    style={styles.leftButton}>
                    <Text allowFontScaling={false} style={styles.leftText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                {singleDateMode === true ? (
                    <TouchableOpacity
                        disabled={!singleDateMode}
                        onPress={handleSave}
                        activeOpacity={0.8}
                        style={styles.rightButton}>
                        <Text allowFontScaling={false} style={styles.rightText}>
                            Select
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        disabled={!startDate || !endDate}
                        onPress={handleSave}
                        activeOpacity={0.8}
                        style={styles.rightButton}>
                        <Text allowFontScaling={false} style={styles.rightText}>
                            Save
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SIZE(10),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
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
        width: '100%',
        height: '100%',
    },
    daysOfWeekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(5),
    },
    dayOfWeekText: {
        fontFamily: FONTS.Roman,
        fontSize: SIZE(14),
        color: '#000',
        width: '14.28%',
        textAlign: 'center',
    },
    calendarContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SIZE(5),
    },
    day: {
        width: '14.28%',
        height: SIZE(48),
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableOpacity: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    dayText: {
        fontFamily: FONTS.medium,
        fontSize: SIZE(14),
    },
    applyFilterButton: {
        height: SIZE(40),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZE(10),
        borderRadius: SIZE(5),
    },
    applyFilterText: {
        fontFamily: FONTS.medium,
        fontSize: SIZE(14),
        color: '#FFFFFF',
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

export default CalendarFilter;
