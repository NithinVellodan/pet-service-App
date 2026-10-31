import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import React, {useState} from 'react';

// Import other required components and assets
import ArrowDown from '../../../../../assets/icons/arrow-down.svg';
import CloseRound from '../../../../../assets/icons/close-circle.svg';
import TickIcon from '../../../../../assets/icons/tick-icon.svg';
import {SIZE, SIZES} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

const TrainingModeComponent = ({
    existingComponent,
    setComponents,
    trainingMode,
    index,
    componentDropdownStates,
    setComponentDropdownStates,
    petTypes,
    handlePetTypeSelect,
    handleHoursChange,
    handleRemarksChange,
    errorMessage,
    selectedTrainingModes,
    isPetTypeDropdownOpen,
    setIsPetTypeDropdownOpen,
}) => {
    const toggleTrainDropdown = () => {
        setComponentDropdownStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    const togglePetTypeDropdown = () => {
        setIsPetTypeDropdownOpen(!isPetTypeDropdownOpen);
    };

    const isTrainDropdownOpen =
        selectedTrainingModes.length === 1 && index === 0
            ? true
            : componentDropdownStates[index] || false;

    const renderComponent = component => (
        <View key={index} style={styles.component}>
            <TouchableOpacity
                onPress={toggleTrainDropdown}
                activeOpacity={0.8}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <Text style={styles.componentHeading}>
                    {component.trainingMode.title}
                </Text>
                <ArrowDown
                    style={{
                        transform: isTrainDropdownOpen
                            ? [{rotate: '180deg'}]
                            : [{rotate: '0deg'}],
                    }}
                    width={SIZE(24)}
                    height={SIZE(24)}
                />
            </TouchableOpacity>
            {isTrainDropdownOpen && (
                <View style={styles.trainModeStyle}>
                    <Text style={[styles.subText, {marginBottom: SIZE(10)}]}>
                        Pet Type
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                            styles.dropdownToggle,
                            {
                                borderColor:
                                    component?.selectedPetTypes?.length > 0
                                        ? '#009FD3'
                                        : '#e2e2e2',
                                backgroundColor:
                                    component?.selectedPetTypes?.length > 0
                                        ? '#f7f7f7'
                                        : '#fff',
                            },
                        ]}
                        onPress={togglePetTypeDropdown}>
                        <View style={{flexDirection: 'row'}}>
                            <ScrollView
                                horizontal
                                bounces={false}
                                showsHorizontalScrollIndicator={false}
                                style={styles.selectedModesContainer}>
                                {component.selectedPetTypes &&
                                component.selectedPetTypes.length > 0 ? (
                                    component.selectedPetTypes.map(petType => (
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            key={petType.id}
                                            style={
                                                styles.selectedModeContainer
                                            }>
                                            <Text
                                                style={[
                                                    styles.dropdownToggleText,
                                                    {color: '#003459'},
                                                ]}>
                                                {petType.name}
                                            </Text>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() =>
                                                    handlePetTypeSelect(
                                                        index,
                                                        petType,
                                                    )
                                                }>
                                                <CloseRound
                                                    width={SIZE(16)}
                                                    height={SIZE(16)}
                                                />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={styles.dropdownToggleText}>
                                        Choose
                                    </Text>
                                )}
                            </ScrollView>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={togglePetTypeDropdown}>
                                <ArrowDown
                                    style={{
                                        transform: isPetTypeDropdownOpen
                                            ? [{rotate: '180deg'}]
                                            : [{rotate: '0deg'}],
                                    }}
                                    width={SIZE(24)}
                                    height={SIZE(24)}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    {isPetTypeDropdownOpen && (
                        <View style={styles.dropdownList}>
                            <ScrollView
                                scrollEnabled
                                nestedScrollEnabled
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                                style={styles.dropdownItems}>
                                {petTypes.map(petType => (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        key={petType.id}
                                        style={styles.dropdownItem}
                                        onPress={() =>
                                            handlePetTypeSelect(index, petType)
                                        }>
                                        <Text style={[styles.dropdownItemText]}>
                                            {petType.name}
                                        </Text>
                                        {component.selectedPetTypes &&
                                        component?.selectedPetTypes.some(
                                            pt => pt.id === petType.id,
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
                                                        backgroundColor: '#fff',
                                                        borderWidth: SIZE(0.5),
                                                    },
                                                ]}></View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <TouchableOpacity
                                onPress={togglePetTypeDropdown}
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
                    {errorMessage.selectedPetTypes && (
                        <Text style={styles.errorMessage}>
                            {errorMessage.selectedPetTypes}
                        </Text>
                    )}
                    <View style={{gap: SIZE(10), marginTop: SIZE(10)}}>
                        <Text style={styles.subText}>No of Hours</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter"
                            placeholderTextColor={'#8E8E8E'}
                            keyboardType="numeric"
                            value={component.no_of_hours}
                            onChangeText={text => {
                                const numericText = text.replace(/[^0-9]/g, '');
                                const no_of_hours = Math.min(
                                    40,
                                    parseInt(numericText, 10),
                                );
                                handleHoursChange(
                                    index,
                                    isNaN(no_of_hours)
                                        ? ''
                                        : no_of_hours.toString(),
                                );
                            }}
                            onFocus={() => {
                                setIsPetTypeDropdownOpen(false);
                            }}
                        />
                        {errorMessage.no_of_hours && (
                            <Text style={styles.errorMessage}>
                                {errorMessage.no_of_hours}
                            </Text>
                        )}
                        <Text style={styles.subText}>Remarks</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {height: SIZE(66), paddingBottom: 20},
                            ]}
                            placeholderTextColor={'#8E8E8E'}
                            placeholder="Enter Remarks"
                            value={component.remarks}
                            onChangeText={text =>
                                handleRemarksChange(index, text)
                            }
                            onFocus={() => {
                                setIsPetTypeDropdownOpen(false);
                            }}
                        />
                        {errorMessage.remarks && (
                            <Text style={styles.errorMessage}>
                                {errorMessage.remarks}
                            </Text>
                        )}
                    </View>
                </View>
            )}
        </View>
    );

    if (existingComponent) {
        return renderComponent(existingComponent);
    } else {
        const newComponent = {
            trainingMode,
            selectedPetTypes: [],
            remarks: '',
            no_of_hours: '',
        };
        setComponents([...components, newComponent]);
        setComponentDropdownStates(prevStates => [...prevStates, false]);
        return renderComponent(newComponent);
    }
};

export default TrainingModeComponent;

const styles = StyleSheet.create({
    selectedModesContainer: {
        flexDirection: 'row',
        gap: SIZE(8),
    },
    selectedModeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderRadius: SIZE(6),
        gap: SIZE(8),
        borderColor: '#98C1D9',
        backgroundColor: '#EAF7FF',
        padding: SIZE(5),
        marginRight: SIZE(8),
    },
    trainModeStyle: {
        paddingTop: SIZE(16),
        borderTopWidth: SIZE(1),
        marginTop: SIZE(10),
        borderTopColor: '#E2E2E2',
    },
    dropdownToggle: {
        backgroundColor: '#fff',
        height: SIZE(50),
        paddingHorizontal: SIZE(11),
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownToggleText: {
        fontFamily: FONTS.semiBold,
        fontWeight: '500',
        color: '#686868',
        fontSize: SIZE(14),
    },
    dropdownList: {
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderColor: '#ccc',
        borderRadius: SIZE(8),
        marginTop: SIZE(4),
        padding: SIZE(16),
        gap: SIZE(16),
    },
    dropdownItems: {
        maxHeight: SIZE(200),
    },
    dropdownItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownItem: {
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
        marginBottom: SIZE(16),
    },
    dropdownItemText: {
        fontFamily: FONTS.bold,
        fontWeight: '600',
        color: '#242424',
        fontSize: SIZE(14),
    },
    selectedDropdownItemText: {
        fontWeight: 'bold',
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
    component: {
        borderWidth: SIZE(1),
        borderColor: '#e2e2e2',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(12),
        borderRadius: SIZE(8),
        backgroundColor: '#fff',
        marginBottom: SIZE(16),
    },
    componentHeading: {
        fontFamily: FONTS.semiBold,
        fontWeight: '500',
        color: '#242424',
        fontSize: SIZE(14),
    },
    input: {
        backgroundColor: '#f7f7f7',
        height: SIZE(44),
        paddingHorizontal: SIZE(16),
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#EDEDED',
        fontFamily: FONTS.medium,
        fontWeight: '400',
        color: '#686868',
        fontSize: SIZE(14),
    },
    subText: {
        fontFamily: FONTS.semiBold,
        fontWeight: '500',
        color: '#686868',
        fontSize: SIZE(12),
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
        fontFamily: FONTS.bold,
        fontSize: SIZE(12),
        fontWeight: '600',
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
