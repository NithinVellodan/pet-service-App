import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Platform,
    Animated,
} from 'react-native';
import React, {
    useRef,
    useState,
    useContext,
    useEffect,
    useMemo,
    useCallback,
} from 'react';

//packages
import {useRoute} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-notifications';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';

//components
import MapViewCardOptional from './MapViewCardOptional';
import HomeArrivalCard from '../homeScreens/common-renders/HomeArrivalCard';
import GoogleMapHeaderFilter from './GoogleMapHeader';
import GoogleMap from './GoogleMap';
import MapViewCards from './MapViwCards';
import MainFilter from '../filter/MainFilter';
import {
    ApiSectionCustomerList,
    ApiSectionCustomerBorrowList,
} from '../main/ApiSection';
import CustomToast from '../../components/toast/CustomToast';
import TrainerCard from './TrainerCard';
import {TrainerApisection} from '../main/TrainerApiSection';

//images and logos
import Map1 from '../../assets/icons/map-view/map1.svg';
import SpotLightLogo from '../../assets/icons/booking/no-data.svg';
import EmptyPlace from '../../assets/icons/emptyplace.svg';

const {height: WINDOW_HEIGHT, width: WINDOW_WIDTH} = Dimensions.get('window');

const BottomMapSheet = ({navigation}) => {
    const {state, dispatch} = useContext(Context);
    const route = useRoute();
    const toastRef = useRef();
    const {params} = route;
    const [modalVisible, setModalVisible] = useState(false);
    const [placeToStayLIst, setPlaceToStayLIst] = useState(false);
    const [borrowPetList, setBorrowPetList] = useState(false);
    const [trainerList, setTrainerList] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [navigate, setNavigate] = useState(params ? params : '');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [regionList, setRegionList] = useState({});
    const [filterData, setFilterData] = useState('');

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['35%', '35%', '90%'], []);
    const [showSectionList, setShowSectionList] = useState(false);
    const fadeAnim = useRef(
        new Animated.Value(showSectionList ? 0 : 1),
    ).current;
    const fadeAnim2 = useRef(
        new Animated.Value(showSectionList ? 0 : 1),
    ).current;
    const fadeAnim3 = useRef(
        new Animated.Value(showSectionList ? 0 : 1),
    ).current;

    useEffect(() => {
        if (showSectionList) {
            Animated.timing(fadeAnim2, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim2, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [showSectionList]);

    useEffect(() => {
        if (showSectionList) {
            Animated.timing(fadeAnim3, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim3, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [showSectionList]);

    if (navigate.direction_of == 'Place_to_stay') {
        ApiSectionCustomerList(
            refreshing,
            searchQuery,
            setPlaceToStayLIst,
            regionList.latitude
                ? regionList.latitude
                : state.userData.exactLocation.latitude,
            regionList.longitude
                ? regionList.longitude
                : state.userData.exactLocation.longitude,
            filterData?.pet_type ? filterData?.pet_type : '',
            filterData?.min_price ? filterData?.min_price : '',
            filterData?.max_price ? filterData?.max_price : '',
            filterData?.max_price ? filterData?.start_date : '',
            filterData?.max_price ? filterData?.end_date : '',
            setLoading,
        );
    } else if (navigate.direction_of === 'Borrow') {
        ApiSectionCustomerBorrowList(
            refreshing,
            searchQuery,
            setBorrowPetList,
            regionList.latitude
                ? regionList.latitude
                : state.userData.exactLocation.latitude,
            regionList.longitude
                ? regionList.longitude
                : state.userData.exactLocation.longitude,
            filterData?.pet_type ? filterData?.pet_type : '',
            filterData?.min_price ? filterData?.min_price : '',
            filterData?.max_price ? filterData?.max_price : '',
            filterData?.max_price ? filterData?.start_date : '',
            filterData?.max_price ? filterData?.end_date : '',
            setLoading,
        );
    } else if (navigate.direction_of === 'Trainers') {
        TrainerApisection(
            refreshing,
            searchQuery,
            setTrainerList,
            regionList.latitude
                ? regionList.latitude
                : state.userData.exactLocation.latitude,
            regionList.longitude
                ? regionList.longitude
                : state.userData.exactLocation.longitude,
            filterData?.pet_type ? filterData?.pet_type : '',
            filterData?.min_price ? filterData?.min_price : '',
            filterData?.max_price ? filterData?.max_price : '',
            filterData?.max_price ? filterData?.start_date : '',
            filterData?.max_price ? filterData?.end_date : '',
            setLoading,
        );
    }

    const handleSheetChanges = useCallback(index => {
        if (index === 2) {
            setShowSectionList(true);
        } else {
            setFilterData('');
            setShowSectionList(false);
        }
    }, []);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: showSectionList ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [showSectionList]);

    const filterPage = () => {
        setModalVisible(!modalVisible);
    };

    const renderItem = ({item, index}) => (
        <View style={{marginBottom: SIZE(10)}}>
            <MapViewCards
                description_is={false}
                params={params}
                selected={item}
                selectedFilter={'place_to_stay'}
            />
        </View>
    );

    const renderCardItem = ({item}) => (
        <HomeArrivalCard
            navigation={navigation}
            selected={item}
            state={state}
        />
    );

    const renderItemTrainer = ({item, index}) => (
        <View style={{marginBottom: SIZE(10)}}>
            <TrainerCard params={params} selected={item} />
        </View>
    );

    const renderItemFooter = ({item, index}) => (
        <View style={{height: SIZE(25)}}></View>
    );

    useEffect(() => {
        setRefreshing(!refreshing);
    }, [state.userData.is_login]);

    const SectionList = () => {
        if (navigate.direction_of == 'Place_to_stay') {
            return (
                <FlatList
                    bounces={false}
                    style={{paddingVertical: 16}}
                    showsVerticalScrollIndicator={false}
                    data={placeToStayLIst}
                    renderItem={renderItem}
                    ListFooterComponent={renderItemFooter}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={
                        <View style={styles.spotlightMain}>
                            <View style={styles.spotlight}>
                                <EmptyPlace width={'100%'} height={'100%'} />
                            </View>
                            <View style={styles.bottom}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.mainText}>
                                    No Data Available
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.subText}>
                                    No data, please try again later
                                </Text>
                            </View>
                        </View>
                    }
                />
            );
        } else if (navigate.direction_of == 'Borrow') {
            return (
                <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={borrowPetList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderCardItem}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        paddingHorizontal: SIZE(16),
                    }}
                    contentContainerStyle={{
                        paddingBottom: SIZES.height * 0.01,
                    }}
                    ListEmptyComponent={
                        <View style={styles.spotlightMain}>
                            <View style={styles.spotlight}>
                                <SpotLightLogo width={'100%'} height={'100%'} />
                            </View>
                            <View style={styles.bottom}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.mainText}>
                                    No Data Available
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.subText}>
                                    No data, please try again later
                                </Text>
                            </View>
                        </View>
                    }
                />
            );
        } else if (navigate.direction_of == 'Trainers') {
            return (
                <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={trainerList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItemTrainer}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingTop: SIZE(10),
                    }}
                    ListEmptyComponent={
                        <View style={styles.spotlightMain}>
                            <View style={styles.spotlight}>
                                <SpotLightLogo width={'100%'} height={'100%'} />
                            </View>
                            <View style={styles.bottom}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.mainText}>
                                    No Data Available
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.subText}>
                                    No data, please try again later
                                </Text>
                            </View>
                        </View>
                    }
                />
            );
        }
    };

    const getData = () => {
        if (navigate.direction_of === 'Place_to_stay') return placeToStayLIst;
        if (navigate.direction_of === 'Borrow') return borrowPetList;
        if (navigate.direction_of === 'Trainers') return trainerList;
        return [];
    };

    const [userLocation, setUserLocation] = useState(null);
    const [geoAddressText, setGeoAddressText] = useState(null);

    return (
        <View>
            <View style={styles.topContainer}>
                <View style={styles.headerContainer}>
                    <GoogleMapHeaderFilter
                        filterPage={filterPage}
                        navigation={navigation}
                        header={navigate.header}
                        setSearchQuery={setSearchQuery}
                        isSearch={isSearch}
                        setIsSearch={setIsSearch}
                        navigate={navigate}
                        geoAddressText={geoAddressText}
                        bottomSheetRef={bottomSheetRef}
                        setShowSectionList={setShowSectionList}
                        filterData={filterData}
                        setFilterData={setFilterData}
                        showSectionList={showSectionList}
                    />
                </View>
                <View style={{flex: 1}}>
                    {/* <Animated.View
                        style={[styles.mapContainer, {opacity: fadeAnim}]}
                        // pointerEvents={showSectionList ? 'none' : 'auto'}
                    > */}
                    <GoogleMap
                        params={params}
                        userLocation={userLocation}
                        geoAddressText={geoAddressText}
                        sizeChanger={
                            navigate.direction_of === 'Place_to_stay'
                                ? placeToStayLIst?.length !== 0
                                : borrowPetList?.length !== 0
                        }
                        setRegionList={setRegionList}
                    />
                    {/* </Animated.View> */}
                    <Animated.View
                        style={[
                            styles.emptyView,
                            {
                                opacity: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0],
                                }),
                            },
                        ]}
                        // pointerEvents={showSectionList ? 'auto' : 'none'}
                    />
                </View>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                handleIndicatorStyle={[
                    styles.line,
                    {
                        display: showSectionList ? 'none' : 'flex',
                    },
                ]}
                backgroundStyle={{backgroundColor: '#f7f7f7'}}
                keyExtractor={(item, index) => index.toString()}
                onChange={handleSheetChanges}>
                <BottomSheetFlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={getData()}
                    renderItem={({item, index}) => (
                        <Animated.View key={index} style={{opacity: fadeAnim3}}>
                            <View
                                style={{
                                    marginBottom: !showSectionList
                                        ? SIZE(10)
                                        : 0,
                                }}>
                                {!showSectionList ? (
                                    <>
                                        {navigate.direction_of ===
                                            'Place_to_stay' && (
                                            <MapViewCardOptional
                                                description_is={false}
                                                params={params}
                                                selected={item}
                                                selectedFilter={'place_to_stay'}
                                            />
                                        )}
                                        {navigate.direction_of === 'Borrow' && (
                                            <MapViewCardOptional
                                                description_is={false}
                                                params={params}
                                                selected={item}
                                                selectedFilter={'borrow'}
                                            />
                                        )}
                                        {navigate.direction_of ===
                                            'Trainers' && (
                                            <TrainerCard
                                                description_is_false={true}
                                                params={params}
                                                selected={item}
                                                selectedFilter={'Trainers'}
                                            />
                                        )}
                                    </>
                                ) : null}
                            </View>
                        </Animated.View>
                    )}
                    ListHeaderComponent={() => (
                        <View
                            style={{
                                marginBottom: showSectionList
                                    ? Platform.OS === 'ios'
                                        ? Dimensions.get('window').height >=
                                          SIZE(812)
                                            ? SIZE(100)
                                            : SIZE(0)
                                        : SIZE(0)
                                    : 0,
                            }}>
                            {loading ? (
                                <ActivityIndicator
                                    style={{
                                        height: showSectionList
                                            ? SIZE(600)
                                            : SIZE(200),
                                    }}
                                    size={'large'}
                                    color={'#009fd3'}
                                />
                            ) : showSectionList ? (
                                <Animated.View style={{opacity: fadeAnim2}}>
                                    <SectionList />
                                </Animated.View>
                            ) : (navigate.direction_of === 'Place_to_stay' &&
                                  placeToStayLIst?.length !== 0) ||
                              (navigate.direction_of === 'Borrow' &&
                                  borrowPetList?.length !== 0) ||
                              (navigate.direction_of === 'Trainers' &&
                                  trainerList?.length !== 0) ? (
                                <View>
                                    <Text style={styles.explore}>
                                        {navigate.direction_of ===
                                            'Place_to_stay' &&
                                            placeToStayLIst?.length !== 0 && (
                                                <>
                                                    Explore{' '}
                                                    {Math.max(
                                                        placeToStayLIst.length -
                                                            1,
                                                        0,
                                                    )}{' '}
                                                    +
                                                </>
                                            )}
                                        {navigate.direction_of === 'Borrow' &&
                                            borrowPetList?.length !== 0 && (
                                                <>
                                                    Explore{' '}
                                                    {Math.max(
                                                        borrowPetList.length -
                                                            1,
                                                        0,
                                                    )}{' '}
                                                    +
                                                </>
                                            )}
                                        {navigate.direction_of === 'Trainers' &&
                                            trainerList?.length !== 0 && (
                                                <>
                                                    Explore{' '}
                                                    {Math.max(
                                                        trainerList.length - 1,
                                                        0,
                                                    )}{' '}
                                                    +
                                                </>
                                            )}
                                    </Text>
                                </View>
                            ) : navigate.direction_of === 'Place_to_stay' ? (
                                <View style={styles.spotlightMini}>
                                    <EmptyPlace
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.mainText,
                                            {fontSize: SIZE(12)},
                                        ]}>
                                        No Data Available
                                    </Text>
                                </View>
                            ) : navigate.direction_of === 'Borrow' ? (
                                <View style={styles.spotlightMini}>
                                    <SpotLightLogo
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.mainText,
                                            {fontSize: SIZE(12)},
                                        ]}>
                                        No Data Available
                                    </Text>
                                </View>
                            ) : navigate.direction_of === 'Trainers' ? (
                                <View style={styles.spotlightMini}>
                                    <SpotLightLogo
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.mainText,
                                            {fontSize: SIZE(12)},
                                        ]}>
                                        No Data Available
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    )}
                />
            </BottomSheet>
            {showSectionList && (
                <View style={styles.mapButtonMain}>
                    <TouchableOpacity
                        onPress={() => {
                            setFilterData('');
                            setIsSearch(false);
                            bottomSheetRef.current.snapToIndex(1);
                            setShowSectionList(false);
                        }}
                        activeOpacity={0.8}
                        style={styles.mapButtonSub}>
                        <Text allowFontScaling={false} style={styles.mapText}>
                            Map
                        </Text>
                        <View style={styles.mapIconContainer}>
                            <Map1 width={'100%'} height={'100%'} />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
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
                style={{margin: 0}}
                onBackdropPress={() => setModalVisible(false)}
                propagateSwipe={true}
                onBackButtonPress={() => setModalVisible(false)}
                avoidKeyboard={true}>
                <View
                    style={[
                        styles.modalContainer,
                        {
                            height:
                                Platform.OS === 'ios'
                                    ? SIZES.height - SIZE(90)
                                    : SIZES.height - SIZE(40),
                        },
                        {marginTop: 0},
                    ]}>
                    <View style={styles.barContainer}></View>
                    <MainFilter
                        navigation={navigation}
                        filterPage={filterPage}
                        navigate={navigate}
                        geoAddressText={geoAddressText}
                        toastRef={toastRef}
                        bottomSheetRef={bottomSheetRef}
                        setShowSectionList={setShowSectionList}
                        setFilterData={setFilterData}
                    />
                </View>
                <Toast
                    renderToast={toastOptions => (
                        <CustomToast toastOptions={toastOptions} />
                    )}
                    successColor="#009FD3"
                    warningColor="orange"
                    ref={toastRef}
                    duration={2000}
                    offsetBottom={SIZE(100)}
                />
            </Modal>
        </View>
    );
};
export default BottomMapSheet;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        minHeight: '100%',
        borderTopLeftRadius: SIZE(30),
        borderTopRightRadius: SIZE(30),
        flex: 1,
    },
    topContainer: {
        height: WINDOW_HEIGHT,
    },
    headerContainer: {
        paddingHorizontal: SIZE(16),
        borderBottomWidth: SIZE(1),
        borderColor: '#d2d2d2',
        backgroundColor: '#F7F7F7',
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    emptyView: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f7f7f7',
        position: 'absolute',
        top: 0,
        height: SIZE(20),
    },
    bottomContent: {
        paddingHorizontal: SIZE(25),
        paddingVertical: SIZE(13),
        borderRadius: SIZE(100),
        backgroundColor: '#009FD3',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderWidth: SIZE(0.5),
        borderColor: '#d2d2d2',
    },
    line: {
        width: SIZE(50),
        height: Platform.OS === 'ios' ? SIZE(5) : SIZE(4),
        backgroundColor: '#009FD3',
        borderRadius: Platform.OS === 'ios' ? SIZE(10) : SIZE(2),
        alignSelf: 'center',
        marginTop: Platform.OS === 'android' ? SIZE(10) : 0,
    },
    dragableArea: {
        width: SIZE(100),
        height: SIZE(30),
        alignSelf: 'center',
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
    },
    explore: {
        marginBottom: SIZE(16),
        color: '#003459',
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),

        alignSelf: 'center',
    },
    modalContainer: {
        backgroundColor: '#f7f7f7',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(30),
        borderTopRightRadius: SIZE(30),
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
    spotlightMain: {
        flex: 1,
        marginTop: SIZE(80),
        alignItems: 'center',
        justifyContent: 'center',
    },
    spotlight: {
        width: SIZE(300),
        height: SIZE(300),
        marginBottom: SIZE(32),
    },
    spotlightMini: {
        width: SIZE(120),
        height: SIZE(120),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: SIZE(50),
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
    mapButtonMain: {
        position: 'absolute',
        bottom:
            Platform.OS === 'ios'
                ? Dimensions.get('window').height >= SIZE(812)
                    ? SIZE(120)
                    : SIZE(50)
                : SIZE(50),
        left: SIZES.width / 2.75,
        backgroundColor: '#009FD3',
        borderRadius: SIZE(40),
    },
    mapButtonSub: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(24),
        paddingVertical: SIZE(14),
    },
    mapText: {
        color: '#fff',
        marginRight: SIZE(12),
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    mapIconContainer: {
        width: SIZE(20),
        height: SIZE(20),
    },
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: WINDOW_HEIGHT,
        backgroundColor: '#f7f7f7',
        borderTopLeftRadius: SIZE(20),
        borderTopRightRadius: SIZE(20),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: SIZE(-3),
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        top: SIZES.height / 7,
    },
    draggableArea: {
        width: '100%',
        height: SIZE(30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    dragHandle: {
        width: SIZE(100),
        height: SIZE(6),
        backgroundColor: '#d3d3d3',
        borderRadius: SIZE(3),
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        padding: SIZE(20),
    },
    text: {
        fontSize: SIZE(16),
        marginBottom: SIZE(20),
    },
});
