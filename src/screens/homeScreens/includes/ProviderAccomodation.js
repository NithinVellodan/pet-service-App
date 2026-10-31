import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import Info from '../../../assets/icons/infocircle.svg';
import ModalScreen from '../../Profile-related/ModalScreen';
import CloseIconLight from '../../../assets/icons/close-icon-blue.svg';
import ProviderBreedAdd from './ProviderBreedAdd';

//images and logos

const ProviderAccomodation = ({
    selectedCategories,
    setTempId,
    setIsShow,
    setTempRemarks,
    setPetIndex,
    tempId,
    addPBreed,
    setSelectedCategoriesAddModal,
    selectedCategoriesAddModal,
    breedList,
}) => {
    const [timeoutId, setTimeoutId] = useState(null);
    const [breedModalVisible, setBreedModalVisible] = useState(false);

    useEffect(() => {
        const index = selectedCategories?.findIndex(pet => pet.id === tempId);
        setPetIndex(index);
    }, [selectedCategories, tempId]);

    const handlePress = itemId => {
        clearTimeout(timeoutId);
        setIsShow(itemId);
        const newTimeoutId = setTimeout(() => {
            setIsShow(null);
        }, 1000);
        setTimeoutId(newTimeoutId);
    };

    return (
        <>
            <View style={styles.accommodation}>
                <View style={styles.accommodationHead}>
                    <Text
                        allowFontScaling={false}
                        style={styles.accommodationText}>
                        Available Accommodation
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setBreedModalVisible(true);
                        }}
                        activeOpacity={0.8}>
                        <Text allowFontScaling={false} style={styles.breedText}>
                            + Add Breed
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.accommodationTable}>
                    <View style={styles.tableHead}>
                        <Text
                            allowFontScaling={false}
                            style={[styles.tableHeadText, {width: '20%'}]}>
                            Type
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.tableHeadText,
                                {width: '25%', textAlign: 'center'},
                            ]}>
                            No of Pets
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={styles.tableHeadText}>
                            Price
                        </Text>
                    </View>
                    {selectedCategories.map((item, index) => (
                        <View key={index} style={{zIndex: -1000}}>
                            <View
                                // key={index}
                                style={[
                                    styles.accommodationList,
                                    {
                                        backgroundColor:
                                            index % 2 === 0
                                                ? '#FFF'
                                                : '#F7F7F7',
                                    },
                                ]}>
                                <Text
                                    allowFontScaling={false}
                                    style={[styles.listText, {width: '20%'}]}>
                                    {item.name}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.listText,
                                        {width: '25%', textAlign: 'center'},
                                    ]}>
                                    {item.no_of_pets}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={[styles.listText, {width: '40%'}]}>
                                    AED {item.price_per_day}
                                </Text>
                                {item?.remarks ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            handlePress(item.id);
                                            setTempId(item.id);
                                            setTempRemarks(item.remarks);
                                        }}
                                        activeOpacity={0.8}>
                                        <Info
                                            width={SIZE(20)}
                                            height={SIZE(20)}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <></>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
                <ModalScreen
                    isVisible={breedModalVisible}
                    setVisible={setBreedModalVisible}
                    setSelectedCategoriesAddModal={
                        setSelectedCategoriesAddModal
                    }
                    inner={
                        <View style={styles.MainContainer}>
                            <TouchableOpacity
                                style={styles.closeIcon}
                                onPress={() => {
                                    setBreedModalVisible(false);
                                    setSelectedCategoriesAddModal([]);
                                }}>
                                <CloseIconLight
                                    width={SIZE(14)}
                                    height={SIZE(14)}
                                />
                            </TouchableOpacity>
                            <ProviderBreedAdd
                                addPBreed={addPBreed}
                                size={true}
                                setBreedModalVisible={setBreedModalVisible}
                                selectedCategories={selectedCategoriesAddModal}
                                setSelectedCategories={
                                    setSelectedCategoriesAddModal
                                }
                                breedList={breedList}
                            />
                        </View>
                    }
                />
            </View>
        </>
    );
};

export default ProviderAccomodation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: SIZE(16),
    },
    mainContainer: {
        paddingHorizontal: SIZE(16),
        flex: 1,
    },
    accommodation: {
        marginVertical: SIZE(36),
    },
    accommodationHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(21),
        alignItems: 'center',
    },
    accommodationText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(24),
    },
    breedText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(24),
        letterSpacing: 0.5,
    },
    accommodationTable: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 10,
        width: '100%',
        overflow: 'hidden',
    },
    tableHead: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
    },
    tableHeadText: {
        marginRight: SIZE(12),
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        lineHeight: SIZE(17),
        fontWeight: '600',
    },
    accommodationList: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
    },
    listText: {
        justifyContent: 'center',
        marginRight: SIZE(12),
        fontWeight: '400',
        fontSize: SIZE(14),
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
    },

    closeIcon: {
        position: 'absolute',
        top: SIZE(25),
        right: SIZE(20),
        zIndex: 100,
    },
    MainContainer: {
        paddingTop: SIZE(40),
        // flex: 1,
    },
});
