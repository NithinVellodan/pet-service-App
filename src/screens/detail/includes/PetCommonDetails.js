import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';

// theme
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

import ArrowDown from '../../../assets/icons/arrow-down.svg';
import Arrow from '../../../assets/icons/arrow-up.svg';
import CalenderIcon from '../../../assets/icons/calendarIcon.svg';
import {CalendarPickerThree} from './CalendarPicker';

const PetCommonDetails = ({
    sexValue,
    setSexValue,
    colorValue,
    setColorValue,
    weight,
    setWeight,
    errorMessage,
    setErrorMessage,
    setAgeVisible,
    sexVisible,
    setSexVisible,
    setCalModalVisible,
    setSelectedDateThree,
    setExpiry,
    selectedDateThree,
}) => {
    const sex = [
        {value: '10', label: 'Male'},
        {value: '20', label: 'Female'},
        {value: '30', label: 'Not Specified'},
    ];

    const onChange = text => {
        const numericText = text.replace(/[^0-9]/g, '').slice(0, 3);
        setErrorMessage(prev => ({
            ...prev,
            weight_is: numericText.length > 0 ? false : true,
        }));
        setWeight(numericText);
    };

    const onChangeColor = text => {
        const alphabeticText = text.replace(/[^a-zA-Z]/g, '');
        setErrorMessage(prev => ({
            ...prev,
            color_is: alphabeticText.length > 0 ? false : true,
        }));
        setColorValue(alphabeticText);
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setAgeVisible(false);
                setSexVisible(false);
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    zIndex: 100,
                }}>
                <View
                    style={[
                        styles.inputBoxSub,
                        {zIndex: 12, position: 'relative'},
                    ]}>
                    <CalendarPickerThree
                        selectedDateThree={selectedDateThree}
                        setCalModalVisible={setCalModalVisible}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        setSelectedDateThree={setSelectedDateThree}
                        setExpiry={setExpiry}
                    />
                </View>
                <View style={styles.inputBoxSub}>
                    <Text allowFontScaling={false} style={styles.labelText}>
                        Weight
                    </Text>
                    <View style={styles.inputOption}>
                        <TextInput
                            keyboardType="numeric"
                            value={weight}
                            placeholder="Enter"
                            placeholderTextColor={'#8E8E8E'}
                            onChangeText={onChange}
                            style={{
                                height: SIZE(46),
                                fontSize: SIZE(14),
                                fontFamily: FONTS.medium,
                                color: '#686868',
                            }}
                        />
                    </View>
                    {errorMessage.weight_is == true && (
                        <Text style={styles.errorMessage}>
                            Please enter weight
                        </Text>
                    )}
                </View>

                <View
                    style={[
                        styles.inputBoxSub,
                        {zIndex: 10, position: 'relative'},
                    ]}>
                    <Text allowFontScaling={false} style={styles.labelText}>
                        Sex
                    </Text>
                    <TouchableOpacity
                        style={{zIndex: 1}}
                        activeOpacity={0.8}
                        onPress={() => {
                            setSexVisible(!sexVisible);
                        }}>
                        <View
                            style={[
                                styles.dropStyle,
                                {
                                    borderBottomLeftRadius: sexVisible
                                        ? 0
                                        : SIZE(8),
                                    borderBottomRightRadius: sexVisible
                                        ? 0
                                        : SIZE(8),
                                },
                            ]}>
                            <Text
                                style={{
                                    fontFamily: FONTS.regular,
                                    fontSize: SIZE(14),
                                    color: '#686868',
                                }}>
                                {sexValue?.label || 'Choose'}
                            </Text>
                            <View
                                style={{
                                    width: SIZE(24),
                                    height: SIZE(24),
                                }}>
                                {!sexVisible ? (
                                    <ArrowDown
                                        width={SIZE(20)}
                                        height={SIZE(20)}
                                    />
                                ) : (
                                    <Arrow width={SIZE(20)} height={SIZE(20)} />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                    {sexVisible && (
                        <View
                            style={[
                                styles.flatList,
                                {
                                    position: 'absolute',
                                    top: SIZE(75),
                                    zIndex: 5,
                                },
                            ]}>
                            <FlatList
                                bounces={false}
                                data={sex}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSexValue(item);
                                            setSexVisible(!sexVisible);
                                            setErrorMessage(prev => ({
                                                ...prev,
                                                sex_is: false,
                                            }));
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: SIZE(14),
                                                padding: SIZE(10),
                                                fontFamily: FONTS.medium,
                                                color: '#242424',
                                            }}>
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    )}
                    {errorMessage.sex_is == true && (
                        <Text style={styles.errorMessage}>
                            Please select gender
                        </Text>
                    )}
                </View>
                <View style={styles.inputBoxSub}>
                    <Text allowFontScaling={false} style={styles.labelText}>
                        Color {errorMessage.color_is}
                    </Text>
                    <View style={styles.inputOption}>
                        <TextInput
                            value={colorValue}
                            placeholder="Enter"
                            placeholderTextColor={'#8E8E8E'}
                            onChangeText={onChangeColor}
                            style={{
                                height: SIZE(46),
                                fontSize: SIZE(14),
                                fontFamily: FONTS.medium,
                                color: '#686868',
                            }}
                        />
                    </View>
                    {errorMessage.color_is === true && (
                        <Text style={styles.errorMessage}>
                            Please Enter color
                        </Text>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {},
    labelText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.medium,
        marginBottom: SIZE(10),
    },
    inputBoxSub: {
        marginTop: SIZE(24),
        width: SIZES.width * 0.4,
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    dropStyle: {
        padding: SIZE(10),
        borderWidth: 1,
        borderTopLeftRadius: SIZE(8),
        borderTopRightRadius: SIZE(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#D3D3D3',
        width: SIZES.width * 0.4,
        backgroundColor: '#F7F7F7',
    },
    flatList: {
        borderWidth: SIZE(1),
        borderBottomLeftRadius: SIZE(8),
        borderBottomRightRadius: SIZE(8),
        borderBottomRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        borderColor: '#D3D3D3',
        width: SIZES.width * 0.4,
    },
    inputOption: {
        borderColor: '#D3D3D3',
        borderWidth: SIZE(1),
        paddingHorizontal: SIZE(16),
        borderRadius: SIZE(8),
        backgroundColor: '#F7F7F7',
    },
});

export default PetCommonDetails;
