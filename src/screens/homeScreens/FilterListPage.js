import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native';

//packages
import Modal from 'react-native-modal';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';

//components
import {GoogleMapHeaderFilter} from '../goolgle-map/GoogleMapHeader';
import HomeArrivalCard from './common-renders/HomeArrivalCard';
import MainFilter from '../filter/MainFilter';
import MapViewCards from '../goolgle-map/MapViwCards';
import {
    ApiSectionCustomerBorrowList,
    ApiSectionCustomerList,
} from '../main/ApiSection';

//images and logos
import MapIcon from '../../assets/icons/map.svg';
import SpotLightLogo from '../../assets/icons/booking/no-data.svg';
import EmptyPlace from '../../assets/icons/emptyplace.svg';
import TrainerCard from '../goolgle-map/TrainerCard';
import {TrainerApisection} from '../main/TrainerApiSection';
import CustomToast from '../../components/toast/CustomToast';
import Toast from 'react-native-toast-notifications';

//redux

const FilterListPage = ({navigation, route}) => {
    const {state} = useContext(Context);
    const toastRef = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [placeToStayLIst, setPlaceToStayLIst] = useState(false);
    const [borrowPetList, setBorrowPetList] = useState(false);
    const [trainerList, setTrainerList] = useState();

    const [navigate, setNavigate] = useState(
        route.params ? route.params.navigate : '',
    );
    const [isSearch, setIsSearch] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [filterApplied, setFilterApplied] = useState();
    const [routeData, setRouteData] = useState();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setRouteData(route.params);
            setLoading(false);
        }, 1000);
    }, [route]);

    ApiSectionCustomerList(
        refreshing,
        searchQuery,
        setPlaceToStayLIst,
        state.userData.exactLocation.latitude,
        state.userData.exactLocation.longitude,
        routeData?.pet_type ? routeData?.pet_type : '',
        routeData?.min_price ? routeData?.min_price : '',
        routeData?.max_price ? routeData?.max_price : '',
        routeData?.max_price ? routeData?.start_date : '',
        routeData?.max_price ? routeData?.end_date : '',
        setLoading,
    );

    ApiSectionCustomerBorrowList(
        refreshing,
        searchQuery,
        setBorrowPetList,
        state.userData.exactLocation.latitude,
        state.userData.exactLocation.longitude,
        routeData?.pet_type ? routeData?.pet_type : '',
        routeData?.min_price ? routeData?.min_price : '',
        routeData?.max_price ? routeData?.max_price : '',
        routeData?.max_price ? routeData?.start_date : '',
        routeData?.max_price ? routeData?.end_date : '',
        setLoading,
    );

    TrainerApisection(
        refreshing,
        searchQuery,
        setTrainerList,
        state.userData.exactLocation.latitude,
        state.userData.exactLocation.longitude,
        routeData?.pet_type ? routeData?.pet_type : '',
        routeData?.min_price ? routeData?.min_price : '',
        routeData?.max_price ? routeData?.max_price : '',
        routeData?.max_price ? routeData?.start_date : '',
        routeData?.max_price ? routeData?.end_date : '',
        setLoading,
    );

    const filterPage = () => {
        setModalVisible(!modalVisible);
    };

    const renderCardItem = ({item}) => (
        <HomeArrivalCard navigation={navigation} selected={item} />
    );

    const renderItemTrainer = ({item, index}) => (
        <View style={{marginBottom: SIZE(10)}}>
            <TrainerCard
                params={navigate}
                selected={item}
                selectedFilter={'Trainers'}
            />
        </View>
    );

    const renderPlaceToStay = ({item}) => (
        <View style={{marginBottom: SIZE(10)}}>
            <MapViewCards
                params={navigate}
                selected={item}
                selectedFilter={'place_to_stay'}
            />
        </View>
    );

    useEffect(() => {
        setRefreshing(!refreshing);
    }, [state.userData.is_login]);

    return (
        <>
            <View style={{borderWidth: 0}} activeOpacity={0.7}>
                <View
                    style={{
                        paddingHorizontal: SIZE(16),
                        borderBottomWidth: SIZE(1),
                        borderColor: '#d2d2d2',
                    }}>
                    <GoogleMapHeaderFilter
                        navigation={navigation}
                        header={navigate?.header}
                        filterPage={filterPage}
                        isSearch={route?.params?.search ? false : isSearch}
                        setIsSearch={setIsSearch}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        geoAddressText={route?.params?.geoAddressText}
                        filterApplied={routeData?.max_price}
                        setFilterApplied={setFilterApplied}
                        setRouteData={setRouteData}
                    />
                </View>
                {loading ? (
                    <ActivityIndicator
                        style={{
                            height: SIZES.height - SIZE(185),
                        }}
                        size="large"
                        color={'#007EA7'}
                    />
                ) : (
                    <>
                        {navigate?.direction_of === 'Borrow' && (
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
                                    paddingBottom: SIZES.height * 0.12,
                                    paddingTop: SIZE(10),
                                }}
                                ListEmptyComponent={
                                    <View style={styles.spotlightMain}>
                                        <View style={styles.spotlight}>
                                            <SpotLightLogo
                                                width={'100%'}
                                                height={'100%'}
                                            />
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
                        )}
                        {navigate?.direction_of == 'Place_to_stay' && (
                            <FlatList
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                                data={placeToStayLIst}
                                keyExtractor={item => item.id.toString()}
                                renderItem={renderPlaceToStay}
                                numColumns={0}
                                contentContainerStyle={{
                                    paddingBottom: SIZES.height * 0.12,
                                    paddingTop: SIZE(10),
                                }}
                                ListEmptyComponent={
                                    <View style={styles.spotlightMain}>
                                        <View style={styles.spotlight}>
                                            <EmptyPlace
                                                width={'100%'}
                                                height={'100%'}
                                            />
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
                        )}
                        {navigate?.direction_of == 'Trainers' && (
                            <FlatList
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                                data={trainerList}
                                keyExtractor={item => item.id.toString()}
                                renderItem={renderItemTrainer}
                                numColumns={0}
                                contentContainerStyle={{
                                    paddingBottom: SIZES.height * 0.12,
                                    paddingTop: SIZE(10),
                                    alignItems: 'center',
                                }}
                                ListEmptyComponent={
                                    <View style={styles.spotlightMain}>
                                        <View style={styles.spotlight}>
                                            <EmptyPlace
                                                width={'100%'}
                                                height={'100%'}
                                            />
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
                        )}
                    </>
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
                    style={{
                        margin: 0,
                    }}
                    onBackdropPress={() => setModalVisible(false)}
                    propagateSwipe={true}
                    avoidKeyboard={true}>
                    <View
                        style={[
                            styles.modalContainer,
                            {
                                height:
                                    Platform.OS === 'ios'
                                        ? SIZES.height - SIZE(90)
                                        : SIZES.height - SIZE(40),
                                backgroundColor: '#f7f7f7',
                            },
                        ]}>
                        <View style={styles.barContainer}></View>
                        <MainFilter
                            navigation={navigation}
                            filterPage={filterPage}
                            // setFilterApplied={setFilterApplied}
                            toastRef={toastRef}
                        />
                    </View>
                    <Toast
                        renderToast={toastOptions => {
                            return <CustomToast toastOptions={toastOptions} />;
                        }}
                        successColor="#009FD3"
                        warningColor="orange"
                        ref={toastRef}
                        duration={2000}
                        offsetBottom={SIZE(100)}
                    />
                </Modal>
            </View>
            <View style={styles.mapButtonMain}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    activeOpacity={0.8}
                    style={styles.mapButtonSub}>
                    <Text allowFontScaling={false} style={styles.mapText}>
                        Map
                    </Text>
                    <View style={styles.mapIconContainer}>
                        <MapIcon width={'100%'} height={'100%'} />
                    </View>
                </TouchableOpacity>
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
    filterContainer: {
        flexDirection: 'row',
        height: SIZE(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
    },
    selectedFilterItem: {
        marginRight: SIZE(12),
        borderWidth: 0.5,
        borderRadius: 20,
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
    mapButtonMain: {
        position: 'absolute',
        bottom: SIZES.height / 25,
        left: SIZES.width / 2.75,
        backgroundColor: '#009FD3',
        borderRadius: SIZE(40),
        // zIndex: 100000,
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
        left: SIZE(150),
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

export default FilterListPage;
