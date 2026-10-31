import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import CalenderIcon from '../../../assets/icons/calendarIcon.svg';
import CalenderTimeIcon from '../../../assets/icons/calendar-clock.svg';

export const CalendarPickerThree = ({
    selectedDateThree,
    setCalModalVisible,
    errorMessage,
    setErrorMessage,
    setExpiry,
    calender,
}) => {
    return (
        <View>
            <Text style={[styles.labelText, {marginTop: SIZE(0)}]}>
                {calender ? calender : 'DOB'}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    setExpiry(true);
                    setCalModalVisible(true);
                    setErrorMessage &&
                        setErrorMessage(prev => ({
                            ...prev,
                            calendar_three: false,
                        }));
                }}
                activeOpacity={0.8}
                style={{
                    borderWidth: SIZE(1),
                    borderRadius: SIZE(8),
                    borderColor: '#D3D3D3',
                    paddingHorizontal: SIZE(16),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#F7F7F7',
                }}>
                <Text
                    style={{
                        paddingVertical: SIZE(14),
                        color: '#686868',
                        fontFamily: FONTS.regular,
                        fontSize: SIZE(14),
                    }}>
                    {selectedDateThree
                        ? new Date(selectedDateThree).toLocaleDateString(
                              'en-US',
                              {
                                  year: 'numeric',
                                  month: 'numeric',
                                  day: 'numeric',
                              },
                          )
                        : 'Choose'}
                </Text>
                <View>
                    <CalenderIcon width={SIZE(24)} height={SIZE(24)} />
                </View>
            </TouchableOpacity>

            {errorMessage.age_is == true && (
                <Text style={styles.errorMessage}>Please select date</Text>
            )}
        </View>
    );
};

export const CalendarPickerTwo = ({
    selectedDateTwo,
    setExpiry,
    setCalModalVisible,
    errorMessage,
    ckeck,
    setErrorMessage,
    page_is,
}) => {
    return (
        <View style={{marginBottom: SIZE(24)}}>
            {page_is === 'customer_pet_add' && ckeck ? (
                <View>
                    <Text style={styles.labelText}>Vaccination Expiry</Text>
                    <TouchableOpacity
                        disabled={!ckeck}
                        onPress={() => {
                            setExpiry(true);
                            setCalModalVisible(true);
                            setErrorMessage &&
                                setErrorMessage(prev => ({
                                    ...prev,
                                    calendar_two: false,
                                }));
                        }}
                        activeOpacity={0.8}
                        style={{
                            opacity: ckeck ? 1 : 0.2,
                            borderWidth: SIZE(1),
                            borderRadius: SIZE(8),
                            borderColor: '#D3D3D3',
                            paddingHorizontal: SIZE(16),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#F7F7F7',
                        }}>
                        <Text
                            style={{
                                paddingVertical: SIZE(16),
                                color: '#686868',
                                fontFamily: FONTS.regular,
                                fontSize: SIZE(14),
                            }}>
                            {selectedDateTwo
                                ? new Date(selectedDateTwo).toLocaleDateString(
                                      'en-US',
                                      {
                                          year: 'numeric',
                                          month: 'numeric',
                                          day: 'numeric',
                                      },
                                  )
                                : 'Choose Date'}
                        </Text>
                        <View>
                            <CalenderIcon width={SIZE(24)} height={SIZE(24)} />
                        </View>
                    </TouchableOpacity>

                    {errorMessage.calendar_two == true && (
                        <Text style={styles.errorMessage}>
                            Please select date
                        </Text>
                    )}
                </View>
            ) : page_is !== 'customer_pet_add' && ckeck ? (
                <View style={{marginBottom: SIZE(24)}}>
                    <Text style={styles.labelText}>Vaccination Expiry</Text>
                    <TouchableOpacity
                        disabled={!ckeck}
                        onPress={() => {
                            setExpiry(true);
                            setCalModalVisible(true);
                            setErrorMessage(prev => ({
                                ...prev,
                                calendar_two: false,
                            }));
                        }}
                        activeOpacity={0.8}
                        style={{
                            opacity: ckeck ? 1 : 0.2,
                            borderWidth: SIZE(1),
                            borderRadius: SIZE(8),
                            borderColor: '#D3D3D3',
                            paddingHorizontal: SIZE(16),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#F7F7F7',
                        }}>
                        <Text
                            style={{
                                paddingVertical: SIZE(16),
                                color: '#686868',
                                fontFamily: FONTS.regular,
                                fontSize: SIZE(14),
                            }}>
                            {selectedDateTwo
                                ? new Date(selectedDateTwo).toLocaleDateString(
                                      'en-US',
                                      {
                                          year: 'numeric',
                                          month: 'numeric',
                                          day: 'numeric',
                                      },
                                  )
                                : 'Choose Date'}
                        </Text>
                        <View>
                            <CalenderIcon width={SIZE(24)} height={SIZE(24)} />
                        </View>
                    </TouchableOpacity>

                    {errorMessage.calendar_two == true && (
                        <Text style={styles.errorMessage}>
                            Please select date
                        </Text>
                    )}
                </View>
            ) : null}
        </View>
    );
};

const CalendarPicker = ({
    selectedDate,
    setExpiry,
    setCalModalVisible,
    errorMessage,
    ckeckInsurance,
    setSecondCalModalVisible,
    label,
    chooseDate,
    dateTime,
    page_is,
}) => {
    return (
        <>
            {page_is === 'customer_pet_add' && ckeckInsurance ? (
                <View>
                    <View>
                        {label ? (
                            <Text style={styles.labelText}>{label}</Text>
                        ) : (
                            <Text style={styles.labelText}>
                                Insurance Expiry
                            </Text>
                        )}
                    </View>
                    <TouchableOpacity
                        disabled={!ckeckInsurance}
                        onPress={() => {
                            setExpiry(false);
                            setCalModalVisible(true);
                            if (setSecondCalModalVisible) {
                                setSecondCalModalVisible(false);
                            }
                        }}
                        activeOpacity={0.8}
                        style={{
                            opacity: ckeckInsurance ? 1 : 0.2,
                            borderWidth: SIZE(1),
                            borderRadius: SIZE(8),
                            borderColor: '#D3D3D3',
                            paddingHorizontal: SIZE(16),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#F7F7F7',
                        }}>
                        <Text
                            style={{
                                paddingVertical: SIZE(16),
                                color: '#686868',
                                fontFamily: FONTS.medium,
                                fontSize: SIZE(14),
                            }}>
                            {/* {selectedDate ? selectedDate.toDateString() : 'Choose Date'} */}
                            {dateTime ? (
                                <>
                                    {selectedDate
                                        ? new Date(
                                              selectedDate,
                                          ).toLocaleDateString('en-US', {
                                              year: 'numeric',
                                              month: 'numeric',
                                              day: 'numeric',
                                              hour: 'numeric',
                                              minute: 'numeric',
                                          })
                                        : chooseDate
                                        ? chooseDate
                                        : 'Choose Date'}
                                </>
                            ) : (
                                <>
                                    {selectedDate
                                        ? new Date(
                                              selectedDate,
                                          ).toLocaleDateString('en-US', {
                                              year: 'numeric',
                                              month: 'numeric',
                                              day: 'numeric',
                                          })
                                        : chooseDate
                                        ? chooseDate
                                        : 'Choose Date'}
                                </>
                            )}
                        </Text>
                        <View>
                            {dateTime ? (
                                <CalenderTimeIcon
                                    width={SIZE(24)}
                                    height={SIZE(24)}
                                />
                            ) : (
                                <CalenderIcon
                                    width={SIZE(24)}
                                    height={SIZE(24)}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                    {errorMessage?.calendar_one == true && (
                        <Text style={styles.errorMessage}>
                            Please select date
                        </Text>
                    )}
                </View>
            ) : page_is !== 'customer_pet_add' && ckeckInsurance ? (
                <View>
                    <View>
                        {label ? (
                            <Text style={styles.labelText}>{label}</Text>
                        ) : (
                            <Text style={styles.labelText}>
                                Insurance Expiry
                            </Text>
                        )}
                    </View>
                    <TouchableOpacity
                        disabled={!ckeckInsurance}
                        onPress={() => {
                            setExpiry(false);
                            setCalModalVisible(true);
                            if (setSecondCalModalVisible) {
                                setSecondCalModalVisible(false);
                            }
                        }}
                        activeOpacity={0.8}
                        style={{
                            opacity: ckeckInsurance ? 1 : 0.2,
                            borderWidth: SIZE(1),
                            borderRadius: SIZE(8),
                            borderColor: '#D3D3D3',
                            paddingHorizontal: SIZE(16),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#F7F7F7',
                        }}>
                        <Text
                            style={{
                                paddingVertical: SIZE(16),
                                color: '#686868',
                                fontFamily: FONTS.medium,
                                fontSize: SIZE(14),
                            }}>
                            {dateTime ? (
                                <>
                                    {selectedDate
                                        ? new Date(
                                              selectedDate,
                                          ).toLocaleDateString('en-US', {
                                              year: 'numeric',
                                              month: 'numeric',
                                              day: 'numeric',
                                              hour: 'numeric',
                                              minute: 'numeric',
                                          })
                                        : chooseDate
                                        ? chooseDate
                                        : 'Choose Date'}
                                </>
                            ) : (
                                <>
                                    {selectedDate
                                        ? new Date(
                                              selectedDate,
                                          ).toLocaleDateString('en-US', {
                                              year: 'numeric',
                                              month: 'numeric',
                                              day: 'numeric',
                                          })
                                        : chooseDate
                                        ? chooseDate
                                        : 'Choose Date'}
                                </>
                            )}
                        </Text>
                        <View>
                            {dateTime ? (
                                <CalenderTimeIcon
                                    width={SIZE(24)}
                                    height={SIZE(24)}
                                />
                            ) : (
                                <CalenderIcon
                                    width={SIZE(24)}
                                    height={SIZE(24)}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                    {errorMessage?.calendar_one == true && (
                        <Text style={styles.errorMessage}>
                            Please select date
                        </Text>
                    )}
                </View>
            ) : null}
        </>
    );
};

export default CalendarPicker;

const styles = StyleSheet.create({
    labelText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.medium,
        marginBottom: SIZE(10),
        marginTop: SIZE(24),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});
