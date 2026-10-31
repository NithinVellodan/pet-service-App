import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

//packages
import {isSameDay, isSameMonth, isBefore, isAfter} from 'date-fns';

//constants
import {FONTS} from '../../../theme/fonts';
import {SIZE} from '../../../theme/theme';

//images and logos
import ArrowLeftIcon from '../../../assets/icons/arrow-left-black.svg';
import ArrowRightIcon from '../../../assets/icons/arrow-right-black.svg';
import ArrowDownThick from '../../../assets/icons/arrow-down-thick.svg';

const CalendarLeave = ({
    setCalModalVisible,
    onDateSelected,
    defaultDate,
    setSelectedDates,
    selectedDates,
}) => {
    const [selectedDate, setSelectedDate] = useState(
        defaultDate ? new Date(defaultDate) : new Date(),
    );

    const convertToDateObject = dateString => {
        return new Date(dateString);
    };

    const [showYearSelector, setShowYearSelector] = useState(false);
    const [showMonthSelector, setShowMonthSelector] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (defaultDate) {
            const convertedDate = convertToDateObject(defaultDate);
            setSelectedDate(convertedDate);
            setSelectedDates([convertedDate]);
        }
    }, [defaultDate]);

    const handleSave = () => {
        const today = new Date();
        const midnightToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
        );

        const invalidDates = selectedDates.filter(date =>
            isBefore(date, midnightToday),
        );

        if (invalidDates.length > 0) {
            setErrorMessage('Please select valid dates in the future.');
        } else {
            onDateSelected(selectedDates);
            setCalModalVisible(false);
        }
    };

    const handleDateChange = date => {
        const newDateObject = {date: date};

        if (selectedDates?.some(d => isSameDay(d.date, date))) {
            setSelectedDates(
                selectedDates?.filter(d => !isSameDay(d.date, date)),
            );
        } else {
            setSelectedDates([...selectedDates, newDateObject]);
        }
        setSelectedDate(date);
    };

    const handleMonthChange = direction => {
        let newMonth;
        if (direction === 1 && selectedDate.getMonth() === 11) {
            newMonth = new Date(selectedDate.getFullYear() + 1, 0, 1);
        } else if (direction === -1 && selectedDate.getMonth() === 0) {
            newMonth = new Date(selectedDate.getFullYear() - 1, 11, 1);
        } else {
            newMonth = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + direction,
                1,
            );
        }

        setSelectedDate(newMonth);
    };

    const handleYearChange = year => {
        setSelectedDate(
            new Date(year, selectedDate.getMonth(), selectedDate.getDate()),
        );
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
        const firstDayOfMonth = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1,
        );
        const startDay = firstDayOfMonth.getDay();
        const lastDayOfMonth = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0,
        );
        const totalDaysInMonth = lastDayOfMonth.getDate();
        const totalWeeksInMonth = Math.ceil((totalDaysInMonth + startDay) / 7);

        const daysInMonth = Array.from(
            {length: totalWeeksInMonth * 7},
            (_, i) => {
                const day = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    i + 1 - startDay,
                );
                return day;
            },
        );

        const today = new Date();
        const midnightToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
        );

        return daysInMonth.map(date => {
            const isDisabled = !isSameMonth(date, selectedDate);
            // const isSelected = selectedDates.some(d => isSameDay(d, date));
            const isSelected = selectedDates?.some(d => isSameDay(d.date, date));

            const isFuture = isAfter(date, midnightToday);

            const isPreviousMonth = date.getMonth() < selectedDate.getMonth();
            const isNextMonth = date.getMonth() > selectedDate.getMonth();

            const opacity = isPreviousMonth || isNextMonth ? 0.5 : 1;

            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={date.toISOString()}
                    style={[
                        styles.day,
                        {
                            backgroundColor: isSelected ? '#fff' : '#F7F7F7',
                            borderRadius: isSelected ? SIZE(8) : 0,
                            opacity,
                            borderWidth: isSelected ? SIZE(1) : 0,
                            borderColor: isSelected ? '#98C1D9' : '#F7F7F7',
                        },
                    ]}
                    onPress={() => isFuture && handleDateChange(date)}
                    disabled={!isFuture || isDisabled}>
                    <Text
                        style={[
                            styles.dayText,
                            {
                                opacity: isSameMonth(date, selectedDate)
                                    ? 1
                                    : opacity,
                                color: isSelected ? '#000' : '#242424',
                            },
                        ]}>
                        {date.getDate()}
                    </Text>
                </TouchableOpacity>
            );
        });
    };

    const years = Array.from(
        {length: 10},
        (_, i) => i + selectedDate.getFullYear() - 5,
    );
    const [selectedItem, setSelectedItem] = useState(
        selectedDate.getFullYear(),
    );

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

    const isCurrentDateSelected = () => {
        const today = new Date();
        return selectedDates?.some(date => isSameDay(date, today));
    };

    useEffect(() => {
        if (isCurrentDateSelected()) {
            setSelectedDates(
                selectedDates?.filter(date => !isSameDay(date, new Date())),
            );
        }
    }, []);

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
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        activeOpacity={0.8}
                        // onPress={() => setShowYearSelector(!showYearSelector)}
                        >
                        <Text
                            allowFontScaling={false}
                            style={styles.monthLabel}>
                            {selectedDate.getFullYear()}
                        </Text>
                        {/* <ArrowDownThick
                            style={{
                                marginLeft: SIZE(8),
                                transform: showYearSelector
                                    ? [{rotate: '180deg'}]
                                    : [{rotate: '0deg'}],
                            }}
                            width={SIZE(14)}
                            height={SIZE(14)}
                        /> */}
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

            {showYearSelector && (
                <View style={styles.monthViewStyle}>
                    <FlatList
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        data={years}
                        renderItem={renderItem}
                        keyExtractor={item => item.toString()}
                    />
                </View>
            )}

            {showMonthSelector && (
                <View style={styles.selector}>
                    {Array.from({length: 12}, (_, i) => i).map(monthIndex => (
                        <TouchableOpacity
                            key={monthIndex}
                            onPress={() => {
                                const newMonth = new Date(
                                    selectedDate.getFullYear(),
                                    monthIndex,
                                    selectedDate.getDate(),
                                );
                                setSelectedDate(newMonth);
                                setShowMonthSelector(false);
                            }}>
                            <Text style={styles.selectorOption}>
                                {new Date(
                                    selectedDate.getFullYear(),
                                    monthIndex,
                                    1,
                                ).toLocaleDateString('en-US', {
                                    month: 'long',
                                })}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <View style={styles.calendar}>
                <DaysOfWeek />
                <View style={styles.dateContainer}>{renderDates()}</View>
                {errorMessage && (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                )}
            </View>
        </View>
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

export default CalendarLeave;
