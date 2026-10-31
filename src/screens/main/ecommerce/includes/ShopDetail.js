//
import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    Share,
} from 'react-native';
//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
//components
import ModalScreen from '../../../Profile-related/ModalScreen';
import Headers from '../../../includes/headers/Headers';
import SearchCustomer from './SearchCustomer';
import TopProductCard from './TopProductCard';
import ShopsAndDonated from './ShopsAndDonated';
import {EmptyPageCustomerProduct} from './EmptyPageCustomer';
//svg
import StarIcon from '../../../../assets/icons/star.svg';
import StarDot from '../../../../assets/icons/map-view/starDot.svg';

import ProductNull from '../../../../assets/icons/empty-page/product-null.svg';
import FilterPageEcom from '../customer/FilterPageEcom';

import {
    EcommerceApiProductCategories,
    EcommerceApiStoreSingle,
} from '../../EcommerceCustomerApi';
import Avatar from '../../../../assets/icons/avatar-new.svg';
import DonatedProductList from './DonatedProductList';
import UserLogin from '../../../booking/includes/UserLogin';
import OrderFilterSection from '../customer/includes/OrderFilterSection';

const ShopDetail = ({route}) => {
    const id = route?.params.id;
    const [selectedCategory, setSelectedCategory] = useState(
        route?.params?.selectedCategory
            ? route?.params?.selectedCategory
            : 'shops',
    );
    const [modalFilter, setModalFilter] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [isType, setType] = useState('mail');
    ///api
    const [shopDetail, setshopDetail] = useState([]);
    const [storeProduct, setStoreProduct] = useState([]);
    const [FilterItem, setFilterItem] = useState([]);
    const [donatedProductList, setdonatedProductList] = useState([]);
    const [searchQuery, setSearchQuery] = useState();
    const [serchOption, setSearchOption] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [isFilter, setIsFilter] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [orderStatus, setOrderStatus] = useState([]);
    const [mostPrice, setMostPrice] = useState(300);
    const [priceValue, setPriceValue] = useState([]);
    const [orderTime, setOrderTime] = useState('');
    const [isLoading, setIsLoading] = useState('');

    //shopDetail Api
    EcommerceApiStoreSingle({
        setshopDetail,
        id,
        setStoreProduct,
        serchOption,
        selectedFilter,
        setdonatedProductList,
        priceValue,
        orderStatus,
        setIsLoading,
    });

    EcommerceApiProductCategories(setFilterItem);

    const renderDonatedShop = ({item}) => <DonatedProductList item={item} />;

    const renderShopList = ({item}) => (
        <TopProductCard item={item} setUserModal={setUserModal} />
    );
    const clearFilterData = () => {
        setIsFilterActive(false);
        setOrderStatus([]);
        setPriceValue([1, mostPrice]);
    };

    const sharePress = () => {
        Share.share({
            message: shopDetail.shareable_link,
        })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    };

    return (
        <View style={{minHeight: '100%', flex: 1}}>
            <Headers icon={true} shareIcon={true} sharePress={sharePress} />

            <View style={{paddingHorizontal: SIZE(16)}}>
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        {shopDetail.image ? (
                            <Image
                                source={{uri: shopDetail.image}}
                                style={styles.imageFood}
                            />
                        ) : (
                            <Text>image null</Text>
                        )}
                    </View>

                    <View
                        style={{
                            flex: 1,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <View>
                                <Text style={styles.shopName}>
                                    {shopDetail.name &&
                                    shopDetail.name.length > 16
                                        ? `${shopDetail.provider_details.name.substring(
                                              0,
                                              16,
                                          )}...`
                                        : shopDetail.name}
                                </Text>
                            </View>

                            <View style={styles.ratingContainer}>
                                <View style={styles.starContainer}>
                                    {shopDetail?.rating > 0 ? (
                                        <StarIcon
                                            width={SIZE(18)}
                                            height={SIZE(18)}
                                        />
                                    ) : (
                                        <StarDot
                                            width={SIZE(18)}
                                            height={SIZE(18)}
                                        />
                                    )}
                                </View>
                                <View>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.starText}>
                                        {shopDetail.rating > 0
                                            ? parseFloat(
                                                  shopDetail?.rating?.toFixed(
                                                      1,
                                                  ),
                                              )
                                            : 'New'}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: SIZE(16),
                                alignItems: 'center',
                            }}>
                            <View style={styles.avatarImageContainer}>
                                {shopDetail?.provider_details?.image ? (
                                    <Image
                                        source={{
                                            uri: shopDetail.provider_details
                                                .image,
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: SIZE(32),
                                        }}
                                    />
                                ) : (
                                    <Avatar width={'100%'} height={'100%'} />
                                )}
                            </View>
                            <View>
                                <Text style={styles.avatarName}>
                                    {shopDetail?.provider_details?.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={{
                    paddingHorizontal: SIZE(16),
                    paddingTop: SIZE(20),
                    paddingBottom: SIZE(30),
                }}>
                <ShopsAndDonated
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    product={true}
                />
            </View>
            <SearchCustomer
                searchBox={true}
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
            />
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(450),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : (
                <FlatList
                    bounces={false}
                    contentContainerStyle={{
                        justifyContent: 'space-between',
                        paddingHorizontal: SIZE(6),
                        paddingTop: SIZE(10),
                    }}
                    showsVerticalScrollIndicator={false}
                    data={
                        selectedCategory === 'shops'
                            ? storeProduct
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
                    ListEmptyComponent={
                        selectedCategory === 'shops' ? (
                            <EmptyPageCustomerProduct
                                heading={'Empty Products'}
                                image={
                                    <ProductNull
                                        width={SIZE(150)}
                                        height={SIZE(150)}
                                    />
                                }
                                button={'Shop now'}
                                description={'Products are Currently Empty.'}
                            />
                        ) : (
                            <EmptyPageCustomerProduct
                                heading={'Empty Products'}
                                image={
                                    <ProductNull
                                        width={SIZE(150)}
                                        height={SIZE(150)}
                                    />
                                }
                                button={'Shop now'}
                                description={
                                    ' Donated Products are Currently Empty.'
                                }
                            />
                        )
                    }
                    ListFooterComponent={
                        <View
                            style={{
                                height: SIZE(100),
                            }}></View>
                    }
                />
            )}

            <ModalScreen
                isVisible={modalFilter}
                setVisible={setModalFilter}
                size={true}
                inner={<FilterPageEcom close={setModalFilter} />}
            />

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
                inner={<UserLogin isType={isType} close={setUserModal} />}
            />
        </View>
    );
};

export default ShopDetail;

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        padding: SIZE(16),
        backgroundColor: '#fff',
        marginTop: SIZE(24),
        borderRadius: SIZE(12),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        elevation: SIZE(3.5),
        shadowColor: 'rgba(0, 0, 0, 0.06)',
        shadowOffset: {
            width: SIZE(0),
            height: SIZE(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    shopName: {
        color: '#00171F',
        fontFamily: FONTS.bold,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(5),
        borderRadius: SIZE(4),
        marginBottom: SIZE(12),
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
    imageContainer: {
        width: SIZE(100),
        height: SIZE(100),
        borderRadius: SIZE(12),
        marginRight: SIZE(16),
    },
    imageFood: {
        width: SIZE(100),
        height: SIZE(100),
        borderRadius: SIZE(12),
    },
    avatarImageContainer: {
        borderRadius: SIZE(32),
        width: SIZE(32),
        height: SIZE(32),
    },
    avatarImage: {
        borderRadius: SIZE(32),
    },
    avatarName: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.bold,
        marginLeft: SIZE(8),
    },
    locationText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
    },
});
