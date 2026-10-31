import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
const Characteristics = ({
    petCharacteristics,
    selectedPets,
    setSelectedPets,
    errorMessage,
    characteristics,
    setErrorMessage,
}) => {
    const togglePetSelection = petId => {
        let updatedSelectedPets = [...selectedPets];

        if (updatedSelectedPets.includes(petId)) {
            updatedSelectedPets = updatedSelectedPets.filter(
                id => id !== petId,
            );
        } else {
            updatedSelectedPets.push(petId);
        }
        setSelectedPets(updatedSelectedPets);
    };

    useEffect(() => {
        if (characteristics) {
            const initialSelectedPetIds = characteristics.map(item => item.id);
            setSelectedPets(initialSelectedPetIds);
        }
    }, [characteristics]);

    return (
        <View style={styles.itemContainer}>
            <View style={styles.inputBoxSub}>
                <Text allowFontScaling={false} style={styles.labelText}>
                    Characteristics
                </Text>
            </View>
            <View style={styles.itemBottom}>
                {petCharacteristics.map(item => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                togglePetSelection(item.id);
                                setErrorMessage(prev => ({
                                    ...prev,
                                    characteristics_is: false,
                                }));
                            }}
                            activeOpacity={0.8}
                            key={item.id}
                            style={[
                                styles.itemSub,
                                {
                                    borderColor: selectedPets.includes(item.id)
                                        ? '#98C1D9'
                                        : '#E2E2E2',
                                    backgroundColor: selectedPets.includes(
                                        item.id,
                                    )
                                        ? '#EAF7FF'
                                        : '#FFF',
                                },
                            ]}>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.itemSubText,
                                    {
                                        color: '#242424',
                                    },
                                ]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            {errorMessage.characteristics_is == true && (
                <Text style={styles.errorMessage}>
                    Please select at least one Characteristics
                </Text>
            )}
        </View>
    );
};

export default Characteristics;

const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: SIZE(8),
        backgroundColor: '#F7F7F7',
        marginBottom: SIZE(16),
        zIndex: -10,
    },
    inputBoxSub: {
        marginTop: SIZE(20),
        marginBottom: SIZE(10),
    },
    labelText: {
        fontFamily: FONTS.medium,
        fontSize: SIZE(16),
        color: '#686868',
        marginBottom: SIZE(8),
    },
    itemBottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SIZES.width * 0.76,
    },
    itemSub: {
        marginBottom: SIZE(16),
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
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});
