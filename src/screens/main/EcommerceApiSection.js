import React, {useEffect, useContext} from 'react';
import {ecommerceApiServiceProvider} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';

export const EcommerceApi = setCategory => {
    const getCategories = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
                `get-product-categories/`,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setCategory(data);
            } else {
                setCategory([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCategories();
    }, []);
};

export const EcommerceServiceProviderProductList = (
    setData,
    selectedFilter,
    searchQuery,
    min_price,
    max_price,
    refreshing,
    setMostPrice,
) => {
    const {state} = useContext(Context);
    let Filter = '';
    let search = '';

    if (selectedFilter) {
        filterArray = selectedFilter.map(item => `category=${item}&`);
        Filter = filterArray.join('');
        // Filter = selectedFilter;
    }
    if (searchQuery) {
        search = searchQuery;
    }
    const getProductList = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
                `product-list/?${Filter}q=${search}${
                    min_price ? `&min_price=${min_price}` : ''
                }${max_price ? `&max_price=${max_price}` : ''}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setData(data);
                if (setMostPrice) {
                    setMostPrice(response.data.max_product_price);
                }
            } else {
                setData([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProductList();
    }, [refreshing, selectedFilter, searchQuery, min_price, max_price]);
};

export const EcommerceServiceProviderProductSingle = (
    state,
    setProductSingle,
    productId,
    params,
    loading,
    setPageLoading,
) => {
    const getProductSingle = async () => {
        setPageLoading(true);
        try {
            let paramspk = '';

            if (params) {
                paramspk = params;
            }
            const response = await ecommerceApiServiceProvider.get(
                `product-single/${productId}/?variant_size_pk=${paramspk}`,

                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setProductSingle(data);
            } else {
                setProductSingle([]);
            }
            setPageLoading(false);
        } catch (error) {
            console.log(error);
            setPageLoading(false);
        }
    };
    useEffect(() => {
        getProductSingle();
    }, [params, productId, loading]);
};

export const EcommerceServiceProviderProductEdit = () => {
    const {state} = useContext(Context); // Using useContext hook inside the custom hook
    const pk = 'd7710455-904d-4211-a70f-2f9c61c470ee';
    const productEdit = async () => {
        try {
            const response = await ecommerceApiServiceProvider.put(
                `edit-product/${pk}/`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
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
            console.log(error);
        }
    };

    return productEdit;
};

export const EcommerceServiceProviderProductEnable = (
    state,
    isOn,
    setIsOn,
    id,
) => {
    const productEdit = async () => {
        try {
            const response = await ecommerceApiServiceProvider.put(
                `enable-disable-product/${id}/`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
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
            console.log(error);
        }
    };

    return productEdit;
};

export const EcommerceServiceProviderProductVariants = setVariant => {
    const {state, dispatch} = useContext(Context);
    const pk = 'd7710455-904d-4211-a70f-2f9c61c470ee';

    const getProductVariants = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
                `get-product-variants/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setVariant(data);
            } else {
                setVariant([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProductVariants();
    }, []);
};

export const EcommerceServiceProviderProductVariantSingle = (
    state,
    setVariantSingle,
    variantId,
    params,
    variantIdReload,
    isOn,
    loading,
    setPageLoading,
) => {
    const pk = variantId;

    const getProductVariantSingle = async () => {
        setPageLoading(true);
        try {
            let paramspk = '';
            if (params) {
                paramspk = params;
            }
            const response = await ecommerceApiServiceProvider.get(
                `product-variant-single/${pk}/?variant_size_pk=${paramspk}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setVariantSingle(data);
            } else {
                setVariantSingle([]);
            }
            setPageLoading(false);
        } catch (error) {
            console.log(error);
            setPageLoading(false);
        }
    };
    useEffect(() => {
        getProductVariantSingle();
    }, [variantId, params, variantIdReload, isOn, loading]);
};

export const EcommerceServiceProviderProductVariantEdit = () => {
    const {state} = useContext(Context);
    const pk = 'dbfc8d50-c4d3-48a3-9317-bab3354992dd';

    const productVariantEdit = async () => {
        try {
            const response = await ecommerceApiServiceProvider.put(
                `edit-product-variant/${pk}/`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
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
            console.log(error, 'rrrrrr');
        }
    };

    return productVariantEdit;
};

export const EcommerceServiceProviderProductVariantDefault = () => {
    const {state} = useContext(Context);
    const pk = 'dbfc8d50-c4d3-48a3-9317-bab3354992dd';

    const productVariantDefault = async () => {
        try {
            const response = await ecommerceApiServiceProvider.post(
                `set-default-variant/${pk}/`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
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
            console.log(error);
        }
    };

    return productVariantDefault;
};

export const EcommerceServiceProviderProductVariantDelete = () => {
    const {state} = useContext(Context);
    const pk = 'dbfc8d50-c4d3-48a3-9317-bab3354992dd';

    const productVariantDelete = async () => {
        try {
            const response = await ecommerceApiServiceProvider.delete(
                `delete-product-variant/${pk}/`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
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
            console.log(error);
        }
    };

    return productVariantDelete;
};

export const EcommerceServiceProviderOfferList = (setData, refreshing) => {
    const {state, dispatch} = useContext(Context);
    const pk = 'dbfc8d50-c4d3-48a3-9317-bab3354992dd';

    const getProductOfferList = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
                `offer-product-list/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setData(data);
            } else {
                setData([]);
            }
        } catch (error) {
            console.log(error, 'offerlistrrrrrr');
        }
    };
    useEffect(() => {
        getProductOfferList();
    }, [refreshing]);
};

export const EcommerceServiceProviderOfferProductSingle = (
    state,
    setOfferSingle,
    offerId,
    params,
    loading,
    setPageLoading,
) => {
    const getProductOfferList = async () => {
        setPageLoading(true);
        try {
            let paramspk = '';

            if (params) {
                paramspk = params;
            }
            const response = await ecommerceApiServiceProvider.get(
                `offer-product-single/${offerId}/?variant_size_pk=${paramspk}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;

            if (StatusCode === 6000) {
                setOfferSingle(data);
            } else {
            }
            setPageLoading(false);
        } catch (error) {
            console.log(error.response, 'rrrrrr');
            setPageLoading(false);
        }
    };
    useEffect(() => {
        getProductOfferList();
    }, [loading]);
};

export const EcommerceServiceProviderEditOfferProduct = pk => {
    const {state} = useContext(Context);

    const productOfferEdit = async () => {
        try {
            const response = await ecommerceApiServiceProvider.put(
                `edit-product-offer/${pk}/`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
        } catch (error) {
            console.log(error, 'rrrrrr');
        }
    };

    return productOfferEdit;
};

export const EcommerceServiceProviderDeleteOfferProduct = pk => {
    const {state} = useContext(Context);

    const offerProductDelete = async () => {
        try {
            const response = await ecommerceApiServiceProvider.delete(
                `delete-product-offer/${pk}/`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
        } catch (error) {
            console.log(error);
        }
    };

    return offerProductDelete;
};

export const EcommerceServiceProviderdonatedProductList = (
    setDonate,
    selectedFilter,
    searchQuery,
    min_price,
    max_price,
    refreshing,
) => {
    const {state, dispatch} = useContext(Context);
    const pk = 'dbfc8d50-c4d3-48a3-9317-bab3354992dd';
    let Filter = '';
    let search = '';

    if (selectedFilter) {
        filterArray = selectedFilter.map(item => `category=${item}&`);
        Filter = filterArray.join('');
        // Filter = selectedFilter;
    }
    if (searchQuery) {
        search = searchQuery;
    }

    const getDonatedProductList = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
                `donated-product-list/?${Filter}q=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setDonate(data);
            } else {
                setDonate([]);
            }
        } catch (error) {
            console.log(error.response, 'rrrrproductlist');
        }
    };
    useEffect(() => {
        getDonatedProductList();
    }, [refreshing, selectedFilter, searchQuery, min_price, max_price]);
};

export const EcommerceServiceProviderdonatedProductSingle = (
    state,
    setDonateSingle,
    donatePk,
    loading,
    setPageLoading,
) => {
    const getProductSingle = async () => {
        setPageLoading(true);
        try {
            const response = await ecommerceApiServiceProvider.get(
                `donated-product-single/${donatePk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setDonateSingle(data);
            } else {
                setDonateSingle([]);
            }
            setPageLoading(false);
        } catch (error) {
            console.log(error.response, 'rrrrrr');
            setPageLoading(false);
        }
    };
    useEffect(() => {
        getProductSingle();
    }, [loading]);
};

export const EcommerceServiceProviderEditDonatedProduct = pk => {
    const {state} = useContext(Context);

    const editDonatedProduct = async () => {
        try {
            const response = await ecommerceApiServiceProvider.put(
                `edit-donated-product/${pk}/`,

                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
        } catch (error) {
            console.log(error, 'rrrrrr');
        }
    };

    return editDonatedProduct;
};

export const EcommerceServiceProviderDonatedProductDelete = pk => {
    const {state} = useContext(Context);
    const offerProductDelete = async () => {
        try {
            const response = await ecommerceApiServiceProvider.delete(
                `delete-donated-product/${pk}/`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
        } catch (error) {
            console.log(error);
        }
    };

    return offerProductDelete;
};

export const EcommerceServiceProviderOrdersList = (
    setOrders,
    refreshing,
    selectedOrder,
    selectedTime,
    searchQuery,
) => {
    const {state, dispatch} = useContext(Context);
    let status = '';
    let time = '';
    let search = '';

    if (selectedOrder) {
        statusesArray = selectedOrder.map(
            item => `order_status=${item.value}&`,
        );
        status = statusesArray.join('');
    }
    if (selectedTime) {
        time = selectedTime.value;
    }
    if (searchQuery) {
        search = searchQuery;
    }
    const getOrdersList = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
                `orders/?${status}order_time=${time}&q=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;

            if (StatusCode === 6000) {
                setOrders(data);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getOrdersList();
    }, [refreshing, selectedOrder, selectedTime, searchQuery]);
};

export const EcommerceServiceProviderDonatedProductOrders = (
    setDonates,
    refreshing,
    searchQuery,
) => {
    const {state, dispatch} = useContext(Context);
    if (searchQuery) {
        search = searchQuery;
    }

    const getDonatedProductOrdersList = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
                `donated-product-orders/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setDonates(data);
            } else {
                setDonates([]);
            }
        } catch (error) {
            console.log(error.response, 'rrrrdonateorderslist');
        }
    };
    useEffect(() => {
        getDonatedProductOrdersList();
    }, [refreshing, searchQuery]);
};

export const EcommerceServiceProviderdonatedOrderSingle = (
    state,
    setDonateSummary,
    donatePk,
    setLoading,
    refreshing,
) => {
    const getDonatedOrderSingle = async () => {
        setLoading(true);
        try {
            const response = await ecommerceApiServiceProvider.get(
                `donated-order-single/${donatePk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setDonateSummary(data);
            } else {
                setDonateSummary([]);
            }
            setLoading(false);
        } catch (error) {
            console.log(error.response, 'rrrrrr');
            setLoading(false);
        }
    };
    useEffect(() => {
        getDonatedOrderSingle();
    }, [refreshing]);
};

export const EcommerceServiceProviderOrderSingle = (
    state,
    setOrderDetails,
    orderPk,
    setLoading,
    refreshing,
    shiploading,
    route,
) => {
    const getOrderSingle = async () => {
        setLoading(true);
        try {
            const response = await ecommerceApiServiceProvider.get(
                `order-single/${orderPk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );

            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setOrderDetails(data);
            } else {
                setOrderDetails([]);
            }
            setLoading(false);
        } catch (error) {
            console.log(error.response, 'rrrrrr');
            setLoading(false);
        }
    };
    useEffect(() => {
        getOrderSingle();
    }, [refreshing, shiploading, state.userData.accessToken]);
};

export const EcoReplyServiceProvider = async (id, data, state) => {
    const formData = {
        reply: data,
    };
    try {
        const response = await ecommerceApiServiceProvider.post(
            `review-reply/${id}/`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            },
        );
        let {StatusCode, data} = response.data;
        if (StatusCode === 6000) {
        } else {
        }
    } catch (error) {
        throw error.response.data;
    }
};

export const EcoProviderReviews = (pk, setReviewData) => {
    const {state, dispatch} = useContext(Context);

    const getProviderReviews = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
                `reviews/${pk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            const {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setReviewData(data);
            } else {
                setReviewData([]);
            }
        } catch (error) {
            console.log(error.response, 'get_in_one');
            // Handle error if needed
        }
    };

    useEffect(() => {
        getProviderReviews();
    }, []);
};

export const EcoProviderShopDetails = setShopDetail => {
    const {state} = useContext(Context);

    const getProviderShopDetails = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
                'store-details/',
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            const {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setShopDetail(data);
            } else {
                setShopDetail([]);
            }
        } catch (error) {
            console.log(error.response, 'get_in_one');
        }
    };

    useEffect(() => {
        getProviderShopDetails();
    }, []);
};

export const EcommerceProvoiderSearch = (searchQuery, setSearchResult) => {
    const {state, dispatch} = useContext(Context);
    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }

    const mainSearch = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
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

export const EcommerceProvoiderRecentSearch = (setRecentResults, reload) => {
    const {state, dispatch} = useContext(Context);

    const recentSearch = async () => {
        try {
            const response = await ecommerceApiServiceProvider.get(
                `recent-searches/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
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
