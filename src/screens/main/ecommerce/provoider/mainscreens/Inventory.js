import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    Platform,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';

//packages
import {useFocusEffect, useNavigation} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';
import {
    EcommerceApi,
    EcommerceServiceProviderProductList,
    EcommerceServiceProviderdonatedProductList,
} from '../../../EcommerceApiSection';
import {Context} from '../../../../../contexts/Store';
import {ecommerceApiServiceProvider} from '../../../../../../axiosConfig';

//components
import Headers from '../../../../includes/headers/Headers';
import SearchCustomer from '../../includes/SearchCustomer';
import CardProduct from '../../includes/CardProduct';
import ModalBox from '../../../../Home/includes/ModalBox';
import DeleteItem from '../../includes/DeleteItem';
import CardDonate from '../../includes/CardDonate';
import ModalScreen from '../../../../Profile-related/ModalScreen';
import AddProduct from '../AddProduct';
import AddDonateDetails from '../AddDonateDetails';
import AddVariant from '../AddVariant';
import MainFilterProvider from '../../../../filter/MainFilterProvider';
import EmptyPageCustomer from '../../includes/EmptyPageCustomer';

//images and logos
import Triangle from '../../../../../assets/icons/triangle.svg';
import CloseIcon from '../../../../../assets/icons/close-icon-blue.svg';
import ProductNull from '../../../../../assets/icons/empty-page/product-null.svg';

const Inventory = () => {
    const {state} = useContext(Context);
    const navigation = useNavigation();
    const {height: WINDOW_HEIGHT, width: WINDOW_WIDTH} =
        Dimensions.get('window');
    const [refreshing, setRefreshing] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [select, setSelect] = useState('products');
    const [showAdd, setShowAdd] = useState(false);
    const [productEdit, setProductEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [donateModal, setDonateModal] = useState(false);
    const [editDonateModal, setEditDonateModal] = useState(false);
    const [topValue, setTopValue] = useState(WINDOW_HEIGHT / 1.52);
    const [isFilter, setIsFilter] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [MinMmax, setMinMmax] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState({});
    const [handleId, setHandleId] = useState('');
    const [mostPrice, setMostPrice] = useState();
    const [isLoading, setIsLoading] = useState(false);

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
    const [data, setData] = useState([]);
    const [donate, setDonate] = useState([]);
    // add Donate
    const [nameDonate, setNameDonate] = useState('');
    const [subtitleDonate, setSubtitleDonate] = useState('');
    const [categoryDonate, setCategoryDonate] = useState('');
    const [categoryImageDonate, setCategoryImageDonate] = useState([]);
    const [donateDescription, setDonateDescription] = useState('');
    const [errorMessageDonate, setErrorMessageDonate] = useState({});
    const [FilterItem, setFilterItem] = useState([]);
    const category = [
        {id: 1, name: 'category 1'},
        {id: 2, name: 'category 2'},
        {id: 3, name: 'category 3'},
    ];
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

    const filterModal = () => {
        if (isFilterActive) {
            setIsFilterActive(false);
            setMinMmax('');
            setSelectedFilter('');
        } else {
            setIsFilter(!isFilter);
        }
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
                setRefreshing(prev => !prev);
                setTimeout(() => {
                    setRefreshing(false);
                }, 500);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error try => ', error.response.data);
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
                setRefreshing(prev => !prev);
                setIsLoading(false);
                setTimeout(() => {
                    setRefreshing(false);
                }, 500);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

    EcommerceServiceProviderProductList(
        setData,
        selectedFilter,
        searchQuery,
        MinMmax[0],
        MinMmax[1],
        refreshing,
        setMostPrice,
    );

    EcommerceServiceProviderdonatedProductList(
        setDonate,
        selectedFilter,
        searchQuery,
        MinMmax[0],
        MinMmax[1],
        refreshing,
    );

    //api section
    EcommerceApi(setFilterItem);

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
            }, 500);
            return () => {};
        }, []),
    );
    const [productPk, setProductPk] = useState();

    // disable product
    const disableProduct = async () => {
        const token = state.userData.accessToken;
        const pk = productPk;
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
            setRefreshing(true);
            setTimeout(() => {
                setRefreshing(false);
            }, 1000);
        } catch (error) {
            console.log('error toggle => ', error.response.data);
        }
    };
    // disable product donate
    const disableDonateProduct = async () => {
        const token = state.userData.accessToken;
        const pk = productPk;
        try {
            const response = await ecommerceApiServiceProvider.put(
                `enable-disable-donated-product/${pk}/`,
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
            setRefreshing(true);
            setTimeout(() => {
                setRefreshing(false);
            }, 1000);
        } catch (error) {
            console.log('error toggle => ', error.response.data);
        }
    };

    // Edit product
    const editProduct = async () => {
        const token = state.userData.accessToken;
        const pk = handleId;
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
                console.log('response -> ', response.data);
                setProductEdit(false);
                setRefreshing(true);
                setTimeout(() => {
                    setRefreshing(false);
                }, 1000);
            })
            .catch(error => {
                console.log('error try => ', error.response.data);
            });
    };
    const handleEdit = item => {
        console.log(item.id, 'handle');
        setHandleId(item.id);
        setProductName(item.product_name);
        setCategoryValue({
            id: item.product_category,
            name: item.category_name,
        });
        setCategoryImage([
            {
                path: item.image,
            },
        ]);
        setProductDescription(item.description);
    };

    // Edit donate-product
    const editDonateProduct = async () => {
        const token = state.userData.accessToken;
        const pk = handleId;
        const formData = new FormData();
        formData.append('product_name', nameDonate);
        formData.append('sub_title', subtitleDonate);
        formData.append('product_category', categoryDonate.id);
        if (categoryImageDonate[0].name) {
            categoryImageDonate.forEach((image, index) => {
                formData.append('image', {
                    uri: image.path,
                    type: image.mime,
                    name: image.name,
                });
            });
        }
        formData.append('description', donateDescription);
        ecommerceApiServiceProvider
            .put(`edit-donated-product/${pk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setEditDonateModal(false);
                setRefreshing(true);
                setTimeout(() => {
                    setRefreshing(false);
                }, 1000);
            })
            .catch(error => {
                console.log('error try => ', error.response.data);
            });
    };
    const handleDonateEdit = item => {
        setHandleId(item.id);
        setCategoryImageDonate([
            {
                path: item.image,
            },
        ]);
        setNameDonate(item.product_name);
        setSubtitleDonate(item.sub_title);
        setCategoryDonate({
            id: item.product_category,
            name: item.category_name,
        });
        setDonateDescription(item.description);
    };

    return (
        <View>
            <Headers
                headText={'Inventory'}
                rightText={'+ Add'}
                petsAvailable={true}
                rightPress={() => {
                    setShowAdd(!showAdd);
                }}
            />
            {showAdd && (
                <TouchableOpacity
                    style={styles.showAddMain}
                    onPress={() => {
                        setShowAdd(false);
                    }}>
                    <View style={styles.showAdd}>
                        <View style={styles.triangle}>
                            <Triangle width={SIZE(20)} height={SIZE(20)} />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowAdd(false);
                                setShowModal(true);
                            }}
                            activeOpacity={0.5}
                            style={[
                                styles.showItem,
                                {
                                    marginBottom: SIZE(5),
                                    backgroundColor:
                                        select === 'products'
                                            ? '#EAF7FF'
                                            : '#FFF',
                                },
                            ]}>
                            <Text style={styles.showItemText}>
                                + Add Product
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setShowAdd(false);
                                setDonateModal(true);
                            }}
                            style={[
                                styles.showItem,
                                {
                                    backgroundColor:
                                        select === 'donated_products'
                                            ? '#EAF7FF'
                                            : '#FFF',
                                },
                            ]}>
                            <Text style={styles.showItemText}>
                                + Donate Product
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )}
            <View style={styles.selectContain}>
                <View style={styles.selectBox}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSelect('products')}
                        style={[
                            styles.selectItem,
                            {
                                backgroundColor:
                                    select === 'products'
                                        ? state.userData.is_service
                                            ? '#003459'
                                            : '#009FD3'
                                        : '#FFFFFF',
                            },
                        ]}>
                        <Text
                            style={[
                                styles.selectItemText,
                                {
                                    color:
                                        select === 'products'
                                            ? '#FFFFFF'
                                            : '#242424',
                                    fontFamily:
                                        select === 'products'
                                            ? FONTS.semiBold
                                            : FONTS.regular,
                                },
                            ]}>
                            Products
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSelect('donated_products')}
                        style={[
                            styles.selectItem,
                            {
                                backgroundColor:
                                    select === 'donated_products'
                                        ? state.userData.is_service
                                            ? '#003459'
                                            : '#009FD3'
                                        : '#FFFFFF',
                            },
                        ]}>
                        <Text
                            style={[
                                styles.selectItemText,
                                {
                                    color:
                                        select === 'donated_products'
                                            ? '#FFFFFF'
                                            : '#242424',
                                    fontFamily:
                                        select === 'donated_products'
                                            ? FONTS.semiBold
                                            : FONTS.regular,
                                },
                            ]}>
                            Donated Products
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
                <SearchCustomer
                    serchOption={searchQuery}
                    provider={true}
                    searchBox={true}
                    FilterItem={FilterItem}
                    isFilterActive={isFilterActive}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    setSearchOption={setSearchQuery}
                    onPressFilter={() => {
                        console.log('filterclick');
                        filterModal();
                    }}
                    onPressItem={() => {}}
                />
                {select === 'products' && (
                    <View style={styles.container}>
                        {data.length === 0 ? (
                            <View
                                style={{
                                    flex: 1,
                                }}>
                                <EmptyPageCustomer
                                    heading={'Empty Products'}
                                    image={<ProductNull />}
                                    button={'Shop now'}
                                    description={
                                        'Products are Currently Empty.'
                                    }
                                    shop_now_button={false}
                                />
                            </View>
                        ) : (
                            data.map((item, index) => (
                                <CardProduct
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    data={data}
                                    cardPress={() => {
                                        navigation.navigate('ProductSingle', {
                                            item: item,
                                            page: 'inventory',
                                        });
                                    }}
                                    editPress={() => {
                                        console.log('edit');
                                        handleEdit(item);
                                        setProductEdit(true);
                                    }}
                                    removePress={() => {
                                        if (item.is_enabled) {
                                            setDelModal(true);
                                            setProductPk(item.id);
                                        }
                                    }}
                                    disableclick={item.is_enabled}
                                />
                            ))
                        )}
                    </View>
                )}
                {select === 'donated_products' && (
                    <View style={styles.container}>
                        {donate.length === 0 ? (
                            <View
                                style={{
                                    flex: 1,
                                }}>
                                <EmptyPageCustomer
                                    heading={'Empty Products'}
                                    image={<ProductNull />}
                                    button={'Shop now'}
                                    description={
                                        'Donated Products are Currently Empty.'
                                    }
                                    shop_now_button={false}
                                />
                            </View>
                        ) : (
                            donate.map((item, index) => (
                                <CardDonate
                                    key={index}
                                    item={item}
                                    index={index}
                                    data={donate}
                                    cardPress={() => {
                                        navigation.navigate('DonateSingle', {
                                            item: item,
                                        });
                                    }}
                                    editPress={() => {
                                        console.log('editdonate');
                                        setEditDonateModal(true);
                                        handleDonateEdit(item);
                                    }}
                                    removePress={() => {
                                        if (item.is_enabled) {
                                            setDelModal(true);
                                            setProductPk(item.id);
                                        }
                                    }}
                                    disableclick={item.is_enabled}
                                />
                            ))
                        )}
                    </View>
                )}
            </ScrollView>
            <ModalBox
                isVisible={delModal}
                setVisible={setDelModal}
                inner={
                    <DeleteItem
                        enable_disable={() => {
                            if (select === 'products') {
                                disableProduct();
                            } else {
                                disableDonateProduct();
                            }
                        }}
                        close={setDelModal}
                        disable={true}
                    />
                }
            />
            <ModalScreen
                isVisible={productEdit}
                size={true}
                setVisible={setProductEdit}
                inner={
                    <AddProduct
                        close={setProductEdit}
                        editProduct={true}
                        product={product}
                        setProduct={setProduct}
                        productName={productName}
                        setProductName={setProductName}
                        categoryValue={categoryValue}
                        setCategoryValue={setCategoryValue}
                        categoryImage={categoryImage}
                        setCategoryImage={setCategoryImage}
                        productDescription={productDescription}
                        setProductDescription={setProductDescription}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        editProductapi={editProduct}
                    />
                }
            />
            <ModalScreen
                isVisible={showModal}
                setVisible={setShowModal}
                inner={
                    <>
                        {product === 'details' ? (
                            <AddProduct
                                close={setShowModal}
                                product={product}
                                category={category}
                                setProduct={setProduct}
                                productName={productName}
                                setProductName={setProductName}
                                categoryValue={categoryValue}
                                setCategoryValue={setCategoryValue}
                                categoryImage={categoryImage}
                                setCategoryImage={setCategoryImage}
                                productDescription={productDescription}
                                setProductDescription={setProductDescription}
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
                                    checkDefaultVariant={checkDefaultVariant}
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
                isVisible={editDonateModal}
                setVisible={setEditDonateModal}
                inner={
                    <AddDonateDetails
                        is_edit={true}
                        close={setEditDonateModal}
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
                        editDonateProduct={editDonateProduct}
                        isLoading={isLoading}
                    />
                }
            />
            <ModalScreen
                isVisible={isFilter}
                setVisible={setIsFilter}
                inner={
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                filterModal();
                                setMinMmax('');
                                setSelectedFilter('');
                            }}
                            hitSlop={SIZE(5)}
                            style={{
                                position: 'absolute',
                                top: SIZE(20),
                                right: SIZE(20),
                                zIndex: 100,
                            }}>
                            <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                        </TouchableOpacity>
                        <View style={{marginTop: SIZE(40)}}></View>
                        <MainFilterProvider
                            onlyModal={true}
                            filterPage={filterModal}
                            setTopValue={setTopValue}
                            setSelectedFilter={setSelectedFilter}
                            setMinMmax={setMinMmax}
                            setIsFilterActive={setIsFilterActive}
                            mostPrice={mostPrice}
                        />
                    </>
                }
            />
        </View>
    );
};

export default Inventory;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: SIZE(14),
        marginVertical: SIZE(12),
        paddingBottom: SIZE(160),
    },
    selectContain: {
        paddingHorizontal: SIZE(16),
        marginTop: SIZE(24),
        marginBottom: SIZE(10),
    },
    selectBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: SIZE(8),
        padding: SIZE(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectItem: {
        width: '50%',
        borderRadius: SIZE(6),
        padding: SIZE(10),
    },
    selectItemText: {
        fontSize: SIZE(16),
        lineHeight: SIZE(20),
        textAlign: 'center',
    },
    showAddMain: {
        backgroundColor: 'transparent',
        height: SIZES.height,
        width: SIZES.width,
        zIndex: 1000,
        position: 'absolute',
        top: SIZE(0),
    },
    showAdd: {
        position: 'absolute',
        top: SIZE(70),
        right: SIZE(20),
        backgroundColor: '#FFFFFF',
        zIndex: 100,
        padding: SIZE(12),
        borderRadius: SIZE(8),
        ...Platform.select({
            ios: {
                shadowColor: '#E9E9E9',
                shadowOffset: {width: 0.8, height: 0.8},
                shadowOpacity: 0.8,
                shadowRadius: SIZE(1),
            },
            android: {
                elevation: SIZE(50),
            },
        }),
    },
    triangle: {
        position: 'absolute',
        top: SIZE(-15),
        right: SIZE(10),
    },
    showItem: {
        padding: SIZE(8),
        borderRadius: SIZE(6),
    },
    showItemText: {
        textAlign: 'center',
        color: '#003459',
        fontFamily: FONTS.bold,
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
    },
});
