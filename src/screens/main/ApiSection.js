import React, {useEffect, useContext} from 'react';
import {fetchDataCalendar, usersConfigCustomer} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';

export const ApiSections = (
    section,
    page,
    SetArrival,
    isFocused,
    setIsLoading,
) => {
    const {state} = useContext(Context);
    const getNewArrivals = async () => {
        try {
            const config = {
                headers: {},
            };
            if (state.userData.is_login) {
                config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
            }
            setIsLoading && setIsLoading(true);
            const response = await usersConfigCustomer.get(
                `new-arrivals/?page_type=${section}&page=${page}`,
                config,
            );
            SetArrival(response.data.data || []);
            setIsLoading && setIsLoading(false);
        } catch (error) {
            console.log(error);
            SetArrival([]);
            setIsLoading && setIsLoading(false);
        }
    };
    useEffect(() => {
        getNewArrivals();
    }, [section, page, isFocused]);
};

export const ApiSectionCustomerList = (
    refreshing,
    searchQuery,
    setData,
    latitude,
    longitude,
    pet_type,
    min_price,
    max_price,
    start_date,
    end_date,
    setLoading,
) => {
    const {state} = useContext(Context);

    const getPlaceToStayList = async () => {
        setLoading && setLoading(true);
        try {
            const config = {
                headers: {},
            };
            if (state.userData.is_login) {
                config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
            }
            const response = await usersConfigCustomer.get(
                `place-to-stay-list/?q=${searchQuery}&latitude=${latitude}&longitude=${longitude}${
                    pet_type ? `&pet_type=${pet_type}` : ''
                }${min_price ? `&min_price=${min_price}` : ''}${
                    max_price ? `&max_price=${max_price}` : ''
                }${start_date ? `&start_date=${start_date}` : ''}${
                    end_date ? `&end_date=${end_date}` : ''
                }`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6000) {
                setData(data);
                setLoading && setLoading(false);
            }
        } catch (error) {
            setData([]);
            setLoading && setLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getPlaceToStayList();
    }, [
        searchQuery,
        latitude,
        longitude,
        pet_type,
        min_price,
        max_price,
        start_date,
        end_date,
        refreshing,
    ]);
};

export const ApiSectionBorrowList = (section, setData, latitude, longitude) => {
    const {state} = useContext(Context);

    const getBorrowPetList = async () => {
        const section = '';
        try {
            const response = await usersConfigCustomer.get(
                `borrow-pet-list/?q=${section}&latitude=${latitude}&longitude=${longitude}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6000) {
                setData(data);
            }
        } catch (error) {
            setData([]);
            console.log(error);
        }
    };
    useEffect(() => {
        getBorrowPetList();
    }, []);
};

export const ApiSectionCustomerPetType = (section, setData, isLoading) => {
    const {state, dispatch} = useContext(Context);
    const getPetTypes = async () => {
        try {
            const response = await usersConfigCustomer.get(
                `get-pet-by-category/${section}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6000) {
                setData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPetTypes();
    }, [isLoading]);
};

export const ApiSectionCustomerSinglePlaceToStay = (
    pk,
    setData,
    setCurrentLat,
    setCurrentLng1,
    setIsLoading,
    setErrorStatus,
) => {
    const {state, dispatch} = useContext(Context);

    const placeToStaySingleData = async () => {
        setIsLoading(true);
        try {
            const response = await usersConfigCustomer.get(
                `place-to-stay-single/${pk}/`,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6000) {
                setData(data);
                setCurrentLat(data.location_data);
                setCurrentLng1(data?.pet_details?.[0]);
                setIsLoading(false);
            }
        } catch (error) {
            setData([]);
            setIsLoading(false);
            setErrorStatus(error.response.status);
            console.log(error.response, 'Error Place To Stay Single Customer');
        }
    };
    useEffect(() => {
        placeToStaySingleData();
    }, []);
};

export const ApiSectionCustomerBorrowList = (
    refreshing,
    searchQuery,
    setData,
    latitude,
    longitude,
    pet_type,
    min_price,
    max_price,
    start_date,
    end_date,
    setLoading,
) => {
    const {state, dispatch} = useContext(Context);
    const BorrowList = async () => {
        setLoading && setLoading(true);
        try {
            const config = {
                headers: {},
            };
            if (state.userData.is_login) {
                config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
            }
            const response = await usersConfigCustomer.get(
                `borrow-pet-list/?q=${searchQuery}&latitude=${latitude}&longitude=${longitude}${
                    pet_type ? `&pet_type=${pet_type}` : ''
                }${min_price ? `&min_price=${min_price}` : ''}${
                    max_price ? `&max_price=${max_price}` : ''
                }${start_date ? `&start_date=${start_date}` : ''}${
                    end_date ? `&end_date=${end_date}` : ''
                }`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6000) {
                setData(data);
                setLoading && setLoading(false);
            }
        } catch (error) {
            setData(data);
            setLoading && setLoading(false);
            console.log(error.message, '_______________error');
        }
    };
    useEffect(() => {
        BorrowList();
    }, [
        searchQuery,
        latitude,
        longitude,
        pet_type,
        min_price,
        max_price,
        start_date,
        end_date,
        refreshing,
    ]);
};

export const ApiSectionCustomerSingleBorrowPet = (
    pk,
    setData,
    setCurrentLat,
    setCurrentLng1,
    isLoading,
    setIsLoading,
    setErrorStatus,
) => {
    const {state, dispatch} = useContext(Context);

    const getRestaurants = async () => {
        setIsLoading(true);
        const section = '';
        try {
            const response = await usersConfigCustomer.get(
                `borrow-pet-single/${pk}/`,
            );
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setData([]);
            setIsLoading(false);
            setErrorStatus(error.response.status);
            console.log(
                error.response.status,
                'Error Borrow Pet Single Customer',
            );
        }
    };
    useEffect(() => {
        getRestaurants();
    }, []);
};

export const ApiSectionCustomerWishList = () => {
    const {state} = useContext(Context);
    const getWishList = async () => {
        try {
            const response = await usersConfigCustomer.get(`stay-wishlist/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
        } catch (error) {
            console.log(error.message, '_______________error');
        }
    };
    useEffect(() => {
        getWishList();
    }, []);
};

export const CustomerBorrowWishList = () => {
    const {state} = useContext(Context);
    const getWishList = async () => {
        try {
            const response = await usersConfigCustomer.get(`pet-wishlist/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
        } catch (error) {
            console.log(error.message, '_______________error');
        }
    };
    useEffect(() => {
        getWishList();
    }, []);
};

export const ApiSectionCustomerMyPet = (setData, isLoading, setRefreshing) => {
    const {state} = useContext(Context);
    const getCustomerMyPet = async () => {
        setRefreshing(true);
        try {
            const response = await usersConfigCustomer.get(`my-pets/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
            let {StatusCode, data} = response.data;

            if (StatusCode == 6000) {
                setData(data);
                setRefreshing(false);
            } else {
                setData([]);
                setRefreshing(false);
            }
        } catch (error) {
            setRefreshing(false);
            console.log(error.message, '_______________error');
        }
    };
    useEffect(() => {
        getCustomerMyPet();
    }, [isLoading]);
};

export const ApiSectionCustomerMyPetSingle = (
    setData,
    isLoading,
    pk,
    setRefreshing,
    setErrorStatus,
) => {
    const {state} = useContext(Context);
    const getCustomerMyPet = async () => {
        setRefreshing(true);
        try {
            const response = await usersConfigCustomer.get(`my-pet/${pk}/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
            let {StatusCode, data} = response.data;

            if (StatusCode == 6000) {
                setData(data);
                setRefreshing(false);
            } else {
                setData([]);
                setRefreshing(false);
            }
        } catch (error) {
            setRefreshing(false);
            setErrorStatus(error.response.status);
            console.log(error.message, '_______________error');
        }
    };
    useEffect(() => {
        getCustomerMyPet();
    }, [isLoading]);
};

export const CustomerAllBookings = (
    page_type,
    setData,
    searchQuery,
    filterItemSelected,
    isLoading,
    setRefreshing,
) => {
    const {state} = useContext(Context);

    const AllBookings = async () => {
        setRefreshing(true);
        try {
            const response = await usersConfigCustomer.get(
                `${page_type}-bookings/?&q=${searchQuery}&filter_query=${filterItemSelected}`,

                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6000) {
                setData(data);
                setRefreshing(false);
            } else {
                setData([]);
                setRefreshing(false);
            }
        } catch (error) {
            setRefreshing(false);
            console.log(error.message, '_______________error');
        }
    };
    useEffect(() => {
        AllBookings();
    }, [page_type, searchQuery, filterItemSelected, isLoading]);
};

export const CustomerAllBookingSingle = (
    pk,
    setData,
    setPetDetails,
    setIsLoading,
    setErrorStatus,
) => {
    const {state} = useContext(Context);

    const AllBookings = async () => {
        setIsLoading(true);
        try {
            const response = await usersConfigCustomer.get(
                `booking-single/${pk}/`,

                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;

            if (StatusCode == 6000) {
                setData(data);
                setPetDetails(data.pet_details);
                setIsLoading(false);
            } else {
                setData([]);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setErrorStatus(error.response.status);
            console.log(error.message, '_______________error');
        }
    };
    useEffect(() => {
        AllBookings();
    }, [pk, state.userData.accessToken]);
};

export const CustomerAddressList = (
    setSection,
    section,
    refreshing,
    setIsLoading,
    setSelectedAddressPk,
) => {
    const {state} = useContext(Context);

    const getCustomerAddressList = async () => {
        setIsLoading(true);
        try {
            const response = await usersConfigCustomer.get(`address-list/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
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
        }
    };
    useEffect(() => {
        getCustomerAddressList();
    }, [refreshing]);
};

export const CustomerListCard = (setSection, refreshing, setSelected) => {
    const {state} = useContext(Context);
    const getCustomerListCard = async () => {
        // setIsLoading(true);
        try {
            const response = await usersConfigCustomer.get(`list-cards/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
            let {StatusCode, data} = response.data;
            // setIsLoading(false);
            if (StatusCode === 6000) {
                setSelected(data?.[0]?.id);
                setSection(data);
            } else {
                setSection([]);
            }
        } catch (error) {
            // setIsLoading(false);
        }
    };
    useEffect(() => {
        getCustomerListCard();
    }, [refreshing]);
};

export const CustomerAllReview = (
    page_type,
    section,
    isLoading,
    setReviewList,
    setRefreshing,
) => {
    const {state} = useContext(Context);

    const getCustomerAllReview = async () => {
        setRefreshing(true);
        try {
            const response = await usersConfigCustomer.get(
                `${page_type}-reviews/?section=${section}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            const {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setReviewList(data);
                setRefreshing(false);
            } else {
                setIsInWishlist([]);
                setRefreshing(false);
            }
        } catch (error) {
            console.log(error, 'get_in_one');
        }
    };

    useEffect(() => {
        getCustomerAllReview();
    }, [
        isLoading,
        state.userData.accessToken,
        page_type,
        section,
        setReviewList,
    ]);
};

export const toggleWishlistPet = async (pk, state, setIsInWishlist) => {
    const token = state.userData.accessToken;

    try {
        const response = await usersConfigCustomer.post(
            `add-or-remove-pet-wishlist/${pk}/`,
            {},
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

export const toggleWishlistStay = async (pk, state) => {
    const token = state.userData.accessToken;

    try {
        const response = await usersConfigCustomer.post(
            `add-or-remove-stay-wishlist/${pk}/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    } catch (error) {
        console.log('error toggle => wish =========stay', error);
    }
};

export const getCustomerStayWishlist = () => {
    const {state, dispatch} = useContext(Context);
    const AllBookings = async () => {
        try {
            const response = await usersConfigCustomer.get(
                `stay-wishlist/`,

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
                        type: 'UPDATE_ADDITIONAL_DATA',
                        additionalData: item,
                    });
                });
            }
        } catch (error) {}
    };
    useEffect(() => {
        AllBookings();
    }, [state.userData.accessToken]);
};

export const getCustomerPetWishlist = () => {
    const {state, dispatch} = useContext(Context);
    const AllBookings = async () => {
        try {
            const response = await usersConfigCustomer.get(
                `pet-wishlist/`,

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
                        type: 'UPDATE_ADDITIONAL_DATA_PET_WISH',
                        additionalDataPetWish: item,
                    });
                });
            }
        } catch (error) {}
    };
    useEffect(() => {
        AllBookings();
    }, [state.userData.accessToken]);
};

export const ApiSectionServiceCustomerSearch = (
    setSearchResult,
    section,
    searchQuery,
) => {
    const {state} = useContext(Context);
    const mainSearch = async () => {
        try {
            const config = {
                headers: {},
            };
            if (state.userData.is_login) {
                config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
            }
            const response = await usersConfigCustomer.get(
                `search/?q=${searchQuery}&section=${section}`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setSearchResult(data);
            } else {
                setSearchResult();
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        mainSearch();
    }, [searchQuery, section]);
};

export const ApiSectionCustomerRecentSearch = (setRecentResults, reload) => {
    const {state} = useContext(Context);
    const recentSearch = async () => {
        try {
            const config = {
                headers: {},
            };
            if (state.userData.is_login) {
                config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
            }
            const response = await usersConfigCustomer.get(
                `recent-searches/`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setRecentResults(data);
            } else {
                setRecentResults();
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        recentSearch();
    }, [reload]);
};

export const ApiSectionPlaceAvailability = (
    setAvailability,
    place_to_stay_id,
    pet_category_id,
    month_start_date,
    month_end_date,
    tempLoader,
) => {
    const {state, dispatch} = useContext(Context);
    const formData = new FormData();
    formData.append('place_to_stay_id', place_to_stay_id);
    formData.append('pet_category_id', pet_category_id);
    formData.append('month_start_date', month_start_date);
    formData.append('month_end_date', month_end_date);

    const checkAvailability = async () => {
        try {
            const {baseURL} = fetchDataCalendar();
            const response = await fetch(`${baseURL}check-stay-availability/`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            let {StatusCode, data} = responseData;
            if (StatusCode === 6000) {
                setAvailability(data);
            } else {
                setAvailability();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkAvailability();
    }, [month_start_date, tempLoader, month_end_date]);
};

export const ApiSectionPetAvailability = (
    setAvailability,
    pet_category_id,
    month_start_date,
    month_end_date,
    tempLoader,
) => {
    const {state, dispatch} = useContext(Context);
    const formData = new FormData();
    formData.append('pet_id', pet_category_id);
    formData.append('month_start_date', month_start_date);
    formData.append('month_end_date', month_end_date);

    const checkAvailability = async () => {
        try {
            const {baseURL} = fetchDataCalendar();
            const response = await fetch(`${baseURL}check-pet-availability/`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            let {StatusCode, data} = responseData;
            if (StatusCode === 6000) {
                setAvailability(data);
            } else {
                setAvailability();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkAvailability();
    }, [month_start_date, tempLoader, month_end_date]);
};

export const getCardList = (setSection2, refreshing, setLoadingList) => {
    const {state} = useContext(Context);

    const getCustomerCards = async () => {
        setLoadingList && setLoadingList(true);
        try {
            const response = await usersConfigCustomer.get(
                `list-saved-cards/`,

                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            const {StatusCode, cards} = response.data;

            if (StatusCode === 6000) {
                setSection2(cards);
                setLoadingList && setLoadingList(false);
            } else {
                setSection2([]);
                setLoadingList && setLoadingList(false);
            }
        } catch (error) {
            console.log(error.response, 'get_in_one');
            setLoadingList && setLoadingList(false);
        }
    };

    useEffect(() => {
        getCustomerCards();
    }, [refreshing]);
};
