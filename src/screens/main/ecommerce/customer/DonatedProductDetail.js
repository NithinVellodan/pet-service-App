import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Share,
    Linking,
    ActivityIndicator,
    BackHandler,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

//packages
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useToast} from 'react-native-toast-notifications';

//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {Context} from '../../../../contexts/Store';
import InternalServerError from '../../../error/InternalServerError';
import PageNotFound from '../../../error/PageNotFound';
import {EcommerceApiDonatedProductSingle} from '../../EcommerceCustomerApi';

//components
import ProductDescription from '../includes/ProductDescription';
import Description from '../includes/Description';
import UserContainer from '../includes/UserContainer';
import ClaimNowButton from '../includes/ClaimNowButton';
import ModalScreen from '../../../Profile-related/ModalScreen';
import UserLogin from '../../../booking/includes/UserLogin';

//svg
import ShareIcon from '../../../../assets/icons/share.svg';
import ArrowLeft from '../../../../assets/icons/arrow-left.svg';
import ProductImage from '../includes/ProductImage';

const DonatedProductDetail = ({route}) => {
    const isFocused = useIsFocused();
    const {state} = useContext(Context);
    const toast = useToast();
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [productPk, setProductPk] = useState(route?.params?.item?.id);
    const [quantity, setQuantity] = useState(1);
    const [userId, setUserId] = useState(state?.userData?.firebaseUid);
    const [userIdFromEmail, setUserIdFromEmail] = useState(null);
    const [users, setUsers] = useState([]);
    const [userModal, setUserModal] = useState(false);
    const [isType, setType] = useState('mail');
    const [refreshing, setRefreshing] = useState(false);
    const [isBackground, setIsBackground] = useState(false);
    const [errorStatus, setErrorStatus] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });
    const SPECIFIC_SCROLL_POSITION = 270;

    // Handle the scroll event
    const handleScroll = event => {
        const scrollY = event.nativeEvent.contentOffset.y;

        if (scrollY >= SPECIFIC_SCROLL_POSITION) {
            setIsBackground(true);
        } else {
            setIsBackground(false);
        }
    };

    const [donatedProductSingle, setdonatedProductSingle] = useState();
    const [imageGallery, setImageGallery] = useState([]);

    EcommerceApiDonatedProductSingle(
        productPk,
        setdonatedProductSingle,
        refreshing,
        setImageGallery,
        setErrorStatus,
        setIsLoading,
    );

    //firebase user get function
    useEffect(() => {
        getUserData()
            .then(res => setUsers(res))
            .catch(error => console.log('error', error));
    }, []);

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
        if (
            donatedProductSingle &&
            donatedProductSingle.provider_details &&
            donatedProductSingle.provider_details.email
        ) {
            const emailToFind = donatedProductSingle.provider_details.email;
            const matchedUser = users.find(user => user.mail === emailToFind);
            if (matchedUser) {
                setUserIdFromEmail(matchedUser.id);
            } else {
                setUserIdFromEmail(null);
            }
        }
    }, [donatedProductSingle, users]);

    useEffect(() => {
        if (isFocused) {
            setRefreshing(!refreshing);
        }
    }, [isFocused]);

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
            if (
                donatedProductSingle?.provider_details?.email ===
                state?.userData?.mailId
            ) {
                navigation.navigate('MainHome');
                toast.show('Cannot book your own product', {
                    type: 'warning',
                });
            }
        }
    }, [
        donatedProductSingle?.provider_details?.email,
        state?.userData?.mailId,
        state.userData.is_login,
    ]);

    const ShareUrl = () => {
        Share.share({
            message: donatedProductSingle.shareable_link,
        })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    };

    //deeplink handling

    // useEffect(() => {
    //     const handleInitialDeepLink = async () => {
    //         const initialUrl = await Linking.getInitialURL();
    //         if (initialUrl) {
    //             handleDeepLink({url: initialUrl});
    //         }
    //     };

    //     const handleDeepLink = event => {
    //         const {url} = event;
    //         if (url.includes('/donated-product/')) {
    //             const segments = url.split('/');
    //             const pk = segments[segments.length - 2];
    //             setProductPk(pk);
    //         }
    //     };

    //     handleInitialDeepLink();

    //     const subscription = Linking.addEventListener('url', handleDeepLink);

    //     return () => {
    //         subscription.remove();
    //     };
    // }, []);

    return (
        <>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(50),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : errorStatus === 500 ? (
                <InternalServerError />
            ) : errorStatus === 404 ? (
                <PageNotFound />
            ) : (
                <>
                    <View
                        style={[
                            styles.commonButtonContainer,
                            isBackground && {
                                backgroundColor: '#F7F7F7',
                                borderBottomWidth: SIZE(1),
                                borderColor: '#E2E2E2',
                            },
                        ]}>
                        <View style={styles.topButtonLeft}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                activeOpacity={0.8}
                                style={styles.commonButtonMain}>
                                <View style={styles.commonTopButtons}>
                                    <ArrowLeft width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topButtonRight}>
                            <TouchableOpacity
                                onPress={() => {
                                    ShareUrl();
                                }}
                                activeOpacity={0.8}
                                style={[styles.commonButtonMain]}>
                                <View style={styles.commonTopButtons}>
                                    <ShareIcon width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}>
                        <ProductImage
                            SwiperFlatList={SwiperFlatList}
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                            gallery={[{image: donatedProductSingle?.image}]}
                        />

                        <ProductDescription
                            donated={true}
                            itemData={{
                                title: donatedProductSingle?.product_name,
                                name: donatedProductSingle?.sub_title,
                            }}
                            quantity={quantity}
                        />
                        <View
                            style={{
                                paddingHorizontal: SIZE(16),
                                marginTop: SIZE(26),
                            }}>
                            <UserContainer
                                provider_details={
                                    donatedProductSingle?.provider_details
                                }
                                donatedCustomer={true}
                            />
                        </View>
                        {/* <ProductSpecification /> */}
                        <Description
                            description={donatedProductSingle?.description}
                        />
                    </ScrollView>
                    <View>
                        <ClaimNowButton
                            userIdFromEmail={userIdFromEmail}
                            userId={userId}
                            state={state}
                            setUserModal={setUserModal}
                            provider_details={
                                donatedProductSingle?.provider_details
                            }
                            claimed={donatedProductSingle?.is_claimed}
                            pk={donatedProductSingle?.id}
                            productName={donatedProductSingle?.product_name}
                            productImage={donatedProductSingle?.image}
                            productSubTitle={donatedProductSingle?.sub_title}
                            setScreen={setScreen}
                        />
                    </View>
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
            )}
        </>
    );
};

export default DonatedProductDetail;

const styles = StyleSheet.create({
    headingContainer: {
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(16),
    },
    heading: {
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        color: '#00171F',
    },
    reviewContainer: {
        paddingHorizontal: SIZE(16),
    },
    commonButtonContainer: {
        position: 'absolute',
        zIndex: 1000,
        padding: SIZE(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width,
    },
    topButtonLeft: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonButtonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE(40),
        height: SIZE(40),
        padding: SIZE(8),
        backgroundColor: '#FFF',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(40),
    },
    commonTopButtons: {
        width: SIZE(24),
        height: SIZE(24),
    },
    topButtonRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
