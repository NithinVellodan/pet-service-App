import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    FlatList,
    Platform,
} from 'react-native';

//packages
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

// Constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

// Images and Logos
import ArrowDown from '../../../../../assets/icons/small-arrow-down.svg';
import ArrowUp from '../../../../../assets/icons/small-up-arrow.svg';
import ClockBlue from '../../../../../assets/icons/clock-blue.svg';

const Clock = ({setSlotAdd, setSavedTime, savedTime}) => {
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [tempFromTime, setTempFromTime] = useState(new Date());
    const [tempToTime, setTempToTime] = useState(new Date());
    const [fromPeriod, setFromPeriod] = useState('AM');
    const [toPeriod, setToPeriod] = useState('AM');
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const handleFromChange = (event, selectedTime) => {
        if (selectedTime) {
            setTempFromTime(selectedTime);
            setFromPeriod(selectedTime.getHours() >= 12 ? 'PM' : 'AM');
        }
        if (Platform.OS === 'android') {
            setShowFromPicker(false);
            setFromTime(selectedTime);
        }
    };

    const handleToChange = (event, selectedTime) => {
        if (selectedTime) {
            setTempToTime(selectedTime);
            setToPeriod(selectedTime.getHours() >= 12 ? 'PM' : 'AM');
        }
        if (Platform.OS === 'android') {
            setShowToPicker(false);
            setToTime(selectedTime);
        }
    };

    const confirmFromTime = () => {
        setFromTime(tempFromTime);
        setShowFromPicker(false);
    };

    const confirmToTime = () => {
        setToTime(tempToTime);
        setShowToPicker(false);
    };

    const saveTime = () => {
        if (fromTime !== null && toTime !== null) {
            if (toTime <= fromTime) {
                alert('End time must be greater than start time');
                return;
            }

            const newTimeSlot = {
                id: savedTime.length + 1,
                startTime: moment(fromTime).format('HH:mm'),
                endTime: moment(toTime).format('HH:mm'),
            };

            const newStartTime = moment(newTimeSlot.startTime, 'HH:mm');
            const newEndTime = moment(newTimeSlot.endTime, 'HH:mm');

            const isOverlapping = savedTime.some(slot => {
                const existingStartTime = moment(slot.startTime, 'HH:mm');
                const existingEndTime = moment(slot.endTime, 'HH:mm');

                return (
                    newStartTime.isBefore(existingEndTime) &&
                    newEndTime.isAfter(existingStartTime)
                );
            });

            if (isOverlapping) {
                alert('The new time slot overlaps with an existing time slot');
                return;
            }

            setSavedTime(newTimeSlot);
            setFromTime(null);
            setToTime(null);
            setSlotAdd(false);
        }
    };

    const formatTime = date => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const adjustedHours = hours % 12 || 12;
        return `${adjustedHours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <>
            <View style={styles.dayBottom}>
                {/* From Clock */}
                <View style={styles.clock}>
                    <View style={styles.clockSubTop}>
                        <Text style={styles.fromText}>From</Text>
                        <ClockBlue width={SIZE(16)} height={SIZE(16)} />
                    </View>
                    <TouchableOpacity
                        disabled={showToPicker}
                        activeOpacity={0.8}
                        onPress={() => {
                            setShowFromPicker(true);
                        }}
                        style={styles.clockSubBottom}>
                        <View style={styles.clock1}>
                            <ArrowUp width={SIZE(8)} height={SIZE(8)} />
                            <Text style={styles.timeText}>
                                {fromTime
                                    ? formatTime(fromTime).split(':')[0]
                                    : '--'}
                            </Text>
                            <ArrowDown width={SIZE(8)} height={SIZE(8)} />
                        </View>
                        <Text style={styles.dotText}>:</Text>
                        <View style={styles.clock1}>
                            <ArrowUp width={SIZE(8)} height={SIZE(8)} />
                            <Text style={styles.timeText}>
                                {fromTime
                                    ? formatTime(fromTime).split(':')[1]
                                    : '--'}
                            </Text>
                            <ArrowDown width={SIZE(8)} height={SIZE(8)} />
                        </View>
                        <View style={styles.clock3}>
                            <Text
                                style={[
                                    styles.timePeriod,
                                    fromPeriod === 'AM'
                                        ? styles.selectedPeriod
                                        : null,
                                ]}>
                                AM
                            </Text>
                            <View style={styles.borderPeriod}></View>
                            <Text
                                style={[
                                    styles.timePeriod,
                                    fromPeriod === 'PM'
                                        ? styles.selectedPeriod
                                        : null,
                                ]}>
                                PM
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* To Clock */}
                <View style={styles.clock}>
                    <View style={styles.clockSubTop}>
                        <Text style={styles.fromText}>To</Text>
                        <ClockBlue width={SIZE(16)} height={SIZE(16)} />
                    </View>
                    <TouchableOpacity
                        disabled={showFromPicker}
                        activeOpacity={0.8}
                        onPress={() => {
                            setShowToPicker(true);
                        }}
                        style={styles.clockSubBottom}>
                        <View style={styles.clock1}>
                            <ArrowUp width={SIZE(8)} height={SIZE(8)} />
                            <Text style={styles.timeText}>
                                {toTime
                                    ? formatTime(toTime).split(':')[0]
                                    : '--'}
                            </Text>
                            <ArrowDown width={SIZE(8)} height={SIZE(8)} />
                        </View>
                        <Text style={styles.dotText}>:</Text>
                        <View style={styles.clock1}>
                            <ArrowUp width={SIZE(8)} height={SIZE(8)} />
                            <Text style={styles.timeText}>
                                {toTime
                                    ? formatTime(toTime).split(':')[1]
                                    : '--'}
                            </Text>
                            <ArrowDown width={SIZE(8)} height={SIZE(8)} />
                        </View>
                        <View style={styles.clock3}>
                            <Text
                                style={[
                                    styles.timePeriod,
                                    toPeriod === 'AM'
                                        ? styles.selectedPeriod
                                        : null,
                                ]}>
                                AM
                            </Text>
                            <View style={styles.borderPeriod}></View>
                            <Text
                                style={[
                                    styles.timePeriod,
                                    toPeriod === 'PM'
                                        ? styles.selectedPeriod
                                        : null,
                                ]}>
                                PM
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={saveTime}>
                <Text style={styles.saveTime}>Save</Text>
            </TouchableOpacity>
            {showFromPicker && (
                <>
                    <DateTimePicker
                        value={tempFromTime}
                        mode="time"
                        is24Hour={true}
                        display="spinner"
                        onChange={handleFromChange}
                        locale={'en_GB'}
                        onDismiss={() => setShowFromPicker(false)}
                    />
                    {Platform.OS === 'ios' && (
                        <TouchableOpacity onPress={confirmFromTime}>
                            <Text style={styles.confirmButton}>
                                Confirm From Time
                            </Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
            {showToPicker && (
                <>
                    <DateTimePicker
                        value={tempToTime}
                        mode="time"
                        is24Hour={true}
                        display="spinner"
                        onChange={handleToChange}
                        locale={'en_GB'}
                        onDismiss={() => setShowToPicker(false)}
                    />
                    {Platform.OS === 'ios' && (
                        <TouchableOpacity onPress={confirmToTime}>
                            <Text style={styles.confirmButton}>
                                Confirm To Time
                            </Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </>
    );
};

export default Clock;

const styles = StyleSheet.create({
    dayBottom: {
        padding: SIZE(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    clock: {
        borderWidth: SIZE(1),
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(8),
        padding: SIZE(12),
        borderColor: '#EAF7FF',
        width: SIZE(170),
    },
    clockSubTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(8),
    },
    fromText: {
        color: '#686868',
        fontWeight: '600',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
    },
    clockSubBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clock1: {
        backgroundColor: '#fff',
        borderRadius: SIZE(5),
        alignItems: 'center',
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(7),
    },
    timeText: {
        fontWeight: '600',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        color: '#242424',
    },
    dotText: {
        fontWeight: '600',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        color: '#242424',
        paddingHorizontal: SIZE(6),
    },
    clock3: {
        backgroundColor: '#fff',
        borderRadius: SIZE(5),
        alignItems: 'center',
        paddingHorizontal: SIZE(10),
        paddingVertical: SIZE(6),
        marginLeft: SIZE(6),
    },
    timePeriod: {
        fontWeight: '600',
        fontSize: SIZE(12),
        fontFamily: FONTS.bold,
        color: '#D3D3D3',
    },
    selectedPeriod: {
        color: '#009FD3',
    },
    borderPeriod: {
        height: SIZE(1),
        backgroundColor: '#E2E2E2',
        width: '100%',
        marginVertical: SIZE(2),
    },
    saveTime: {
        fontWeight: '600',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        color: '#003459',
        paddingBottom: SIZE(12),
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        paddingVertical: SIZE(12),
        paddingHorizontal: SIZE(20),
        width: SIZE(150),
        height: SIZE(300),
    },
    pickerItem: {
        paddingVertical: SIZE(8),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    pickerText: {
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        textAlign: 'center',
        color: '#242424',
        fontWeight: '600',
    },
    confirmButton: {
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        textAlign: 'center',
        color: '#009DF3',
        fontWeight: '600',
        marginVertical: SIZE(12),
    },
});
