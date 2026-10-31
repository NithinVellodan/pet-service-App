import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

// theme
import {FONTS} from '../../../../theme/fonts';
import ArrowDown from '../../../../assets/icons/arrow-down.svg';
import Arrow from '../../../../assets/icons/arrow-up.svg';
import {SIZE} from '../../../../theme/theme';
import NormalForm from '../../../../components/forms/NormalForm';
import {ApiGeneral} from '../../../common/ApiGeneral';

const LostPetType = ({
    setErrorMessage,
    setSelectedPetType,
    selectedPetType,
}) => {
    const [ageVisible, setAgeVisible] = useState(false);
    const [petCategory, setPetCategory] = useState([]);

    ApiGeneral(setPetCategory);

    return (
        <View style={[styles.container]}>
            <View style={{}}>
                <View style={styles.inputBox}>
                    <View style={styles.inputBoxSub}>
                        <Text allowFontScaling={false} style={styles.labelText}>
                            Pet Type
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
                                opacity: 0.5,
                            }}>
                            {selectedPetType?.name || 'Choose'}
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
                            data={petCategory}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setAgeVisible(!ageVisible);
                                        setSelectedPetType(item);
                                        setErrorMessage(prevState => ({
                                            ...prevState,
                                            pet_type: false,
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
            </View>
        </View>
    );
};

export const LostPetGender = ({selectedGender, setSelectedGender}) => {
    const [genderVisible, setGenderVisible] = useState(false);

    const ageGroup = [
        {
            id: 1,
            gender: 'Male',
            value: 10,
        },
        {
            id: 2,
            gender: 'Female',
            value: 20,
        },
        {
            id: 2,
            gender: 'Not specified',
            value: 30,
        },
    ];
    return (
        <View style={[styles.container]}>
            <View style={{}}>
                <View style={styles.inputBox}>
                    <View style={styles.inputBoxSub}>
                        <Text allowFontScaling={false} style={styles.labelText}>
                            Gender
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setGenderVisible(!genderVisible);
                    }}>
                    <View
                        style={[
                            styles.petCategory1,
                            {
                                borderBottomLeftRadius: genderVisible
                                    ? 0
                                    : SIZE(8),
                                borderBottomRightRadius: genderVisible
                                    ? 0
                                    : SIZE(8),
                            },
                        ]}>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZE(14),
                                color: '#242424',
                                opacity: 0.5,
                            }}>
                            {selectedGender?.gender || 'Choose'}
                        </Text>
                        <View
                            style={{
                                width: SIZE(24),
                                height: SIZE(24),
                            }}>
                            {!genderVisible ? (
                                <ArrowDown width={SIZE(20)} height={SIZE(20)} />
                            ) : (
                                <Arrow width={SIZE(20)} height={SIZE(20)} />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                {genderVisible && (
                    <View style={[styles.visibleCategory, {}]}>
                        <FlatList
                            bounces={false}
                            data={ageGroup}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setGenderVisible(!genderVisible);
                                        setSelectedGender(item);
                                    }}>
                                    <Text style={styles.visibleText}>
                                        {item.gender}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export const EnterDescription = ({
    description,
    setDescription,
    setErrorMessage,
    header,
}) => {
    return (
        <View style={styles.container}>
            <NormalForm
                label={header ? header : 'Description'}
                type={'Text'}
                placeholder={'Enter'}
                multiline={true}
                numberOfLines={3}
                descriptionForm={true}
                description={description}
                setDescription={setDescription}
                marginTop={25}
            />
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

export default LostPetType;
