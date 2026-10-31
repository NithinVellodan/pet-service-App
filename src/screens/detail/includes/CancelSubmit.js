import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React from 'react';

// theme
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

export default function CancelSubmit({
    selectedCategories,
    selectedFacilities,
    isChecked2,
    setErrorMessage,
    errorMessage,
    setDetailScreens,
    handlePressSubmit,
    fromList,
    fromSingle,
    setEditModalVisible,
    setModalContent,
    setBreedModalVisible,
    size,
    clearAll,
    submitLoading,
    setSelectedCategories,
}) {
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                disabled={submitLoading}
                onPress={() => {
                    if (fromList === true) {
                        setEditModalVisible(false);
                        setModalContent('PlaceDetail');
                        clearAll();
                    } else if (fromSingle === true) {
                        setEditModalVisible(false);
                        setModalContent('PlaceDetail');
                    } else if (size === true) {
                        setBreedModalVisible(false);
                    } else {
                        setDetailScreens('addPet');
                    }
                }}
                style={styles.skipContainer}>
                <Text allowFontScaling={false} style={styles.skipText}>
                    Cancel
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                disabled={submitLoading}
                onPress={() => {
                    if (
                        isChecked2 &&
                        selectedCategories.length > 0 &&
                        selectedFacilities.length > 0
                        //  &&
                        // selectedFacilities.every(facility => facility.image)
                    ) {
                        let is_details_screen = true;
                        const errorData = selectedCategories.map(item => {
                            let updatedItem = {...item};

                            if (
                                item.price_per_day === undefined ||
                                item.price_per_day === null ||
                                item.price_per_day === ''
                            ) {
                                is_details_screen = false;
                                updatedItem.per_day_error =
                                    'Enter Price per day';
                            } else {
                                updatedItem.per_day_error = '';
                            }

                            if (
                                item.food_available === true &&
                                (item.food_price === '0' ||
                                    item.food_price === '0.00' ||
                                    item.food_price === '' ||
                                    item.food_price === null)
                            ) {
                                is_details_screen = false;
                                updatedItem.food_amount_error =
                                    'Enter Food Amount';
                            } else {
                                updatedItem.food_amount_error = '';
                            }

                            return updatedItem;
                        });

                        setSelectedCategories(errorData);
                        if (is_details_screen) {
                            handlePressSubmit();
                        }
                    } else {
                        setErrorMessage({
                            ...errorMessage,
                            petCategory:
                                selectedCategories &&
                                selectedCategories.length === 0 &&
                                'Please select at least one Pet category',
                            pets:
                                selectedCategories &&
                                selectedCategories.length === 0 &&
                                'Please select at least one Pet',
                            facilities:
                                selectedFacilities.length === 0
                                    ? 'Please select at least one Facility'
                                    : '',
                            isChecked2:
                                !isChecked2 &&
                                'Accept Terms & Conditions is required',
                        });
                    }
                }}
                style={styles.nextContainer}>
                {submitLoading ? (
                    <ActivityIndicator size={'small'} color={'#fff'} />
                ) : (
                    <Text allowFontScaling={false} style={styles.nextText}>
                        Submit
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(50),
    },
    uploadText: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#003459',
    },
    skipContainer: {
        backgroundColor: '#f7f7f7',
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        width: SIZE(174),
    },
    skipText: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
    nextContainer: {
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        width: SIZE(174),
        backgroundColor: '#003459',
    },
    nextText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
});
