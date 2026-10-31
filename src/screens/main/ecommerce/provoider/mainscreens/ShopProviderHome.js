import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ScrollView,
    Animated,
} from 'react-native';
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

// packages
import Carousel from 'react-native-reanimated-carousel';

import Headers from '../../../../includes/headers/Headers';
import {SIZE, SIZES} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';
import OrdersList from '../../includes/OrdersList';
import ModalScreen from '../../../../Profile-related/ModalScreen';
import AddProduct from '../AddProduct';
import AddOffer from '../AddOffer';
import AddDonateDetails from '../AddDonateDetails';
import ArrowRight from '../../../../../assets/icons/arrow_right_button.svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AddVariant from '../AddVariant';
import {ecommerceApiServiceProvider} from '../../../../../../axiosConfig';
import {Context} from '../../../../../contexts/Store';
import moment from 'moment-timezone';
import {
    EcoProviderShopDetails,
    EcommerceServiceProviderOrdersList,
} from '../../../EcommerceApiSection';
import AddStore from '../AddStore';

const ShopProviderHome = () => {
    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };
    const navigation = useNavigation();
    const toastRef = useRef();
    const {state, dispatch} = useContext(Context);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [orders, setOrders] = useState([]);
    const Orders = orders.slice(0, 3);
    const dotsLength = Orders.length;
    const [activeIndex, setActiveIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [offerModal, setOfferModal] = useState(false);
    const [donateModal, setDonateModal] = useState(false);
    const [shopEditModal, setShopEditModal] = useState(false);
    // Edit store
    const [storeId, setStoreId] = useState('');
    const [storeTitle, setStoreTitle] = useState('');
    const [shopImage, setShopImage] = useState([]);
    const [geoAddressTextStore, setGeoAddressTextStore] = useState();
    const [addressTextStore, setAddressTextStore] = useState();
    const [exactLocationStore, setExactLocationStore] = useState({
        latitude: '',
        longitude: '',
    });
    const finalLocationStore = geoAddressTextStore
        ? geoAddressTextStore
        : addressTextStore;

    const [errorMessage, setErrorMessage] = useState({});
    // addProduct
    const [product, setProduct] = useState('details');
    const [productName, setProductName] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [categoryImage, setCategoryImage] = useState([]);
    const [productDescription, setProductDescription] = useState('');
    const [shopDetail, setShopDetail] = useState([]);

    // add Variant
    const [variantName, setVariantName] = useState('');
    const [addPrice, setAddPrice] = useState('');
    const [stockcount, setStockCount] = useState(1);
    const [flavorImage, setFlavorImage] = useState([]);
    const [checkDefaultVariant, setcheckDefaultVariant] = useState(false);
    const [multiVariant, setMultiVariant] = useState(false);
    const [variant, setVariant] = useState([
        {
            id: 1,
            key: '',
            name: 'Variant 1',
            unit_name: '',
            price: '',
            stock: 1,
        },
        {
            id: 2,
            key: '',
            name: 'Variant 2',
            unit_name: '',
            price: '',
            stock: 1,
        },
    ]);

    // add Donate
    const [nameDonate, setNameDonate] = useState('');
    const [subtitleDonate, setSubtitleDonate] = useState('');
    const [categoryDonate, setCategoryDonate] = useState('');
    const [categoryImageDonate, setCategoryImageDonate] = useState([]);
    const [donateDescription, setDonateDescription] = useState('');
    const [errorMessageDonate, setErrorMessageDonate] = useState({});
    const [title, setTitle] = useState('');
    const [variantValue, setVariantValue] = useState('');
    const [percentage, setPercentage] = useState('');
    const [categoryImageOffer, setCategoryImageOffer] = useState([]);
    const [offerDescription, setOfferDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateExpiry, setSelectedDateExpiry] = useState(null);
    const [errorMessageOffer, setErrorMessageOffer] = useState({});

    useFocusEffect(
        useCallback(() => {
            setRefreshing(prev => !prev);
            setTimeout(() => {
                setRefreshing(false);
            }, 500);
            return () => {};
        }, []),
    );

    //api section
    EcommerceServiceProviderOrdersList(setOrders, refreshing);
    EcoProviderShopDetails(setShopDetail);
    useEffect(() => {
        if (shopDetail) {
            setStoreId(shopDetail.id);
            setStoreTitle(shopDetail.name);
            setShopImage([
                {
                    path: shopDetail.image,
                },
            ]);
            setGeoAddressTextStore(shopDetail.location_data?.location);
            setExactLocationStore({
                latitude: shopDetail.location_data?.latitude,
                longitude: shopDetail.location_data?.longitude,
            });
        }
    }, [shopDetail]);

    // Edit store
    const editShopDetail = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        const pk = storeId;
        const formData = new FormData();

        if (shopImage[0].name) {
            shopImage.forEach((image, index) => {
                formData.append('image', {
                    uri: image.path,
                    type: image.mime,
                    name: image.name,
                });
            });
        }
        formData.append('name', storeTitle);
        formData.append('latitude', exactLocationStore.latitude);
        formData.append('location', finalLocationStore);
        formData.append('longitude', exactLocationStore.longitude);
        ecommerceApiServiceProvider
            .post(`edit-store/${pk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                const {StatusCode} = response.data;
                if (StatusCode == 6000) {
                    updateUserDate({
                        ...state.userData,
                        store_add: true,
                        store_name: storeTitle,
                    });
                }
                setShopEditModal(false);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error try edit store => ', error.response.data);
            });
    };

    const addProduct = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('product_category', categoryValue.id);
        categoryImage.forEach((image, index) => {
            formData.append('image', {
                uri: image.path,
                type: image.mime,
                name: image.name,
            });
        });
        formData.append('description', productDescription);
        formData.append('title', variantName);
        flavorImage.forEach((image, index) => {
            formData.append('images', {
                uri: image.path,
                type: image.type,
                name: image.name,
            });
        });
        formData.append('price', addPrice);
        formData.append('stock', stockcount);
        formData.append('multi_variant', multiVariant);
        formData.append('multi_variant_data', JSON.stringify(variant));
        formData.append('is_default', checkDefaultVariant);
        ecommerceApiServiceProvider
            .post('add-product/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                navigation.navigate('Inventory');
                setShowModal(false);
                setProduct('details');
                clearAll();
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            });
    };

    // clear all function
    const clearAll = () => {
        setProduct('details');
        setProductName('');
        setCategoryValue('');
        setCategoryImage([]);
        setProductDescription('');
        setVariantName('');
        setAddPrice('');
        setStockCount(1);
        setFlavorImage([]);
        setcheckDefaultVariant(false);
        setMultiVariant(false);
        setVariant([]);
        setErrorMessage('');
    };
    const clearDonate = () => {
        setNameDonate('');
        setSubtitleDonate('');
        setCategoryDonate('');
        setCategoryImageDonate([]);
        setDonateDescription('');
        setErrorMessageDonate('');
    };

    const addDonateProduct = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        const formData = new FormData();
        formData.append('product_name', nameDonate);
        formData.append('sub_title', subtitleDonate);
        formData.append('product_category', categoryDonate.id);
        categoryImageDonate.forEach((image, index) => {
            formData.append('image', {
                uri: image.path,
                type: image.mime,
                name: image.name,
            });
        });
        formData.append('description', donateDescription);
        ecommerceApiServiceProvider
            .post('add-donated-product/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                navigation.navigate('Inventory');
                setDonateModal(false);
                clearDonate();
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

    // add Offer

    const addOfferProduct = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        let startDateString = '';
        let endDateString = '';
        const convertToGMTISOString = date => {
            return date ? moment.utc(date).toISOString() : '';
        };
        if (selectedDate && selectedDate !== '') {
            startDateString = convertToGMTISOString(selectedDate);
        }
        if (selectedDateExpiry && selectedDateExpiry !== '') {
            endDateString = convertToGMTISOString(selectedDateExpiry);
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('product_variant', variantValue.id);
        formData.append('offer_percentage', percentage);
        categoryImageOffer.forEach((image, index) => {
            formData.append('image', {
                uri: image.path,
                type: image.mime,
                name: image.name,
            });
        });
        formData.append('description', offerDescription);
        formData.append('start_date_and_time', startDateString);
        formData.append('end_date_and_time', endDateString);
        ecommerceApiServiceProvider
            .post('add-offer/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                if (response.data.StatusCode === 6000) {
                    navigation.navigate('OfferItem');
                    setOfferModal(false);
                    clearOffer();
                } else {
                    toastRef.current.show(response.data.message, {
                        type: 'danger',
                    });
                }
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            });
    };
    const clearOffer = () => {
        setTitle('');
        setVariantValue('');
        setPercentage('');
        setCategoryImageOffer([]);
        setOfferDescription('');
        setSelectedDate(null);
        setSelectedDateExpiry(null);
        setErrorMessageOffer('');
    };

    // carosal render Item
    const renderOrder = ({item}) => {
        return (
            <View style={{marginRight: SIZE(16)}}>
                <OrdersList
                    key={item.id}
                    order={item}
                    orderPress={() => {
                        navigation.navigate('OrderDetails', {
                            order: item,
                        });
                    }}
                />
            </View>
        );
    };
    // carosal Dott
    const CarousalPaginator = ({data, activeIndex}) => {
        return (
            <View style={styles.dottContainer}>
                {data.map((item, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor:
                                    index === activeIndex
                                        ? '#009FD3'
                                        : '#98C1D9',
                                height:
                                    index === activeIndex ? SIZE(10) : SIZE(8),
                                width:
                                    index === activeIndex ? SIZE(10) : SIZE(8),
                                borderRadius:
                                    index === activeIndex ? SIZE(5) : SIZE(4),
                            },
                        ]}></Animated.View>
                ))}
            </View>
        );
    };

    // Spotlight list
    const SpotlightList = ({
        image,
        head,
        description,
        buttonText,
        onPress,
        linkPage,
    }) => {
        return (
            <View style={{marginBottom: linkPage ? SIZE(55) : SIZE(30)}}>
                <ImageBackground source={image} style={styles.spotImage}>
                    <View>
                        <Text allowFontScaling={false} style={styles.boldText}>
                            {head}
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={styles.textDiscription}>
                            {description}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.addButton}
                            onPress={() => onPress()}>
                            <Text
                                style={styles.addButtonText}
                                allowFontScaling={false}>
                                {buttonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                {linkPage && (
                    <View style={styles.bottomLink}>
                        <Text style={styles.bottomLinkText}>
                            View your offer products
                        </Text>
                        <TouchableOpacity
                            style={styles.bottomLinkRight}
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.navigate('OfferItem');
                            }}>
                            <Text style={styles.viewText}>View Products</Text>
                            <ArrowRight width={SIZE(16)} height={SIZE(16)} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };
    // main return
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        } else {
            return text;
        }
    };
    return (
        <View style={styles.mainContainer}>
            <Headers
                icon={true}
                searchCommerce={true}
                isSearch={isSearch}
                editIcon={true}
                editIconPress={() => {
                    console.log('edit icon clicked');
                    setShopEditModal(true);
                }}
                setIsSearch={setIsSearch}
                ecoProviderHome={true}
                onPressSearch={() => {
                    navigation.navigate('CustomerSearchSection');
                }}
                setSearchQueryCustomer={setSearchQuery}
                headText={
                    state.userData?.store_name
                        ? truncateText(state.userData.store_name, 22)
                        : 'Carter Geidt’s Shop'
                }
            />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View>
                    <ImageBackground
                        source={require('../../../../../assets/images/ecommerce/shopback.png')}
                        style={styles.imageBackground}>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={styles.boldText}>
                                Showcase & Sell Products
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.textDiscription}>
                                Sell your products by adding items to your
                                store.
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.addButton}
                                onPress={() => {
                                    console.log('add Product');
                                    setShowModal(true);
                                }}>
                                <Text
                                    style={styles.addButtonText}
                                    allowFontScaling={false}>
                                    +Add Products
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.spotContainer}>
                    <SpotlightList
                        image={require('../../../../../assets/images/ecommerce/spotone.png')}
                        head={'Add Offers'}
                        linkPage={true}
                        description={'Sell your products by adding offers.'}
                        buttonText={'+Add Offer'}
                        onPress={() => {
                            console.log('offer');
                            setOfferModal(true);
                        }}
                    />
                    <SpotlightList
                        image={require('../../../../../assets/images/ecommerce/spottwo.png')}
                        head={'Donate Products'}
                        description={'Donate your products to Customers'}
                        buttonText={'+Donate Product'}
                        onPress={() => {
                            console.log('Donate');
                            setDonateModal(true);
                        }}
                    />
                </View>
                {Orders.length < 1 ? null : (
                    <View style={styles.bottomContainer}>
                        <View style={styles.bottomHead}>
                            <Text
                                allowFontScaling={false}
                                style={styles.textRecent}>
                                Recent Orders
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.viewButton}
                                onPress={() => {
                                    navigation.navigate('OrdersStore');
                                }}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.textAll}>
                                    View All
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {Orders.length > 1 ? (
                            <View>
                                <Carousel
                                    panGestureHandlerProps={{
                                        activeOffsetX: [-10, 10],
                                    }}
                                    loop
                                    width={SIZES.width - SIZE(16)}
                                    height={SIZE(170)}
                                    data={Orders}
                                    autoPlayInterval={1000}
                                    scrollAnimationDuration={1000}
                                    renderItem={renderOrder}
                                    dotsLength={dotsLength}
                                    onSnapToItem={index => {
                                        setActiveIndex(index);
                                    }}
                                />
                                <View style={styles.paginator}>
                                    <CarousalPaginator
                                        data={Orders}
                                        activeIndex={activeIndex}
                                    />
                                </View>
                            </View>
                        ) : (
                            <>
                                {Orders.map(item => (
                                    <View key={item.id}>
                                        <OrdersList
                                            order={item}
                                            orderPress={() => {
                                                navigation.navigate(
                                                    'OrderDetails',
                                                    {
                                                        order: item,
                                                    },
                                                );
                                            }}
                                        />
                                    </View>
                                ))}
                            </>
                        )}
                    </View>
                )}
                <ModalScreen
                    isVisible={showModal}
                    setVisible={setShowModal}
                    inner={
                        <>
                            {product === 'details' ? (
                                <AddProduct
                                    close={setShowModal}
                                    product={product}
                                    setProduct={setProduct}
                                    productName={productName}
                                    setProductName={setProductName}
                                    categoryValue={categoryValue}
                                    setCategoryValue={setCategoryValue}
                                    categoryImage={categoryImage}
                                    setCategoryImage={setCategoryImage}
                                    productDescription={productDescription}
                                    setProductDescription={
                                        setProductDescription
                                    }
                                    errorMessage={errorMessage}
                                    setErrorMessage={setErrorMessage}
                                    clearAll={clearAll}
                                />
                            ) : (
                                product === 'variant' && (
                                    <AddVariant
                                        close={setShowModal}
                                        variantName={variantName}
                                        setVariantName={setVariantName}
                                        addPrice={addPrice}
                                        setAddPrice={setAddPrice}
                                        stockcount={stockcount}
                                        setStockCount={setStockCount}
                                        variant={variant}
                                        setVariant={setVariant}
                                        flavorImage={flavorImage}
                                        setFlavorImage={setFlavorImage}
                                        checkDefaultVariant={
                                            checkDefaultVariant
                                        }
                                        setcheckDefaultVariant={
                                            setcheckDefaultVariant
                                        }
                                        multiVariant={multiVariant}
                                        setMultiVariant={setMultiVariant}
                                        errorMessage={errorMessage}
                                        setErrorMessage={setErrorMessage}
                                        addProduct={addProduct}
                                        clearAll={clearAll}
                                        isLoading={isLoading}
                                    />
                                )
                            )}
                        </>
                    }
                />
                <ModalScreen
                    isVisible={offerModal}
                    setVisible={setOfferModal}
                    toastRef={toastRef}
                    inner={
                        <AddOffer
                            close={setOfferModal}
                            title={title}
                            setTitle={setTitle}
                            variantValue={variantValue}
                            setVariantValue={setVariantValue}
                            percentage={percentage}
                            setPercentage={setPercentage}
                            categoryImage={categoryImageOffer}
                            setCategoryImage={setCategoryImageOffer}
                            offerDescription={offerDescription}
                            setOfferDescription={setOfferDescription}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            selectedDateExpiry={selectedDateExpiry}
                            setSelectedDateExpiry={setSelectedDateExpiry}
                            errorMessage={errorMessageOffer}
                            setErrorMessage={setErrorMessageOffer}
                            clearOffer={clearOffer}
                            addOfferProduct={addOfferProduct}
                            isLoading={isLoading}
                        />
                    }
                />
                <ModalScreen
                    isVisible={donateModal}
                    setVisible={setDonateModal}
                    inner={
                        <AddDonateDetails
                            close={setDonateModal}
                            name={nameDonate}
                            setName={setNameDonate}
                            subtitle={subtitleDonate}
                            setSubtitle={setSubtitleDonate}
                            categoryValue={categoryDonate}
                            setCategoryValue={setCategoryDonate}
                            categoryImage={categoryImageDonate}
                            setCategoryImage={setCategoryImageDonate}
                            donateDescription={donateDescription}
                            setDonateDescription={setDonateDescription}
                            errorMessage={errorMessageDonate}
                            setErrorMessage={setErrorMessageDonate}
                            addDonateProduct={addDonateProduct}
                            clearDonate={clearDonate}
                            isLoading={isLoading}
                        />
                    }
                />
                <ModalScreen
                    isVisible={shopEditModal}
                    setVisible={setShopEditModal}
                    toastRef={toastRef}
                    inner={
                        <AddStore
                            store_edit={true}
                            storeTitle={storeTitle}
                            setStoreTitle={setStoreTitle}
                            shopImage={shopImage}
                            setShopImage={setShopImage}
                            geoAddressText={geoAddressTextStore}
                            setGeoAddressText={setGeoAddressTextStore}
                            addressText={addressTextStore}
                            setAddressText={setAddressTextStore}
                            exactLocation={exactLocationStore}
                            setExactLocation={setExactLocationStore}
                            finalLocation={finalLocationStore}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                            close={setShopEditModal}
                            editShopDetail={editShopDetail}
                            toastRef={toastRef}
                            buttonLoader={isLoading}
                        />
                    }
                />
            </ScrollView>
        </View>
    );
};

export default ShopProviderHome;

const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: SIZE(70),
    },
    imageBackground: {
        resizeMode: 'contain',
        justifyContent: 'center',
        height: SIZE(164),
        width: SIZES.width,
        padding: SIZE(16),
    },
    boldText: {
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(19),
        color: '#fff',
    },
    textDiscription: {
        fontSize: SIZE(12),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(15),
        color: '#fff',
        marginTop: SIZE(8),
        width: SIZE(170),
    },
    addButton: {
        backgroundColor: '#003459',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(32),
        borderRadius: SIZE(4),
        marginTop: SIZE(16),
    },
    addButtonText: {
        color: '#FFF',
        fontSize: SIZE(12),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(15),
    },
    spotContainer: {
        paddingHorizontal: SIZE(16),
        paddingTop: SIZE(30),
    },
    spotImage: {
        height: SIZE(164),
        resizeMode: 'contain',
        justifyContent: 'center',
        padding: SIZE(20),
        borderRadius: SIZE(12),
        overflow: 'hidden',
    },
    bottomContainer: {
        paddingHorizontal: SIZE(16),
        marginBottom: SIZE(20),
    },
    bottomHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(16),
    },
    textRecent: {
        color: '#00171F',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
    },
    viewButton: {
        justifyContent: 'center',
    },
    textAll: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    // paginater
    dottContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    dot: {
        marginHorizontal: SIZE(4),
        backgroundColor: '#003459',
    },
    paginator: {
        alignItems: 'center',
        marginTop: SIZE(16),
    },
    bottomLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#98C1D9',
        position: 'absolute',
        bottom: -25,
        right: 0,
        left: 0,
        borderBottomRightRadius: SIZE(12),
        borderBottomLeftRadius: SIZE(12),
        paddingHorizontal: SIZE(20),
        paddingVertical: SIZE(12),
    },
    bottomLinkRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomLinkText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
        color: '#FFFFFF',
    },
    viewText: {
        fontFamily: FONTS.bold,
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
        color: '#003459',
        marginRight: SIZE(12),
    },
});
