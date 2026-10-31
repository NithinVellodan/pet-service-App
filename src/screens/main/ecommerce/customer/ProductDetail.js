import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Keyboard,
    ActivityIndicator,
    BackHandler,
    Share,
    Linking,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

//packages
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {
    EcommerceApiProductSingle,
    toggleCart,
    toggleCartAction,
    toggleWishlistPet,
} from '../../EcommerceCustomerApi';
import {Context} from '../../../../contexts/Store';

//components
import ProductImage from '../includes/ProductImage';
import ProductDescription from '../includes/ProductDescription';
import ProductVariant from '../includes/ProductVariant';
import Description from '../includes/Description';
import UserContainer from '../includes/UserContainer';
import AlsoLikes from '../includes/AlsoLikes';
import EcomReview from '../includes/EcomReview';
import ProductFooter from '../includes/ProductFooter';
import ReplaceProductModal from './includes/ReplaceProductModal';
import ModalScreen from '../../../Profile-related/ModalScreen';
import UserLogin from '../../../booking/includes/UserLogin';
import InternalServerError from '../../../error/InternalServerError';
import PageNotFound from '../../../error/PageNotFound';

//images and logos
import ShareIcon from '../../../../assets/icons/share.svg';
import ArrowLeft from '../../../../assets/icons/arrow-left.svg';
import HeartIconFilled from '../../../../assets/icons/heartfilled.svg';
import HeartIconWithout from '../../../../assets/icons/ecommerce/customer/heart.svg';

export default function ProductDetail({route}) {
    const {state, dispatch} = useContext(Context);
    const navigation = useNavigation();

    //states
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [itemIndex, setItemIndex] = useState();
    const [itemData, setItemData] = useState({});
    const [stockQuantity, setStockQuantity] = useState(false);
    const [variantIndex, setVariantIndex] = useState();
    const [selectedItemIndex, setSelectedItemIndex] = useState();
    const [sizeVarientSelection, setSizevarientSelection] = useState();
    const [sizeVarientSelection2, setSizevarientSelection2] = useState();
    const [variantItem, setVariantItem] = useState({});
    const [foodSingle, setFoodSingle] = useState();
    const [isType, setType] = useState('mail');
    const [userModal, setUserModal] = useState(false);
    const [selectedFoodTypeIndex, setSelectedFoodTypeIndex] = useState(0);
    const [foodSize, setFoodSize] = useState({});
    const [selectedFood, setSelectedFood] = useState({});
    const [singleItemPk, setSingleItemPk] = useState(route?.params?.id);
    const [replaceModal, setReplaceModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [stockManage, setStockManage] = useState();
    const [errorStatus, setErrorStatus] = useState();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    const toast = useToast();
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const Stock = 10;
    const incrementQuantity = () => {
        if (quantity < Stock) {
            setQuantity(quantity + 1);
        }
    };

    const SPECIFIC_SCROLL_POSITION = 270;
    const [isBackground, setIsBackground] = useState(false);

    // Handle the scroll event
    const handleScroll = event => {
        const scrollY = event.nativeEvent.contentOffset.y;
        if (scrollY >= SPECIFIC_SCROLL_POSITION) {
            setIsBackground(true);
        } else {
            setIsBackground(false);
        }
    };

    EcommerceApiProductSingle(
        singleItemPk,
        setFoodSingle,
        setSelectedItemIndex,
        setSizevarientSelection,
        sizeVarientSelection,
        setIsLoading,
        setErrorStatus,
    );

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
    //         if (url.includes('/product/')) {
    //             const segments = url.split('/');
    //             const pk = segments[segments.length - 2];
    //             setSingleItemPk(pk);
    //         }
    //     };

    //     handleInitialDeepLink();

    //     const subscription = Linking.addEventListener('url', handleDeepLink);

    //     return () => {
    //         subscription.remove();
    //     };
    // }, []);

    const handlePress = async selected => {
        let user_tocken = state;
        toggleWishlistPet(selected.id, user_tocken, sizeVarientSelection);
        if (state.wishList?.find(obj => obj.id === selected.id)) {
            dispatch({
                type: 'ADD_TO_WISH',
                wishList: selected,
            });
        } else {
            let updatedData = {
                ...selected,
                is_in_wishlist: true,
                variant_item_pk: sizeVarientSelection
                    ? sizeVarientSelection
                    : foodSingle?.sizes?.[0]?.id,
                offer: selected?.offer,
                final_price: selected?.final_price,
                is_in_cart: selected?.is_in_cart,
            };
            dispatch({
                type: 'ADD_TO_WISH',
                wishList: updatedData,
            });
        }
    };

    const handlePress2 = async selected => {
        let user_tocken = state;

        toggleCartAction(
            singleItemPk,
            sizeVarientSelection,
            user_tocken,
            cartItemAdd,
            toast,
            false,
            navigation,
            false,
            setReplaceModal,
            false,
            setCartLoading,
        );
    };

    const handlePressReplace = async selected => {
        let user_tocken = state;

        toggleCartAction(
            singleItemPk,
            sizeVarientSelection,
            user_tocken,
            cartItemAdd,
            toast,
            false,
            navigation,
            false,
            setReplaceModal,
            true,
            setCartLoading,
        );
    };

    const handlePress1 = async selected => {
        let user_tocken = state;
        let Status = null;

        toggleCart(
            singleItemPk,
            sizeVarientSelection,
            user_tocken,
            cartItemAdd,
            toast,
            true,
            navigation,
            true,
            setSubmitLoading,
            true,
        );
    };

    const cartItemAdd = replace => {
        if (!replace) {
            dispatch({
                type: 'ADD_TO_CART',
                cart: foodSingle,
            });
        } else {
            let updatedData = {
                ...foodSingle,
                is_in_cart: true,
                variant_item_pk: sizeVarientSelection
                    ? sizeVarientSelection
                    : foodSingle?.sizes?.[0]?.id,
            };

            // Clear the cart before adding the new item
            dispatch({
                type: 'CLEAR_CART',
            });

            dispatch({
                type: 'ADD_TO_CART',
                cart: updatedData,
            });
        }
    };

    const handlePressToCart = async selectedItemId => {
        if (state.wishList?.find(obj => obj.id === foodSingle.id)) {
            const updatedItem = {
                id: foodSingle.id, // Assuming the item object has an ID field
                is_in_cart: true,
                is_in_wishlist: true,
            };
            dispatch({
                type: 'UPDATE_WISH_ITEM_FIELD',
                itemId: foodSingle.id, // Pass the ID of the item to update
                updatedItem: updatedItem, // Pass the updated item object
            });
        }
    };

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
                foodSingle?.provider_details?.email === state?.userData?.mailId
            ) {
                navigation.navigate('MainHome');
                toast.show('Cannot book your own product', {
                    type: 'warning',
                });
            }
        }
    }, [
        foodSingle?.provider_details?.email,
        state?.userData?.mailId,
        state.userData.is_login,
    ]);

    const ShareUrl = () => {
        Share.share({
            message: foodSingle.shareable_link,
        })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    };

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
            ) : errorStatus === 5000 ? (
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
                                    // navigation.goBack();
                                    if (navigation.canGoBack()) {
                                        navigation.goBack();
                                    } else {
                                        navigation.navigate('MainDrawer');
                                    }
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
                                activeOpacity={0.8}
                                onPress={() => {
                                    ShareUrl();
                                }}
                                style={[
                                    styles.commonButtonMain,
                                    {marginRight: SIZE(16)},
                                ]}>
                                <View style={styles.commonTopButtons}>
                                    <ShareIcon width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (state.userData.is_login) {
                                        handlePress(foodSingle);
                                    } else {
                                        setUserModal(true);
                                        setScreen('login');
                                    }
                                }}
                                activeOpacity={0.8}
                                style={styles.commonButtonMain}>
                                <View style={styles.commonTopButtons}>
                                    {state.wishList?.find(
                                        obj => obj?.id === foodSingle?.id,
                                    ) ? (
                                        <HeartIconFilled
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <HeartIconWithout
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    )}
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
                            gallery={foodSingle?.gallery}
                        />
                        <ProductDescription
                            itemData={{
                                name: foodSingle?.name,
                                title: foodSingle?.title,
                                original_price: foodSingle?.original_price,
                                final_price: foodSingle?.final_price,
                                rating: foodSingle?.rating,
                                offer: foodSingle?.offer,
                            }}
                            quantity={quantity}
                        />
                        <ProductVariant
                            decrementQuantity={decrementQuantity}
                            quantity={quantity}
                            incrementQuantity={incrementQuantity}
                            selectedVariantIndex={selectedVariantIndex}
                            setSelectedVariantIndex={setSelectedVariantIndex}
                            selectedFoodTypeIndex={selectedFoodTypeIndex}
                            setSelectedFoodTypeIndex={setSelectedFoodTypeIndex}
                            setFoodSize={setFoodSize}
                            setSelectedFood={setSelectedFood}
                            //
                            setItemIndex={setItemIndex}
                            itemIndex={itemIndex}
                            itemData={itemData}
                            setVariantIndex={setVariantIndex}
                            variantIndex={variantIndex}
                            variantItem={variantItem}
                            stockQuantity={stockQuantity}
                            setQuantity={setQuantity}
                            sizes={foodSingle?.sizes}
                            all_variants={foodSingle?.all_variants}
                            selectedItemIndex={selectedItemIndex}
                            setSelectedItemIndex={setSelectedItemIndex}
                            sizeVarientSelection={sizeVarientSelection}
                            setSizevarientSelection={setSizevarientSelection}
                            setSingleItemPk={setSingleItemPk}
                            setSizevarientSelection2={setSizevarientSelection2}
                            sizeVarientSelection2={sizeVarientSelection2}
                            setStockManage={setStockManage}
                        />
                        <UserContainer
                            provider_details={foodSingle?.provider_details}
                        />
                        <Description description={foodSingle?.description} />
                        {foodSingle?.similar_products?.length > 0 && (
                            <View style={styles.headingContainer}>
                                <Text style={styles.heading}>
                                    You may also like
                                </Text>
                            </View>
                        )}
                        <AlsoLikes
                            similar_products={foodSingle?.similar_products}
                            setSizevarientSelection={setSizevarientSelection}
                            setSingleItemPk={setSingleItemPk}
                        />
                        {foodSingle?.reviews?.length !== 0 && (
                            <View style={styles.reviewContainer}>
                                <EcomReview reviews={foodSingle?.reviews} />
                            </View>
                        )}
                    </ScrollView>
                    <View>
                        <ProductFooter
                            quantity={quantity}
                            itemData={{
                                name: foodSingle?.name,
                                title: foodSingle?.title,
                                original_price: foodSingle?.original_price,
                                final_price: foodSingle?.final_price,
                                rating: foodSingle?.rating,
                                offer: foodSingle?.offer,
                                is_in_cart: foodSingle?.is_in_cart,
                                id: foodSingle?.id,
                            }}
                            foodSingle={foodSingle}
                            handlePress2={handlePress2}
                            handlePress1={handlePress1}
                            handlePressToCart={handlePressToCart}
                            setUserModal={setUserModal}
                            selectedItemIndex={selectedItemIndex}
                            submitLoading={submitLoading}
                            cartLoading={cartLoading}
                            setScreen={setScreen}
                        />
                    </View>
                </>
            )}
            <Modal
                isVisible={replaceModal}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={replaceModal ? styles.modalContainer : {margin: 0}}
                onBackdropPress={() => {
                    Keyboard.dismiss();
                    setReplaceModal(false);
                }}
                onBackButtonPress={() => {
                    setReplaceModal(false);
                }}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <View style={styles.modalSubContainer}>
                    <ReplaceProductModal
                        setReplaceModal={setReplaceModal}
                        handlePressReplace={handlePressReplace}
                    />
                </View>
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
}

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
