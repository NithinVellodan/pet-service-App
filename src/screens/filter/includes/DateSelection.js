import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ArrowUpIcon from '../../../assets/icons/arrowupblack.svg';
import CalenderIcon from '../../../assets/icons/calendar.svg';

import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
const DateSelection = ({
    setCalModalVisible,
    selectedDateRange,
    selectedPet,
    toastRef,
}) => {
    const [dateVisible, setDateVisible] = useState(true);

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    setDateVisible(prev => !prev);
                }}
                style={[
                    styles.itemTop,
                    {
                        paddingBottom: dateVisible ? SIZE(12) : 0,
                        borderBottomWidth: dateVisible ? SIZE(1) : 0,
                    },
                ]}>
                <View style={styles.itemHeading}>
                    <Text
                        allowFontScaling={false}
                        style={styles.itemHeadingText}>
                        Date Range
                    </Text>
                </View>
                <View style={styles.arrowContainer}>
                    <ArrowUpIcon
                        style={{
                            transform: [
                                {
                                    rotate: !dateVisible ? '180deg' : '0deg',
                                },
                            ],
                        }}
                        width={'100%'}
                        height={'100%'}
                    />
                </View>
            </TouchableOpacity>
            {dateVisible && (
                <View style={styles.itemBottom}>
                    <View style={styles.bottomSub}>
                        <View style={styles.dateLeft}>
                            <View style={styles.dateFromContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.dateFromText}>
                                    From
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    if (selectedPet === '') {
                                        toastRef.current.show(
                                            'Please Select a Pet Type',
                                            {
                                                type: 'warning',
                                            },
                                        );
                                    } else {
                                        setCalModalVisible(true);
                                    }
                                }}
                                activeOpacity={0.8}
                                style={styles.dateLeftSub}>
                                <View style={styles.calenderIcon}>
                                    <CalenderIcon
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </View>
                                <View style={styles.dateContainer}>
                                    {selectedDateRange ? (
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.dateText}>
                                            {/* 12/06/2023 */}
                                            {/* {selectedDateRange.startDate} */}
                                            {`${selectedDateRange.startDate.getDate()}/${
                                                selectedDateRange.startDate.getMonth() +
                                                1
                                            }/${selectedDateRange.startDate.getFullYear()}`}
                                        </Text>
                                    ) : (
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.dateText}>
                                            --/--/----
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dateLeft}>
                            <View style={styles.dateFromContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.dateFromText}>
                                    To
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    if (selectedPet === '') {
                                        toastRef.current.show(
                                            'Please Select a Pet Type',
                                            {
                                                type: 'warning',
                                            },
                                        );
                                    } else {
                                        setCalModalVisible(true);
                                    }
                                }}
                                activeOpacity={0.8}
                                style={styles.dateLeftSub}>
                                <View style={styles.calenderIcon}>
                                    <CalenderIcon
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </View>
                                <View style={styles.dateContainer}>
                                    {selectedDateRange ? (
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.dateText}>
                                            {/* 12/06/2023 */}
                                            {/* {selectedDateRange.endDate} */}
                                            {`${selectedDateRange.endDate.getDate()}/${
                                                selectedDateRange.endDate.getMonth() +
                                                1
                                            }/${selectedDateRange.endDate.getFullYear()}`}
                                        </Text>
                                    ) : (
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.dateText}>
                                            --/--/----
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default DateSelection;

const styles = StyleSheet.create({
    itemContainer: {
        padding: SIZE(15),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        marginBottom: SIZE(16),
    },
    itemTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: SIZE(12),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    itemHeading: {},
    itemHeadingText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    arrowContainer: {
        width: SIZE(16),
        height: SIZE(16),
    },
    itemBottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemSub: {
        marginTop: SIZE(16),
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(8),
        marginRight: SIZE(16),
    },
    itemSubText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    dateContainer: {},
    dateText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        letterSpacing: SIZE(0.1),
    },
    calenderIcon: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(8),
    },
    dateLeftSub: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZE(6),
        paddingHorizontal: SIZE(8),
        borderWidth: SIZE(1),
        backgroundColor: '#F7F7F7',
        borderColor: '#e2e2e2',
        borderRadius: SIZE(6),
    },
    dateLeft: {},
    dateFromText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    dateFromContainer: {
        marginBottom: SIZE(6),
    },
    bottomSub: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SIZE(16),
    },
});
