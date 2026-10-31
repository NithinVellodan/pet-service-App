import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';

//svg
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';

//coṇstant
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import PetTypes from '../../../filter/includes/PetTypes';

const FilterPageEcom = ({close}) => {
    const [selectedPet, setSelectedPet] = useState('');
    //
    const petData = [
        {
            id: 1,
            name: 'Dog',
        },
        {
            id: 2,
            name: 'Cat',
        },
        {
            id: 3,
            name: 'Rabbit',
        },
        {
            id: 4,
            name: 'Birds',
        },
        {
            id: 5,
            name: 'Horse',
        },
        {
            id: 6,
            name: 'Hamsters',
        },
        {
            id: 7,
            name: 'Ferret',
        },
    ];
    const flavorData = [
        {
            id: 1,
            name: 'Tuna',
        },
        {
            id: 2,
            name: 'Sea Food',
        },
        {
            id: 3,
            name: 'Milk',
        },
        {
            id: 4,
            name: 'Meat',
        },
        {
            id: 5,
            name: 'Muttton',
        },
        {
            id: 6,
            name: 'Egg',
        },
        {
            id: 7,
            name: 'Vegetables',
        },
    ];
    const foodType = [
        {
            id: 1,
            name: 'Dry',
        },
        {
            id: 2,
            name: 'Wet',
        },
    ];

    //useNavigation
    const navigation = useNavigation();
    return (
        <ScrollView contentContainerStyle={styles.container} bounces={false}>
            <TouchableOpacity
                onPress={() => {
                    close(false);
                }}
                hitSlop={SIZE(5)}
                style={{
                    position: 'absolute',
                    top: SIZE(20),
                    right: SIZE(20),
                }}>
                <CloseIcon width={SIZE(15)} height={SIZE(15)} />
            </TouchableOpacity>
            <View>
                <View style={styles.mainHeadingContainer}>
                    <Text style={styles.mainHeading}>Filters</Text>
                </View>
                <View style={styles.petDataContainer}>
                    <PetTypes
                        selectedPet={selectedPet}
                        setSelectedPet={setSelectedPet}
                        name={'Pet Type'}
                        petData={petData}
                    />
                </View>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            close(false);
                        }}
                        activeOpacity={0.8}
                        style={styles.leftButton}>
                        <Text style={styles.leftText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            close(false);
                        }}
                        activeOpacity={0.8}
                        style={styles.rightButton}>
                        <Text style={styles.rightText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default FilterPageEcom;

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        paddingTop: SIZE(56),
        paddingBottom: SIZE(30),
        paddingHorizontal: SIZE(32),
    },

    mainHeadingContainer: {
        borderBottomWidth: SIZE(2),
        paddingBottom: SIZE(16),
        borderBottomColor: '#E2E2E2',
    },
    mainHeading: {
        fontSize: SIZE(24),
        color: '#242424',
        fontFamily: FONTS.semiBold,
    },
    petDataContainer: {
        marginTop: SIZE(24),
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: SIZE(40),
    },
    leftButton: {
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(12),
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        width: SIZES.width * 0.4,
    },
    leftText: {
        color: '#000',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        letterSpacing: SIZE(0.5),
    },
    rightButton: {
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        alignItems: 'center',
        borderRadius: SIZE(8),
        backgroundColor: '#009FD3',
        width: SIZES.width * 0.4,
    },
    rightText: {
        color: '#FFF',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(40),
    },
    barContainer: {
        backgroundColor: '#009FD3',
        width: SIZE(70),
        height: SIZE(4),
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: SIZE(16),
        marginBottom: SIZE(22),
    },
});
