import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import CartNew from '../../../../assets/icons/ecommerce/customer/shopping-cart.svg';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {Context} from '../../../../contexts/Store';

const ProductFooter = ({
    quantity,
    itemData,
    handlePress2,
    handlePress1,
    handlePressToCart,
    setUserModal,
    selectedItemIndex,
    submitLoading,
    cartLoading,
    setScreen,
}) => {
    const {state} = useContext(Context);

    return (
        <View style={styles.subContainer}>
            <View>
                {itemData.offer !== null ? (
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.offeredPrice}>
                            AED {itemData?.original_price * quantity}
                        </Text>
                        <Text style={styles.percentage}>
                            {itemData?.offer}% off
                        </Text>
                    </View>
                ) : null}
                <View>
                    <Text style={styles.productHeading}>
                        AED {itemData?.final_price}
                    </Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    disabled={
                        state.cart?.find(obj => obj?.id === itemData?.id) ||
                        selectedItemIndex?.stock === 0
                            ? true
                            : false
                    }
                    activeOpacity={0.8}
                    style={[
                        styles.cartOuter,
                        selectedItemIndex?.stock === 0 ? {opacity: 0.4} : null,

                        {
                            borderColor: state.cart?.find(
                                obj => obj?.id === itemData?.id,
                            )
                                ? '#009FD3'
                                : '#aaa',
                        },
                    ]}>
                    <TouchableOpacity
                        disabled={
                            itemData?.is_in_cart == true
                                ? true
                                : false || cartLoading
                        }
                        onPress={() => {
                            if (state.userData.is_login) {
                                handlePress2();
                                handlePressToCart();
                            } else {
                                setUserModal(true);
                                setScreen('login');
                            }
                        }}
                        activeOpacity={0.8}
                        style={styles.cartContainers}>
                        {cartLoading ? (
                            <ActivityIndicator
                                size={'small'}
                                color={'#009fd3'}
                            />
                        ) : (
                            <CartNew width="100%" height="100%" />
                        )}
                    </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={
                        state.cart?.find(obj => obj?.id === itemData?.id) ||
                        selectedItemIndex?.stock === 0
                            ? true
                            : false || submitLoading
                    }
                    onPress={() => {
                        if (state.userData.is_login) {
                            handlePress1('is_Buy_Now');
                        } else {
                            setUserModal(true);
                            setScreen('login');
                        }
                    }}
                    activeOpacity={0.8}
                    style={[
                        styles.buyNowContainer,
                        selectedItemIndex?.stock === 0 ? {opacity: 0.4} : null,
                    ]}>
                    {submitLoading ? (
                        <ActivityIndicator size={'small'} color={'#fff'} />
                    ) : (
                        <Text style={styles.buyNowText}>Buy Now</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductFooter;

const styles = StyleSheet.create({
    subContainer: {
        height: SIZE(116),
        backgroundColor: '#fff',
        paddingTop: SIZE(16),
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: SIZE(0.5),
        borderColor: '#E2E2E2',
    },
    productHeading: {
        color: '#242424',
        fontSize: SIZE(24),
        fontFamily: FONTS.semiBold,
    },
    productDescription: {
        fontSize: SIZE(16),
        color: '#686868',
        fontFamily: FONTS.regular,
    },
    starContainer: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
    starText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        color: '#969696',
    },
    offeredPrice: {
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: '#969696',
        marginRight: SIZE(8),
    },
    percentage: {
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        color: '#009FD3',
    },
    cartContainers: {
        height: SIZE(24),
        width: SIZE(24),
    },
    cartOuter: {
        padding: SIZE(16),
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        marginRight: SIZE(12),
    },
    buyNowContainer: {
        width: SIZE(146),
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyNowText: {
        fontFamily: FONTS.bold,
        color: '#fff',
        fontSize: SIZE(16),
    },
});
