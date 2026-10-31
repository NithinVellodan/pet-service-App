import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ArrowDown from '../../../../assets/icons/arrow-down.svg';
import Arrow from '../../../../assets/icons/arrow-up.svg';
import {FONTS} from '../../../../theme/fonts';
import {SIZE} from '../../../../theme/theme';

const DropDown = ({
    data,
    categoryValue,
    setCategoryValue,
    label,
    choose,
    setError,
    categoryVisible,
    setCategoryVisible,
    dropDownHide,
}) => {
    return (
        <View>
            <View style={styles.inputBoxSub}>
                <Text allowFontScaling={false} style={styles.labelText}>
                    {label}
                </Text>
            </View>
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setCategoryVisible(!categoryVisible);
                        dropDownHide && dropDownHide();
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
                                color: '#686868',
                            }}>
                            {categoryValue.name || choose}
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
                        {data.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.selector}
                                key={index}
                                onPress={() => {
                                    // setSection(item.id);
                                    setCategoryValue(item);
                                    setCategoryVisible(!categoryVisible);
                                    setError({category: ''});
                                }}>
                                <Text
                                    style={[
                                        styles.visibleText,
                                        {
                                            backgroundColor:
                                                categoryValue.name === item.name
                                                    ? '#EAF7FF'
                                                    : '#f7f7f7',
                                        },
                                    ]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

export default DropDown;

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
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        borderColor: '#D3D3D3',
        width: '100%',
        zIndex: 1,
        elevation: 3,
        padding: SIZE(10),
        gap: SIZE(16),
    },
    visibleText: {
        fontSize: SIZE(14),
        padding: SIZE(10),
        fontFamily: FONTS.medium,
        color: '#242424',
        fontWeight: '500',
    },
    selector: {
        overflow: 'hidden',
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#ededed',
    },
});
