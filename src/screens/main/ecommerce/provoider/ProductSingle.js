import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SIZE, SIZES} from '../../../../theme/theme';
import ArrowLeft from '../../../../assets/icons/arrow-left.svg';
import Edit from '../../../../assets/icons/edit.svg';
import Trash from '../../../../assets/icons/trashblack.svg';
import {useNavigation} from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {FONTS} from '../../../../theme/fonts';
import Disable from '../includes/Disable';
import OfferTimeDate from '../includes/OfferTimeDate';
import FoodSize from '../includes/FoodSize';
import Title from '../includes/Title';
import VariantType from '../includes/VariantType';
import Description from '../includes/Description';
import ReviewsEco from '../includes/ReviewsEco';
import ModalScreen from '../../../Profile-related/ModalScreen';
import AddOffer from './AddOffer';
import StarOfferCard from '../includes/StarOfferCard';
import ModalBox from '../../../Home/includes/ModalBox';
import DeleteItem from '../includes/DeleteItem';
import AddProduct from './AddProduct';
import AddVariant from './AddVariant';
import {EcommerceServiceProviderProductSingle} from '../../EcommerceApiSection';
import {Context} from '../../../../contexts/Store';
import {ecommerceApiServiceProvider} from '../../../../../axiosConfig';

const ProductSingle = ({route}) => {
    const {state} = useContext(Context);
    const navigation = useNavigation();

    const productId = route?.params?.item?.id;
    const [isBackground, setIsBackground] = useState(false);
    const [loading, setLoading] = useState(false);
    const [PageLoading, setPageLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOn, setIsOn] = useState(true);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState();
    const [foodSize, setFoodSize] = useState({});
    const [selectedFoodTypeIndex, setSelectedFoodTypeIndex] = useState();
    const [selectedFood, setSelectedFood] = useState({});
    const [vareintModal, setVareintModal] = useState(false);
    const [editOfferModal, setEditOfferModal] = useState(false);
    const [editProductModal, setEditProductModal] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    // addProduct
    const [product, setProduct] = useState('details');
    const [productName, setProductName] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [categoryImage, setCategoryImage] = useState([]);
    const [productDescription, setProductDescription] = useState('');
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
            name: 'Variant 1',
            unit_name: '',
            price: '',
            stock: 1,
        },
        {
            id: 2,
            name: 'Variant 2',
            unit_name: '',
            price: '',
            stock: 1,
        },
    ]);
    const [offerPrice, setOfferPrice] = useState('');
    const [offerPercentage, setofferPercentage] = useState('');
    const [isoffer, setIsOffer] = useState(false);
    const [rating, setRating] = useState('');
    const [reviewData, setReviewData] = useState();
    const [productSingle, setProductSingle] = useState([]);

    // Deleted product
    const DeleteProduct = async () => {
        const token = state.userData.accessToken;
        const pk = productSingle?.id;
        try {
            const response = await ecommerceApiServiceProvider.delete(
                `delete-product/${pk}/`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                // Handle success
            } else {
                // Handle failure
            }
            navigation.goBack();
        } catch (error) {
            console.log('error toggle => ', error.response.data);
        }
    };

    // enable or disable place
    const toggleProduct = async () => {
        const token = state.userData.accessToken;
        const pk = productSingle?.id;
        try {
            const response = await ecommerceApiServiceProvider.put(
                `enable-disable-product/${pk}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                // Handle success
            } else {
                // Handle failure
            }
        } catch (error) {
            console.log('error toggle => ', error.response.data);
        }
    };

    useEffect(() => {
        if (productSingle) {
            setFlavorImage(productSingle.gallery);
            setProductName(productSingle.product_name);
            setCategoryValue({
                id: productSingle.category,
                name: productSingle.category_name,
            });
            setCategoryImage([
                {
                    path: productSingle.image,
                },
            ]);
            setProductDescription(productSingle.description);
            setMultiVariant(productSingle.multi_variant);
            setIsOn(productSingle.is_enabled);
            setVariantName(productSingle.title);
            setAddPrice(productSingle.price);
            setStockCount(productSingle.stock);
            setOfferPrice(productSingle.offer_price);
            setIsOffer(productSingle.offer?.is_active);
            setofferPercentage(productSingle.offer?.offer_percentage);
            setRating(productSingle.rating);
            setVariant(productSingle.all_variants);
            setReviewData(productSingle.reviews);
        }
    }, [productSingle]);

    //api section
    EcommerceServiceProviderProductSingle(
        state,
        setProductSingle,
        productId,
        foodSize.id,
        loading,
        setPageLoading,
    );

    // add Variant
    const [isLoading, setIsLoading] = useState(false);
    const [variantNameV, setVariantNameV] = useState('');
    const [addPriceV, setAddPriceV] = useState('');
    const [stockcountV, setStockCountV] = useState(1);
    const [flavorImageV, setFlavorImageV] = useState([]);
    const [checkDefaultVariantV, setcheckDefaultVariantV] = useState(false);
    const [multiVariantV, setMultiVariantV] = useState(false);
    const [variantV, setVariantV] = useState([
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
    // clearAllVariant all function
    const clearAllVariant = () => {
        setVariantNameV('');
        setAddPriceV('');
        setStockCountV(1);
        setFlavorImageV([]);
        setcheckDefaultVariantV(false);
        setMultiVariantV(false);
        setVariantV([]);
        setErrorMessage('');
    };
    // add_Product_Variant
    const addProductVariant = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        const pkv = productSingle?.id;
        const formData = new FormData();
        formData.append('title', variantNameV);
        flavorImageV.forEach((image, index) => {
            formData.append('images', {
                uri: image.path,
                type: image.type,
                name: image.name,
            });
        });
        formData.append('price', addPriceV);
        formData.append('stock', stockcountV);
        formData.append('multi_variant', multiVariantV);
        formData.append('multi_variant_data', JSON.stringify(variantV));
        formData.append('is_default', checkDefaultVariantV);
        ecommerceApiServiceProvider
            .post(`add-product-variant/${pkv}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setVareintModal(false);
                clearAllVariant();
                setIsLoading(false);
                setLoading(prev => !prev);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

    // Edit product
    const editProduct = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        const pk = productSingle?.id;
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('product_category', categoryValue.id);
        if (categoryImage[0].name) {
            categoryImage.forEach((image, index) => {
                formData.append('image', {
                    uri: image.path,
                    type: image.mime,
                    name: image.name,
                });
            });
        }
        formData.append('description', productDescription);
        ecommerceApiServiceProvider
            .put(`edit-product/${pk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setEditProductModal(false);
                setIsLoading(false);
                setLoading(prev => !prev);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

    const HeaderSticky = 270;
    // Handle the scroll event
    const handleScroll = event => {
        const scrollY = event.nativeEvent.contentOffset.y;
        if (scrollY >= HeaderSticky) {
            setIsBackground(true);
        } else {
            setIsBackground(false);
        }
    };

    const productCard = [
        {
            id: 1,
            title: productName,
            description: variantName,
            normalPrice: addPrice,
            offeredPrice: offerPrice,
            percentage: offerPercentage,
            rating: rating,
        },
    ];
    const variantCard = productSingle?.sizes;
    const is_sizes = variantCard?.length > 1;

    return (
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
                            console.log(route?.params?.page);
                            if (!route?.params?.page) {
                                console.log('Offer Edit');
                                setEditOfferModal(true);
                            } else {
                                console.log('Edit Product');
                                setEditProductModal(true);
                            }
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.commonButtonMain,
                            {marginRight: SIZE(16)},
                        ]}>
                        <View style={styles.commonTopButtons}>
                            <Edit width={'100%'} height={'100%'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setDelModal(true);
                        }}
                        activeOpacity={0.8}
                        style={styles.commonButtonMain}>
                        <View style={styles.commonTopButtons}>
                            <Trash width={'100%'} height={'100%'} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {PageLoading ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size="large"
                    color={'#007EA7'}
                />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    onScroll={handleScroll} // Add the onScroll event handler
                    scrollEventThrottle={16} // Adjust this value as needed
                >
                    <View>
                        <SwiperFlatList
                            style={{height: SIZE(316)}}
                            onChangeIndex={index =>
                                setCurrentIndex(index.index)
                            }
                            data={flavorImage && flavorImage}
                            renderItem={({item}) => (
                                <View style={styles.swiperMain}>
                                    <Image
                                        source={{uri: item.image}}
                                        style={styles.swiperSub}
                                    />
                                </View>
                            )}
                        />
                        {}
                        <View style={styles.swiperNumberMain}>
                            {flavorImage && flavorImage.length > 1 && (
                                <View style={styles.swiperNumber}>
                                    <Text style={styles.swiperNumberText}>
                                        {currentIndex + 1}/
                                        {flavorImage && flavorImage.length}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.continer}>
                        <View style={{paddingHorizontal: SIZE(16)}}>
                            <Disable
                                DisableText={'Disable Product'}
                                isOn={isOn}
                                setIsOn={setIsOn}
                                toggleProduct={toggleProduct}
                            />
                        </View>

                        <View style={{marginTop: SIZE(32)}}>
                            <StarOfferCard
                                productCard={productCard}
                                isoffer={isoffer}
                            />
                        </View>
                        {is_sizes && (
                            <View
                                style={{
                                    marginTop: SIZE(32),
                                    paddingHorizontal: SIZE(16),
                                }}>
                                <Text style={styles.sizeText}>Sizes</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        gap: SIZE(10),
                                    }}>
                                    {variantCard?.map((item, index) => (
                                        <FoodSize
                                            key={index}
                                            selectedVariantIndex={
                                                selectedVariantIndex
                                            }
                                            item={item}
                                            index={index}
                                            sizePress={() => {
                                                setSelectedVariantIndex(index);
                                                setFoodSize(item);
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                        )}
                        <View style={{marginTop: SIZE(32)}}>
                            <Title
                                label={'Variants'}
                                onPress={() => {
                                    setVareintModal(true);
                                }}
                                rightText={'+ Add Variant'}
                            />
                            <View>
                                <FlatList
                                    bounces={false}
                                    style={{paddingHorizontal: SIZE(16)}}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    data={variant}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({item, index}) => (
                                        <VariantType
                                            item={item}
                                            index={index}
                                            selectedFoodTypeIndex={
                                                selectedFoodTypeIndex
                                            }
                                            variantPress={() => {
                                                setSelectedFoodTypeIndex(0);
                                                setSelectedFood(item);
                                                navigation.navigate(
                                                    'DefaultVariant',
                                                    {variant: item},
                                                );
                                            }}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                        <View style={{marginTop: SIZE(32)}}>
                            <Description
                                description={
                                    productDescription && productDescription
                                }
                            />
                        </View>

                        {!reviewData?.length == 0 && (
                            <View>
                                <Title
                                    label={'Reviews'}
                                    onPress={() => {
                                        navigation.navigate(
                                            'ReviwsProviderPage',
                                            {
                                                id: variant[0].id,
                                            },
                                        );
                                    }}
                                    rightText={'View All'}
                                />
                                <View
                                    style={{
                                        marginTop: SIZE(32),
                                        paddingHorizontal: SIZE(16),
                                    }}>
                                    {reviewData?.map((item, index) => (
                                        <ReviewsEco
                                            key={index}
                                            item={item}
                                            index={index}
                                            setLoading={setLoading}
                                        />
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                    <ModalScreen
                        isVisible={vareintModal}
                        setVisible={setVareintModal}
                        inner={
                            <AddVariant
                                addVariantSet={true}
                                close={setVareintModal}
                                variantName={variantNameV}
                                setVariantName={setVariantNameV}
                                addPrice={addPriceV}
                                setAddPrice={setAddPriceV}
                                stockcount={stockcountV}
                                setStockCount={setStockCountV}
                                variant={variantV}
                                setVariant={setVariantV}
                                flavorImage={flavorImageV}
                                setFlavorImage={setFlavorImageV}
                                checkDefaultVariant={checkDefaultVariantV}
                                setcheckDefaultVariant={setcheckDefaultVariantV}
                                multiVariant={multiVariantV}
                                setMultiVariant={setMultiVariantV}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                                addProduct={addProductVariant}
                                clearAll={clearAllVariant}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <ModalScreen
                        isVisible={editOfferModal}
                        setVisible={setEditOfferModal}
                        size={true}
                        inner={
                            <AddOffer
                                editOffer={true}
                                close={setEditOfferModal}
                            />
                        }
                    />
                    <ModalBox
                        isVisible={delModal}
                        setVisible={setDelModal}
                        inner={
                            <DeleteItem
                                close={setDelModal}
                                deleted={DeleteProduct}
                            />
                        }
                    />
                    <ModalScreen
                        isVisible={editProductModal}
                        setVisible={setEditProductModal}
                        size={true}
                        inner={
                            <>
                                {product === 'details' ? (
                                    <AddProduct
                                        editProduct={true}
                                        close={setEditProductModal}
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
                                        editProductapi={editProduct}
                                        isLoading={isLoading}
                                    />
                                ) : (
                                    product === 'variant' && (
                                        <AddVariant
                                            editProduct={true}
                                            close={setEditProductModal}
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
                                        />
                                    )
                                )}
                            </>
                        }
                    />
                </ScrollView>
            )}
        </>
    );
};

export default ProductSingle;

const styles = StyleSheet.create({
    commonButtonContainer: {
        position: 'absolute',
        zIndex: 999,
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
    swiperMain: {
        flex: 1,
        overflow: 'hidden',
        width: SIZES.width,
        height: SIZE(316),
    },
    swiperSub: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    swiperNumberMain: {
        padding: SIZE(16),
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
        right: 0,
    },
    swiperNumber: {
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(6),
        borderRadius: SIZE(61),
        width: SIZE(68),
        alignItems: 'center',
    },
    swiperNumberText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    continer: {
        paddingVertical: SIZE(24),
    },
    sizeText: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        marginBottom: SIZE(16),
    },
});
