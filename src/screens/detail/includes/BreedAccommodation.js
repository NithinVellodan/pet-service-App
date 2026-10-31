import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import React from 'react';

import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//svg
import ArrowDown from '../../../assets/icons/arrow-down.svg';
import Arrow from '../../../assets/icons/arrow-up.svg';
import InfoCircle from '../../../assets/icons/info-circle.svg';
import ToolTip from '../../../assets/icons/tooltip.svg';
import TickIcon from '../../../assets/icons/tick-icon.svg';

export default function BreedAccommodation({
    selectedCategories,
    visibleStates,
    handleToggleVisibility,
    itemIsShowing,
    handlePressShowing,
    handleIncrement,
    handleDecrement,
    setErrorMessage,
    setSelectedCategories,
}) {
    return (
        <View style={{paddingTop: SIZE(24)}}>
            <View>
                <Text
                    allowFontScaling={false}
                    style={{
                        fontSize: SIZE(16),
                        color: '#686868',
                        fontFamily: FONTS.regular,
                    }}>
                    Breeds can Accommodate
                </Text>
            </View>
            <View>
                {selectedCategories.map((item, index) => (
                    <View key={item.id}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                borderWidth: SIZE(1),
                                borderColor: '#E2E2E2',
                                borderRadius: SIZE(8),
                                marginTop: SIZE(8),
                            }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    handleToggleVisibility(item.id);
                                }}
                                style={[
                                    styles.dropBoxTwo,
                                    visibleStates[item.id] &&
                                        styles.activeDropBoxTwo,
                                ]}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.ChooseBoxTwo}>
                                    {item.name}
                                </Text>

                                {visibleStates[item.id] ? (
                                    <Arrow />
                                ) : (
                                    <ArrowDown />
                                )}
                            </TouchableOpacity>

                            {visibleStates[item.id] && (
                                <View
                                    style={{
                                        borderColor: '#D3D3D3',
                                        marginTop: SIZE(10),
                                        padding: SIZE(16),
                                        borderBottomLeftRadius: SIZE(8),
                                        borderBottomRightRadius: SIZE(8),
                                        backgroundColor: '#fff',
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginVertical: SIZE(10),
                                        }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                color: '#242424',
                                                opacity: 0.5,
                                                fontFamily: FONTS.semiBold,
                                                fontSize: SIZE(14),
                                            }}>
                                            {item.name}:
                                        </Text>
                                        <View style={styles.container1}>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() =>
                                                    handleDecrement(item.id)
                                                }
                                                style={styles.button}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.buttonText2}>
                                                    -
                                                </Text>
                                            </TouchableOpacity>
                                            <View style={styles.ChooseBoxCount}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.countText}>
                                                    {item.no_of_pets}
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() =>
                                                    handleIncrement(item.id)
                                                }
                                                style={styles.button}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.buttonText2}>
                                                    +
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                            <View
                                                style={{
                                                    marginVertical: SIZE(8),
                                                }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={{
                                                        color: '#000',
                                                        fontSize: SIZE(12),
                                                        fontFamily:
                                                            FONTS.regular,
                                                    }}>
                                                    Price Per Day
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                // activeOpacity={0.8}
                                                hitSlop={8}
                                                style={{
                                                    width: SIZE(20),
                                                    height: SIZE(20),
                                                }}
                                                onPress={() => {
                                                    handlePressShowing(item.id);
                                                }}>
                                                <InfoCircle
                                                    width="100%"
                                                    height="100%"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            marginBottom: SIZE(16),
                                            padding: SIZE(8),
                                            backgroundColor: '#F7F7F7',
                                            borderRadius: SIZE(8),
                                            borderWidth: SIZE(1),
                                            borderColor: '#D3D3D3',
                                            height: SIZE(45),
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: FONTS.semiBold,
                                                fontWeight: '600',
                                                color: '#242424',
                                                fontSize: SIZE(12),
                                                lineHeight: SIZE(15),
                                                marginRight: SIZE(5),
                                            }}>
                                            AED
                                        </Text>
                                        <TextInput
                                            value={item.price_per_day}
                                            onChangeText={text => {
                                                const update_per_day =
                                                    selectedCategories.map(
                                                        filteritem => {
                                                            if (
                                                                filteritem.id ===
                                                                item.id
                                                            ) {
                                                                return {
                                                                    ...filteritem,
                                                                    price_per_day:
                                                                        text,
                                                                    per_day_error:
                                                                        '',
                                                                };
                                                            }
                                                            return filteritem;
                                                        },
                                                    );
                                                setSelectedCategories(
                                                    update_per_day,
                                                );
                                            }}
                                            maxLength={5}
                                            placeholder="Enter"
                                            placeholderTextColor={'#686868'}
                                            keyboardType="numeric"
                                            style={{
                                                fontSize: SIZE(12),
                                                fontFamily: FONTS.regular,
                                                color: '#000',
                                                height: SIZE(45),
                                                width: '100%',
                                            }}
                                        />
                                    </View>
                                    {item.per_day_error && (
                                        <Text style={styles.errorMessage}>
                                            {item.per_day_error}
                                        </Text>
                                    )}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    const update_per_day =
                                                        selectedCategories.map(
                                                            filteritem => {
                                                                if (
                                                                    filteritem.id ===
                                                                    item.id
                                                                ) {
                                                                    const food_available =
                                                                        !item.food_available;
                                                                    return {
                                                                        ...filteritem,
                                                                        food_available,
                                                                        food_price:
                                                                            food_available
                                                                                ? filteritem.food_price
                                                                                : '',
                                                                    };
                                                                }
                                                                return filteritem;
                                                            },
                                                        );
                                                    setSelectedCategories(
                                                        update_per_day,
                                                    );
                                                }}>
                                                <View
                                                    style={
                                                        styles.checkboxContainer
                                                    }>
                                                    <View
                                                        style={[
                                                            styles.checkbox,
                                                            item.food_available &&
                                                                styles.checked,
                                                        ]}>
                                                        <TickIcon
                                                            width={10}
                                                            height={10}
                                                        />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                marginRight: SIZE(16),
                                            }}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    color: '#686868',
                                                    fontSize: SIZE(12),
                                                }}>
                                                Food
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                padding: SIZE(8),
                                                backgroundColor: '#F7F7F7',
                                                borderRadius: SIZE(8),
                                                borderWidth: SIZE(1),
                                                borderColor: '#D3D3D3',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                flex: 1,
                                            }}>
                                            <Text
                                                style={{
                                                    fontFamily: FONTS.semiBold,
                                                    fontWeight: '600',
                                                    color: '#242424',
                                                    fontSize: SIZE(12),
                                                    lineHeight: SIZE(15),
                                                }}>
                                                AED
                                            </Text>
                                            <TextInput
                                                value={
                                                    item.food_price ===
                                                        '0.00' ||
                                                    item.food_price === '0'
                                                        ? ''
                                                        : item.food_price
                                                }
                                                onChangeText={text => {
                                                    const update_per_day =
                                                        selectedCategories.map(
                                                            filteritem => {
                                                                if (
                                                                    filteritem.id ===
                                                                    item.id
                                                                ) {
                                                                    return {
                                                                        ...filteritem,
                                                                        food_price:
                                                                            text,
                                                                        food_amount_error:
                                                                            '',
                                                                    };
                                                                }
                                                                return filteritem;
                                                            },
                                                        );
                                                    setSelectedCategories(
                                                        update_per_day,
                                                    );
                                                    setErrorMessage({
                                                        foodamount: '',
                                                    });
                                                }}
                                                maxLength={8}
                                                editable={item.food_available}
                                                placeholder="Enter Amount"
                                                keyboardType="numeric"
                                                placeholderTextColor="#686868"
                                                style={{
                                                    fontSize: SIZE(12),
                                                    color: '#000',
                                                    fontFamily: FONTS.regular,
                                                    lineHeight: SIZE(15),
                                                    fontWeight: '400',
                                                    width: SIZE(170),
                                                    padding: 0,
                                                    marginLeft: SIZE(8),
                                                    height: SIZE(30),
                                                }}
                                            />
                                        </View>
                                    </View>
                                    {item.food_available &&
                                        item.food_amount_error && (
                                            <Text
                                                style={[
                                                    styles.errorMessage,
                                                    {
                                                        marginTop: SIZE(8),
                                                        marginBottom: SIZE(-5),
                                                    },
                                                ]}>
                                                {item.food_amount_error}
                                            </Text>
                                        )}
                                    <View>
                                        <View
                                            style={{
                                                marginBottom: SIZE(8),
                                            }}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    color: '#000',
                                                    fontSize: SIZE(12),
                                                    fontFamily: FONTS.regular,
                                                }}>
                                                Remarks
                                            </Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            marginBottom: SIZE(16),
                                        }}>
                                        <TextInput
                                            value={item.remarks}
                                            placeholder="Enter Remarks"
                                            placeholderTextColor="#686868"
                                            multiline={true}
                                            style={{
                                                fontSize: SIZE(12),
                                                paddingHorizontal: SIZE(7),
                                                backgroundColor: '#F7F7F7',
                                                borderRadius: SIZE(8),
                                                borderWidth: SIZE(1),
                                                borderColor: '#D3D3D3',
                                                fontFamily: FONTS.regular,
                                                color: '#000',
                                                height: SIZE(100),
                                                paddingVertical: SIZE(20),
                                                textAlignVertical: 'top',
                                                textAlign: 'left',
                                            }}
                                            onChangeText={text => {
                                                const update_per_day =
                                                    selectedCategories.map(
                                                        filteritem => {
                                                            if (
                                                                filteritem.id ===
                                                                item.id
                                                            ) {
                                                                return {
                                                                    ...filteritem,
                                                                    remarks:
                                                                        text,
                                                                    food_amount_error:
                                                                        '',
                                                                };
                                                            }
                                                            return filteritem;
                                                        },
                                                    );
                                                setSelectedCategories(
                                                    update_per_day,
                                                );
                                                setErrorMessage({
                                                    remark: '',
                                                });
                                            }}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                        {itemIsShowing[item.id] && visibleStates[item.id] && (
                            <View
                                style={{
                                    borderWidth: SIZE(0.6),
                                    borderColor: '#E2E2E2',
                                    position: 'absolute',
                                    right: SIZE(8),
                                    top: SIZE(170),
                                    width: SIZE(180),
                                    height: SIZE(70),
                                    zIndex: 10000,
                                    backgroundColor: '#fff',
                                    borderRadius: SIZE(8),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: SIZE(10),
                                }}>
                                <View
                                    style={{
                                        position: 'absolute',
                                        right: SIZE(10),
                                        bottom: SIZE(69),
                                        zIndex: -100,
                                    }}>
                                    <ToolTip
                                        width={SIZE(18)}
                                        height={SIZE(18)}
                                    />
                                </View>
                                <Text
                                    style={{
                                        color: '#969696',
                                        fontFamily: FONTS.medium,
                                        fontSize: SIZE(12),
                                    }}>
                                    pet price per day info. message here!!!
                                </Text>
                            </View>
                        )}
                        {!visibleStates[item.id] && (
                            <>
                                {item.per_day_error && (
                                    <Text
                                        style={[
                                            styles.errorMessage,
                                            {
                                                marginTop: SIZE(8),
                                                marginBottom: SIZE(-8),
                                            },
                                        ]}>
                                        {item.per_day_error}
                                    </Text>
                                )}
                                {item.food_available &&
                                    item.food_amount_error && (
                                        <Text
                                            style={[
                                                styles.errorMessage,
                                                {
                                                    marginTop: SIZE(8),
                                                    marginBottom: SIZE(-8),
                                                },
                                            ]}>
                                            {item.food_amount_error}
                                        </Text>
                                    )}
                            </>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dropBoxTwo: {
        flexDirection: 'row',
        width: '100%',
        // borderWidth: 1,
        // borderBottomWidth: 1,
        // borderRadius:8,
        padding: SIZE(13),
        borderRadius: SIZE(8),
        justifyContent: 'space-between',
        borderColor: '#E2E2E2',
    },
    ChooseBoxTwo: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: FONTS.medium,
    },
    activeDropBoxTwo: {
        borderBottomWidth: 1,
    },
    container1: {
        // borderWidth: 1,
        // borderColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: SIZE(5),
        width: SIZE(30),
        height: SIZE(30),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText2: {
        color: '#000',
        fontSize: SIZE(16),
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
    },
    countText: {
        textAlign: 'center',
        color: '#242424',
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
    },
    ChooseBoxCount: {
        marginHorizontal: SIZE(10),
        borderWidth: SIZE(1),
        width: SIZE(30),
        height: SIZE(30),
        borderRadius: SIZE(4),
        borderColor: '#98C1D9',
        backgroundColor: '#EAF7FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    chooseContainer: {
        flexDirection: 'row',
    },
    chooseCategory: {
        borderWidth: SIZE(1),
        borderColor: '#98C1D9',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(4),
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(6),
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SIZE(8),
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkbox: {
        width: SIZE(20),
        height: SIZE(20),
        borderWidth: SIZE(1),
        borderColor: '#969696',
        borderRadius: SIZE(5),
        marginRight: SIZE(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checked: {
        backgroundColor: '#009FD3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(-8),
        marginBottom: SIZE(10),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});
