import React, {useContext, useState} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Text,
} from 'react-native';

//packages
import Modal from 'react-native-modal';

// constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';

//components
import WishListHeader from '../includes/headers/WishListHeader';
import TrainerCard from '../goolgle-map/TrainerCard';
import FilterCommon from '../main/includes/FilterCommon';
import MapViewCards from '../goolgle-map/MapViwCards';
import MainFilter from '../filter/MainFilter';

//images and logos
import SpotLightLogo from '../../assets/icons/spotlightwishlist.svg';

//axios config

//redux
const {height: WINDOW_HEIGHT, width: WINDOW_WIDTH} = Dimensions.get('window');

const Wishlist = ({navigation}) => {
    const {state} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState({
        id: 1,
        type: 'Place to Stay',
    });
    const [wishlist, setWishlist] = useState({});
    const [isSearch, setIsSearch] = useState(false);
    const [wishListSearchQuery, setWishListSearchQuery] = useState('');

    const customSearch = (searchText, items) => {
        const searchQuery = searchText.toLowerCase();
        const filteredItems = items.filter(
            item =>
                (item.title &&
                    item.title.toLowerCase().includes(searchQuery)) ||
                (item.description &&
                    item.description.toLowerCase().includes(searchQuery)) ||
                (item.pet_breed &&
                    item.pet_breed.toLowerCase().includes(searchQuery)),
        );

        return filteredItems;
    };

    const searchResults = customSearch(
        wishListSearchQuery,
        selectedFilter.id === 1
            ? state?.additionalData
            : state?.additionalDataPetWish,
    );

    const filterPage = () => {
        setModalVisible(!modalVisible);
    };

    const renderCardItem = ({item}) => (
        <View style={{marginBottom: SIZE(20)}}>
            <MapViewCards
                page="Wishlist"
                navigation={navigation}
                selected={item}
                wishlist={wishlist}
                setWishlist={setWishlist}
                handleTemporarilyRemoveWishlist={
                    handleTemporarilyRemoveWishlist
                }
                selectedFilter={'place_to_stay'}
            />
        </View>
    );
    const renderCardItem2 = ({item}) => (
        <View style={{marginBottom: SIZE(20)}}>
            <MapViewCards
                page="Wishlist"
                navigation={navigation}
                selected={item}
                wishlist={wishlist}
                setWishlist={setWishlist}
                handleTemporarilyRemoveWishlist={
                    handleTemporarilyRemoveWishlist
                }
                selectedFilter={'borrow'}
            />
        </View>
    );

    const renderItemTrainer = ({item, index}) => (
        <View style={{marginBottom: SIZE(10), alignItems: 'center'}}>
            <TrainerCard selected={item} is_wish_List={true} />
        </View>
    );

    const handleFilterClick = item => {
        setSelectedFilter(item);
    };

    const handleTemporarilyRemoveWishlist = itemId => {
        const updatedRenderItem = [...renderItem];
        const itemIndex = updatedRenderItem.findIndex(
            item => item.id === itemId,
        );
        if (itemIndex !== -1) {
            updatedRenderItem[itemIndex] = {
                ...updatedRenderItem[itemIndex],
                wishlist: false,
            };
            setRenderItem(updatedRenderItem);
        }
    };

    const FilterItem = [
        {
            id: 1,
            type: 'Place to Stay',
        },
        {
            id: 2,
            type: 'Borrow a Pet',
        },
        {
            id: 3,
            type: 'Trainer',
        },
    ];

    return (
        <>
            <View
                style={{
                    paddingHorizontal: SIZE(16),
                    borderBottomWidth: SIZE(1),
                    borderColor: '#0000001A',
                    backgroundColor: '#F7F7F7',
                }}>
                <WishListHeader
                    isSearch={isSearch}
                    headText="Wishlist"
                    setIsSearch={setIsSearch}
                    wishListSearchQuery={wishListSearchQuery}
                    setWishListSearchQuery={setWishListSearchQuery}
                />
            </View>
            <View
                style={{
                    backgroundColor: '#f7f7f7',
                    flex: 1,
                }}>
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
                <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={searchResults}
                    keyExtractor={item => item.id.toString()}
                    renderItem={
                        selectedFilter.id === 1
                            ? renderCardItem
                            : selectedFilter.id === 2
                            ? renderCardItem2
                            : selectedFilter.id === 3
                            ? renderItemTrainer
                            : null
                    }
                    numColumns={1}
                    ListEmptyComponent={() => (
                        <View style={styles.spotlightMain}>
                            <View style={styles.spotlight}>
                                <SpotLightLogo width={'100%'} height={'100%'} />
                            </View>
                            <View style={styles.bottom}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.mainText}>
                                    Empty Wishlist
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.subText}>
                                    Your Wishlist is Currently Empty.
                                </Text>
                            </View>
                        </View>
                    )}
                />
                <Modal
                    isVisible={modalVisible}
                    animationInTiming={400}
                    animationOutTiming={400}
                    animationIn={'slideInUp'}
                    backdropOpacity={0.2}
                    swipeDirection={['down']}
                    useNativeDriver={false}
                    useNativeDriverForBackdrop={true}
                    onSwipeComplete={() => setModalVisible(false)}
                    style={{
                        margin: 0,
                    }}
                    onBackdropPress={() => setModalVisible(false)}
                    propagateSwipe={true}
                    avoidKeyboard={true}>
                    <View
                        style={[
                            styles.modalContainer,
                            {height: WINDOW_HEIGHT * 0.97},
                        ]}>
                        <View style={styles.barContainer}></View>
                        <MainFilter
                            navigation={navigation}
                            filterPage={filterPage}
                        />
                    </View>
                </Modal>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
    },
    barContainer: {
        backgroundColor: '#009FD3',
        width: SIZE(70),
        height: SIZE(4),
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: SIZE(16),
        marginBottom: SIZE(22),
    },
    chatMain: {
        paddingHorizontal: SIZE(16),
    },
    spotlightMain: {
        height: SIZES.height - SIZE(250),
        alignItems: 'center',
        justifyContent: 'center',
    },
    spotlight: {
        width: SIZE(187),
        height: SIZE(235),
        marginBottom: SIZE(32),
    },
    bottom: {},
    mainText: {
        color: '#000',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: SIZE(12),
    },
    subText: {
        color: '#686868',
        fontFamily: FONTS.regular,
        fontSize: SIZE(16),
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: SIZE(24),
    },
});

export default Wishlist;
