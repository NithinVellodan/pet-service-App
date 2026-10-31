import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';

//packages
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

//images and logos
import CloseIcon from '../../../../../assets/icons/close-icon-blue.svg';
import ArrowDown from '../../../../../assets/icons/arrow-down.svg';
import CloseRound from '../../../../../assets/icons/close-circle.svg';
import TickIcon from '../../../../../assets/icons/tick-icon.svg';

const ServiceEditModal = ({
    selectedPetTypes,
    petTypes,
    handlePetTypeSelect,
    setRemarks,
    remarks,
    setHours,
    hours,
    setEditModal,
    editService,
    submitLoading,
}) => {
    const [isPetTypeDropdownOpen, setIsPetTypeDropdownOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const togglePetTypeDropdown = () => {
        setIsPetTypeDropdownOpen(!isPetTypeDropdownOpen);
    };

    const validateFields = () => {
        if (selectedPetTypes.length === 0) {
            setErrorMessage('Please select at least one pet type.');
            return false;
        }
        if (!hours) {
            setErrorMessage('Please enter the number of hours.');
            return false;
        }
        if (!remarks.trim()) {
            setErrorMessage('Please enter remarks.');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleSave = () => {
        if (validateFields()) {
            editService();
        }
    };
    return (
        <KeyboardAwareScrollView
            extraScrollHeight={SIZE(-270)}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.editMainContainer}>
            <TouchableWithoutFeedback
                onPress={() => {
                    setIsPetTypeDropdownOpen(false);
                }}>
                <View style={{flex: 1}}>
                    <View style={styles.topContainer}>
                        <Text style={styles.headingText}>Edit Service</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                setEditModal(false);
                            }}>
                            <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.trainModeStyle}>
                        <Text
                            style={[styles.subText, {marginBottom: SIZE(10)}]}>
                            Pet Type
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                styles.dropdownToggle,
                                {
                                    borderColor:
                                        selectedPetTypes?.length > 0
                                            ? '#009FD3'
                                            : '#e2e2e2',
                                },
                            ]}
                            onPress={togglePetTypeDropdown}>
                            <View style={{flexDirection: 'row'}}>
                                <ScrollView
                                    horizontal
                                    bounces={false}
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.selectedModesContainer}>
                                    {selectedPetTypes &&
                                    selectedPetTypes.length > 0 ? (
                                        selectedPetTypes.map(petType => (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                key={petType.id}
                                                style={
                                                    styles.selectedModeContainer
                                                }>
                                                <Text
                                                    style={[
                                                        styles.dropdownToggleText,
                                                        {
                                                            color: '#003459',
                                                        },
                                                    ]}>
                                                    {petType.name}
                                                </Text>
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={() =>
                                                        handlePetTypeSelect(
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
                                    showsVerticalScrollIndicator={false}
                                    style={styles.dropdownItems}>
                                    {petTypes.map(petType => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            key={petType.id}
                                            style={styles.dropdownItem}
                                            onPress={() =>
                                                handlePetTypeSelect(petType)
                                            }>
                                            <Text
                                                style={[
                                                    styles.dropdownItemText,
                                                ]}>
                                                {petType.name}
                                            </Text>
                                            {selectedPetTypes &&
                                            selectedPetTypes.some(
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
                                                            backgroundColor:
                                                                '#fff',
                                                            borderWidth:
                                                                SIZE(0.5),
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
                    </View>
                    <View style={{gap: SIZE(10), marginTop: SIZE(10)}}>
                        <Text style={styles.subText}>No of Hours</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter"
                            placeholderTextColor={'#8E8E8E'}
                            keyboardType="numeric"
                            value={hours}
                            onChangeText={text => {
                                const numericText = text.replace(/[^0-9]/g, '');
                                const hours = Math.min(
                                    40,
                                    parseInt(numericText, 10),
                                );
                                setHours(isNaN(hours) ? '' : hours.toString());
                            }}
                            onFocus={() => {
                                setIsPetTypeDropdownOpen(false);
                            }}
                        />
                        <Text style={styles.subText}>Remarks</Text>
                        <TextInput
                            style={[styles.input]}
                            placeholderTextColor={'#8E8E8E'}
                            placeholder="Enter Remarks"
                            value={remarks}
                            onChangeText={text => setRemarks(text)}
                            onFocus={() => {
                                setIsPetTypeDropdownOpen(false);
                            }}
                        />
                    </View>
                    {errorMessage ? (
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ) : null}
                    <TouchableOpacity
                        onPress={() => {
                            // handleApply();
                            // setEditModal(false);
                            setIsPetTypeDropdownOpen(false);
                            handleSave();
                        }}
                        disabled={submitLoading}
                        activeOpacity={0.8}
                        style={[styles.rightButton]}>
                        <View>
                            {submitLoading ? (
                                <ActivityIndicator
                                    size={'small'}
                                    color={'#fff'}
                                />
                            ) : (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.rightText}>
                                    Save
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default ServiceEditModal;

const styles = StyleSheet.create({
    editMainContainer: {},
    topContainer: {
        marginBottom: SIZE(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headingText: {
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        color: '#242424',
        fontSize: SIZE(20),
    },
    line: {
        height: SIZE(1),
        backgroundColor: '#E2E2E2',
        marginBottom: SIZE(24),
    },
    input: {
        backgroundColor: '#f7f7f7',
        height: SIZE(44),
        paddingHorizontal: SIZE(16),
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#D3D3D3',
        fontFamily: FONTS.medium,
        fontWeight: '400',
        color: '#686868',
        fontSize: SIZE(14),
        marginBottom: SIZE(12),
    },
    subText: {
        fontFamily: FONTS.semiBold,
        fontWeight: '500',
        color: '#686868',
        fontSize: SIZE(16),
    },
    rightButton: {
        paddingHorizontal: SIZE(32),
        height: SIZE(42),
        alignItems: 'center',
        borderRadius: SIZE(8),
        backgroundColor: '#003459',
        justifyContent: 'center',
        marginTop: SIZE(12),
    },
    rightText: {
        color: '#FFF',
        fontSize: SIZE(14),
        fontWeight: '700',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
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
    trainModeStyle: {},
    dropdownToggle: {
        backgroundColor: '#f7f7f7',
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
