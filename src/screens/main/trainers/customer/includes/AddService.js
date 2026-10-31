import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

//packages
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//constants
import {SIZE, SIZES} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

//components
import DoubleColorHeading from '../../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../../components/headings/DescriptionHeading';
import TwoButton from '../../../ecommerce/includes/TwoButton';
import TrainingModeComponent from './TrainingModeComponent';
import {
    ApiGeneral,
    ApiSectionTrainerProviderServices,
} from '../../../../common/ApiGeneral';

//images and logos
import CloseIcon from '../../../../../assets/icons/close-icon-blue.svg';
import CloseRound from '../../../../../assets/icons/close-circle.svg';
import ArrowDown from '../../../../../assets/icons/arrow-down.svg';
import TickIcon from '../../../../../assets/icons/tick-icon.svg';

const AddService = ({
    setModalVisible,
    setModalScreens,
    editProfile,
    components,
    setComponents,
    setSelectedTrainingModes,
    selectedTrainingModes,
    setEdit,
    edit,
    setAddService,
    addService,
    submitService,
    submitLoading,
    clearAll,
    setRefreshing,
    fromMain,
}) => {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [trainingModes, setTrainingModes] = useState([]);
    const [petTypes, setPetTypes] = useState([]);
    const [petTypeDropdownStates, setPetTypeDropdownStates] = useState([]);

    const validateFields = () => {
        let isValid = true;
        const errors = {};

        components.forEach((component, index) => {
            errors[index] = {};

            if (!component.no_of_hours) {
                errors[index].no_of_hours = 'Hours is required';
                isValid = false;
            }

            if (!component.remarks) {
                errors[index].remarks = 'Remarks is required';
                isValid = false;
            }

            if (component.selectedPetTypes.length === 0) {
                errors[index].selectedPetTypes = 'Pet Type is required';
                isValid = false;
            }
        });

        if (selectedTrainingModes.length === 0) {
            errors.selectedTrainingModes = 'Training Mode is required';
            isValid = false;
        }

        setErrorMessage(errors);

        return isValid;
    };

    ApiSectionTrainerProviderServices(setTrainingModes);
    ApiGeneral(setPetTypes);

    const handlePressOutside = () => {
        if (categoryVisible) {
            setCategoryVisible(false);
        }
        setPetTypeDropdownStates(prevStates => prevStates.map(() => false));
    };

    const [showTrainingModeDropdown, setShowTrainingModeDropdown] =
        useState(true);

    const toggleTrainingModeDropdown = () => {
        setShowTrainingModeDropdown(!showTrainingModeDropdown);
    };

    const [componentDropdownStates, setComponentDropdownStates] = useState([]);

    const handleTrainingModeSelect = useCallback(
        mode => {
            const existingMode = selectedTrainingModes.find(
                m => m.id === mode.id,
            );
            if (existingMode) {
                setSelectedTrainingModes(
                    selectedTrainingModes.filter(m => m.id !== mode.id),
                );

                const updatedComponents = components.filter(
                    component => component.trainingMode.id !== mode.id,
                );
                setComponents(updatedComponents);
            } else {
                setSelectedTrainingModes([...selectedTrainingModes, mode]);

                const newComponent = {
                    trainingMode: mode,
                    selectedPetTypes: [],
                    remarks: '',
                    no_of_hours: '',
                };
                setComponents([...components, newComponent]);
                setComponentDropdownStates(prevStates => [
                    ...prevStates,
                    false,
                ]);
            }
        },
        [
            selectedTrainingModes,
            components,
            setSelectedTrainingModes,
            setComponents,
        ],
    );

    const handleTrainingModeRemove = mode => {
        setSelectedTrainingModes(
            selectedTrainingModes.filter(m => m.id !== mode.id),
        );

        const updatedComponents = components.filter(
            component => component.trainingMode.id !== mode.id,
        );
        setComponents(updatedComponents);

        const updatedErrorMessages = {...errorMessage};
        const modeIndex = selectedTrainingModes.findIndex(
            m => m.id === mode.id,
        );
        if (modeIndex !== -1) {
            delete updatedErrorMessages[`component${modeIndex}`];
        }
        setErrorMessage(updatedErrorMessages);
    };

    const handlePetTypeSelect = (componentIndex, petType) => {
        const updatedComponent = {...components[componentIndex]};
        if (updatedComponent.selectedPetTypes) {
            const existingPetType = updatedComponent.selectedPetTypes.find(
                pt => pt.id === petType.id,
            );
            if (existingPetType) {
                updatedComponent.selectedPetTypes =
                    updatedComponent.selectedPetTypes.filter(
                        pt => pt.id !== petType.id,
                    );
            } else {
                updatedComponent.selectedPetTypes = [
                    ...updatedComponent.selectedPetTypes,
                    petType,
                ];
            }
        } else {
            updatedComponent.selectedPetTypes = [petType];
        }

        const updatedComponents = [...components];
        updatedComponents[componentIndex] = updatedComponent;
        setComponents(updatedComponents);
    };

    const handleRemarksChange = (componentIndex, remarks) => {
        const updatedComponent = {...components[componentIndex], remarks};
        const updatedComponents = [...components];
        updatedComponents[componentIndex] = updatedComponent;
        setComponents(updatedComponents);
    };

    const handleHoursChange = (componentIndex, no_of_hours) => {
        const updatedComponent = {...components[componentIndex], no_of_hours};
        const updatedComponents = [...components];
        updatedComponents[componentIndex] = updatedComponent;
        setComponents(updatedComponents);
    };

    const renderTrainingModeDropdown = () => (
        <View style={styles.dropdown}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[
                    styles.dropdownToggle,
                    {
                        borderColor:
                            selectedTrainingModes.length > 0
                                ? '#009FD3'
                                : '#e2e2e2',
                        backgroundColor:
                            selectedTrainingModes.length > 0
                                ? '#f7f7f7'
                                : '#fff',
                    },
                ]}
                onPress={toggleTrainingModeDropdown}>
                <View style={{flexDirection: 'row'}}>
                    <ScrollView
                        horizontal
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        style={styles.selectedModesContainer}>
                        {selectedTrainingModes.length > 0 ? (
                            selectedTrainingModes.map(mode => (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    key={mode.id}
                                    style={styles.selectedModeContainer}>
                                    <Text
                                        style={[
                                            styles.dropdownToggleText,
                                            {color: '#003459'},
                                        ]}>
                                        {mode.title}
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() =>
                                            handleTrainingModeRemove(mode)
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
                        onPress={toggleTrainingModeDropdown}>
                        <ArrowDown
                            style={{
                                transform: showTrainingModeDropdown
                                    ? [{rotate: '180deg'}]
                                    : [{rotate: '0deg'}],
                            }}
                            width={SIZE(24)}
                            height={SIZE(24)}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {showTrainingModeDropdown && (
                <View style={styles.dropdownList}>
                    {trainingModes.map((mode, index) => (
                        <View key={index} style={styles.dropdownItemContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.dropdownItem}
                                onPress={() => handleTrainingModeSelect(mode)}>
                                <Text style={[styles.dropdownItemText]}>
                                    {mode.title}
                                </Text>
                                {selectedTrainingModes.some(
                                    m => m.id === mode.id,
                                ) ? (
                                    <View style={styles.tickIconContainer}>
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
                        </View>
                    ))}
                    <TouchableOpacity
                        onPress={() => {
                            toggleTrainingModeDropdown();
                        }}
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
    );

    return (
        <View style={{flex: 1, backgroundColor: '#F7F7F7', width: SIZES.width}}>
            <View style={{height: SIZE(60)}}>
                {!fromMain ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setEdit && setEdit(false);
                            setAddService && setAddService(false);
                            setModalVisible(false);
                            setModalScreens && setModalScreens('AddProfile');
                            clearAll && clearAll();
                            setRefreshing && setRefreshing(prev => !prev);
                        }}
                        hitSlop={SIZE(5)}
                        style={{
                            position: 'absolute',
                            top: SIZE(20),
                            right: SIZE(20),
                        }}>
                        <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                    </TouchableOpacity>
                ) : null}
            </View>
            <KeyboardAwareScrollView
                scrollEnabled
                nestedScrollEnabled
                extraScrollHeight={SIZE(200)}
                bounces={false}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}>
                <TouchableWithoutFeedback onPress={handlePressOutside}>
                    <View style={styles.mainContainer}>
                        <View>
                            <DoubleColorHeading
                                firstTitle={edit ? 'Edit' : 'Add'}
                                secondTitle={'Service'}
                                isCenter={true}
                            />
                        </View>
                        <View style={{marginBottom: SIZE(24)}}>
                            <DescriptionHeading
                                text={
                                    edit
                                        ? 'Edit Your Service Details'
                                        : 'Enter Your Service Details'
                                }
                                isCenter={true}
                            />
                        </View>
                        <Text style={styles.headingText}>Services</Text>
                        <View style={styles.container}>
                            {renderTrainingModeDropdown()}
                            {errorMessage.selectedTrainingModes && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage.selectedTrainingModes}
                                </Text>
                            )}
                            <ScrollView
                                scrollEnabled
                                nestedScrollEnabled
                                bounces={false}
                                keyboardShouldPersistTaps={'handled'}
                                showsVerticalScrollIndicator={false}>
                                {selectedTrainingModes.map((item, index) => {
                                    const existingComponent = components[index];
                                    const componentErrorMessage =
                                        errorMessage[`component${index}`];
                                    if (existingComponent) {
                                        return (
                                            <TrainingModeComponent
                                                errorMessage={
                                                    errorMessage[index] || {}
                                                }
                                                key={index}
                                                existingComponent={
                                                    existingComponent
                                                }
                                                setComponents={setComponents}
                                                trainingMode={item}
                                                index={index}
                                                componentDropdownStates={
                                                    componentDropdownStates
                                                }
                                                setComponentDropdownStates={
                                                    setComponentDropdownStates
                                                }
                                                petTypes={petTypes}
                                                handlePetTypeSelect={
                                                    handlePetTypeSelect
                                                }
                                                handleHoursChange={
                                                    handleHoursChange
                                                }
                                                handleRemarksChange={
                                                    handleRemarksChange
                                                }
                                                selectedTrainingModes={
                                                    selectedTrainingModes
                                                }
                                                isPetTypeDropdownOpen={
                                                    petTypeDropdownStates[
                                                        index
                                                    ] || false
                                                }
                                                setIsPetTypeDropdownOpen={isOpen => {
                                                    setPetTypeDropdownStates(
                                                        prevStates => {
                                                            const newStates = [
                                                                ...prevStates,
                                                            ];
                                                            newStates[index] =
                                                                isOpen;
                                                            return newStates;
                                                        },
                                                    );
                                                }}
                                            />
                                        );
                                    } else {
                                        const newComponent = {
                                            trainingMode: item,
                                            selectedPetTypes: [],
                                            remarks: '',
                                            no_of_hours: '',
                                        };
                                        setComponents([
                                            ...components,
                                            newComponent,
                                        ]);
                                        setComponentDropdownStates(
                                            prevStates => [
                                                ...prevStates,
                                                false,
                                            ],
                                        );
                                        return (
                                            <TrainingModeComponent
                                                errorMessage={
                                                    errorMessage[index] || {}
                                                }
                                                key={index}
                                                existingComponent={newComponent}
                                                setComponents={setComponents}
                                                trainingMode={item}
                                                index={index}
                                                componentDropdownStates={
                                                    componentDropdownStates
                                                }
                                                setComponentDropdownStates={
                                                    setComponentDropdownStates
                                                }
                                                petTypes={petTypes}
                                                handlePetTypeSelect={
                                                    handlePetTypeSelect
                                                }
                                                handleHoursChange={
                                                    handleHoursChange
                                                }
                                                handleRemarksChange={
                                                    handleRemarksChange
                                                }
                                                selectedTrainingModes={
                                                    selectedTrainingModes
                                                }
                                                isPetTypeDropdownOpen={
                                                    petTypeDropdownStates[
                                                        index
                                                    ] || false
                                                }
                                                setIsPetTypeDropdownOpen={isOpen => {
                                                    setPetTypeDropdownStates(
                                                        prevStates => {
                                                            const newStates = [
                                                                ...prevStates,
                                                            ];
                                                            newStates[index] =
                                                                isOpen;
                                                            return newStates;
                                                        },
                                                    );
                                                }}
                                            />
                                        );
                                    }
                                })}
                            </ScrollView>
                            {errorMessage.selectedPetTypes && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage.selectedPetTypes}
                                </Text>
                            )}
                            {errorMessage.no_of_hours && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage.no_of_hours}
                                </Text>
                            )}
                            {errorMessage.remarks && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage.remarks}
                                </Text>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
            <View style={{padding: SIZE(32)}}>
                <TwoButton
                    buttonLoader={submitLoading}
                    leftText={'Cancel'}
                    onPressL={() => {
                        if (fromMain) {
                            clearAll && clearAll();
                            setModalScreens('addPet');
                        } else {
                            clearAll && clearAll();
                            setEdit && setEdit(false);
                            setAddService && setAddService(false);
                            setModalVisible(false);
                            setModalScreens && setModalScreens('AddProfile');
                            setRefreshing && setRefreshing(prev => !prev);
                        }
                    }}
                    rightText={addService ? 'Submit' : 'Next'}
                    onPressR={() => {
                        if (validateFields() && !addService) {
                            setModalScreens('AddAvailableDates');
                        } else if (validateFields() && addService) {
                            submitService();
                        }
                    }}
                />
            </View>
        </View>
    );
};

export default AddService;

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        paddingBottom: SIZE(30),
    },
    mainContainer: {
        paddingHorizontal: SIZE(32),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    headingText: {
        marginBottom: SIZE(8),
        fontFamily: FONTS.semiBold,
        fontWeight: '500',
        color: '#686868',
        fontSize: SIZE(16),
    },
    container: {
        // flex: 1,
        // padding: 16,
        gap: SIZE(16),
    },
    dropdown: {
        // marginBottom: SIZE(24),
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
    },
    componentHeading: {
        fontFamily: FONTS.semiBold,
        fontWeight: '500',
        color: '#686868',
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
});
