import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//svg
import ArrowDown from '../../../assets/icons/arrow-down.svg';
import Arrow from '../../../assets/icons/arrow-up.svg';
import CheckBoxIcon from '../../../assets/icons/Checkbox.svg';
import {ScrollView} from 'react-native';

export default function PetCategoryInput({
    isFormatSelectedCategoriesActive,
    selectedCategories,
    boxVisible,
    setBoxVisible,
    formatSelectedCategories,
    categoryData,
    actions,
    isSelectedCategories,
}) {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    setBoxVisible(!boxVisible);
                }}
                style={[
                    styles.dropBox,
                    isFormatSelectedCategoriesActive && {
                        paddingVertical: SIZE(13.5),
                    },
                ]}>
                <ScrollView
                    bounces={false}
                    horizontal
                    contentContainerStyle={{minWidth: SIZE(200)}}
                    showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.ChooseBox}>
                        {selectedCategories.length > 0 ? (
                            formatSelectedCategories()
                        ) : (
                            <Text
                                allowFontScaling={false}
                                style={styles.ChooseBox}>
                                Choose
                            </Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
                {boxVisible ? (
                    <Arrow width={SIZE(24)} height={SIZE(24)} />
                ) : (
                    <ArrowDown width={SIZE(24)} height={SIZE(24)} />
                )}
            </TouchableOpacity>
            {boxVisible && (
                <View style={styles.visibleBox}>
                    {categoryData.map((item, index) => {
                        const filteredCategory = isSelectedCategories?.filter(
                            items => items.id === item.id,
                        );
                        return (
                            <TouchableOpacity
                                disabled={
                                    filteredCategory && filteredCategory[0]?.id
                                        ? true
                                        : false
                                }
                                activeOpacity={0.8}
                                key={item.id}
                                onPress={() => {
                                    actions(item);
                                }}
                                style={[
                                    styles.visibleTouch,
                                    {
                                        opacity:
                                            filteredCategory &&
                                            filteredCategory[0]?.id
                                                ? 0.2
                                                : 1,
                                    },
                                ]}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.contentText}>
                                    {item.name}
                                </Text>
                                <View
                                    style={[
                                        styles.buttonBox,
                                        {
                                            backgroundColor:
                                                selectedCategories.some(
                                                    category =>
                                                        category.id === item.id,
                                                )
                                                    ? ''
                                                    : '#F7F7F7',
                                            borderColor:
                                                selectedCategories.some(
                                                    category =>
                                                        category.id === item.id,
                                                )
                                                    ? '#fff'
                                                    : '#969696',
                                            borderWidth: SIZE(1),
                                        },
                                    ]}>
                                    {selectedCategories.some(
                                        category => category.id === item.id,
                                    ) && (
                                        <CheckBoxIcon
                                            width={SIZE(20)}
                                            height={SIZE(20)}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                    <TouchableOpacity
                        onPress={() => {
                            setBoxVisible(!boxVisible);
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
}

const styles = StyleSheet.create({
    dropBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: SIZE(1),
        padding: SIZE(16),
        borderRadius: SIZE(8),
        justifyContent: 'space-between',
        borderColor: '#009FD3',
    },
    ChooseBox: {
        textAlign: 'center',
        color: '#242424',
        fontFamily: FONTS.regular,
    },
    visibleBox: {
        alignItems: 'center',
        borderRadius: SIZE(8),
        padding: SIZE(15),
        backgroundColor: '#fff',
        marginTop: SIZE(10),
    },
    visibleTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width * 0.75,
        borderWidth: SIZE(1),
        padding: SIZE(10),
        borderRadius: SIZE(8),
        justifyContent: 'space-between',
        marginBottom: SIZE(20),
        borderColor: '#EDEDED',
        backgroundColor: '#F7F7F7',
    },
    contentText: {
        textAlign: 'center',
        color: '#242424',
        fontFamily: FONTS.semiBold,
    },
    buttonBox: {
        width: SIZE(20),
        height: SIZE(20),
        borderRadius: SIZE(5),
    },
    doneButton: {
        borderWidth: SIZE(1),
        width: SIZES.width * 0.75,
        borderRadius: SIZE(8),
        padding: SIZE(10),
        backgroundColor: '#003459',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: FONTS.semiBold,
    },
});
