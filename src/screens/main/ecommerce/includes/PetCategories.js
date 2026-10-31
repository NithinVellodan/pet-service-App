import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const PetCategories = ({
    FilterItem,
    selectedFilter,
    setSelectedFilter,
    onPressItem,
    multiple,
}) => {
    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (scrollViewRef.current) {
            const selectedItemIndex = FilterItem.findIndex(
                item => item.id === selectedFilter,
            );
        }
    }, [selectedFilter]);

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
            {!multiple
                ? FilterItem?.map((item, index) => (
                      <TouchableOpacity
                          onPress={() => {
                              setSelectedFilter(item.id);
                              onPressItem && onPressItem();
                          }}
                          activeOpacity={0.8}
                          key={index}
                          style={[
                              styles.filterItem,
                              selectedFilter === item.id &&
                                  styles.selectedFilterItem,
                              index === 0 && {marginLeft: SIZE(12)},
                          ]}>
                          <Text
                              allowFontScaling={false}
                              style={[
                                  styles.filterItemText,
                                  selectedFilter === item.id &&
                                      styles.selectedFilterItemText,
                              ]}>
                              {item.name}
                          </Text>
                      </TouchableOpacity>
                  ))
                : FilterItem?.map((item, index) => (
                      <TouchableOpacity
                          onPress={() =>
                              replaceSelectedFilterWithPK(item.id, index)
                          }
                          activeOpacity={0.8}
                          key={index}
                          style={[
                              styles.filterItem,
                              {
                                  borderColor: selectedFilter.includes(item.id)
                                      ? '#98C1D9'
                                      : '#E2E2E2',
                                  backgroundColor: selectedFilter.includes(
                                      item.id,
                                  )
                                      ? '#EAF7FF'
                                      : '#FFF',
                              },
                          ]}>
                          <Text
                              allowFontScaling={false}
                              style={[
                                  styles.filterItemText,
                                  {
                                      borderColor: selectedFilter.includes(
                                          item.id,
                                      )
                                          ? '#98C1D9'
                                          : '#E2E2E2',
                                      backgroundColor: selectedFilter.includes(
                                          item.id,
                                      )
                                          ? '#EAF7FF'
                                          : '#FFF',
                                  },
                              ]}>
                              {item.name}
                          </Text>
                      </TouchableOpacity>
                  ))}
        </ScrollView>
    );
};

export default PetCategories;

const styles = StyleSheet.create({
    filterContainer: {
        paddingTop: SIZE(20),
        paddingBottom: SIZE(16),
    },
    filterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: SIZE(20),
        backgroundColor: '#FFFFFF',
    },
    selectedFilterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
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
