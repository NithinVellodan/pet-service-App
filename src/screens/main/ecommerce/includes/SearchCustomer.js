import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

//components
import PetCategories from './PetCategories';
import ProviderCategories from './ProviderCategories';

//svg
import FilterIcon from '../../../../assets/icons/filter.svg';
import SearchIcon from '../../../../assets/icons/search.svg';
import CloseButton from '../../../../assets/icons/close-button.svg';

export default function SearchCustomer({
    FilterItem,
    selectedFilter,
    setSelectedFilter,
    onPressFilter,
    onPressItem,
    searchBox,
    setSearchOption,
    serchOption,
    provider,
    isFilterActive,
    onPressClearData,
    orderStatus,
    setOrderStatus,
}) {
    const [isFocused, setIsFocused] = useState(false);
    const handleFilterClick = index => {
        setSelectedFilter(index);
    };

    return (
        <View
            style={{
                borderBottomWidth: SIZE(1),
                borderColor: '#E2E2E2',
                paddingHorizontal: SIZE(16),
            }}>
            {searchBox && (
                <View style={styles.headerTop}>
                    <View
                        style={[
                            styles.headerRight,
                            {
                                borderColor: isFocused ? '#009FD3' : '#E2E2E2',
                                backgroundColor: isFocused ? '#fff' : '#EDEDED',
                            },
                        ]}>
                        <View style={styles.searchIconContainer}>
                            <SearchIcon width={'100%'} height={'100%'} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={serchOption}
                                maxLength={35}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                allowFontScaling={false}
                                style={styles.inputStyle}
                                placeholder="Search..."
                                placeholderTextColor={'#AAA'}
                                onChange={event => {
                                    const {text} = event.nativeEvent;
                                    setSearchOption(text);
                                }}
                            />
                        </View>
                        {serchOption !== '' && (
                            <TouchableOpacity
                                onPress={() => {
                                    setSearchOption('');
                                }}
                                style={styles.searchIconContainer}>
                                <CloseButton width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                            styles.filterIcon,
                            {
                                borderColor: isFilterActive
                                    ? '#009FD3'
                                    : '#E2E2E2',
                                backgroundColor: isFilterActive
                                    ? '#EAF7FF'
                                    : '#FFF',
                            },
                        ]}
                        onPress={() => {
                            if (isFilterActive) {
                                onPressClearData && onPressClearData();
                                if (provider) {
                                    onPressFilter && onPressFilter();
                                }
                            } else {
                                onPressFilter && onPressFilter();
                            }
                        }}>
                        <View style={styles.filterButton}>
                            <FilterIcon width={'100%'} height={'100%'} />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            <View>
                {provider ? (
                    <ProviderCategories
                        FilterItem={FilterItem}
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        onPressItem={onPressItem}
                    />
                ) : (
                    <PetCategories
                        FilterItem={FilterItem}
                        selectedFilter={orderStatus}
                        setSelectedFilter={setOrderStatus}
                        handleFilterClick={handleFilterClick}
                        onPressItem={onPressItem}
                        multiple={true}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: SIZE(16),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZE(10),
    },
    headerLeft: {
        padding: SIZE(8),
        borderRadius: SIZE(24),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        marginRight: SIZE(16),
        backgroundColor: '#fff',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZE(8),
        paddingLeft: SIZE(16),
        paddingRight: SIZE(8),
        backgroundColor: '#EDEDED',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        flex: 1,
        marginRight: SIZE(16),
    },
    searchIconContainer: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(12),
    },
    inputContainer: {
        flex: 1,
    },
    inputStyle: {
        paddingVertical: SIZE(0),
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    filterButton: {
        width: SIZE(24),
        height: SIZE(24),
    },
    filterIcon: {
        padding: SIZE(8),
        borderRadius: SIZE(24),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
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
});
