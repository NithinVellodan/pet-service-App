import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    NativeModules,
    Platform,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import React, {useState, useContext, useCallback, useRef} from 'react';

//packages
import Toast from 'react-native-toast-notifications';
import {useFocusEffect} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

//components
import Headers from '../../../includes/headers/Headers';
import EmptyPageCustomer from '../includes/EmptyPageCustomer';
import OrderAddress from '../includes/OrderAddress';
import TrackOrder from '../includes/TrackOrder';
import ModalBox from '../../../Home/includes/ModalBox';
import DeleteCustomerModal from '../includes/DeleteCustomerModal';
import PaymentDetailCustomer from '../includes/PaymentDetailCustomer';
import ColoredButton from '../../../../components/buttons/ColoredButton';
import EcoAddNewAddress from '../includes/EcoAddNewAddress';
import CustomQuantity from './includes/CustomQuantity';

//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {Context} from '../../../../contexts/Store';
import {
    CustomerShippingAddressList,
    EcommerceApiProductCart,
    RemoveFromCart,
    toggleWishlistPet,
} from '../../EcommerceCustomerApi';
import {ecommerceApiCustomers} from '../../../../../axiosConfig';
import CustomToast from '../../../../components/toast/CustomToast';

//svg
import EmptyCart from '../../../../assets/icons/empty-page/cart-null.svg';
import ArrowRight from '../../../../assets/icons/profile-icons/arrow-right.svg';
import AddTo from '../../../../assets/icons/profile-icons/add-to.svg';
import InfoBlack from '../../../../assets/icons/info-circle-black.svg';

const CartCustomer = () => {
    const {state, dispatch} = useContext(Context);
    const {StatusBarManager} = NativeModules;
    const toast = useToast();
    const toastRef = useRef();

    //search
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [removeModal, setRemoveModal] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [itemStat, setItemStat] = useState([]);
    const [detailData, setDetailData] = useState();
    const [address, setAddress] = useState();
    const [cartRecall, setCartRecall] = useState();
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [qtyList, setQtyList] = useState({id: ''}, {varId: ''});
    const [qty, setQty] = useState(1);
    const [quantityModal, setQuantityModal] = useState(false);
    const [quantity, setQuantity] = useState('');

    //navigation
    const navigation = useNavigation();
    //mapping

    EcommerceApiProductCart(
        setCartItem,
        setDetailData,
        setAddress,
        refreshing,
        isLoading1,
        setIsLoading2,
    );

    const [selectedAddressPk, setSelectedAddressPk] = useState('');
    const [section, setSection] = useState([]);

    CustomerShippingAddressList(
        setSection,
        section,
        refreshing,
        setIsLoading,
        setSelectedAddressPk,
        isLoading1,
    );

    const handlePress2 = async selected => {
        let user_tocken = state;
        RemoveFromCart(itemStat, user_tocken, setIsLoading1);
        setIsLoading(true);
    };

    const handleWishItem = async selected => {
        let user_tocken = state;
        toggleWishlistPet(itemStat.id, user_tocken, itemStat.variant_item_pk);
        if (state.wishList?.find(obj => obj.id === itemStat.id)) {
        } else {
            let updatedData = {
                ...itemStat,
                is_in_wishlist: true,
                variant_item_pk: itemStat?.variant_item_pk,
                offer: itemStat?.offer,
                final_price: itemStat?.final_price,
                is_in_cart: false,
            };
            dispatch({
                type: 'ADD_TO_WISH',
                wishList: updatedData,
            });
        }
    };

    const cartCountChange = async (qty, id, varId) => {
        setRefreshing(true);
        const token = state.userData.accessToken;
        try {
            const response = await ecommerceApiCustomers.post(
                `update-cart-quantity/${id}/`,
                {
                    quantity: qty,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setRefreshing(false);
            if (response.data.StatusCode === 6001) {
                toast.show('Unavailable Quantity', {type: 'warning'});
            } else {
                toast.show('Count Changed', {type: 'success'});
            }
        } catch (error) {
            setRefreshing(false);
            console.log('error count', error.response.data);
        }
    };

    const [calModalVisible, setCalModalVisible] = useState(false);
    const [edited, setEdited] = useState(false);
    const [editedItem, setEditedItem] = useState({});

    const addNewAddress = async newSection => {
        setRefreshing(true);
        const token = state.userData.accessToken;
        const formData = new FormData();

        formData.append('full_name', newSection[0]?.name);
        formData.append('phone', newSection[0]?.phone);
        formData.append('address_1', newSection[0]?.address);
        formData.append('address_2', newSection[0]?.addressLine2);
        formData.append('street', newSection[0]?.street);
        formData.append('emirate', newSection[0]?.emiratesValue);
        formData.append('is_default', newSection[0]?.is_default);
        formData.append('latitude', newSection[0]?.exactLocation.latitude);
        formData.append('location', newSection[0]?.location);
        formData.append('longitude', newSection[0]?.exactLocation.longitude);

        try {
            await ecommerceApiCustomers
                .post('create-shipping-address/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    setIsLoading1(true);
                    toast.show(response.data.message, {
                        type: 'success',
                    });
                })
                .catch(error => {
                    setRefreshing(false);
                    console.log('error try => ', error);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    const handleAddItem = Item => {
        const newSection = [];
        newSection.push(Item);
        addNewAddress(newSection);
    };
    const modalOpen = item => {
        setCalModalVisible(!calModalVisible);
    };

    const handleSaveEdit = editedItem => {
        const newSection = [...section];
        newSection[editedIndex] = editedItem;
        setEditedItem({});
        setCalModalVisible(false);
        setEdited(false);
        setPk(null);
    };

    const handleReload = () => {
        setIsLoading1(!isLoading1); // Toggle isLoading1 to trigger the effect
    };

    useFocusEffect(
        useCallback(() => {
            setRefreshing(prev => !prev);
            setTimeout(() => {
                setRefreshing(false);
            }, 500);
            return () => {};
        }, []),
    );

    const handleNavigation = () => {
        if (address && Object.keys(address).length == 0) {
            toast.show('Please add your address', {type: 'warning'});
        } else {
            navigation.navigate('CustomerPayment', {
                detailData: detailData,
                cartItem: cartItem,
                address: address,
            });
        }
    };

    const handlePress = async foodSingle => {
        if (state.cart?.find(obj => obj.id === foodSingle.id)) {
            dispatch({
                type: 'ADD_TO_CART',
                cart: foodSingle,
            });
        } else {
            let updatedData = {
                ...foodSingle,
                is_in_cart: true,
            };
            dispatch({
                type: 'ADD_TO_CART',
                cart: updatedData,
            });
        }
    };

    return (
        <>
            {isLoading2 ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(50),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : (
                <View>
                    <Headers
                        headTextSub={`(${cartItem.length} item)`}
                        icon={true}
                        searchCommerce={false}
                        headText={'My cart'}
                        isSearch={isSearch}
                        setIsSearch={setIsSearch}
                        onPressSearch={() => {
                            setIsSearch(true);
                        }}
                        setSearchQuery={setSearchQuery}
                        setSearchQueryCustomer={setSearchQuery}
                    />

                    {cartItem?.length === 0 ? (
                        <View>
                            <EmptyPageCustomer
                                heading={'Empty Orders'}
                                description={'Your Orders are Currently Empty.'}
                                button={'Shop now'}
                                image={<EmptyCart />}
                            />
                        </View>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            contentContainerStyle={{
                                paddingTop: SIZE(24),
                                paddingBottom: SIZES.height - SIZE(700),
                            }}>
                            {address && Object.keys(address).length > 0 ? (
                                <View>
                                    <View style={styles.headerContainer}>
                                        <Text style={styles.headingText}>
                                            Deliver to:
                                        </Text>
                                    </View>
                                    <OrderAddress
                                        address={address}
                                        setCartRecall={setCartRecall}
                                    />
                                </View>
                            ) : (
                                <View
                                    style={{
                                        paddingBottom: SIZE(20),
                                        paddingHorizontal: SIZE(16),
                                    }}>
                                    <TouchableOpacity
                                        onPress={modalOpen}
                                        activeOpacity={0.8}
                                        style={[styles.buttonIndex]}>
                                        <AddTo
                                            width={SIZE(20)}
                                            height={SIZE(20)}
                                        />
                                        <Text style={styles.bottomButtonText}>
                                            Add New Address
                                        </Text>
                                        <ArrowRight
                                            width={SIZE(20)}
                                            height={SIZE(20)}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.orderContent}>
                                        <Text style={styles.orderSubText}>
                                            Add address for delivery estimates
                                            and charges{' '}
                                        </Text>
                                        <InfoBlack />
                                    </View>
                                </View>
                            )}

                            <View style={styles.subContainer}>
                                <TrackOrder
                                    remove={() => {
                                        setRemoveModal(true);
                                    }}
                                    setItemStat={setItemStat}
                                    orderRating={true}
                                    trashButton={true}
                                    cartQuantity={true}
                                    cartItem={cartItem}
                                    setIsLoading={setIsLoading}
                                    setRefreshing={setRefreshing}
                                    qtyList={qtyList}
                                    setQtyList={setQtyList}
                                    qty={qty}
                                    setQty={setQty}
                                    setQuantityModal={setQuantityModal}
                                    // handleQtyChange={handleQtyChange}
                                />
                            </View>
                            <View style={styles.headerContainer}>
                                <PaymentDetailCustomer
                                    detailData={detailData}
                                />
                            </View>
                            <View style={{paddingHorizontal: SIZE(16)}}>
                                <ColoredButton
                                    label={'Continue'}
                                    onPress={handleNavigation}
                                />
                            </View>
                        </ScrollView>
                    )}
                    <ModalBox
                        isVisible={removeModal}
                        setVisible={setRemoveModal}
                        inner={
                            <DeleteCustomerModal
                                rmsPost={handlePress2}
                                handleWishItem={handleWishItem}
                                close={setRemoveModal}
                                setIsLoading={setIsLoading}
                                setRefreshing={setRefreshing}
                                itemStat={itemStat}
                                handlePress={handlePress}
                            />
                        }
                    />

                    <Modal
                        isVisible={calModalVisible}
                        animationInTiming={400}
                        animationOutTiming={400}
                        animationIn={'slideInUp'}
                        backdropOpacity={0.2}
                        swipeDirection={['down']}
                        useNativeDriver={false}
                        useNativeDriverForBackdrop={true}
                        onSwipeComplete={() => {
                            setCalModalVisible(false), setEdited(false);
                        }}
                        style={[
                            styles.modalContainer,
                            {
                                marginTop:
                                    Platform.OS === 'ios'
                                        ? StatusBarManager.HEIGHT +
                                          SIZES.height * 0.009
                                        : StatusBarManager.HEIGHT - SIZE(10),
                            },
                        ]}
                        onBackdropPress={() => {
                            setCalModalVisible(false), setEdited(false);
                            modalOpen();
                        }}
                        onBackButtonPress={() => {
                            modalOpen();
                            setEdited(false);
                        }}
                        propagateSwipe={true}
                        avoidKeyboard={true}>
                        <>
                            <EcoAddNewAddress
                                handleAddItem={handleAddItem}
                                modalOpen={modalOpen}
                                editedItem={editedItem}
                                handleSaveEdit={handleSaveEdit}
                                isLoading={isLoading}
                                section={section}
                                setIsLoading1={setIsLoading1}
                                isLoading1={isLoading1}
                                handleReload={handleReload}
                                edited={edited}
                                setEdited={setEdited}
                                toastRef={toastRef}
                            />
                        </>
                        <Toast
                            renderToast={toastOptions => {
                                return (
                                    <CustomToast toastOptions={toastOptions} />
                                );
                            }}
                            successColor="#009FD3"
                            warningColor="orange"
                            ref={toastRef}
                            duration={2000}
                            offsetBottom={SIZE(100)}
                        />
                    </Modal>
                    <Modal
                        isVisible={quantityModal}
                        animationInTiming={400}
                        animationOutTiming={400}
                        animationIn={'slideInUp'}
                        backdropOpacity={0.2}
                        useNativeDriver={false}
                        useNativeDriverForBackdrop={true}
                        style={{
                            margin: 0,
                            paddingHorizontal: SIZE(12),
                        }}
                        onBackdropPress={() => {
                            Keyboard.dismiss();
                            setQuantityModal(false);
                        }}
                        propagateSwipe={true}
                        avoidKeyboard={true}>
                        <CustomQuantity
                            setQuantityModal={setQuantityModal}
                            setQuantity={setQuantity}
                            quantity={quantity}
                            setQty={setQty}
                            cartCountChange={cartCountChange}
                            qtyList={qtyList}
                        />
                    </Modal>
                </View>
            )}
        </>
    );
};
export default CartCustomer;

const styles = StyleSheet.create({
    headingText: {
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    headerContainer: {
        paddingHorizontal: SIZE(12),
    },
    subContainer: {
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(16),
    },
    addressContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        padding: SIZE(12),
        borderRadius: SIZE(12),
    },
    continueButton: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(16),
    },
    buttonStyle: {
        backgroundColor: '#009FD3',
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
    },
    loginImage: {
        marginRight: SIZE(10),
    },
    buttonIndex: {
        borderWidth: 1,
        borderColor: '#003459',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(10),
        borderRadius: SIZE(8),
        alignItems: 'center',
    },
    bottomButtonText: {
        fontFamily: FONTS.semiBold,
        color: '#003459',
        fontSize: SIZE(15),
    },
    orderContent: {
        borderRadius: SIZE(8),
        backgroundColor: '#FDE9E9',
        paddingVertical: SIZE(13),
        paddingHorizontal: SIZE(20),
        flexDirection: 'row',
        marginTop: SIZE(20),
        alignItems: 'center',
        justifyContent: 'center',
    },

    orderSubText: {
        fontFamily: FONTS.regular,
        color: '#242424',
        fontWeight: '600',
        fontSize: SIZE(14),
        marginRight: SIZE(20),
    },
    modalContainer: {
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        flex: 1,
        margin: 0,
    },
    filterMain: {
        padding: SIZE(12),
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        width: SIZE(100),
        position: 'absolute',
        right: SIZE(30),
        top: SIZE(360),
        zIndex: 1000,
        ...Platform.select({
            ios: {
                shadowColor: '#E9E9E9',
                shadowOffset: {width: 0.8, height: 0.8},
                shadowOpacity: 0.8,
                shadowRadius: SIZE(1),
            },
            android: {
                elevation: 1,
            },
        }),
    },
    buttonTextTwo: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
        fontWeight: '600',
        color: '#003459',
    },
    buttonContainerTwo: {
        padding: SIZE(8),
        borderRadius: SIZE(6),
    },
    qtyFont: {
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        color: '#009FD3',
        textAlign: 'center',
    },
});
