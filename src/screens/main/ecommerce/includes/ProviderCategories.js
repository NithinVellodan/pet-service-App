import {StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useRef} from 'react';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
const ProviderCategories = ({
    FilterItem,
    selectedFilter,
    setSelectedFilter,
    onPressItem,
}) => {
    const scrollViewRef = useRef(null);

    const replaceSelectedFilterWithPK = (pk, index) => {
        const itemWidth = SIZE(2) + SIZE(16) * 2;
        const itemOffset = index * (itemWidth + SIZE(2)) - itemWidth / 2;
        scrollViewRef.current.scrollTo({x: itemOffset, animated: true});
        if (selectedFilter.includes(pk)) {
            setSelectedFilter(selectedFilter.filter(item => item !== pk));
        } else {
            setSelectedFilter([pk]);
        }
    };
    return (
        <ScrollView
            ref={scrollViewRef}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.filterContainer}>
            {FilterItem?.map((item, index) => (
                <TouchableOpacity
                    onPress={() => {
                        replaceSelectedFilterWithPK(item.id, index);
                        onPressItem && onPressItem();
                    }}
                    activeOpacity={0.8}
                    key={index}
                    style={[
                        styles.filterItem,
                        selectedFilter.includes(item.id) && [
                            styles.selectedFilterItem,
                            {
                                borderColor: '#003459',
                            },
                        ],
                        index === 0 && {marginLeft: SIZE(12)},
                    ]}>
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.filterItemText,
                            selectedFilter.includes(item.id) && [
                                styles.selectedFilterItemText,
                                {
                                    color: '#009FD3',
                                },
                            ],
                        ]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default ProviderCategories;

const styles = StyleSheet.create({
    filterContainer: {
        paddingTop: SIZE(20),
        paddingBottom: SIZE(16),
        alignItems: 'center',
        gap: SIZE(12),
    },
    filterItem: {
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: SIZE(20),
        backgroundColor: '#FFFFFF',
    },
    selectedFilterItem: {
        paddingVertical: SIZE(8),
        borderWidth: SIZE(0.5),
        borderRadius: SIZE(20),
        backgroundColor: '#EAF7FF',
    },
    filterItemText: {
        fontSize: SIZE(14),
        color: '#242424',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
    selectedFilterItemText: {
        fontSize: SIZE(14),
        color: '#003459',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
});
