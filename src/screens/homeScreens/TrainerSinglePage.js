import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    BackHandler,
    ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';

//packages
import firestore from '@react-native-firebase/firestore';
import Toast, {useToast} from 'react-native-toast-notifications';
import Modal from 'react-native-modal';

//constants
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';
import {AboutProvider2} from './includes/AboutProvider';
import {ApiSectionCustomerTrainerSingle} from '../main/TrainerApiSection';
import {useNavigation} from '@react-navigation/native';

//components
import TrainerSpotlight from './includes/TrainerSpotlight';
import ServiceAndPricingTrainer from './includes/ServiceAndPricingTrainer';
import GalleryTrainerSection from './includes/GalleryTrainerSection';
import ReviewTrainer from './includes/ReviewTrainer';
import CalenderForTrainerCustomer from '../includes/calendar/CalenderForTrainerCustomer';
import CustomToast from '../../components/toast/CustomToast';
import ModalScreen from '../Profile-related/ModalScreen';
import UserLogin from '../booking/includes/UserLogin';
import InternalServerError from '../error/InternalServerError';
import PageNotFound from '../error/PageNotFound';

//images and logos
import CalendarBlueIcon from '../../assets/icons/calendarblue.svg';

const TrainerSinglePage = ({route}) => {
    const navigation = useNavigation();
    const {state, dispatch} = useContext(Context);
    const toast = useToast();
    //States
    const [errorStatus, setErrorStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [singleItemPk, setSingleItemPk] = useState(route?.params?.pk);
    const [singleSectionData, setSingleSectionData] = useState();
    const [selectedItems, setSelectedItems] = useState([]);
    const [dateSelecteion, setDateSelection] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState('');
    // const [savedDates, setsavedDates] = useState([]);
    const [savedDates, setSavedDates] = useState([]);
    const [selectedDatesArray, setSelectedDatesArray] = useState([]);
    const [availableTime, setAvailableTime] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const toastRef = useRef();
    const [showAllItems, setShowAllItems] = useState(false);
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [userId, setUserId] = useState(state?.userData?.firebaseUid);
    const [userIdFromEmail, setUserIdFromEmail] = useState(null);
    const [users, setUsers] = useState([]);
    const [isType, setType] = useState('mail');
    const [userModal, setUserModal] = useState(false);
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    const handleDateRangeSelected = (startDate, endDate) => {
        setSelectedDateRange({startDate, endDate});
    };

    ApiSectionCustomerTrainerSingle(
        singleItemPk,
        setSingleSectionData,
        setIsLoading,
        refreshing,
        setErrorStatus,
        loading,
    );
    const renderItem = ({item}) => {
        return <ReviewTrainer item={item} />;
    };
    useEffect(() => {
        const total = selectedItems.reduce((total, item) => {
            return total + parseFloat(item.no_of_hours);
        }, 0);
        setTotalHours(total);
    }, [selectedItems]);

    const totalAmount = singleSectionData?.price_per_hour * totalHours;
    //firebase user get function
    useEffect(() => {
        getUserData()
            .then(res => setUsers(res))
            .catch(error => console.log('error', error));
    }, []);

    const convertDate = date => {
        const targetDate = new Date(date);
        const options = {day: '2-digit', month: 'short'};
        const formattedDate = targetDate
            .toLocaleDateString('en-US', options)
            .replace(',', '');
        return formattedDate;
    };
    const formattedDatesArray = savedDates.map(date => convertDate(date));

    const getUserData = async () => {
        const userRef = await firestore().collection('users').get();
        const userListData = Promise.all(
            userRef.docs
                .filter(item => {
                    return item.id != userId;
                })
                .map(async item => {
                    const id = item.id;
                    const name = item.data().name;
                    const mail = item.data().mail;
                    return {
                        id,
                        name,
                        mail,
                    };
                }),
        );

        return userListData;
    };

    //firebase filter id
    useEffect(() => {
        if (singleSectionData && singleSectionData.email) {
            const emailToFind = singleSectionData.email;
            const matchedUser = users.find(user => user.mail === emailToFind);
            if (matchedUser) {
                setUserIdFromEmail(matchedUser.id);
            } else {
                setUserIdFromEmail(null);
            }
        }
    }, [singleSectionData, users]);

    useEffect(() => {
        const backAction = () => {
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                navigation.navigate('MainDrawer');
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [navigation]);

    useEffect(() => {
        if (state.userData.is_login) {
            if (singleSectionData?.email === state?.userData?.mailId) {
                navigation.navigate('MainHome');
                toast.show('Cannot book yourself', {
                    type: 'warning',
                });
            }
        }
    }, [
        singleSectionData?.email,
        state?.userData?.mailId,
        state.userData.is_login,
    ]);

    return (
        <>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : errorStatus === 500 ? (
                <InternalServerError />
            ) : errorStatus === 404 ? (
                <PageNotFound />
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    data={singleSectionData?.reviews}
                    style={{
                        paddingHorizontal: SIZE(16),
                        backgroundColor: '#F7F7F7',
                    }}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    ListHeaderComponent={() => (
                        <View
                            style={{
                                paddingBottom: SIZE(20),
                            }}>
                            <TrainerSpotlight
                                spotlight_data={{
                                    experience: singleSectionData?.experience,
                                    price_per_hour:
                                        singleSectionData?.price_per_hour,
                                    description: singleSectionData?.description,
                                    name: singleSectionData?.name,
                                    rating: singleSectionData?.rating,
                                    is_in_wishlist:
                                        singleSectionData?.is_in_wishlist,
                                    id: singleSectionData?.id,
                                    location: singleSectionData?.location,
                                    image: singleSectionData?.image,
                                    userIdFromEmail: userIdFromEmail,
                                    userId: userId,
                                    cv: singleSectionData?.curriculum_vitae,
                                }}
                                setUserModal={setUserModal}
                                setScreen={setScreen}
                            />
                            <ServiceAndPricingTrainer
                                services={singleSectionData?.services}
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems}
                                price_per_hour={
                                    singleSectionData?.price_per_hour
                                }
                                pk={singleSectionData?.id}
                                dateSelecteion={dateSelecteion}
                                setDateSelection={setDateSelection}
                                calModalVisible={calModalVisible}
                                setCalModalVisible={setCalModalVisible}
                                showAllItems={showAllItems}
                                setShowAllItems={setShowAllItems}
                            />
                            <GalleryTrainerSection
                                gallery={singleSectionData?.trainer_gallery}
                            />
                            {singleSectionData?.location_data?.latitude ? (
                                <AboutProvider2
                                    about_services={
                                        singleSectionData?.about_trainer
                                    }
                                    exactLocation={
                                        singleSectionData?.location_data
                                    }
                                    finalLocation={
                                        singleSectionData?.location_data
                                            ?.location
                                    }
                                />
                            ) : null}
                            {singleSectionData?.reviews > 0 && (
                                <View style={styles.reviewsHead}>
                                    <Text style={styles.reviewsText}>
                                        Reviews
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(
                                                'CustomerReviews',
                                                {
                                                    reviews:
                                                        singleSectionData?.reviews,
                                                },
                                            );
                                        }}
                                        activeOpacity={0.8}>
                                        <Text style={styles.reviewsViewText}>
                                            View All
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View
                            style={{
                                height:
                                    savedDates.length !== 0
                                        ? SIZE(160)
                                        : SIZE(10),
                            }}></View>
                    )}
                />
            )}

            {savedDates.length !== 0 && selectedItems.length !== 0 ? (
                <View style={styles.bookNowMain}>
                    <View style={styles.bookNowLeft}>
                        <View style={styles.leftTop}>
                            <Text
                                allowFontScaling={false}
                                style={styles.priceLeft}>
                                AED{totalAmount}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.priceRight}>
                                (AED {singleSectionData?.price_per_hour} x{' '}
                                {totalHours})
                            </Text>
                        </View>
                        <View style={styles.leftBottom}>
                            <View style={styles.bookNowCalendar}>
                                <CalendarBlueIcon
                                    width={'100%'}
                                    height={'100%'}
                                />
                            </View>
                            <View style={styles.bookNowDate}>
                                {formattedDatesArray.map((item, index) => (
                                    <Text
                                        key={index}
                                        allowFontScaling={false}
                                        style={styles.dateTextOne}>
                                        {item}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate(
                                'BookingSummaryTrainerCustomer',
                                {
                                    selectedItems: selectedItems,
                                    price_per_hour:
                                        singleSectionData?.price_per_hour,
                                    selectedDatesArray: savedDates,
                                    totalHours: totalHours,
                                    selected: {
                                        experience:
                                            singleSectionData?.experience,
                                        price_per_hour:
                                            singleSectionData?.price_per_hour,
                                        description:
                                            singleSectionData?.description,
                                        name: singleSectionData?.name,
                                        rating: singleSectionData?.rating,
                                        is_in_wishlist:
                                            singleSectionData?.is_in_wishlist,
                                        id: singleSectionData?.id,
                                        location: singleSectionData?.location,
                                        image: singleSectionData?.image,
                                        average_rating:
                                            singleSectionData?.rating,
                                    },
                                },
                            );
                        }}
                        style={styles.bookNowRight}>
                        <Text
                            allowFontScaling={false}
                            style={styles.bookNowText}>
                            Book Now
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : null}

            <Modal
                isVisible={calModalVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                swipeDirection={['down']}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                onSwipeComplete={() => setCalModalVisible(false)}
                style={{margin: 0}}
                onBackdropPress={() => {
                    setCalModalVisible(false);
                    // setsavedDates([]);
                }}
                onBackButtonPress={() => setCalModalVisible(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.barContainer}></View>
                    <CalenderForTrainerCustomer
                        onDateRangeSelected={handleDateRangeSelected}
                        setCalModalVisible={setCalModalVisible}
                        defaultDateRange={selectedDateRange}
                        pk={singleSectionData?.id}
                        calModalVisible={calModalVisible}
                        setDateSelection={setDateSelection}
                        selectedItems={selectedItems}
                        savedDates={savedDates}
                        setSavedDates={setSavedDates}
                        availableTime={availableTime}
                        setAvailableTime={setAvailableTime}
                        toastRef={toastRef}
                        selectedDatesArray={selectedDatesArray}
                        setSelectedDatesArray={setSelectedDatesArray}
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
                    placement={'bottom'}
                />
            </Modal>
            <ModalScreen
                isVisible={userModal}
                setVisible={setUserModal}
                inner={
                    <UserLogin
                        isType={isType}
                        close={setUserModal}
                        screen={screen}
                        is_Firbase={is_Firbase}
                        setIs_Firbase={setIs_Firbase}
                    />
                }
            />
        </>
    );
};

export default TrainerSinglePage;

const styles = StyleSheet.create({
    aboutServices: {
        paddingVertical: SIZE(20),
    },
    reviewsHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SIZE(10),
    },
    reviewsText: {
        fontFamily: FONTS.semiBold,
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        lineHeight: SIZE(24),
    },
    reviewsViewText: {
        fontFamily: FONTS.bold,
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(24),
        letterSpacing: 0.5,
    },
    bookNowMain: {
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(32),
        paddingTop: SIZE(24),
        backgroundColor: '#FFFFFF',
        borderTopWidth: SIZE(1),
        borderTopColor: '#E2E2E2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bookNowLeft: {
        width: SIZE(220),
    },
    leftTop: {
        marginBottom: SIZE(10),
    },
    priceLeft: {
        color: '#242424',
        fontSize: SIZE(22),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    priceRight: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    bookNowCalendar: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(4),
    },
    bookNowDate: {
        flexDirection: 'row',
    },
    dateTextOne: {
        color: '#686868',
        fontSize: SIZE(12),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    dateTextTwo: {
        color: '#686868',
        fontSize: SIZE(12),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    bookNowRight: {
        paddingVertical: SIZE(14),
        paddingHorizontal: SIZE(32),
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
    },
    bookNowText: {
        color: '#fff',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
    leftBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(40),
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
});
