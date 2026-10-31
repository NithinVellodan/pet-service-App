import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import TopArrow from '../../../assets/icons/booking-details/arrow-top';
import BottomArrow from '../../../assets/icons/booking-details/bottom-arrow';

const PriceDetails = ({
    selectedItems1,
    Food_Price,
    price_per_day,
    numberOfDays,
    selected,
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const addOn = (a, b, tax, total) => {
        let result = a * price_per_day * numberOfDays;

        if (total) {
            result +=
                selected == 2
                    ? Food_Price * numberOfDays * selectedItems1.number_of_pets
                    : 0;
            const taxAmount = result * 0.05;
            const total = result + taxAmount;
            return total;
        }
        if (tax) {
            result +=
                selected == 2
                    ? Food_Price * numberOfDays * selectedItems1.number_of_pets
                    : 0; // Add food price
            const taxAmount = result * 0.05; // Calculate 5% tax
            return taxAmount;
        }

        return result;
    };

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: '#E2E2E2',
                padding: SIZE(13),
                borderRadius: SIZE(8),
                marginBottom: SIZE(20),
                backgroundColor: '#FFFFFF',
                zIndex: 0,
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => [setIsVisible(!isVisible)]}
                style={[
                    styles.topBox,
                    {
                        borderBottomWidth: isVisible ? 1 : 0,
                        paddingBottom: !isVisible ? 0 : SIZE(15),
                    },
                ]}>
                <Text style={[styles.subContent2, {color: '#00171F'}]}>
                    Price Details
                </Text>
                <View>{isVisible ? <TopArrow /> : <BottomArrow />}</View>
            </TouchableOpacity>
            {isVisible && (
                <View>
                    <View
                        style={{paddingTop: SIZE(15), paddingBottom: SIZE(10)}}>
                        <View style={[styles.contentBox, {marginBottom: 10}]}>
                            <Text
                                style={
                                    styles.priceDetailText
                                }>{`(No of pets) ${selectedItems1.number_of_pets} x (Price) ${price_per_day} x ${numberOfDays} Days`}</Text>
                            <Text style={styles.petName}>
                                {addOn(
                                    selectedItems1.number_of_pets,
                                    price_per_day,
                                ).toFixed(2)}
                            </Text>
                        </View>
                        {selected === 2 && (
                            <View
                                style={[styles.contentBox, {marginBottom: 10}]}>
                                <Text style={styles.priceDetailText}>
                                    Food (Addon)
                                </Text>
                                <Text style={styles.petName}>
                                    {Food_Price *
                                        numberOfDays *
                                        selectedItems1.number_of_pets}
                                </Text>
                            </View>
                        )}
                        <View style={[styles.contentBox]}>
                            <Text style={styles.priceDetailText}>
                                Tax (5 % VAT)
                            </Text>
                            <Text style={styles.petName}>
                                {addOn(
                                    selectedItems1.number_of_pets,
                                    price_per_day,
                                    (tax = 5),
                                ).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.topBox,
                            {
                                borderBottomWidth: 0,
                                paddingTop: SIZE(15),
                                paddingBottom: SIZE(0),
                                borderTopWidth: 1,
                            },
                        ]}>
                        <Text style={styles.subContent2}>Total</Text>
                        <Text style={styles.subContent2}>
                            AED{' '}
                            {addOn(
                                selectedItems1.number_of_pets,
                                price_per_day,
                                (tax = 5),
                                (total = true),
                            ).toFixed(2)}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export const PriceDetailsForTrainerSection = ({
    selectedItems,
    price_per_hour,
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const formatHours = hours => {
        const fullHours = Math.floor(hours);
        const minutes = Math.round((hours - fullHours) * 60);
        return `${fullHours}hr ${minutes > 0 ? `${minutes}m` : ''}`;
    };

    const calculateTotal = items => {
        return items?.reduce((total, item) => {
            const itemTotal = price_per_hour * item.no_of_hours;
            return total + itemTotal;
        }, 0);
    };

    const total = calculateTotal(selectedItems);
    const vat = total * 0.05;
    const totalWithVAT = total + vat;

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: '#E2E2E2',
                padding: SIZE(13),
                borderRadius: SIZE(8),
                marginBottom: SIZE(20),
                backgroundColor: '#FFFFFF',
                zIndex: 0,
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => [setIsVisible(!isVisible)]}
                style={[
                    styles.topBox,
                    {
                        borderBottomWidth: isVisible ? 1 : 0,
                        paddingBottom: !isVisible ? 0 : SIZE(15),
                    },
                ]}>
                <Text style={[styles.subContent2, {color: '#00171F'}]}>
                    Price Details
                </Text>
                <View>{isVisible ? <TopArrow /> : <BottomArrow />}</View>
            </TouchableOpacity>
            {isVisible && (
                <View>
                    <View
                        style={{paddingTop: SIZE(15), paddingBottom: SIZE(10)}}>
                        {selectedItems?.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.contentBox2,
                                    {marginBottom: 10},
                                ]}>
                                <View
                                    style={{
                                        width: SIZE(250),
                                    }}>
                                    <Text style={styles.priceDetailText}>
                                        Obedience Training
                                    </Text>
                                    <Text style={styles.priceDetailText}>
                                        AED {price_per_hour} x{' '}
                                        {formatHours(item.no_of_hours)}
                                    </Text>
                                </View>
                                <Text style={styles.petName}>
                                    {price_per_hour * item.no_of_hours}
                                </Text>
                            </View>
                        ))}
                        {/* <View style={[styles.contentBox2, {marginBottom: 10}]}>
                            <View
                                style={{
                                    width: SIZE(250),
                                }}>
                                <Text style={styles.priceDetailText}>
                                    Behavior Modification
                                </Text>
                                <Text style={styles.priceDetailText}>
                                    AED 100 x 2h
                                </Text>
                            </View>
                            <Text style={styles.petName}>400 </Text>
                        </View> */}
                        <View style={[styles.contentBox2]}>
                            <Text style={styles.priceDetailText}>
                                Tax (5 % VAT)
                            </Text>
                            <Text style={styles.petName}>
                                {' '}
                                {vat.toFixed(2)}{' '}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.topBox,
                            {
                                borderBottomWidth: 0,
                                paddingTop: SIZE(15),
                                paddingBottom: SIZE(0),
                                borderTopWidth: 1,
                            },
                        ]}>
                        <Text style={styles.subContent2}>Total</Text>
                        <Text style={styles.subContent2}>
                            AED {totalWithVAT}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export const BookingDetailsForTrainerSection = ({selectedItems}) => {
    const [isVisible, setIsVisible] = useState(true);

    const data = [
        {
            id: 1,
            name: 'Obedient Training',
        },
        {
            id: 2,
            name: 'Agility Training',
        },
        {
            id: 3,
            name: 'Behavior Modification',
        },
    ];

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: '#E2E2E2',
                padding: SIZE(13),
                borderRadius: SIZE(8),
                marginBottom: SIZE(20),
                backgroundColor: '#FFFFFF',
                zIndex: 0,
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => [setIsVisible(!isVisible)]}
                style={[
                    styles.topBox,
                    {
                        borderBottomWidth: isVisible ? 1 : 0,
                        paddingBottom: !isVisible ? 0 : SIZE(15),
                        marginBottom: isVisible ? SIZE(10) : 0,
                    },
                ]}>
                <Text style={[styles.subContent2, {color: '#00171F'}]}>
                    Booking Details
                </Text>
                <View>{isVisible ? <TopArrow /> : <BottomArrow />}</View>
            </TouchableOpacity>
            {isVisible &&
                selectedItems?.map((item, index) => (
                    <View
                        key={item.id}
                        style={[
                            styles.contentBox,
                            {
                                marginTop: 10,
                                borderWidth: 1,
                                borderRadius: SIZE(8),
                                padding: SIZE(10),
                                // backgroundColor: '#EAF7FF',
                                borderColor: '#EAF7FF',
                            },
                        ]}>
                        <View>
                            <Text style={styles.serviceHeader}>
                                {item?.title}
                            </Text>
                            <Text style={styles.priceDetailText}>
                                {item?.remarks}
                            </Text>
                        </View>
                    </View>
                ))}
        </View>
    );
};

export default PriceDetails;

export const PriceDetailsPet = ({numberOfDays, pet_breed, price_per_day}) => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: '#E2E2E2',
                padding: SIZE(13),
                borderRadius: SIZE(8),
                marginBottom: SIZE(20),
                backgroundColor: '#FFFFFF',
                zIndex: 0,
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => [setIsVisible(!isVisible)]}
                style={[
                    styles.topBox,
                    {
                        borderBottomWidth: isVisible ? 1 : 0,
                        paddingBottom: !isVisible ? 0 : SIZE(15),
                    },
                ]}>
                <Text style={[styles.subContent2, {color: '#00171F'}]}>
                    Price Details
                </Text>
                <View>{isVisible ? <TopArrow /> : <BottomArrow />}</View>
            </TouchableOpacity>
            {isVisible && (
                <View>
                    <View
                        style={{paddingTop: SIZE(15), paddingBottom: SIZE(10)}}>
                        <View style={[styles.contentBox, {marginBottom: 10}]}>
                            <Text
                                style={
                                    styles.priceDetailText
                                }>{`${pet_breed} x 1 x ${numberOfDays} Days`}</Text>
                            <Text style={styles.petName}>
                                {' '}
                                AED {(numberOfDays * price_per_day).toFixed(2)}
                            </Text>
                        </View>
                        <View style={[styles.contentBox]}>
                            <Text style={styles.priceDetailText}>
                                Tax (5 % VAT)
                            </Text>
                            <Text style={styles.petName}>
                                AED{' '}
                                {(numberOfDays * price_per_day * 0.05).toFixed(
                                    2,
                                )}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.topBox,
                            {
                                borderBottomWidth: 0,
                                paddingTop: SIZE(15),
                                paddingBottom: SIZE(0),
                                borderTopWidth: 1,
                            },
                        ]}>
                        <Text style={styles.subContent2}>Total</Text>
                        <Text style={styles.subContent2}>
                            AED{' '}
                            {(
                                numberOfDays * price_per_day +
                                numberOfDays * price_per_day * 0.05
                            ).toFixed(2)}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    subContent: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        marginBottom: SIZE(10),
    },
    subContent2: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
    },
    contentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentBox2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    petName: {
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
        fontWeight: '500',
    },
    topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBlockColor: '#E2E2E2',
    },
    priceDetailText: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '400',
        color: '#969696',
    },
    serviceHeader: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(17),
        fontWeight: '400',
        color: '#242424',
    },
});
