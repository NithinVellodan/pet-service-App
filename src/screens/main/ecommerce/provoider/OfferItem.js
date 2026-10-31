import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import Headers from '../../../includes/headers/Headers';
import CardProduct from '../includes/CardProduct';
import {SIZE} from '../../../../theme/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import NoData from '../../../../assets/icons/ecommerce/offerempty.svg';
import {FONTS} from '../../../../theme/fonts';
import ModalScreen from '../../../Profile-related/ModalScreen';
import AddOffer from './AddOffer';
import {EcommerceServiceProviderOfferList} from '../../EcommerceApiSection';
import {Context} from '../../../../contexts/Store';
import {ecommerceApiServiceProvider} from '../../../../../axiosConfig';
import moment from 'moment-timezone';

const OfferItem = () => {
    const navigation = useNavigation();
    const {state} = useContext(Context);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [offerModal, setOfferModal] = useState(false);
    const [data, setData] = useState([]);
    // add Offer
    const [title, setTitle] = useState('');
    const [variantValue, setVariantValue] = useState('');
    const [percentage, setPercentage] = useState('');
    const [categoryImageOffer, setCategoryImageOffer] = useState([]);
    const [offerDescription, setOfferDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateExpiry, setSelectedDateExpiry] = useState(null);
    const [errorMessageOffer, setErrorMessageOffer] = useState({});

    //api Section
    EcommerceServiceProviderOfferList(setData, refreshing);

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
                    setOfferModal(false);
                    clearOffer();
                }
                setIsLoading(false);
                setRefreshing(prev => !prev);
                setTimeout(() => {
                    setRefreshing(false);
                }, 100);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error try => ', error.response.data);
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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                setRefreshing(prev => !prev);
                setRefreshing(false);
            }, 100);
            return () => {
                // console.log('Screen is unfocused');
            };
        }, []),
    );

    return (
        <View>
            <Headers
                headText={'Offers'}
                rightText={'+ Add Offers'}
                petsAvailable={true}
                rightPress={() => {
                    console.log('+ Add Offers');
                    setOfferModal(true);
                }}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                refreshControl={
                    <RefreshControl
                        colors={['#003459']}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {data.length == 0 ? (
                    <View style={{paddingTop: SIZE(80)}}>
                        <View style={{alignItems: 'center'}}>
                            <View>
                                <NoData width={SIZE(300)} height={SIZE(300)} />
                            </View>
                            <View style={styles.bottomContainer}>
                                <Text style={styles.reviews}>No Offers</Text>
                                <Text style={styles.reviewsDescription}>
                                    Your Offer Products is empty now !
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.addOfferButton}
                                    onPress={() => {
                                        setOfferModal(true);
                                    }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.addOfferButtonText}>
                                        + Add Offers
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.container}>
                        {data.map((item, index) => (
                            <CardProduct
                                key={item.id}
                                item={item}
                                index={index}
                                data={data}
                                offer={true}
                                cardPress={() => {
                                    console.log('card', item.id);
                                    navigation.navigate('OfferSingle', {
                                        item: item,
                                        offer: true,
                                    });
                                }}
                                editPress={() => {
                                    console.log('edit');
                                }}
                                removePress={() => {
                                    console.log('remove');
                                }}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
            <ModalScreen
                isVisible={offerModal}
                setVisible={setOfferModal}
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
        </View>
    );
};

export default OfferItem;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: SIZE(14),
        marginVertical: SIZE(12),
    },

    bottomContainer: {
        alignItems: 'center',
        width: SIZE(300),
        marginTop: SIZE(16),
    },
    reviews: {
        marginBottom: SIZE(12),
        color: '#000000',
        fontWeight: '600',
        fontSize: SIZE(20),
        lineHeight: SIZE(25),
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
    },
    reviewsDescription: {
        textAlign: 'center',
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(20),
        color: '#686868',
        textAlign: 'center',
        fontSize: SIZE(16),
    },
    addOfferButton: {
        padding: SIZE(10),
        backgroundColor: '#003459',
        width: SIZE(145),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(6),
        marginTop: SIZE(24),
    },
    addOfferButtonText: {
        color: '#FFF',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '700',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
