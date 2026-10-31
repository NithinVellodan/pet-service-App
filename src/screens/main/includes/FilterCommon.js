import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const FilterCommon = ({
    FilterItem,
    selectedFilter,
    setSelectedValue,
    state,
    handleFilterClick,
}) => {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal
            contentContainerStyle={styles.filterContainer}>
            {FilterItem.map((item, index) => (
                <TouchableOpacity
                    onPress={() => {
                        handleFilterClick(item);
                        setSelectedValue(item.id);
                    }}
                    activeOpacity={0.8}
                    key={item.id}
                    style={[
                        styles.filterItem,
                        selectedFilter.id === item.id && [
                            styles.selectedFilterItem,
                            {
                                borderColor: !state.userData.is_service
                                    ? '#98C1D9'
                                    : '#003459',
                            },
                        ],
                        item.type === 'Trainer' && {
                            width: SIZE(121),
                            alignItems: 'center',
                        },
                    ]}>
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.filterItemText,
                            selectedFilter.id === item.id && [
                                styles.selectedFilterItemText,
                                {
                                    color: !state.userData.is_service
                                        ? '#009FD3'
                                        : '#003459',
                                },
                            ],
                        ]}>
                        {item.type}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default FilterCommon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    filterContainer: {
        paddingTop: SIZE(20),
        marginBottom: SIZE(16),
    },
    filterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        backgroundColor: '#FFFFFF',
    },
    selectedFilterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        borderColor: '#003459',
        backgroundColor: '#EAF7FF',
    },
    filterItemText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
    selectedFilterItemText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
});
