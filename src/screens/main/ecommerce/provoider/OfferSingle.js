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
import {EcommerceServiceProviderOfferProductSingle} from '../../EcommerceApiSection';
import moment from 'moment';
import {Context} from '../../../../contexts/Store';
import {ecommerceApiServiceProvider} from '../../../../../axiosConfig';

const OfferSingle = ({route}) => {
    const {state} = useContext(Context);
    const navigation = useNavigation();
    const offerId = route?.params?.item?.id;
    const [loading, setLoading] = useState(false);
    const [PageLoading, setPageLoading] = useState(false);
    const [isBackground, setIsBackground] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState();
    const [foodSize, setFoodSize] = useState({});
    const [selectedFoodTypeIndex, setSelectedFoodTypeIndex] = useState(0);
    const [selectedFood, setSelectedFood] = useState({});
    const [editOfferModal, setEditOfferModal] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // add Offer
    const [title, setTitle] = useState('');
    const [variantValue, setVariantValue] = useState('');
    const [percentage, setPercentage] = useState('');
    const [categoryImageOffer, setCategoryImageOffer] = useState([]);
    const [offerDescription, setOfferDescription] = useState('');
    const [errorMessageOffer, setErrorMessageOffer] = useState({});
    // addProduct
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    // add Variant
    const [variantName, setVariantName] = useState('');
    const [addPrice, setAddPrice] = useState('');
    const [stockcount, setStockCount] = useState(1);
    const [flavorImage, setFlavorImage] = useState([]);
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
    const [rating, setRating] = useState('');
    const [reviewData, setReviewData] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateExpiry, setSelectedDateExpiry] = useState(null);
    const [offerSingle, setOfferSingle] = useState([]);
    const [balance, setBalance] = useState('');
    const [dateTime, setDateTime] = useState('date');
    const startDateTime = selectedDate;
    const endDateTime = selectedDateExpiry;

    // Deleted offer product
    const DeleteOfferProduct = async () => {
        const token = state.userData.accessToken;
        const pk = offerSingle?.id;
        try {
            const response = await ecommerceApiServiceProvider.delete(
                `delete-product-offer/${pk}/`,

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

    // enable or disable Offer
    const toggleProduct = async () => {
        const token = state.userData.accessToken;
        const pk = offerSingle?.id;
        try {
            const response = await ecommerceApiServiceProvider.put(
                `enable-disable-offer/${pk}/`,
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
        if (offerSingle) {
            setFlavorImage(offerSingle.gallery);
            setProductName(offerSingle.product_name);
            setProductDescription(offerSingle.description);
            setMultiVariant(offerSingle.multi_variant);
            setIsOn(offerSingle.is_enabled);
            setVariantName(offerSingle.title);
            setAddPrice(offerSingle.price);
            setStockCount(offerSingle.stock);
            setOfferPrice(offerSingle.offer_price);
            setofferPercentage(offerSingle.offer_percentage);
            setRating(offerSingle.rating);
            setVariant(offerSingle.all_variants);
            setSelectedDate(offerSingle.start_date_and_time);
            setSelectedDateExpiry(offerSingle.end_date_and_time);
            setReviewData(offerSingle.reviews);
            setTitle(offerSingle.title);
            setVariantValue({
                id:
                    offerSingle?.all_variants &&
                    offerSingle?.all_variants[0]?.id,
                name:
                    offerSingle?.all_variants &&
                    offerSingle?.all_variants[0]?.title,
            });
            setPercentage(offerSingle.offer_percentage);
            setCategoryImageOffer([
                {
                    path: offerSingle.image,
                },
            ]);
            setOfferDescription(offerSingle.description);
        }
    }, [offerSingle]);

    //api section
    EcommerceServiceProviderOfferProductSingle(
        state,
        setOfferSingle,
        offerId,
        foodSize.id,
        loading,
        setPageLoading,
    );

    // Edit Offer-Product
    const editOfferProduct = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        const pk = offerSingle?.id;
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
        if (categoryImageOffer[0].name) {
            categoryImageOffer.forEach((image, index) => {
                formData.append('image', {
                    uri: image.path,
                    type: image.mime,
                    name: image.name,
                });
            });
        }
        formData.append('description', offerDescription);
        formData.append('start_date_and_time', startDateString);
        formData.append('end_date_and_time', endDateString);
        ecommerceApiServiceProvider
            .put(`edit-product-offer/${pk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setEditOfferModal(false);
                setLoading(prev => !prev);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

    const HeaderSticky = 270;
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

    const variantCard = offerSingle?.sizes;
    const is_sizes = variantCard?.length > 1;

    // day&time
    useEffect(() => {
        const startDate = moment(startDateTime);
        const endDate = moment(endDateTime);
        if (startDate.isSame(endDate, 'day')) {
            const startTime = startDate.format('hh:mm A');
            const endTime = endDate.format('hh:mm A');
            setBalance(`${startTime} - ${endTime}`);
            setDateTime('time');
        } else {
            const days = endDate.diff(startDate, 'days') + 1; // Adding 1 to include both start and end dates
            const startdate = startDate.format('DD/MM/YY');
            const enddate = endDate.format('DD/MM/YY');
            setBalance(`${startdate} - ${enddate}`);
            setDateTime('date');
        }
    }, [startDateTime, endDateTime, offerSingle]);

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
                            console.log('Offer Edit');
                            setEditOfferModal(true);
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
                                DisableText={'Disable Offer'}
                                isOn={isOn}
                                setIsOn={setIsOn}
                                toggleProduct={toggleProduct}
                            />
                        </View>

                        <View style={{marginTop: SIZE(32)}}>
                            <StarOfferCard
                                productCard={productCard}
                                isoffer={true}
                            />
                        </View>
                        {route?.params?.page === 'inventory' ? null : (
                            <View
                                style={{
                                    marginTop: SIZE(32),
                                    paddingHorizontal: SIZE(16),
                                }}>
                                <OfferTimeDate
                                    balance={balance}
                                    dateTime={dateTime}
                                    endDateTime={endDateTime}
                                />
                            </View>
                        )}
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
                            <Title label={'Variants'} onPress={() => {}} />
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
                                                if (!item?.stock < 1) {
                                                    setSelectedFoodTypeIndex(
                                                        index,
                                                    );
                                                    setSelectedFood(item);
                                                    navigation.navigate(
                                                        'DefaultVariant',
                                                        {variant: item},
                                                    );
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                        <View style={{marginTop: SIZE(32)}}>
                            <Description
                                descriptionText={
                                    productDescription && productDescription
                                }
                            />
                        </View>
                        {!reviewData?.length == 0 && (
                            <View>
                                <Title label={'Reviews'} onPress={() => {}} />
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
                                        />
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                    <ModalScreen
                        isVisible={editOfferModal}
                        setVisible={setEditOfferModal}
                        inner={
                            <AddOffer
                                editOffer={true}
                                close={setEditOfferModal}
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
                                editOfferProduct={editOfferProduct}
                            />
                        }
                    />
                    <ModalBox
                        isVisible={delModal}
                        setVisible={setDelModal}
                        inner={
                            <DeleteItem
                                close={setDelModal}
                                deleted={DeleteOfferProduct}
                            />
                        }
                    />
                </ScrollView>
            )}
        </>
    );
};

export default OfferSingle;

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
