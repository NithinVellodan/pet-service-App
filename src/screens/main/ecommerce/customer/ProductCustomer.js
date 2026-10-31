import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
//packages
import {useIsFocused} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../../../theme/theme';
// component
import Headers from '../../../includes/headers/Headers';
import ModalScreen from '../../../Profile-related/ModalScreen';
import ShopsAndDonated from '../includes/ShopsAndDonated';
//svg
import ProductNull from '../../../../assets/icons/empty-page/product-null.svg';
import DonatedProducts from './DonatedProducts';
import TopProductCard from '../includes/TopProductCard';

import {
    EcommerceApiDonatedProductList,
    EcommerceApiProductCategories,
    EcommerceApiProductList,
} from '../../EcommerceCustomerApi';
import OrderFilterSection from './includes/OrderFilterSection';
import EmptyPageCustomer from '../includes/EmptyPageCustomer';
import UserLogin from '../../../booking/includes/UserLogin';
import SearchCustomer from '../includes/SearchCustomer';

const ProductCustomer = ({route}) => {
    const isFocused = useIsFocused();

    const [selectedCategory, setSelectedCategory] = useState(
        route?.params?.tab ? route?.params?.tab : 'shops',
    );
    const [userModal, setUserModal] = useState(false);
    const [isType, setType] = useState('mail');
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });
    const [filterItemSelected, setFilterItemSelected] = useState(0);
    //search
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [productList, setProductList] = useState();
    const [selectedFilter, setSelectedFilter] = useState('');
    const [isFilter, setIsFilter] = useState(false);
    const [FilterItem, setFilterItem] = useState([]);
    const [serchOption, setSearchOption] = useState('');
    const [orderStatus, setOrderStatus] = useState([
        // 'c05d07af-94d3-432c-b1d6-0440c8aa317b',
        route?.params?.id,
    ]);
    const [mostPrice, setMostPrice] = useState();
    const [priceValue, setPriceValue] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [orderTime, setOrderTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [focusRefresh, setFocusRefresh] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const filterModal = () => {
        setIsFilter(!isFilter);
    };

    EcommerceApiProductCategories(setFilterItem);
    const [donatedProductList, setdonatedProductList] = useState([]);

    if (selectedCategory === 'shops') {
        EcommerceApiProductList(
            setProductList,
            '',
            searchQuery,
            priceValue,
            orderStatus,
            setMostPrice,
            setIsLoading,
            focusRefresh,
            refreshing,
            selectedCategory,
        );
    } else {
        EcommerceApiDonatedProductList(
            setdonatedProductList,
            searchQuery,
            orderStatus,
            setIsLoading,
            focusRefresh,
            refreshing,
            selectedCategory,
        );
    }

    const renderDonatedShop = ({item}) => (
        <DonatedProducts
            item={item}
            staticitems={true}
            all_product_listPage={true}
        />
    );

    const renderShopList = ({item}) => (
        <TopProductCard
            item={item}
            setUserModal={setUserModal}
            setScreen={setScreen}
        />
    );

    const clearFilterData = () => {
        setIsFilterActive(false);
        setOrderStatus([]);
        setPriceValue([1, mostPrice]);
    };

    // useEffect(() => {
    //     setFocusRefresh(!focusRefresh);
    // }, [isFocused]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <View style={{paddingBottom: SIZE(75)}}>
            <Headers
                setSearchQueryCustomer={setSearchQuery}
                icon={true}
                filter={true}
                searchCommerce={true}
                headText={'Products'}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                onPressSearch={() => {
                    setIsSearch(true);
                }}
                setSearchQuery={setSearchQuery}
                filterItemSelected={filterItemSelected}
                setFilterItemSelected={setFilterItemSelected}
                setOrderTime={setOrderTime}
                setOrderStatus={setOrderStatus}
                filterModal={filterModal}
                orderTime={orderTime}
                orderStatus={orderStatus}
                setPriceValue={setPriceValue}
                onPressClearData={clearFilterData}
                isFilterActive={isFilterActive}
            />
            <View
                style={{
                    paddingHorizontal: SIZE(16),
                    marginTop: SIZE(25),
                }}>
                <ShopsAndDonated
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    product={true}
                />
            </View>
            <SearchCustomer
                searchBox={false}
                FilterItem={FilterItem}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                setSearchQuery={setSearchQuery}
                serchOption={serchOption}
                setSearchOption={setSearchOption}
                onPressFilter={() => {
                    setIsFilter(true);
                }}
                filter={true}
                reverse={true}
                onPressItem={() => {
                    console.log('selectedFilterItem');
                }}
                isFilterActive={isFilterActive}
                setIsFilterActive={setIsFilterActive}
                setOrderStatus={setOrderStatus}
                onPressClearData={clearFilterData}
                orderStatus={orderStatus}
                is_product_list={true}
            />
            {isLoading && !refreshing ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(300),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : (
                <FlatList
                    bounces={false}
                    refreshControl={
                        <RefreshControl
                            colors={['#003459']}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    style={{
                        minHeight: 'auto',
                    }}
                    contentContainerStyle={{
                        justifyContent: 'space-between',
                        paddingHorizontal: SIZE(6),
                        paddingTop: SIZE(10),
                    }}
                    showsVerticalScrollIndicator={false}
                    data={
                        selectedCategory === 'shops'
                            ? productList
                            : donatedProductList
                    }
                    keyExtractor={item =>
                        item.id?.toString() || item.key || item.toString()
                    }
                    renderItem={
                        selectedCategory === 'shops'
                            ? renderShopList
                            : renderDonatedShop
                    }
                    numColumns={2}
                    ListFooterComponent={
                        <View
                            style={{
                                height: SIZE(200),
                            }}></View>
                    }
                    ListEmptyComponent={
                        productList?.length === 0 ||
                        donatedProductList?.length === 0 ? (
                            selectedCategory === 'shops' ? (
                                <EmptyPageCustomer
                                    heading={'Empty Products'}
                                    image={<ProductNull />}
                                    button={'Shop now'}
                                    description={
                                        'Products are Currently Empty.'
                                    }
                                    shop_now_button={false}
                                />
                            ) : (
                                <EmptyPageCustomer
                                    heading={'Empty Products'}
                                    image={<ProductNull />}
                                    button={'Shop now'}
                                    description={
                                        ' Donated Products are Currently Empty.'
                                    }
                                    shop_now_button={false}
                                />
                            )
                        ) : null
                    }
                />
            )}
            <ModalScreen
                isVisible={isFilter}
                setVisible={setIsFilter}
                inner={
                    <OrderFilterSection
                        close={setIsFilter}
                        orderStatus={orderStatus}
                        setOrderStatus={setOrderStatus}
                        orderTime={orderTime}
                        setOrderTime={setOrderTime}
                        priceValue={priceValue}
                        setPriceValue={setPriceValue}
                        mostPrice={mostPrice}
                        setIsFilterActive={setIsFilterActive}
                    />
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
        </View>
    );
};

export default ProductCustomer;

const styles = StyleSheet.create({
    scrollViewContainer: {
        paddingTop: SIZE(24),
    },
});
