import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import React, {useContext, useState} from 'react';

//packages
import {useNavigation} from '@react-navigation/native';

//components
//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

//images and logos
import LeftArrowIcon from '../../assets/icons/arrow-left.svg';
import SearchIcon from '../../assets/icons/search.svg';
import CloseIcon from '../../assets/icons/closegrey.svg';
import SendIcon from '../../assets/icons/send.svg';
import {
    ApiSectionServiceProviderRecentSearch,
    ApiSectionServiceProviderSearch,
} from './ApiSectionServiceProvider';
import {Context} from '../../contexts/Store';
import {serviceProviderConfig, usersConfigCustomer} from '../../../axiosConfig';
import {
    ApiSectionCustomerRecentSearch,
    ApiSectionServiceCustomerSearch,
} from './ApiSection';

const SearchPage = () => {
    const navigation = useNavigation();
    const {state} = useContext(Context);

    //states
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [selectedFilterTwo, setSelectedFilterTwo] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [recentResults, setRecentResults] = useState([]);
    const [reload, setReload] = useState(false);

    if (state?.userData?.is_service) {
        ApiSectionServiceProviderSearch(
            setSearchResult,
            selectedFilterTwo?.section ? selectedFilterTwo.section : '',
            searchQuery,
        );
    } else {
        ApiSectionServiceCustomerSearch(
            setSearchResult,
            selectedFilterTwo?.section ? selectedFilterTwo.section : '',
            searchQuery,
        );
    }

    if (state?.userData?.is_service) {
        if (state?.userData?.is_login) {
            ApiSectionServiceProviderRecentSearch(setRecentResults, reload);
        }
    } else {
        if (state?.userData?.is_login) {
            ApiSectionCustomerRecentSearch(setRecentResults, reload);
        }
    }

    //save search function
    const saveSearch = async (type, id, query) => {
        const formData = new FormData();
        formData.append('query', query);
        formData.append('item_pk', id);
        formData.append('search_type', type);
        try {
            const response = await serviceProviderConfig.post(
                `save-search/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
        } catch (error) {
            console.log('Error in saveSearch:', error);
        }
    };

    //save search customer function
    const saveSearchCustomer = async (type, id, query) => {
        const formData = new FormData();
        formData.append('query', query);
        formData.append('item_pk', id);
        formData.append('search_type', type);
        try {
            const response = await usersConfigCustomer.post(
                `save-search/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
        } catch (error) {
            console.log('Error in saveSearch:', error);
        }
    };

    //delete recent
    const deleteRecent = async pk => {
        try {
            const response = await serviceProviderConfig.delete(
                `remove-search/${pk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            setReload(prev => !prev);
        } catch (error) {
            console.log('Error in delete search:', error.response.data);
        }
    };

    //demo arrays
    const filterArray = [
        {
            id: 1,
            name: 'Place to Stay',
            section: 'place-to-stay',
        },
        {
            id: 2,
            name: 'Borrow a Pet',
            section: 'borrow-pet',
        },
        ...(!state?.userData?.is_service
            ? [
                  {
                      id: 3,
                      name: 'Trainer',
                      section: 'trainer',
                  },
              ]
            : []),
    ];

    //
    const handleFilterClick = id => {
        const selectedFilterObject = filterArray.find(
            filter => filter.id === id,
        );
        setSelectedFilter(id === selectedFilter ? null : id);
        setSelectedFilterTwo(
            id === selectedFilter ? null : selectedFilterObject,
        );
        if (id === selectedFilter) {
            setFilteredResults([]);
        } else {
            const results = filteredResults.filter(
                item =>
                    item.category.toLowerCase() ===
                    selectedFilterObject?.name.toLowerCase(),
            );
            setFilteredResults(results);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerTop}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity
                                hitSlop={10}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                activeOpacity={0.8}
                                style={styles.leftArrowContainer}>
                                <LeftArrowIcon width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.headerRight,
                                {
                                    borderColor: isFocused
                                        ? '#009FD3'
                                        : '#E2E2E2',
                                    backgroundColor: isFocused
                                        ? '#FFF'
                                        : '#EDEDED',
                                },
                            ]}>
                            <View style={styles.searchIconContainer}>
                                <SearchIcon width={'100%'} height={'100%'} />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    autoFocus
                                    maxLength={35}
                                    onChangeText={text => {
                                        setSearchQuery(text);
                                    }}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    allowFontScaling={false}
                                    style={styles.inputStyle}
                                    placeholder="Search..."
                                    placeholderTextColor={'#AAA'}
                                />
                            </View>
                        </View>
                    </View>
                    {searchQuery !== '' ? (
                        ''
                    ) : (
                        <ScrollView
                            keyboardShouldPersistTaps={'handled'}
                            bounces={false}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filterContainer}>
                            {filterArray.map(item => {
                                return (
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleFilterClick(item.id)
                                        }
                                        activeOpacity={0.8}
                                        key={item.id}
                                        style={[
                                            styles.filterSingleContainer,
                                            {
                                                borderColor:
                                                    selectedFilter === item.id
                                                        ? '#98C1D9'
                                                        : '#E2E2E2',
                                                backgroundColor:
                                                    selectedFilter === item.id
                                                        ? '#EAF7FF'
                                                        : '#fff',
                                            },
                                        ]}>
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.filterSingleText,
                                                {
                                                    color:
                                                        selectedFilter ===
                                                        item.id
                                                            ? '#009FD3'
                                                            : '#242424',
                                                },
                                            ]}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    )}
                </View>
                <ScrollView
                    keyboardShouldPersistTaps={'handled'}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.resultsContainer,
                        {
                            paddingVertical:
                                searchQuery !== '' ? SIZE(16) : SIZE(24),
                            paddingBottom:
                                searchQuery !== '' ? SIZE(100) : SIZE(150),
                        },
                    ]}>
                    {searchQuery !== '' ||
                    (filteredResults.length > 0 && !filteredResults) ||
                    selectedFilter !== null ? (
                        ''
                    ) : (
                        <View style={styles.recentTextContainer}>
                            {recentResults?.some(
                                val => val?.search_data?.length > 0,
                            ) && (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.recentText}>
                                    Recent
                                </Text>
                            )}
                        </View>
                    )}

                    {searchQuery !== '' ||
                    (filteredResults.length > 0 && !filteredResults) ||
                    selectedFilter !== null
                        ? searchResult?.map((item, index) => (
                              <View
                                  key={item.id}
                                  style={styles.searchResultSingle}>
                                  <View
                                      key={item.id}
                                      style={styles.recentSingle}>
                                      <TouchableOpacity
                                          onPress={() => {
                                              if (state?.userData?.is_service) {
                                                  saveSearch(
                                                      searchResult[index]
                                                          .item_type ===
                                                          'Borrow A Pet'
                                                          ? 20
                                                          : 10,
                                                      item.id,
                                                      searchQuery,
                                                  );
                                              } else {
                                                  saveSearchCustomer(
                                                      searchResult[index]
                                                          .item_type ===
                                                          'Borrow A Pet'
                                                          ? 20
                                                          : searchResult[index]
                                                                .item_type ===
                                                            'Trainer'
                                                          ? 50
                                                          : 10,
                                                      item.id,
                                                      searchQuery,
                                                  );
                                              }
                                              if (state?.userData?.is_service) {
                                                  navigation.navigate(
                                                      'ServiceProviderSinglePage',
                                                      {
                                                          type:
                                                              searchResult[
                                                                  index
                                                              ].item_type ===
                                                              'Borrow A Pet'
                                                                  ? 'BorrowAPet'
                                                                  : 'Place_ToStay',
                                                          pk: item.id,
                                                          selected: item,
                                                      },
                                                  );
                                              } else {
                                                  navigation.navigate(
                                                      searchResult[index]
                                                          .item_type ===
                                                          'Borrow A Pet'
                                                          ? 'BorrowPetSingle'
                                                          : item.item_type ===
                                                            'Trainer'
                                                          ? 'TrainerSinglePage'
                                                          : 'PetSingle',
                                                      {
                                                          type:
                                                              searchResult[
                                                                  index
                                                              ].item_type ===
                                                              'Borrow A Pet'
                                                                  ? 'BorrowAPet'
                                                                  : 'Place_ToStay',
                                                          pk: item.id,
                                                          selected: item,
                                                      },
                                                  );
                                              }
                                          }}
                                          activeOpacity={0.8}
                                          style={styles.singleLeft}>
                                          <View
                                              style={
                                                  styles.profileImageContainer
                                              }>
                                              <Image
                                                  style={styles.profileImage}
                                                  source={{uri: item.image}}
                                              />
                                          </View>
                                          <View style={styles.middleSection}>
                                              <Text
                                                  style={styles.nameText}
                                                  allowFontScaling={false}>
                                                  {item.name}
                                              </Text>
                                              <Text
                                                  style={styles.categoryText}
                                                  allowFontScaling={false}>
                                                  {item.item_type}
                                              </Text>
                                          </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                          onPress={() => {
                                              if (state?.userData?.is_service) {
                                                  saveSearch(
                                                      searchResult[index]
                                                          .item_type ===
                                                          'Borrow A Pet'
                                                          ? 20
                                                          : 10,
                                                      item.id,
                                                      searchQuery,
                                                  );
                                              } else {
                                                  saveSearchCustomer(
                                                      searchResult[index]
                                                          .item_type ===
                                                          'Borrow A Pet'
                                                          ? 20
                                                          : searchResult[index]
                                                                .item_type ===
                                                            'Trainer'
                                                          ? 50
                                                          : 10,
                                                      item.id,
                                                      searchQuery,
                                                  );
                                              }
                                              if (state?.userData?.is_service) {
                                                  navigation.navigate(
                                                      'ServiceProviderSinglePage',
                                                      {
                                                          type:
                                                              searchResult[
                                                                  index
                                                              ].item_type ===
                                                              'Borrow A Pet'
                                                                  ? 'BorrowAPet'
                                                                  : 'Place_ToStay',
                                                          pk: item.id,
                                                          selected: item,
                                                      },
                                                  );
                                              } else {
                                                  navigation.navigate(
                                                      searchResult[index]
                                                          .item_type ===
                                                          'Borrow A Pet'
                                                          ? 'BorrowPetSingle'
                                                          : item.item_type ===
                                                            'Trainer'
                                                          ? 'TrainerSinglePage'
                                                          : 'PetSingle',
                                                      {
                                                          type:
                                                              searchResult[
                                                                  index
                                                              ].item_type ===
                                                              'Borrow A Pet'
                                                                  ? 'BorrowAPet'
                                                                  : 'Place_ToStay',
                                                          pk: item.id,
                                                          selected: item,
                                                      },
                                                  );
                                              }
                                          }}
                                          hitSlop={10}
                                          activeOpacity={0.8}
                                          style={styles.singleRightSend}>
                                          <SendIcon
                                              width={'100%'}
                                              height={'100%'}
                                          />
                                      </TouchableOpacity>
                                  </View>
                              </View>
                          ))
                        : recentResults?.map((val, index) => {
                              return val?.search_data?.map(item => {
                                  return (
                                      <View
                                          key={item.id}
                                          style={styles.recentSingle}>
                                          <TouchableOpacity
                                              onPress={() => {
                                                  if (
                                                      state?.userData
                                                          ?.is_service
                                                  ) {
                                                      navigation.navigate(
                                                          'ServiceProviderSinglePage',
                                                          {
                                                              type:
                                                                  item.item_type ===
                                                                  'Borrow A Pet'
                                                                      ? 'BorrowAPet'
                                                                      : 'Place_ToStay',
                                                              pk: item.id,
                                                              selected: item,
                                                          },
                                                      );
                                                  } else {
                                                      navigation.navigate(
                                                          item.item_type ===
                                                              'Borrow A Pet'
                                                              ? 'BorrowPetSingle'
                                                              : item.item_type ===
                                                                'Trainer'
                                                              ? 'TrainerSinglePage'
                                                              : 'PetSingle',
                                                          {
                                                              type:
                                                                  item.item_type ===
                                                                  'Borrow A Pet'
                                                                      ? 'BorrowAPet'
                                                                      : 'Place_ToStay',
                                                              pk: item.id,
                                                              selected: item,
                                                          },
                                                      );
                                                  }
                                              }}
                                              activeOpacity={0.8}
                                              style={styles.singleLeft}>
                                              <View
                                                  style={
                                                      styles.profileImageContainer
                                                  }>
                                                  <Image
                                                      style={
                                                          styles.profileImage
                                                      }
                                                      source={{
                                                          uri: item.image,
                                                      }}
                                                  />
                                              </View>
                                              <View
                                                  style={styles.middleSection}>
                                                  <Text
                                                      style={styles.nameText}
                                                      allowFontScaling={false}>
                                                      {item.name}
                                                  </Text>
                                                  <Text
                                                      style={
                                                          styles.categoryText
                                                      }
                                                      allowFontScaling={false}>
                                                      {item.item_type}
                                                  </Text>
                                              </View>
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                              onPress={() => {
                                                  deleteRecent(val.id);
                                              }}
                                              hitSlop={10}
                                              activeOpacity={0.8}
                                              style={styles.singleRight}>
                                              <CloseIcon
                                                  width={'100%'}
                                                  height={'100%'}
                                              />
                                          </TouchableOpacity>
                                      </View>
                                  );
                              });
                          })}
                </ScrollView>
            </View>
        </View>
    );
};

export default SearchPage;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#F7F7F7',
        flex: 1,
    },
    subContainer: {},
    headerContainer: {
        padding: SIZE(16),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLeft: {
        padding: SIZE(8),
        borderRadius: SIZE(24),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        marginRight: SIZE(16),
        backgroundColor: '#fff',
    },
    leftArrowContainer: {
        width: SIZE(23),
        height: SIZE(23),
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
    filterContainer: {
        marginTop: SIZE(24),
    },
    filterSingleContainer: {
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(40),
        borderWidth: SIZE(1),
        marginRight: SIZE(12),
        backgroundColor: '#fff',
    },
    filterSingleText: {
        fontSize: SIZE(14),
        fontWeight: '600',
        color: '#242424',
        fontFamily: FONTS.semiBold,
    },
    resultsContainer: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(24),
    },

    recentTextContainer: {
        marginBottom: SIZE(16),
    },
    recentText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        fontWeight: '600',
    },
    recentSingle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: SIZE(12),
        justifyContent: 'space-between',
        paddingVertical: SIZE(16),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    searchResultSingle: {},
    singleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImageContainer: {
        width: SIZE(48),
        height: SIZE(48),
        marginRight: SIZE(16),
    },
    profileImage: {
        borderRadius: SIZE(48),
        width: '100%',
        height: '100%',
    },
    nameText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    categoryText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },
    singleRight: {
        width: SIZE(10),
        height: SIZE(10),
    },
    singleRightSend: {
        width: SIZE(24),
        height: SIZE(24),
    },
});
