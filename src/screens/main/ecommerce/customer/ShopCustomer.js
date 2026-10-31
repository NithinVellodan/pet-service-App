//
import React, {useState, useContext, useEffect} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';

//constants

import {useNavigation} from '@react-navigation/native';

// component
import Headers from '../../../includes/headers/Headers';
import Banner from '../../../main/ecommerce/includes/Banner';
import Offer from '../includes/Offer';
import ViewAll from '../includes/ViewAll';
import ShopItem from '../includes/ShopItem';
import TopProductCard from '../includes/TopProductCard';
import DonateBanner from './DonateBanner';
import {
    EcommerceApiBanner,
    EcommerceApiOfferProduct,
    EcommerceApiProductList,
} from '../../EcommerceCustomerApi';
import {Context} from '../../../../contexts/Store';
import {ecommerceApiCustomers} from '../../../../../axiosConfig';
import {SIZE, SIZES} from '../../../../theme/theme';
import ModalScreen from '../../../Profile-related/ModalScreen';
import UserLogin from '../../../booking/includes/UserLogin';

const ShopCustomer = () => {
    const {state, dispatch} = useContext(Context);
    const navigation = useNavigation();
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [userModal, setUserModal] = useState(false);
    const [isType, setType] = useState('mail');
    const [productList, setProductList] = useState();
    const [offerProductList, setOfferProductList] = useState();
    const [bannerData, setBannerData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    useEffect(() => {
        state.cart;
    }, [state.cart]);

    EcommerceApiProductList(
        setProductList,
        'home-page',
        '',
        '',
        '',
        '',
        setIsLoading,
    );
    EcommerceApiOfferProduct(setOfferProductList);
    EcommerceApiBanner(setBannerData);

    const getProductCart = async () => {
        try {
            const response = await ecommerceApiCustomers.get(
                `cart-items-count/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, cart_count} = response.data;
            if (StatusCode === 6000) {
                dispatch({
                    type: 'UPDATE_USER_DATA',
                    userData: {
                        ...state.userData,
                        cart_count: cart_count,
                    },
                });
            }
        } catch (error) {}
    };

    useEffect(() => {
        getProductCart();
    }, [state.cart]);

    const renderImages = ({item, index}) => (
        <Offer item={item} index={index} length={offerProductList.length} />
    );
    const renderProductList = ({item}) => (
        <TopProductCard
            item={item}
            setUserModal={setUserModal}
            userModal={userModal}
            setScreen={setScreen}
        />
    );

    return (
        <SafeAreaView style={{flex: 1}}>
            <Headers
                headText={'Shop for Pet'}
                icon={true}
                searchCommerceHome={true}
                cart={true}
                wish={true}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                onPressSearch={() => {
                    setIsSearch(true);
                }}
                setSearchQueryCustomer={setSearchQuery}
                cartPress={() => {
                    if (state.userData.is_login) {
                        navigation.navigate('CartCustomer');
                    } else {
                        setUserModal(true);
                        setScreen('login');
                    }
                }}
                wishPress={() => {
                    navigation.navigate('WishlistCustomer');
                }}
                searchPress={() => {
                    navigation.navigate('CustomerSearchSection');
                }}
            />
            <FlatList
                bounces={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <Banner
                            navigation={navigation}
                            spotlightData={bannerData}
                        />
                        <FlatList
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={offerProductList}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderImages}
                            style={{marginVertical: SIZE(30)}}
                        />

                        <ViewAll
                            onPress={() => navigation.navigate('Shops')}
                            label={'Shops'}
                        />
                        <ShopItem />
                        <DonateBanner />
                        <View style={{marginBottom: 5}}>
                            <ViewAll
                                onPress={() =>
                                    navigation.navigate('ProductCustomer')
                                }
                                label={'Top Products'}
                            />
                        </View>
                    </>
                }
                data={productList}
                keyExtractor={item => item.id?.toString()}
                renderItem={renderProductList}
                numColumns={2}
                ListFooterComponent={
                    <View
                        style={{
                            height: SIZE(10),
                        }}></View>
                }
            />
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
        </SafeAreaView>
    );
};

export default ShopCustomer;

const styles = StyleSheet.create({});
