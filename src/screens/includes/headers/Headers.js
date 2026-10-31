import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    BackHandler,
    Platform,
} from 'react-native';
import React, {useContext, useState} from 'react';

// package
import {useNavigation, useRoute} from '@react-navigation/native';
import {Context} from '../../../contexts/Store';
import {Dropdown} from 'react-native-element-dropdown';

// thems
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

// Icons
import ArrowLeft from '../../../assets/icons/arrow-left-black.svg';
import SearchClose from '../../../assets/icons/close-button.svg';
import DotIcon from '../../../assets/icons/chat/threedot.svg';
import SearchIcon from '../../../assets/icons/search.svg';
import SearchIconCommerce from '../../../assets/icons/ecommerce/customer/search.svg';
import FilterIcon from '../../../assets/icons/filter.svg';
import CartIcon from '../../../assets/icons/ecommerce/customer/cart.svg';
import WishIcon from '../../../assets/icons/heartblack.svg';
import ShareIcon from '../../../assets/icons/share.svg';
import Search from '../../homeScreens/includes/Search';
import AddIcon from '../../../assets/icons/add.svg';
import CloseGreyIcon from '../../../assets/icons/closegrey.svg';
import Edit from '../../../assets/icons/edit.svg';

const Headers = ({
    headText,
    rightText,
    petsAvailable,
    setAddModalVisible,
    setEditModalVisible,
    chat,
    setChatMenu,
    icon,
    search,
    filter,
    cart,
    editIcon,
    editIconPress,
    searchCommerce,
    shareIcon,
    sharePress,
    onPressSearch,
    isSearch,
    setIsSearch,
    setSearchQuery,
    setSearchQueryCustomer,
    filterModal,
    ecoProviderHome,
    rightPress,
    cartPress,
    headTextSub,
    chatMenuList,
    searchResult,
    setSearch,
    fetchMessages,
    setChatMenuList,
    chatList,
    setChatFilter,
    chatFilterList,
    isPayment,
    wish,
    wishPress,
    searchPress,
    searchCommerceHome,
    onPressClearData,
    isFilterActive,
    filterOptions,
    setChatFilterList,
    clearChat,
}) => {
    const navigation = useNavigation();
    const route = useRoute();
    const {state} = useContext(Context);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {state.userData.is_service ? (
                <>
                    <View style={styles.header}>
                        {isSearch ? (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setIsSearch(false);
                                    setSearchQuery('');
                                }}>
                                <SearchClose
                                    height={SIZE(40)}
                                    width={SIZE(40)}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.back}
                                onPress={() => {
                                    if (isSearch) {
                                        setIsSearch(false);
                                        setSearchQuery('');
                                    } else {
                                        if (ecoProviderHome) {
                                            navigation.navigate('MainDrawer');
                                        } else {
                                            navigation.goBack();
                                            // stopPlay()
                                        }
                                    }
                                }}
                                activeOpacity={0.8}>
                                <ArrowLeft height={SIZE(24)} width={SIZE(24)} />
                            </TouchableOpacity>
                        )}
                        {isSearch ? (
                            <Search setSearchQuery={setSearchQuery} />
                        ) : chatMenuList === 1 ? (
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
                                    <SearchIcon
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        autoFocus
                                        onChangeText={text => {
                                            searchResult(text);
                                            setSearch(text);
                                        }}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => {
                                            setIsFocused(false);
                                        }}
                                        allowFontScaling={false}
                                        style={styles.inputStyle}
                                        placeholder="Search..."
                                        placeholderTextColor={'#AAA'}
                                    />
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setSearch('');
                                        setChatMenuList(null);
                                        fetchMessages();
                                    }}>
                                    <CloseGreyIcon
                                        width={SIZE(13)}
                                        height={SIZE(13)}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={{marginLeft: SIZE(20)}}>
                                <Text
                                    numberOfLines={1}
                                    allowFontScaling={false}
                                    style={[
                                        styles.headerText,
                                        {
                                            width: chat
                                                ? SIZES.width * 0.5
                                                : null,
                                        },
                                    ]}>
                                    {headText}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View>
                        {chatList ? (
                            <View style={styles.headerRightChat}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setIsSearch && setIsSearch(true);
                                    }}
                                    style={[styles.rightDotContainer]}>
                                    <SearchIcon
                                        height={SIZE(24)}
                                        width={SIZE(24)}
                                    />
                                </TouchableOpacity>
                                <Dropdown
                                    data={filterOptions}
                                    labelField="label"
                                    valueField="value"
                                    placeholder=""
                                    value={chatFilterList}
                                    onChange={item => {
                                        setChatFilterList(item.value);
                                    }}
                                    renderRightIcon={() => (
                                        <DotIcon
                                            style={{marginRight: SIZE(7)}}
                                            height={SIZE(24)}
                                            width={SIZE(24)}
                                        />
                                    )}
                                    selectedTextStyle={
                                        styles.dropDownSelectedText
                                    }
                                    style={[
                                        styles.dropDownStyle,
                                        {
                                            borderColor:
                                                chatFilterList === 1 ||
                                                chatFilterList === 2
                                                    ? '#009FD3'
                                                    : '#E2E2E2',
                                            backgroundColor:
                                                chatFilterList === 1 ||
                                                chatFilterList === 2
                                                    ? '#EAF7FF'
                                                    : '#FFFFFF',
                                        },
                                    ]}
                                    containerStyle={styles.dropDownContainer}
                                    itemContainerStyle={styles.dropDownInput}
                                    itemTextStyle={styles.dropDownTextStyle}
                                    showsVerticalScrollIndicator={false}
                                    activeColor={'#EAF7FF'}
                                />
                            </View>
                        ) : null}
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.header}>
                        {isSearch ? (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setIsSearch(false);
                                    setSearchQueryCustomer &&
                                        setSearchQueryCustomer('');
                                }}>
                                <SearchClose
                                    height={SIZE(40)}
                                    width={SIZE(40)}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.back}
                                onPress={() => {
                                    if (isSearch) {
                                        setIsSearch(false);
                                        setSearchQueryCustomer('');
                                    } else {
                                        if (isPayment) {
                                            navigation.navigate(
                                                'OrderCustomer',
                                            );
                                        } else {
                                            navigation.goBack();
                                        }
                                    }
                                }}
                                activeOpacity={0.8}>
                                <ArrowLeft height={SIZE(24)} width={SIZE(24)} />
                            </TouchableOpacity>
                        )}
                        {isSearch ? (
                            <Search setSearchQuery={setSearchQueryCustomer} />
                        ) : chatMenuList === 1 ? (
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
                                    <SearchIcon
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        autoFocus
                                        onChangeText={text => {
                                            searchResult(text);
                                            setSearch(text);
                                        }}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => {
                                            setIsFocused(false);
                                        }}
                                        allowFontScaling={false}
                                        style={styles.inputStyle}
                                        placeholder="Search..."
                                        placeholderTextColor={'#AAA'}
                                    />
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setSearch('');
                                        setChatMenuList(null);
                                        fetchMessages();
                                    }}>
                                    <CloseGreyIcon
                                        width={SIZE(13)}
                                        height={SIZE(13)}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View
                                style={{
                                    marginLeft: SIZE(20),
                                    flexDirection: 'row',
                                    alignItems: 'baseline',
                                }}>
                                <Text
                                    numberOfLines={1}
                                    allowFontScaling={false}
                                    style={[
                                        styles.headerText,
                                        {
                                            width: chat
                                                ? SIZES.width * 0.5
                                                : null,
                                        },
                                    ]}>
                                    {headText}
                                </Text>
                                {headTextSub && (
                                    <Text
                                        style={{
                                            fontSize: SIZE(12),
                                            fontFamily: FONTS.medium,
                                            color: '#00171F',
                                            marginLeft: SIZE(4),
                                        }}>
                                        {headTextSub}
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>
                    <View>
                        {chatList ? (
                            <View style={styles.headerRightChat}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setIsSearch(!isSearch);
                                    }}
                                    style={styles.rightDotContainer}>
                                    <SearchIcon
                                        height={SIZE(24)}
                                        width={SIZE(24)}
                                    />
                                </TouchableOpacity>
                                <Dropdown
                                    data={filterOptions}
                                    labelField="label"
                                    valueField="value"
                                    placeholder=""
                                    value={chatFilterList}
                                    onChange={item => {
                                        setChatFilterList(item.value);
                                    }}
                                    renderRightIcon={() => (
                                        <DotIcon
                                            style={{marginRight: SIZE(7)}}
                                            height={SIZE(24)}
                                            width={SIZE(24)}
                                        />
                                    )}
                                    selectedTextStyle={
                                        styles.dropDownSelectedText
                                    }
                                    style={[
                                        styles.dropDownStyle,
                                        {
                                            borderColor:
                                                chatFilterList === 1 ||
                                                chatFilterList === 2
                                                    ? '#009FD3'
                                                    : '#E2E2E2',
                                            backgroundColor:
                                                chatFilterList === 1 ||
                                                chatFilterList === 2
                                                    ? '#EAF7FF'
                                                    : '#FFFFFF',
                                        },
                                    ]}
                                    containerStyle={styles.dropDownContainer}
                                    itemContainerStyle={styles.dropDownInput}
                                    itemTextStyle={styles.dropDownTextStyle}
                                    showsVerticalScrollIndicator={false}
                                    activeColor={'#EAF7FF'}
                                />
                            </View>
                        ) : null}
                    </View>
                </>
            )}

            {petsAvailable && rightText && (
                <TouchableOpacity
                    onPress={() => {
                        if (route?.name === 'MyPlaces') {
                            setAddModalVisible(true);
                        } else if (route?.name === 'MyPets') {
                            setEditModalVisible(true);
                        } else if (route?.name === 'MyPetsCustomer') {
                            setEditModalVisible(true);
                        } else {
                            rightPress && rightPress();
                        }
                    }}
                    activeOpacity={0.8}
                    style={[styles.iconBox, {marginRight: SIZE(16)}]}>
                    <AddIcon width={'100%'} height={'100%'} />
                </TouchableOpacity>
            )}
            {chat && (
                <Dropdown
                    data={filterOptions}
                    labelField="label"
                    valueField="value"
                    placeholder=""
                    value={chatFilterList}
                    onFocus={() => setChatMenuList(null)}
                    onChange={item => {
                        setChatMenuList(item.value);
                        if (item.value === 3) {
                            clearChat();
                        }
                    }}
                    renderRightIcon={() => (
                        <DotIcon
                            style={{marginRight: SIZE(7)}}
                            height={SIZE(24)}
                            width={SIZE(24)}
                        />
                    )}
                    selectedTextStyle={styles.dropDownSelectedText}
                    style={[
                        styles.dropDownStyle,
                        {
                            borderColor:
                                chatMenuList === 2 ? '#009FD3' : '#E2E2E2',
                            backgroundColor:
                                chatMenuList === 2 ? '#EAF7FF' : '#FFFFFF',
                        },
                    ]}
                    containerStyle={[
                        styles.dropDownContainer,
                        {height: SIZE(130)},
                    ]}
                    itemContainerStyle={styles.dropDownInput}
                    itemTextStyle={styles.dropDownTextStyle}
                    showsVerticalScrollIndicator={false}
                    activeColor={'#EAF7FF'}
                />
            )}

            {!isSearch && (
                <>
                    {icon && (
                        <View style={styles.rightBox}>
                            {searchCommerce && (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        onPressSearch && onPressSearch();
                                    }}
                                    style={[styles.rightDotContainer]}>
                                    <SearchIcon
                                        height={SIZE(24)}
                                        width={SIZE(24)}
                                    />
                                </TouchableOpacity>
                            )}
                            {editIcon && (
                                <TouchableOpacity
                                    onPress={() => {
                                        editIconPress && editIconPress();
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.rightDotContainer}>
                                    <Edit height={SIZE(24)} width={SIZE(24)} />
                                </TouchableOpacity>
                            )}
                            {search && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsSearch && setIsSearch(true);
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.rightDotContainer}>
                                    <SearchIcon
                                        height={SIZE(24)}
                                        width={SIZE(24)}
                                    />
                                </TouchableOpacity>
                            )}
                            {searchCommerceHome && (
                                <TouchableOpacity
                                    onPress={() => {
                                        searchPress && searchPress();
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.rightDotContainer}>
                                    <SearchIconCommerce
                                        height={SIZE(24)}
                                        width={SIZE(24)}
                                    />
                                </TouchableOpacity>
                            )}
                            {filter && (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (isFilterActive) {
                                            onPressClearData();
                                        } else {
                                            filterModal && filterModal();
                                        }
                                    }}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.rightDotContainer,
                                        {
                                            borderColor: isFilterActive
                                                ? '#009FD3'
                                                : '#E2E2E2',
                                            backgroundColor: isFilterActive
                                                ? '#EAF7FF'
                                                : '#fff',
                                        },
                                    ]}>
                                    <FilterIcon
                                        height={SIZE(24)}
                                        width={SIZE(24)}
                                    />
                                </TouchableOpacity>
                            )}
                            {wish && (
                                <TouchableOpacity
                                    onPress={() => {
                                        wishPress && wishPress();
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.rightDotContainer}>
                                    <WishIcon
                                        height={SIZE(24)}
                                        width={SIZE(24)}
                                    />
                                </TouchableOpacity>
                            )}
                            {cart && (
                                <TouchableOpacity
                                    onPress={() => {
                                        cartPress && cartPress();
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.rightDotContainer}>
                                    {state.userData.cart_count !== 0 ? (
                                        <View
                                            style={{
                                                width: SIZE(18),
                                                height: SIZE(18),
                                                borderRadius: SIZE(30),
                                                backgroundColor: '#009FD3',
                                                position: 'absolute',
                                                top: -3,
                                                right: 0,
                                                borderWidth: 1,
                                                borderColor: '#eee',
                                                zIndex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    fontFamily: FONTS.bold,
                                                    fontSize: SIZE(10),
                                                    color: '#fff',
                                                }}>
                                                {state.userData.cart_count}
                                            </Text>
                                        </View>
                                    ) : null}
                                    <CartIcon
                                        height={SIZE(24)}
                                        width={SIZE(24)}
                                    />
                                </TouchableOpacity>
                            )}
                            {shareIcon && (
                                <TouchableOpacity
                                    onPress={() => {
                                        sharePress();
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.rightDotContainer}>
                                    <ShareIcon
                                        height={SIZE(24)}
                                        width={SIZE(24)}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </>
            )}
        </View>
    );
};

export default Headers;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: SIZE(1),
        borderColor: '#0000001A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        height: SIZE(69),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(16),
    },
    back: {
        backgroundColor: '#fff',
        height: SIZE(40),
        width: SIZE(40),
        borderRadius: SIZE(61),
        alignItems: 'center',
        padding: SIZE(5),
        justifyContent: 'center',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    headerText: {
        fontSize: SIZE(20),
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        lineHeight: SIZE(25),
        // width: SIZES.width * 0.5,
    },
    rightTextContainer: {
        marginRight: SIZE(16),
    },
    rightDotContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(40),
        marginRight: SIZE(16),
        backgroundColor: '#FFFFFF',
        height: SIZE(40),
        width: SIZE(40),
    },
    rightText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    rightBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBox: {
        width: SIZE(40),
        height: SIZE(40),
        backgroundColor: '#fff',
        padding: SIZE(8),
        borderRadius: SIZE(100),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    headerRight: {
        marginLeft: SIZE(20),
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
    leftArrowContainer: {
        width: SIZE(24),
        height: SIZE(24),
    },
    backContainer: {
        padding: SIZE(8),
        borderRadius: SIZE(24),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        marginRight: SIZE(20),
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    headerRightChat: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    dropDownStyle: {
        borderWidth: SIZE(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(40),
        marginRight: SIZE(16),
        height: SIZE(40),
        width: SIZE(40),
    },
    dropDownContainer: {
        borderRadius: SIZE(8),
        width: SIZE(150),
        marginLeft: SIZE(-110),
        marginTop: SIZE(4),
        height: SIZE(94),
        padding: SIZE(12),
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.8)',
                shadowOffset: {width: 0, height: SIZE(3)},
                shadowOpacity: 0.3,
                shadowRadius: SIZE(12),
            },
            android: {
                elevation: SIZE(3),
            },
        }),
    },
    dropDownInput: {
        borderRadius: SIZE(8),
    },
    dropDownTextStyle: {
        color: '#003459',
        fontSize: SIZE(12),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        margin: SIZE(-8),
    },
    dropDownSelectedText: {
        color: 'transparent',
    },
});
