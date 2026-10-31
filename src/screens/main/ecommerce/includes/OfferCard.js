import React, {useState, useContext, useEffect} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

//packages
import {useToast} from 'react-native-toast-notifications';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {Context} from '../../../../contexts/Store';
import {toggleCartAction} from '../../EcommerceCustomerApi';

//components
import ReplaceProductModal from '../customer/includes/ReplaceProductModal';

//svg
import StarIcon from '../../../../assets/icons/star.svg';
import LoveButton from '../includes/LoveButton';
import TickNormal from '../../../../assets/icons/ecommerce/customer/tick-normal.svg';
import CartBlue from '../../../../assets/icons/ecommerce/customer/cart-blue.svg';

const OfferCard = ({
    item,
    OfferData,
    wishListData,
    staticData,
    orderSummaryData,
    setRefresh,
    refresh,
    setUserModal,
}) => {
    const navigation = useNavigation();
    const {state, dispatch} = useContext(Context);
    const toast = useToast();
    const [replaceModal, setReplaceModal] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);

    const handlePress2 = async selected => {
        let user_tocken = state;
        toggleCartAction(
            item?.id,
            item?.variant_item_pk,
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

    // const cartItemAdd = () => {
    //     console.log(item, 'item');
    //     console.log(state.cart, 'state.cart');
    //     if (state.cart?.find(obj => obj.id === item.id)) {
    //         dispatch({
    //             type: 'ADD_TO_CART',
    //             cart: item,
    //         });
    //         handlePressToCart();
    //     } else {
    //         let updatedData = {
    //             ...item,
    //             variant_item_pk: '',
    //             quantity: null,
    //             stock_details: {
    //                 stock: null,
    //                 stock_message: '',
    //             },
    //         };
    //         dispatch({
    //             type: 'ADD_TO_CART',
    //             cart: updatedData,
    //         });
    //         handlePressToCart();
    //     }
    // };
    const cartItemAdd = replace => {
        if (!replace) {
            dispatch({
                type: 'ADD_TO_CART',
                cart: item,
            });
            handlePressToCart();
        } else {
            let updatedData = {
                ...item,
                variant_item_pk: '',
                quantity: null,
                stock_details: {
                    stock: null,
                    stock_message: '',
                },
            };

            // Clear the cart before adding the new item
            dispatch({
                type: 'CLEAR_CART',
            });

            dispatch({
                type: 'ADD_TO_CART',
                cart: updatedData,
            });
            handlePressToCart();
        }
    };

    const handlePressToCart = async selectedItemId => {
        const updatedItem = {
            id: item.id,
            is_in_cart: true,
        };

        dispatch({
            type: 'UPDATE_WISH_ITEM_FIELD',
            itemId: item.id,
            updatedItem: updatedItem,
        });
    };

    const handlePressReplace = async selected => {
        let user_tocken = state;
        toggleCartAction(
            item?.id,
            item?.variant_item_pk,
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

        setRefresh(!refresh);
    };

    return (
        <View style={[styles.offerProductMain]}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('ProductDetail', {
                        id: item.id,
                    })
                }
                activeOpacity={0.8}
                style={{
                    backgroundColor: '#fff',
                    borderRadius: SIZE(12),
                    padding: SIZE(12),
                }}>
                <View style={styles.offerProductSub}>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomWidth: orderSummaryData ? SIZE(1) : 0,
                            borderColor: '#E2E2E2',
                            paddingBottom: SIZE(16),
                        }}>
                        <View style={styles.imageContainer}>
                            {staticData ? (
                                <Image
                                    source={item.image}
                                    style={styles.imageFood}
                                />
                            ) : (
                                <Image
                                    source={{uri: item.image}}
                                    style={styles.imageFood}
                                />
                            )}
                        </View>
                        <View
                            style={{
                                marginLeft: SIZE(16),
                                flex: 1,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: SIZE(250),
                                    }}>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.twoItemTitle}>
                                        {item?.name}
                                    </Text>
                                    <View>
                                        {wishListData ? (
                                            <LoveButton
                                                item={item}
                                                wishListData={true}
                                                setUserModal={setUserModal}
                                            />
                                        ) : (
                                            <LoveButton
                                                item={item}
                                                setUserModal={setUserModal}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                            <Text
                                numberOfLines={1}
                                style={styles.twoImageDescription}>
                                {item?.description}
                            </Text>
                            {item?.offer ? (
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.priceText}>
                                        AED{item?.original_price}
                                    </Text>
                                    <Text style={styles.offer}>
                                        {item.offer}% off
                                    </Text>
                                </View>
                            ) : null}
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: SIZE(12),
                                }}>
                                <View>
                                    <Text style={styles.productPrice}>
                                        AED {item.final_price}
                                    </Text>
                                </View>
                                <View>
                                    {orderSummaryData && (
                                        <View style={styles.ratingContainer}>
                                            <View style={styles.starContainer}>
                                                <StarIcon
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            </View>
                                            <View>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.starText}>
                                                    {item.rating} star
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                    {OfferData && (
                        <View
                            style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: SIZE(16),
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <View style={styles.avatarImageContainer}>
                                    {item.avatar}
                                </View>
                                <View>
                                    <Text style={styles.avatarName}>
                                        {item.name}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.ratingContainer}>
                                <View style={styles.starContainer}>
                                    <StarIcon width={'100%'} height={'100%'} />
                                </View>
                                <View>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.starText}>
                                        {item.rating} star
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    {wishListData && (
                        <TouchableOpacity
                            disabled={
                                (state.cart?.find(obj => obj?.id === item?.id)
                                    ? true
                                    : false) || cartLoading
                            }
                            activeOpacity={0.8}
                            onPress={() => {
                                handlePress2(item.id);
                            }}
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                marginTop: SIZE(16),
                            }}>
                            <View style={styles.addCartContainer}>
                                {cartLoading ? (
                                    <ActivityIndicator
                                        size={'small'}
                                        color={'#009fd3'}
                                    />
                                ) : (
                                    <>
                                        <View
                                            style={styles.tickNormalContainer}>
                                            {state.cart?.find(
                                                obj => obj?.id === item?.id,
                                            ) ? (
                                                <TickNormal />
                                            ) : (
                                                <CartBlue />
                                            )}
                                        </View>
                                        <View>
                                            <Text
                                                style={
                                                    state.cart?.find(
                                                        obj =>
                                                            obj?.id ===
                                                            item?.id,
                                                    )
                                                        ? styles.itemText
                                                        : {
                                                              color: '#009FD3',
                                                              fontSize:
                                                                  SIZE(16),
                                                              fontFamily:
                                                                  FONTS.regular,
                                                          }
                                                }>
                                                {state.cart?.find(
                                                    obj => obj?.id === item?.id,
                                                )
                                                    ? 'Item in Cart'
                                                    : 'Add to Cart'}
                                            </Text>
                                        </View>
                                    </>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>

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
        </View>
    );
};

export default OfferCard;

const styles = StyleSheet.create({
    offerProductMain: {
        marginTop: SIZE(16),
        paddingHorizontal: SIZE(16),
    },
    offerProductSub: {},
    imageContainer: {
        width: SIZE(100),
        height: SIZE(100),
    },
    imageFood: {
        width: SIZE(100),
        height: SIZE(100),
        borderRadius: SIZE(8),
    },
    twoItemTitle: {
        marginTop: SIZE(8),
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        color: '#242424',
        width: SIZE(150),
    },
    twoImageDescription: {
        marginTop: SIZE(4),
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#757575',
        width: SIZES.width * 0.36,
    },
    priceText: {
        marginRight: SIZE(8),
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        color: '#969696',
        textDecorationLine: 'line-through',
    },
    offer: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
    },
    productPrice: {
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        color: '#00171F',
    },
    avatarImageContainer: {
        width: SIZE(32),
        height: SIZE(32),
        borderRadius: SIZE(32),
    },
    avatarImage: {
        width: SIZE(32),
        height: SIZE(32),
        borderRadius: SIZE(32),
    },
    avatarName: {
        fontSize: SIZE(14),
        color: '#969696',
        fontFamily: FONTS.regular,
        marginLeft: SIZE(8),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(5),
        borderRadius: SIZE(4),
        backgroundColor: '#EDEDED',
    },
    starContainer: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
    starText: {
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    addCartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZE(12),
    },
    itemText: {color: '#969696', fontSize: SIZE(16), fontFamily: FONTS.regular},
    tickNormalContainer: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(14),
    },
});
