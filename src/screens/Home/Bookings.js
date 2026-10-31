import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';

// constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';
import CloseIcon from '../../assets/icons/close-icon-blue.svg';
import Modal from 'react-native-modal';
import BookingCards from './includes/BookingCards';
import ProviderBookingCard, {
    ProviderPlaceToStay,
} from './includes/ProviderBookingCard';
import BookingSingleModal from './includes/BookingSingleModal';
import NoBookingMain from '../booking/NoBookingMain';
import {useIsFocused} from '@react-navigation/native';
import {
    ApiSectionServiceProvider,
    serviceProviderPetBookingList,
    serviceProviderPlaceBookingList,
    serviceProviderTrainerBookingList,
} from '../main/ApiSectionServiceProvider';

import Headers from '../includes/headers/Headers';
import {CustomerAllBookings} from '../main/ApiSection';
import TrainerBookingCard from '../homeScreens/includes/TrainerBookingCard';
import BookingCardTrainer from './includes/BookingCardTrainer';
import FilterCommon from '../main/includes/FilterCommon';

const Bookings = ({route, navigation}) => {
    const {state, dispatch} = useContext(Context);
    const isFocused = useIsFocused();

    const [selectedFilter, setSelectedFilter] = useState({
        id: 1,
        type: 'Place to Stay',
        page_type: 'place-to-stay',
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(1);
    const [selectedModalItem, setSelectedModalItem] = useState();
    const [bookingListStay, setBookingListStay] = useState([]);
    const [bookingListCustomer, setBookingListCustomer] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryCustomer, setSearchQueryCustomer] = useState('');
    const [filterItemSelected, setFilterItemSelected] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [bookingID, setBookingID] = useState('');
    const [isFilterActive, setIsFilterActive] = useState(false);

    if (state.userData.is_service) {
        if (selectedFilter.page_type === 'place-to-stay') {
            serviceProviderPlaceBookingList(
                setBookingListStay,
                searchQuery,
                filterItemSelected,
                isLoading,
                setRefreshing,
                selectedFilter.page_type,
            );
        } else if (selectedFilter.page_type === 'borrow-pet') {
            serviceProviderPetBookingList(
                setBookingListStay,
                searchQuery,
                filterItemSelected,
                isLoading,
                setRefreshing,
                selectedFilter.page_type,
            );
        } else if (selectedFilter.page_type === 'trainer') {
            serviceProviderTrainerBookingList(
                setBookingListStay,
                searchQuery,
                filterItemSelected,
                isLoading,
                setRefreshing,
                selectedFilter.page_type,
            );
        }
    } else {
        CustomerAllBookings(
            selectedFilter.page_type,
            setBookingListCustomer,
            searchQueryCustomer,
            filterItemSelected,
            isLoading,
            setRefreshing,
        );
    }

    const updateUserDate = () => {
        if (state.userData.is_service) {
            dispatch({
                type: 'UPDATE_READ_SECTION',
                readSection: {
                    ...state.readSection,
                    un_read_booking_provider: false,
                },
            });
        } else {
            dispatch({
                type: 'UPDATE_READ_SECTION',
                readSection: {
                    ...state.readSection,
                    un_read_booking_customer: false,
                },
            });
        }
    };

    const onPressClearData = () => {
        setIsFilterActive(false);
        setFilterItemSelected(0);
    };

    const filterPage = item => {
        setSelectedModalItem(item);
        setModalVisible(!modalVisible);
    };

    const filterModal = () => {
        setIsFilter(!isFilter);
    };

    const handleFilterClick = item => {
        setSelectedFilter(item);
    };
    useEffect(() => {
        updateUserDate();
        if (isFocused && state.userData.tempStateBookingNav === null) {
            setSelectedFilter(
                route?.params?.selectedFilter
                    ? route?.params?.selectedFilter
                    : {
                          id: 1,
                          type: 'Place to Stay',
                          page_type: 'place-to-stay',
                      },
            );
            setSearchQuery('');
            setSearchQueryCustomer('');
            setIsSearch(false);
            setIsFilter(false);
            setIsLoading(prev => !prev);
        } else if (
            isFocused &&
            state.userData.tempStateBookingNav === 'place-to-stay'
        ) {
            setSelectedFilter({
                id: 1,
                type: 'Place to Stay',
                page_type: 'place-to-stay',
            });
            setSearchQuery('');
            setSearchQueryCustomer('');
            setIsSearch(false);
            setIsFilter(false);
            setIsLoading(prev => !prev);
        } else if (
            isFocused &&
            state.userData.tempStateBookingNav === 'borrow-a-pet'
        ) {
            setSelectedFilter({
                id: 2,
                type: 'Borrow a Pet',
                page_type: 'borrow-pet',
            });
            setSearchQuery('');
            setSearchQueryCustomer('');
            setIsSearch(false);
            setIsFilter(false);
            setIsLoading(prev => !prev);
        }
    }, [isFocused, state.readSection.un_read_booking]);

    const FilterItem = [
        {
            id: 1,
            type: 'Place to Stay',
            page_type: 'place-to-stay',
        },
        {
            id: 2,
            type: 'Borrow a Pet',
            page_type: 'borrow-pet',
        },
        {
            id: 3,
            type: 'Trainer',
            page_type: 'trainer',
        },
    ];

    const renderCardItemCustomerPlaceToStay = ({item}) => (
        <View style={{marginBottom: SIZE(20)}}>
            <BookingCards
                page="Wishlist"
                navigation={navigation}
                item={item}
                filterPage={filterPage}
                is_place_to_stay={true}
            />
        </View>
    );
    const renderCardItemCustomerBorrowPet = ({item}) => (
        <View style={{marginBottom: SIZE(20)}}>
            <BookingCards
                page="Wishlist"
                navigation={navigation}
                item={item}
                filterPage={filterPage}
            />
        </View>
    );

    const renderTrainerBookingCustomer = ({item, index}) => (
        <View>
            <BookingCardTrainer
                page="Wishlist"
                navigation={navigation}
                item={item}
                filterPage={filterPage}
            />
        </View>
    );
    const renderProvider = ({item}) => (
        <View style={{marginBottom: SIZE(14)}}>
            <ProviderBookingCard
                page="Wishlist"
                navigation={navigation}
                detail={item}
            />
        </View>
    );
    const renderProviderBookingPlaceToStay = ({item}) => (
        <View style={{marginBottom: SIZE(14)}}>
            <ProviderPlaceToStay
                page="Wishlist"
                navigation={navigation}
                detail={item}
            />
        </View>
    );
    const renderProviderTrainer = ({item, index}) => (
        <View>
            <TrainerBookingCard
                navigation={navigation}
                state={state}
                key={index}
                detail={item}
                index={index}
                bookingID={bookingID}
                setBookingID={setBookingID}
                // route={route?.params}
                bookingList={true}
            />
        </View>
    );

    const [filterItem, setFilterItem] = useState([
        {
            name: 'Accepted',
            id: 10,
        },
        {
            name: 'Ongoing',
            id: 20,
        },
        {
            name: 'Incoming',
            id: 30,
        },
        {
            name: 'Expired',
            id: 40,
        },
        {
            name: 'Rejected',
            id: 50,
        },
    ]);

    const filterContent = () => {
        return (
            <View
                style={{
                    width: SIZE(200),
                    backgroundColor: '#FFFFFF',
                    borderRadius: SIZE(15),
                    position: 'absolute',
                    zIndex: 2,
                    top: SIZE(75),
                    right: SIZE(20),
                    padding: SIZE(15),
                    borderColor: '#eee',
                    borderWidth: SIZE(1),
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
                }}>
                <TouchableOpacity
                    onPress={() => {
                        filterModal();
                        onPressClearData();
                    }}
                    activeOpacity={0.8}
                    style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginBottom: SIZE(10),
                    }}>
                    <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                </TouchableOpacity>
                {filterItem.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                            setFilterItemSelected(item.id);
                            filterModal();
                            setIsFilterActive(true);
                        }}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor:
                                filterItemSelected == item.id
                                    ? '#EAF7FF'
                                    : '#fff',
                            marginVertical: 5,
                            borderRadius: 5,
                            padding: 6,
                        }}>
                        <Text
                            style={{
                                color: '#003459',
                                fontFamily: FONTS.medium,
                            }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={{}}>
                <Headers
                    headText={'Bookings'}
                    icon={true}
                    searchCommerce={true}
                    onPressSearch={() => {
                        setIsSearch(true);
                    }}
                    searchBar={true}
                    isSearch={isSearch}
                    setIsSearch={setIsSearch}
                    setSearchQuery={setSearchQuery}
                    setSearchQueryCustomer={setSearchQueryCustomer}
                    filter={!state.userData.is_service}
                    filterModal={filterModal}
                    filterItemSelected={filterItemSelected}
                    setFilterItemSelected={setFilterItemSelected}
                    onPressClearData={onPressClearData}
                    isFilterActive={isFilterActive}
                />
            </View>
            {isFilter && filterContent()}
            <View style={styles.chatMain}>
                <FilterCommon
                    FilterItem={FilterItem}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    state={state}
                    handleFilterClick={handleFilterClick}
                    setSelectedValue={setSelectedValue}
                />
            </View>
            {refreshing ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : (
                <>
                    {selectedFilter.id === 1 &&
                        (state.userData.is_service ? (
                            <FlatList
                                bounces={false}
                                data={bookingListStay}
                                keyExtractor={item => item.id.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderProviderBookingPlaceToStay}
                                numColumns={1}
                                contentContainerStyle={{
                                    paddingHorizontal: SIZE(16),
                                }}
                                ListEmptyComponent={<NoBookingMain />}
                            />
                        ) : (
                            <FlatList
                                bounces={false}
                                data={bookingListCustomer}
                                keyExtractor={item => item.id.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderCardItemCustomerPlaceToStay}
                                numColumns={1}
                                ListEmptyComponent={<NoBookingMain />}
                            />
                        ))}
                    {selectedFilter.id === 2 &&
                        (state.userData.is_service ? (
                            <FlatList
                                bounces={false}
                                data={bookingListStay}
                                keyExtractor={item => item.id.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderProvider}
                                numColumns={1}
                                contentContainerStyle={{
                                    paddingHorizontal: SIZE(16),
                                }}
                                ListEmptyComponent={<NoBookingMain />}
                            />
                        ) : (
                            <FlatList
                                bounces={false}
                                data={bookingListCustomer}
                                keyExtractor={item => item.id.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderCardItemCustomerBorrowPet}
                                numColumns={1}
                                ListEmptyComponent={<NoBookingMain />}
                            />
                        ))}
                    {
                        selectedFilter.id === 3 &&
                            (state.userData.is_service ? (
                                <FlatList
                                    bounces={false}
                                    data={bookingListStay}
                                    keyExtractor={item => item.id.toString()}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={renderProviderTrainer}
                                    numColumns={1}
                                    contentContainerStyle={{
                                        paddingHorizontal: SIZE(16),
                                    }}
                                    ListEmptyComponent={<NoBookingMain />}
                                />
                            ) : (
                                <FlatList
                                    bounces={false}
                                    data={bookingListCustomer}
                                    keyExtractor={item => item.id.toString()}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={renderTrainerBookingCustomer}
                                    numColumns={1}
                                    ListEmptyComponent={<NoBookingMain />}
                                />
                            ))
                        // null
                    }
                    {selectedFilter.id === 4 && <NoBookingMain />}
                    <Modal
                        isVisible={modalVisible}
                        animationInTiming={400}
                        animationOutTiming={400}
                        animationIn={'zoomIn'}
                        animationOut={'zoomOut'}
                        backdropOpacity={0.2}
                        useNativeDriver={false}
                        useNativeDriverForBackdrop={true}
                        onSwipeComplete={() => setModalVisible(false)}
                        style={{
                            margin: 0,
                            height: SIZES.height * 0.97,
                        }}
                        onBackdropPress={() => setModalVisible(false)}
                        propagateSwipe={true}
                        avoidKeyboard={true}>
                        <View
                            style={[
                                styles.modalContainer1,
                                {padding: SIZE(30)},
                            ]}>
                            <BookingSingleModal
                                filterPage={filterPage}
                                item={selectedModalItem}
                            />
                        </View>
                    </Modal>
                </>
            )}
        </View>
    );
};

export default Bookings;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        flex: 1,
    },
    headContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZE(14),
        borderBottomWidth: SIZE(1),
        borderColor: '#0000001A',
        backgroundColor: '#F7F7F7',
    },
    headLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    BookingText: {
        fontSize: SIZE(20),
        color: '#00171F',
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        marginLeft: SIZE(20),
    },
    headRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headIcons: {
        width: SIZE(40),
        height: SIZE(40),
        padding: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(100),
        backgroundColor: '#fff',
    },
    filterContainer: {
        flexDirection: 'row',
        paddingTop: SIZE(20),
        paddingBottom: SIZE(20),
        paddingHorizontal: SIZE(20),
    },
    filterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(14),
        borderColor: '#E2E2E2',
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        backgroundColor: '#FFFFFF',
    },
    filterItemText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontWeight: '600',
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
    },
    chatMain: {
        paddingHorizontal: SIZE(16),
    },
    mainContainer: {
        marginTop: SIZE(14),
        paddingHorizontal: SIZE(20),
        flex: 1,
    },
    recentBookingSection: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E2E2',
        borderWidth: SIZE(1),
        borderRadius: SIZE(10),
        padding: SIZE(14),
        marginBottom: SIZE(14),
    },
    recentBookingTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    recentBookingHead: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentBookingName: {
        color: '#00171F',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    recentBookingStatus: {
        backgroundColor: '#CF67291A',
        color: '#F69459',
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(4),
        borderRadius: SIZE(8),
        marginRight: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
    },
    recentBookingData: {
        marginRight: SIZE(10),
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(14),
    },
    recentBookingMain: {
        marginTop: SIZE(14),
    },
    recentBooking: {
        paddingVertical: SIZE(14),
        borderBottomWidth: SIZE(1),
        borderTopWidth: SIZE(1),
        borderColor: '#E2E2E2',
        flexDirection: 'row',
        marginBottom: SIZE(12),
    },
    recentImage: {
        width: SIZE(130),
        height: SIZE(130),
        marginRight: SIZE(12),
        borderRadius: SIZE(10),
        overflow: 'hidden',
    },
    recentRight: {
        justifyContent: 'center',
    },
    recentDetails: {
        flexDirection: 'row',
        marginBottom: SIZE(4),
    },
    recentDetailsCategory: {
        width: '50%',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        fontWeight: '400',
    },
    recentDott: {
        marginRight: SIZE(15),
        marginLeft: SIZE(5),
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        fontWeight: '400',
    },
    recentDetailsName: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        fontWeight: '400',
    },
    recentLocationIcon: {
        flexDirection: 'row',
        marginVertical: SIZE(10),
    },
    recentLocationName: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(18),
        marginLeft: SIZE(4),
        color: '#757575',
    },
    recentBookingRating: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        color: '#00171F',
    },
    acceptDeclineBooking: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    acceptDeclineButton: {
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        borderRadius: SIZE(6),
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(32),
        width: SIZE(152),
    },
    acceptDeclineText: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        color: '#009FD3',
        textAlign: 'center',
    },
    acceptButton: {
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(6),
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(32),
        width: SIZE(152),
        backgroundColor: '#003459',
    },
    acceptText: {
        color: '#FFFFFF',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        textAlign: 'center',
    },
    selectedFilterItem: {
        marginRight: SIZE(12),
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        borderColor: '#003459',
        backgroundColor: '#EAF7FF',
    },
    selectedFilterItemText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontWeight: '600',
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
    },
    barContainer: {
        backgroundColor: '#009FD3',
        width: SIZE(70),
        height: SIZE(4),
        borderRadius: SIZE(100),
        alignSelf: 'center',
        marginTop: SIZE(16),
        marginBottom: SIZE(22),
    },
    filterMain: {
        padding: SIZE(12),
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        width: SIZE(149),
        position: 'absolute',
        right: SIZE(16),
        top: SIZE(65),
        zIndex: 1000,
        elevation: 1,
    },
    buttonContainer: {
        padding: SIZE(8),
        borderRadius: SIZE(6),
    },
    buttonText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
        fontWeight: '600',
        color: '#003459',
    },
});
