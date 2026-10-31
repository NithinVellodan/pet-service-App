import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {FONTS} from '../../../../theme/fonts';
import {SIZE, SIZES} from '../../../../theme/theme';
import ArrowLeft from '../../../../assets/icons/arrow-left.svg';
import Edit from '../../../../assets/icons/edit.svg';
import Trash from '../../../../assets/icons/trashdark.svg';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Disable from '../includes/Disable';
import FoodSize from '../includes/FoodSize';
import Title from '../includes/Title';
import ReviewsEco from '../includes/ReviewsEco';
import VariantType from '../includes/VariantType';
import {useNavigation} from '@react-navigation/native';
import StarOfferCard from '../includes/StarOfferCard';
import {EcommerceServiceProviderProductVariantSingle} from '../../EcommerceApiSection';
import {Context} from '../../../../contexts/Store';
import {ecommerceApiServiceProvider} from '../../../../../axiosConfig';
import ModalScreen from '../../../Profile-related/ModalScreen';
import EditVariant from './EditVariant';
import ModalBox from '../../../Home/includes/ModalBox';
import DeleteItem from '../includes/DeleteItem';

const DefaultVariant = ({route}) => {
    const {state} = useContext(Context);
    const navigation = useNavigation();

    const [variantId, setVariantId] = useState(route?.params?.variant?.id);
    const [delModal, setDelModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [PageLoading, setPageLoading] = useState(false);
    const [vareintEditModal, setVareintEditModal] = useState(false);
    const [isBackground, setIsBackground] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOn, setIsOn] = useState(true);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState();
    const [foodSize, setFoodSize] = useState({});
    const [selectedFoodTypeIndex, setSelectedFoodTypeIndex] = useState(0);
    const [selectedFood, setSelectedFood] = useState({});
    const [productName, setProductName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [variantName, setVariantName] = useState('');
    const [addPrice, setAddPrice] = useState('');
    const [stockcount, setStockCount] = useState(1);
    const [flavorImage, setFlavorImage] = useState([]);
    const [upToDateImage, setUpToDateImage] = useState([]);
    const [removedImagePk, setRemovedImagePk] = useState([]);
    const [removedVariantEditPk, setRemovedVariantEditPk] = useState([]);
    const [enableVariantEditPk, setenableVariantEditPk] = useState([]);
    const [variantEdit, setVariantEdit] = useState([]);
    const [checkDefaultVariant, setcheckDefaultVariant] = useState(false);
    const [multiVariant, setMultiVariant] = useState(false);
    const [variant, setVariant] = useState([]);
    const [variant1, setVariant1] = useState([]);
    const [offerPrice, setOfferPrice] = useState('');
    const [offerPercentage, setofferPercentage] = useState('');
    const [isoffer, setIsOffer] = useState(false);
    const [rating, setRating] = useState('');
    const [reviewData, setReviewData] = useState();
    const [errorMessage, setErrorMessage] = useState({});
    const [variantSingle, setVariantSingle] = useState([]);
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

    // default or notdefault vareint
    const toggleDefault = async () => {
        const token = state.userData.accessToken;
        const pk = variantSingle?.id;
        try {
            const response = await ecommerceApiServiceProvider.put(
                `set-default-variant/${pk}/`,
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
        if (variantSingle) {
            setUpToDateImage(variantSingle.gallery);
            setProductName(variantSingle.product_name);
            setMultiVariant(variantSingle.multi_variant);
            setIsOn(variantSingle.is_default);
            setVariantName(variantSingle.title);
            setAddPrice(variantSingle.price);
            setStockCount(variantSingle?.sizes && variantSingle.sizes?.[0]?.stock);
            setOfferPrice(variantSingle.offer_price);
            setIsOffer(variantSingle.offer?.is_active);
            setofferPercentage(variantSingle.offer?.offer_percentage);
            setRating(variantSingle.rating);
            setVariant(variantSingle.all_variants);
            setReviewData(variantSingle.reviews);
            setVariantEdit(variantSingle.sizes);
        }
    }, [variantSingle]);

    EcommerceServiceProviderProductVariantSingle(
        state,
        setVariantSingle,
        variantId,
        foodSize.id,
        variantId,
        isOn,
        loading,
        setPageLoading,
    );

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

    const variantCard = variantSingle?.sizes;
    const is_sizes = variantCard?.length > 1;

    const EditProductVariant = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        const pkv = variantId;
        const formData = new FormData();
        const combined_variant = variantEdit.concat(variant1);
        const formatPrice = price => {
            const priceNumber =
                typeof price === 'string' ? parseFloat(price) : price;
            return priceNumber.toFixed(2);
        };
        const formattedCombinedVariant = combined_variant.map(item => ({
            ...item,
            price: formatPrice(item.price),
        }));
        formData.append('title', variantName);
        if (flavorImage) {
            flavorImage.forEach((image, index) => {
                formData.append('images', {
                    uri: image.path,
                    type: image.type,
                    name: image.name,
                });
            });
        }
        removedImagePk.forEach((imagepk, index) => {
            formData.append('removed_image_pks', imagepk);
        });
        removedVariantEditPk.forEach((removePk, index) => {
            formData.append('disabled_pks', removePk);
        });
        enableVariantEditPk.forEach((enablePk, index) => {
            formData.append('enabled_pks', enablePk);
        });
        if (combined_variant.length > 1) {
            formData.append('multi_variant', true);
            formData.append(
                'multi_variant_data',
                JSON.stringify(formattedCombinedVariant),
            );
        } else {
            formData.append('multi_variant', false);
            formData.append('price', addPrice);
            formData.append('stock', stockcount);
        }
        ecommerceApiServiceProvider
            .put(`edit-product-variant/${pkv}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setVareintEditModal(false);
                setLoading(prev => !prev);
                setVariant1([]);
                setIsLoading(false);
            })
            .catch(error => {
                console.log('error try => ', error);
                setIsLoading(false);
            });
    };

    // Deleted product
    const DeleteProductVariant = async () => {
        const token = state.userData.accessToken;
        const pk = variantId;
        try {
            const response = await ecommerceApiServiceProvider.delete(
                `delete-product-variant/${pk}/`,
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
            navigation.pop(2);
        } catch (error) {
            console.log('error toggle => ', error.response.data);
        }
    };
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
                            setVareintEditModal(true);
                            setVariantEdit(
                                variantEdit.map(item => ({
                                    ...item,
                                    key: item.id,
                                })),
                            );
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
                    onScroll={handleScroll}
                    scrollEventThrottle={16}>
                    <View>
                        <SwiperFlatList
                            style={{height: SIZE(316)}}
                            onChangeIndex={index =>
                                setCurrentIndex(index.index)
                            }
                            data={upToDateImage && upToDateImage}
                            renderItem={({item}) => (
                                <View style={styles.swiperMain}>
                                    <Image
                                        source={{uri: item.image}}
                                        style={styles.swiperSub}
                                    />
                                </View>
                            )}
                        />
                        <View style={styles.swiperNumberMain}>
                            <View style={styles.swiperNumber}>
                                <Text style={styles.swiperNumberText}>
                                    {currentIndex + 1}/
                                    {upToDateImage && upToDateImage.length}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.continer}>
                        <View style={{paddingHorizontal: SIZE(16)}}>
                            <Disable
                                DisableText={'Default Variant'}
                                isOn={isOn}
                                setIsOn={setIsOn}
                                toggleProduct={toggleDefault}
                                DefaultVariant={true}
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
                            <Title label={'Variants'} />
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
                                                setVariantId(item.id);
                                            }}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                        {!reviewData?.length == 0 && (
                            <View style={{marginTop: SIZE(32)}}>
                                <Title
                                    label={'Reviews'}
                                    onPress={() => {}}
                                    rightText={'View All'}
                                />
                                <View
                                    style={{
                                        marginTop: SIZE(24),
                                        paddingHorizontal: SIZE(16),
                                    }}>
                                    {reviewData?.map((item, index) => (
                                        <ReviewsEco
                                            key={index}
                                            item={item}
                                            index={index}
                                        />
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                    <ModalScreen
                        isVisible={vareintEditModal}
                        setVisible={setVareintEditModal}
                        inner={
                            <EditVariant
                                editProduct={true}
                                close={setVareintEditModal}
                                variantName={variantName}
                                setVariantName={setVariantName}
                                addPrice={addPrice}
                                setAddPrice={setAddPrice}
                                stockcount={stockcount}
                                setStockCount={setStockCount}
                                variant={variant}
                                setVariant={setVariant}
                                variant1={variant1}
                                setVariant1={setVariant1}
                                variantEdit={variantEdit}
                                setVariantEdit={setVariantEdit}
                                removedVariantEditPk={removedVariantEditPk}
                                setRemovedVariantEditPk={
                                    setRemovedVariantEditPk
                                }
                                enableVariantEditPk={enableVariantEditPk}
                                setenableVariantEditPk={setenableVariantEditPk}
                                flavorImage={flavorImage}
                                setFlavorImage={setFlavorImage}
                                upToDateImage={upToDateImage}
                                setUpToDateImage={setUpToDateImage}
                                removedImagePk={removedImagePk}
                                setRemovedImagePk={setRemovedImagePk}
                                checkDefaultVariant={checkDefaultVariant}
                                setcheckDefaultVariant={setcheckDefaultVariant}
                                multiVariant={multiVariant}
                                setMultiVariant={setMultiVariant}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                                EditProductVariant={EditProductVariant}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <ModalBox
                        isVisible={delModal}
                        setVisible={setDelModal}
                        inner={
                            <DeleteItem
                                close={setDelModal}
                                deleted={DeleteProductVariant}
                            />
                        }
                    />
                </ScrollView>
            )}
        </>
    );
};

export default DefaultVariant;

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
