import React, {useEffect, useContext} from 'react';

import {ecommerceApiCustomers} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';

export const EcommerceApiStoreList = ({
    setStoreList,
    searchQuery,
    setIsLoading,
}) => {
    const {state} = useContext(Context);

    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }

    const getStoreList = async () => {
        setIsLoading(true);
        try {
            const response = await ecommerceApiCustomers.get(
                `store-list/?q=${searchQuery}`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setStoreList(data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getStoreList();
    }, [searchQuery]);
};
export const EcommerceApiStoreSingle = ({
    setshopDetail,
    id,
    setStoreProduct,
    serchOption,
    selectedFilter,
    setdonatedProductList,
    priceValue,
    orderStatus,
    setIsLoading,
}) => {
    const {state, dispatch} = useContext(Context);

    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }

    const pk = id;
    let status = '';
    if (orderStatus) {
        statusesArray = orderStatus.map(item => `category=${item}&`);
        status = statusesArray.join('');
    }
    const getStoreSingle = async () => {
        setIsLoading(true);
        try {
            const response = await ecommerceApiCustomers.get(
                `store-single/${pk}/?${status}q=${serchOption}&min_price=${
                    priceValue[0] ? priceValue[0] : ''
                }&max_price=${priceValue[1] ? priceValue[1] : ''}`,
                config,
            );
            let {StatusCode, data, donated_products, products} = response.data;

            if (StatusCode === 6000) {
                setshopDetail(data);
                setStoreProduct(products);
                setdonatedProductList(donated_products);
                setIsLoading(false);
            } else {
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getStoreSingle();
    }, [serchOption, selectedFilter, priceValue, orderStatus]);
};

export const toggleWishlistPet = async (pk, state, sizeVarientSelection) => {
    const token = state.userData.accessToken;
    try {
        const response = await ecommerceApiCustomers.post(
            `add-or-remove-product-wishlist/${pk}/`,
            {
                variant_item_pk: sizeVarientSelection,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    } catch (error) {
        console.log('error toggle => wish =========wish', error.response.data);
    }
};

export const toggleCart = async (
    singleItemPk,
    sizeVarientSelection,
    state,
    cartItemAdd,
    toast,
    messageStatus,
    navigation,
    is_product_page,
    setSubmitLoading,
    replace,
) => {
    const token = state.userData.accessToken;

    try {
        setSubmitLoading(true);
        const response = await ecommerceApiCustomers.post(
            `add-to-cart/${singleItemPk}/`,
            {
                variant_item_pk: sizeVarientSelection,
                is_product_page: is_product_page,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        let {StatusCode, message} = response.data;
        if (StatusCode == 6000) {
            cartItemAdd(replace);
            toast.show(message, {type: 'success'});
            setSubmitLoading(false);
            if (messageStatus === true) {
                navigation.navigate('CartCustomer');
            }
        } else {
            toast.show(message, {type: 'warning'});
            setSubmitLoading(false);
        }
    } catch (error) {
        console.log('error toggle => wish =========wish', error.response.data);
    }
};

export const toggleCartAction = async (
    singleItemPk,
    sizeVarientSelection,
    state,
    cartItemAdd,
    toast,
    messageStatus,
    navigation,
    is_product_page,
    setReplaceModal,
    replace,
    setCartLoading,
) => {
    const token = state.userData.accessToken;

    try {
        setCartLoading(true);
        const response = await ecommerceApiCustomers.post(
            `add-to-cart/${singleItemPk}/`,
            {
                variant_item_pk: sizeVarientSelection,
                is_product_page: is_product_page,
                is_replace: replace,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        let {StatusCode, message} = response.data;
        if (StatusCode == 6000) {
            toast.show(message, {type: 'success'});
            setCartLoading(false);
            cartItemAdd(replace);
        } else if (StatusCode == 6002) {
            setReplaceModal(true);
            setCartLoading(false);
        } else {
            toast.show(message, {type: 'warning'});
            setCartLoading(false);
        }
    } catch (error) {
        console.log('error toggle => wish =========wish', error.response.data);
    }
};

export const RemoveFromCart = async (itemStat, state, setIsLoading1) => {
    const token = state.userData.accessToken;
    try {
        const response = await ecommerceApiCustomers.post(
            `remove-from-cart/${itemStat.id}/`,
            {
                variant_item_pk: itemStat.variant_item_pk,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        let {StatusCode} = response.data;

        if (StatusCode == 6000) {
            setIsLoading1(prev => !prev);
            setTimeout(() => {
                setIsLoading1(false);
            }, 500);
        } else {
            console.log('Already hav');
        }
    } catch (error) {
        console.log('error toggle => wish =========wish', error.response.data);
    }
};

export const EcommerceApiOfferProduct = setOfferProduct => {
    const {state, dispatch} = useContext(Context);

    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }

    const getOfferProduct = async () => {
        try {
            const response = await ecommerceApiCustomers.get(`offers/`, config);
            let {StatusCode, data} = response.data;

            if (StatusCode === 6000) {
                setOfferProduct(data);
            } else {
                setOfferProduct([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getOfferProduct();
    }, []);
};

export const EcommerceApiDonatingShopList = ({
    setDonateStoreList,
    searchQuery,
    setIsLoading,
}) => {
    const {state, dispatch} = useContext(Context);
    const getDonatingStore = async () => {
        setIsLoading(true);
        try {
            const config = {
                headers: {},
            };
            if (state.userData.is_login) {
                config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
            }
            const response = await ecommerceApiCustomers.get(
                `donating-store-list/?q=${searchQuery}`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setDonateStoreList(data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getDonatingStore();
    }, [searchQuery]);
};

export const EcommerceApiProductCategories = setFilterItem => {
    const getCategories = async () => {
        try {
            const response = await ecommerceApiCustomers.get(
                `get-product-categories/`,
            );
            let {StatusCode, data} = response.data;

            if (StatusCode === 6000) {
                setFilterItem([
                    // {
                    //     name: 'All',
                    //     id: '',
                    // },
                    ...data,
                ]);
            } else {
                setFilterItem([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCategories();
    }, []);
};

export const EcommerceApiProductList = (
    setProductList,
    page,
    searchQueryCustomer,
    priceValue,
    orderStatus,
    setMostPrice,
    setIsLoading,
    focusRefresh,
    refreshing,
    selectedCategory,
) => {
    const {state, dispatch} = useContext(Context);

    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }
    let status = '';
    if (orderStatus) {
        statusesArray = orderStatus.map(item => `category=${item}&`);
        status = statusesArray.join('');
    }

    const getProductList = async () => {
        setIsLoading(true);
        try {
            const response = await ecommerceApiCustomers.get(
                `product-list/?${status}page=${page}&q=${searchQueryCustomer}&min_price=${
                    priceValue[0] ? priceValue[0] : ''
                }&max_price=${priceValue[1] ? priceValue[1] : ''}`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setProductList(data);
                if (setMostPrice) {
                    setMostPrice(response.data.max_product_price);
                }
                setIsLoading(false);
            } else {
                setProductList([]);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getProductList();
    }, [
        searchQueryCustomer,
        priceValue,
        page,
        orderStatus,
        focusRefresh,
        refreshing,
        selectedCategory,
    ]);
};

export const EcommerceApiProductSingle = (
    pk,
    setFoodSingle,
    setSelectedItemIndex,
    setSizevarientSelection,
    sizeVarientSelection,
    setIsLoading,
    setErrorStatus,
) => {
    const {state, dispatch} = useContext(Context);
    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }
    const getProductSingle = async () => {
        setIsLoading(true);
        try {
            const response = await ecommerceApiCustomers.get(
                `product-single/${pk}/${
                    sizeVarientSelection
                        ? `?variant_item_pk=${sizeVarientSelection}`
                        : ''
                }`,
                config,
            );
            let {StatusCode, data} = response.data;
            setFoodSingle(data);
            setSelectedItemIndex(data?.all_variants?.[0]);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setErrorStatus(error.response.status);
            console.log(error);
        }
    };
    useEffect(() => {
        getProductSingle();
    }, [sizeVarientSelection, pk]);
};

export const EcommerceApiDonatedProductList = (
    setdonatedProductList,
    searchQuery,
    orderStatus,
    setIsLoading,
    focusRefresh,
    refreshing,
    selectedCategory,
) => {
    const {state, dispatch} = useContext(Context);
    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }
    let status = '';
    if (orderStatus) {
        statusesArray = orderStatus.map(item => `category=${item}&`);
        status = statusesArray.join('');
    }
    const getDonatedProductList = async () => {
        setIsLoading(true);
        try {
            const response = await ecommerceApiCustomers.get(
                `donated-product-list/?${status}q=${searchQuery}`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setdonatedProductList(data);
                setIsLoading(false);
            } else {
                setdonatedProductList([]);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getDonatedProductList();
    }, [searchQuery, orderStatus, focusRefresh, refreshing, selectedCategory]);
};

export const EcommerceApiDonatedProductSingle = (
    productPk,
    setdonatedProductSingle,
    refreshing,
    setImageGallery,
    setErrorStatus,
    setIsLoading,
) => {
    const {state} = useContext(Context);

    const getDonatedProductSingle = async () => {
        try {
            setIsLoading(true);
            const config = {
                headers: {},
            };
            if (state.userData.is_login) {
                config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
            }
            const response = await ecommerceApiCustomers.get(
                `donated-product-single/${productPk}/`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setdonatedProductSingle(data);
                setImageGallery([data.image]);
                setIsLoading(false);
            } else {
                setProductList();
                setIsLoading(false);
            }
        } catch (error) {
            setErrorStatus(error.response.status);
            console.log(error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getDonatedProductSingle();
    }, [productPk, refreshing]);
};

export const EcommerceApiProductWishList = setWishListItems => {
    const {state, dispatch} = useContext(Context);

    const getProductWishList = async () => {
        try {
            const response = await ecommerceApiCustomers.get(
                `product-wishlist/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;

            if (StatusCode == 6000 && data.length != 0) {
                data.forEach(item => {
                    dispatch({
                        type: 'ADD_TO_WISH',
                        wishList: item,
                    });
                });
            }
        } catch (error) {
            // console.log(error, 'wishError');
        }
    };
    useEffect(() => {
        getProductWishList();
    }, [state.userData.accessToken]);
};

export const EcommerceApiProductWishListSecond = (
    setWishListItems,
    refresh,
) => {
    const {state} = useContext(Context);

    const getProductWishList = async () => {
        try {
            const response = await ecommerceApiCustomers.get(
                `product-wishlist/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;

            if (StatusCode == 6000 && data.length != 0) {
                setWishListItems(data);
            }
        } catch (error) {
            // console.log(error, 'wishError');
        }
    };
    useEffect(() => {
        getProductWishList();
    }, [state.userData.accessToken, refresh]);
};

export const EcommerceApiProductCart = (
    setCartItem,
    setDetailData,
    setAddress,
    seperateRefresh,
    isLoading1,
    setIsLoading2,
) => {
    const {state} = useContext(Context);
    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }
    const getProductCart = async () => {
        setIsLoading2(true);
        try {
            const response = await ecommerceApiCustomers.get(
                `check-out/`,
                config,
            );

            let {StatusCode, data} = response.data;
            if (StatusCode == 6000 && data.length != 0) {
                setCartItem(data);
                setDetailData(response.data.price_details);
                setAddress(response.data.address);
                setIsLoading2(false);
                // data.forEach(item => {
                //     dispatch({
                //         type: 'ADD_TO_CART',
                //         cart: item,
                //     });
                // });
            } else {
                setCartItem([]);
                setIsLoading2(false);
            }
        } catch (error) {
            setIsLoading2(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getProductCart();
    }, [seperateRefresh, state.userData.accessToken, isLoading1]);
};

export const EcommerceApiProductCart2 = () => {
    const {state, dispatch} = useContext(Context);
    const getProductCart = async () => {
        try {
            const response = await ecommerceApiCustomers.get(`check-out/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
            let {StatusCode, data} = response.data;
            if (StatusCode == 6000 && data.length != 0) {
                data.forEach(item => {
                    dispatch({
                        type: 'ADD_TO_CART',
                        cart: item,
                    });
                });
            }
        } catch (error) {
            // console.log(error);
        }
    };
    useEffect(() => {
        getProductCart();
    }, [state.userData.accessToken]);
};

export const EcommerceApiProductOrderList = (
    setOrderData,
    refreshing,
    orderStatus,
    orderTime,
    searchQuery,
    selectedCategory,
    setIsLoading,
) => {
    const {state} = useContext(Context);

    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }

    let status = '';
    if (orderStatus) {
        statusesArray = orderStatus.map(item => `order_status=${item}&`);
        status = statusesArray.join('');
    }

    const getProductOrderList = async () => {
        setIsLoading(true);
        try {
            const response = await ecommerceApiCustomers.get(
                `orders/?${status}order_time=${orderTime}&q=${searchQuery}`,
                config,
            );
            let {StatusCode, data} = response.data;

            if (StatusCode === 6000) {
                setOrderData(data);
                setIsLoading(false);
            } else {
                setOrderData([]);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error.response, 'data');
        }
    };
    useEffect(() => {
        getProductOrderList();
    }, [refreshing, orderTime, orderStatus, searchQuery, selectedCategory]);
};

export const EcommerceApiProductOrderSingle = (
    pk,
    setState,
    setShippiDetails,
) => {
    const {state} = useContext(Context);

    const getProductOrderSingle = async () => {
        try {
            const response = await ecommerceApiCustomers.get(
                `order-single/${pk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data, shipping_details} = response.data;
            if (StatusCode === 6000) {
                setState(data);
                setShippiDetails(shipping_details);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProductOrderSingle();
    }, []);
};

export const EcommerceApiProductDonationOrder = (
    setOrderData,
    refreshing,
    orderStatus,
    orderTime,
    searchQuery,
    selectedCategory,
    setIsLoading,
) => {
    const {state, dispatch} = useContext(Context);

    let status = '';

    if (orderStatus) {
        statusesArray = orderStatus.map(item => `order_status=${item}&`);
        status = statusesArray.join('');
    }
    const getDonationOrderList = async () => {
        setIsLoading(true);
        try {
            const response = await ecommerceApiCustomers.get(
                `donation-order-list/?${status}order_time=${orderTime}&q=${searchQuery}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setOrderData(data);
                setIsLoading(false);
            } else {
                setOrderData([]);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getDonationOrderList();
    }, [refreshing, orderTime, orderStatus, searchQuery, selectedCategory]);
};

export const EcommerceApiMyAddress = () => {
    const {state, dispatch} = useContext(Context);
    const getMyAddress = async () => {
        try {
            const response = await ecommerceApiCustomers.get(`my-addresses/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getMyAddress();
    }, []);
};

export const EcommerceApiProductDonationOrderSingle = (
    pk,
    setState,
    setRefreshing,
) => {
    const {state, dispatch} = useContext(Context);

    const getOrderSingleApi = async () => {
        setRefreshing(true);
        try {
            const response = await ecommerceApiCustomers.get(
                `donation-order-single/${pk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setState(data);
                setRefreshing(false);
            } else {
                setState();
                setRefreshing(false);
            }
        } catch (error) {
            setRefreshing(false);
            console.log(error.response, 'rrrrrr');
        }
    };
    useEffect(() => {
        getOrderSingleApi();
    }, [state.userData.accessToken]);
};

export const CustomerShippingAddressList = (
    setSection,
    section,
    refreshing,
    setIsLoading,
    setSelectedAddressPk,
    isLoading1,
) => {
    const {state} = useContext(Context);
    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }

    const getCustomerShippingAddressList = async () => {
        setIsLoading(true);
        try {
            const response = await ecommerceApiCustomers.get(
                `shipping-address-list/`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setSection(data);
                setSelectedAddressPk(data[0]?.id);
            } else {
                setSection([]);
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error.message, 'ecomm address error');
        }
    };
    useEffect(() => {
        getCustomerShippingAddressList();
    }, [refreshing, isLoading1]);
};

export const EcommerceApiBanner = setState => {
    const getBanners = async () => {
        try {
            const response = await ecommerceApiCustomers.get(`banners/`);

            let {StatusCode, data} = response.data;

            if (StatusCode === 6000) {
                setState(data);
            } else {
                setState([]);
            }
        } catch (error) {
            console.log(error.response, 'rrrrrr');
        }
    };
    useEffect(() => {
        getBanners();
    }, []);
};

export const EcommerceCustomerSearch = (searchQuery, setSearchResult) => {
    const {state} = useContext(Context);

    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }

    const mainSearch = async () => {
        try {
            const response = await ecommerceApiCustomers.get(
                `search/?q=${searchQuery}`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setSearchResult(data);
            } else {
                setSearchResult();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        mainSearch();
    }, [searchQuery]);
};

export const EcommerceCustomerRecentSearch = (setRecentResults, reload) => {
    const {state} = useContext(Context);
    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }
    const recentSearch = async () => {
        try {
            const response = await ecommerceApiCustomers.get(
                `recent-searches/`,
                config,
            );

            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setRecentResults(data);
            } else {
                setRecentResults([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        recentSearch();
    }, [reload]);
};
