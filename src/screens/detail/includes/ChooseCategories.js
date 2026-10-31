import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

// theme
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import ArrowDown from '../../../assets/icons/arrow-down.svg';
import Arrow from '../../../assets/icons/arrow-up.svg';
import {ApiGeneral, ApiGeneralBreeds} from '../../common/ApiGeneral';

export const MedicalCondition = ({
    errorMessage,
    medicalCondition,
    setMedicalCondition,
    setErrorMessage,
    medicalGroup,
}) => {
    const [medicalVisible, setMedicalVisible] = useState(false);
    const data = [
        {value: '10', label: 'Test 1'},
        {value: '20', label: 'Test 2'},
    ];

    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <View style={styles.inputBoxSub}>
                    <Text allowFontScaling={false} style={styles.labelText}>
                        Medical Condition
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setMedicalVisible(!medicalVisible);
                    }}>
                    <View
                        style={[
                            styles.petCategory1,
                            {
                                borderBottomLeftRadius: medicalVisible
                                    ? 0
                                    : SIZE(8),
                                borderBottomRightRadius: medicalVisible
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
                            {medicalCondition?.title || 'Choose'}
                        </Text>
                        <View
                            style={{
                                width: SIZE(24),
                                height: SIZE(24),
                            }}>
                            {!medicalVisible ? (
                                <ArrowDown width="100%" height="100%" />
                            ) : (
                                <Arrow width="100%" height="100%" />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                {medicalVisible && (
                    <View style={styles.visibleCategory}>
                        <FlatList
                            bounces={false}
                            data={medicalGroup}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setMedicalCondition(item);
                                        setMedicalVisible(!medicalVisible);
                                        setErrorMessage &&
                                            setErrorMessage(prev => ({
                                                ...prev,
                                                medical_is: false,
                                            }));
                                    }}>
                                    <Text style={styles.visibleText}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
                {errorMessage.medical_is == true && (
                    <Text style={styles.errorMessage}>
                        Please choose medical condition
                    </Text>
                )}
            </View>
        </View>
    );
};

export const AgeSection = ({
    errorMessage,
    ageValue,
    setAgeValue,
    setErrorMessage,
    ageGroup,
    ageVisible,
    setAgeVisible,
}) => {
    return (
        <View style={[styles.container]}>
            <View style={{}}>
                <View style={styles.inputBox}>
                    <View style={styles.inputBoxSub}>
                        <Text allowFontScaling={false} style={styles.labelText}>
                            Age
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setAgeVisible(!ageVisible);
                    }}>
                    <View
                        style={[
                            styles.petCategory1,
                            {
                                borderBottomLeftRadius: ageVisible
                                    ? 0
                                    : SIZE(8),
                                borderBottomRightRadius: ageVisible
                                    ? 0
                                    : SIZE(8),
                            },
                        ]}>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZE(14),
                                color: '#242424',
                            }}>
                            {ageValue?.title || 'Choose'}
                        </Text>
                        <View
                            style={{
                                width: SIZE(24),
                                height: SIZE(24),
                            }}>
                            {!ageVisible ? (
                                <ArrowDown width={SIZE(20)} height={SIZE(20)} />
                            ) : (
                                <Arrow width={SIZE(20)} height={SIZE(20)} />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                {ageVisible && (
                    <View style={[styles.visibleCategory, {}]}>
                        <FlatList
                            bounces={false}
                            data={ageGroup}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setAgeValue(item);
                                        setAgeVisible(!ageVisible);
                                        setErrorMessage &&
                                            setErrorMessage(prev => ({
                                                ...prev,
                                                age_is: false,
                                            }));
                                    }}>
                                    <Text style={styles.visibleText}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
                {errorMessage.age_is == true && (
                    <Text style={styles.errorMessage}>
                        Please select age type
                    </Text>
                )}
            </View>
        </View>
    );
};

const ChooseCategories = ({
    errorMessage,
    categoryValue,
    setCategoryValue,
    setBreedValue,
    breedValue,
    page,
    petType,
    setSection,
    arrival,
    setBreedType,
    setErrorMessage,
}) => {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [breedVisible, setBreedVisible] = useState(false);
    const [categoryValue2, setCategoryValue2] = useState([]);
    const [breedPk, setBreedPk] = useState([]);
    const [petCategory, setPetCategory] = useState([]);
    ApiGeneral(setPetCategory);
    ApiGeneralBreeds(categoryValue2.id, setBreedPk);

    useEffect(() => {
        setBreedValue(null);
    }, [categoryValue]);

    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <View style={styles.inputBoxSub}>
                    <Text allowFontScaling={false} style={styles.labelText}>
                        {page == 'customer_pet_details'
                            ? 'Pet Type'
                            : 'Pet Category'}
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setCategoryVisible(!categoryVisible);
                    }}>
                    <View
                        style={[
                            styles.petCategory1,
                            {
                                borderBottomLeftRadius: categoryVisible
                                    ? 0
                                    : SIZE(8),
                                borderBottomRightRadius: categoryVisible
                                    ? 0
                                    : SIZE(8),
                            },
                        ]}>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZE(14),
                                color: '#242424',
                            }}>
                            {categoryValue || 'Choose'}
                        </Text>
                        <View
                            style={{
                                width: SIZE(24),
                                height: SIZE(24),
                            }}>
                            {!categoryVisible ? (
                                <ArrowDown width={SIZE(20)} height={SIZE(20)} />
                            ) : (
                                <Arrow width={SIZE(20)} height={SIZE(20)} />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                {categoryVisible && (
                    <View style={styles.visibleCategory}>
                        <FlatList
                            bounces={false}
                            data={petType}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSection(item.id);
                                        setCategoryValue(item.name);
                                        setCategoryVisible(!categoryVisible);
                                        setErrorMessage &&
                                            setErrorMessage(prev => ({
                                                ...prev,
                                                is_Category: false,
                                            }));
                                    }}>
                                    <Text style={styles.visibleText}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
                {errorMessage.is_Category == true && (
                    <Text style={styles.errorMessage}>
                        Please select pet category
                    </Text>
                )}
            </View>
            <View style={styles.inputBox}>
                <View style={styles.inputBoxSub}>
                    <Text allowFontScaling={false} style={styles.labelText}>
                        {page == 'customer_pet_details'
                            ? 'Pet Breed'
                            : 'Breed Type'}
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setBreedVisible(!breedVisible);
                    }}>
                    <View
                        style={[
                            styles.petCategory1,
                            {
                                borderBottomLeftRadius: breedVisible
                                    ? 0
                                    : SIZE(8),
                                borderBottomRightRadius: breedVisible
                                    ? 0
                                    : SIZE(8),
                            },
                        ]}>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZE(14),
                                color: '#242424',
                            }}>
                            {breedValue || 'Choose'}
                        </Text>
                        <View
                            style={{
                                width: SIZE(24),
                                height: SIZE(24),
                            }}>
                            {!breedVisible ? (
                                <ArrowDown width={SIZE(20)} height={SIZE(20)} />
                            ) : (
                                <Arrow width={SIZE(20)} height={SIZE(20)} />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                {breedVisible && (
                    <View style={styles.visibleCategory}>
                        <FlatList
                            bounces={false}
                            data={arrival}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setBreedType(item.id);
                                        setBreedValue(item.name);
                                        setBreedVisible(!breedVisible);
                                        setErrorMessage &&
                                            setErrorMessage(prev => ({
                                                ...prev,
                                                is_BreedValue: false,
                                            }));
                                    }}>
                                    <Text style={styles.visibleText}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
                {errorMessage.is_BreedValue == true && (
                    <Text style={styles.errorMessage}>
                        Please select breed type
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    labelText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.medium,
        marginBottom: SIZE(10),
        fontSize: SIZE(16),
    },

    inputBoxSub: {
        marginTop: SIZE(24),
    },
    skipContainer: {
        backgroundColor: '#fff',
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        width: SIZE(174),
    },

    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    petCategory1: {
        padding: SIZE(13),
        borderWidth: 1,
        borderRadius: SIZE(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#D3D3D3',
        backgroundColor: '#F7F7F7',
    },
    visibleCategory: {
        borderWidth: SIZE(1),
        borderBottomLeftRadius: SIZE(8),
        borderBottomRightRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        borderColor: '#D3D3D3',
        width: '100%',
        zIndex: 1,
    },
    visibleText: {
        fontSize: SIZE(14),
        padding: SIZE(10),
        fontFamily: FONTS.medium,
        color: '#242424',
    },
});

export default ChooseCategories;
