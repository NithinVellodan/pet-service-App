import React, {useEffect, useContext} from 'react';
import {serviceProviderConfig} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';

export const ApiSectionServiceProvider = (
    page_type,
    setState,
    searchQuery,
    page,
    isLoading,
    setRefreshing,
    isFocused,
) => {
    const {state, dispatch} = useContext(Context);

    const latestBookings = async () => {
        setRefreshing && setRefreshing(true);
        try {
            const response = await serviceProviderConfig.get(
                `latest-bookings/?page_type=${page_type}&q=${searchQuery}&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6001) {
                setState([]);
                setRefreshing && setRefreshing(false);
            } else if (StatusCode == 6000) {
                setState(data);
                setRefreshing && setRefreshing(false);
            }
        } catch (error) {
            setRefreshing && setRefreshing(false);
            console.log(error);
        }
    };
    useEffect(() => {
        latestBookings();
    }, [page_type, searchQuery, isLoading, isFocused, page]);
};

export const ApiSectionServiceProviderSinglePage = (
    bookingId,
    setState,
    setPetDetails,
    setIsLoading,
) => {
    const {state} = useContext(Context);
    const getBorrowPetSingle = async () => {
        setIsLoading(true);
        try {
            const response = await serviceProviderConfig.get(
                `booking-single/${bookingId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setState(data);
                setPetDetails(data.pet_details);
                setIsLoading(false);
            } else {
                setState();
                setPetDetails();
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error.message, 'borrow error');
        }
    };
    useEffect(() => {
        getBorrowPetSingle();
    }, [bookingId]);
};

export const ApiSectionServiceProviderBorrowSinglePage = (
    bookingId,
    setState,
    setPetDetails,
    setIsLoading,
) => {
    const {state} = useContext(Context);
    const latestBookingSinglePage = async () => {
        setIsLoading(true);
        try {
            const response = await serviceProviderConfig.get(
                `borrow-pet-single/${bookingId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            setState(data);
            setPetDetails(data.pet_details);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        latestBookingSinglePage();
    }, [bookingId]);
};

export const ApiSectionServiceProviderSinglePageAction = async (
    state,
    id,
    action,
) => {
    try {
        const response = await serviceProviderConfig.post(
            `${action}-stay-booking/${id}/`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const ApiSectionServiceProviderBorrowSinglePageAction = async (
    state,
    id,
    action,
) => {
    try {
        const response = await serviceProviderConfig.post(
            `${action}-pet-booking/${id}/`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const serviceProviderFacilities = setFacility => {
    const {state} = useContext(Context);
    const Access = state.userData.accessToken;
    const getFacilties = async () => {
        try {
            const response = await serviceProviderConfig.get(
                `get-facilities/`,
                {
                    headers: {
                        Authorization: `Bearer ${Access}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setFacility(data);
            } else {
            }
        } catch (error) {
            console.log(error, 'gopi');
        }
    };
    useEffect(() => {
        getFacilties();
    }, []);
};

export const serviceProviderPlaceToStayList = (
    setPlaceList,
    isLoading,
    setIsLoading,
    refreshing,
    searchQuery,
) => {
    const {state} = useContext(Context);
    const getPlaceToStay = async () => {
        setIsLoading(true);
        try {
            const response = await serviceProviderConfig.get(
                `place-to-stay-list/${searchQuery ? `?q=${searchQuery}` : ''}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setPlaceList(data);
                setIsLoading(false);
            } else {
                setPlaceList();
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error.message, 'gopi');
        }
    };
    useEffect(() => {
        getPlaceToStay();
    }, [refreshing, searchQuery]);
};

export const serviceProviderPlaceToStaySingle = (
    setSinglePage,
    pk,
    loading,
    setRefreshing,
    setErrorStatus,
) => {
    const {state, dispatch} = useContext(Context);
    const getPlaceToStaySingle = async () => {
        setRefreshing(true);
        try {
            const response = await serviceProviderConfig.get(
                `place-to-stay-single/${pk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setSinglePage(data);
                setRefreshing(false);
            } else {
                setSinglePage();
                setRefreshing(false);
            }
        } catch (error) {
            setRefreshing(false);
            setErrorStatus(error.response.status);
            console.log(error.message, 'gopi');
        }
    };
    useEffect(() => {
        getPlaceToStaySingle();
    }, [loading]);
};

export const serviceProviderPlaceBookingList = (
    setData,
    searchQuery,
    filterItemSelected,
    isLoading,
    setRefreshing,
    page,
) => {
    const {state, dispatch} = useContext(Context);
    const ProvidersPlaceBookingList = async () => {
        setRefreshing(true);
        try {
            const response = await serviceProviderConfig.get(
                `booking-list/?&q=${searchQuery}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setData(data);
                setRefreshing(false);
            } else {
                setData([]);
                setRefreshing(false);
            }
        } catch (error) {
            console.log(error.message, 'booking');
            setRefreshing(false);
        }
    };
    useEffect(() => {
        ProvidersPlaceBookingList();
    }, [searchQuery, filterItemSelected, setRefreshing, page]);
};

export const serviceProviderPetBookingList = (
    setData,
    searchQuery,
    filterItemSelected,
    isLoading,
    setRefreshing,
    page,
) => {
    const {state, dispatch} = useContext(Context);
    const ProvidersPetBookingList = async () => {
        setRefreshing(true);
        try {
            const response = await serviceProviderConfig.get(
                `borrow-pet-list/?&q=${searchQuery}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setData(data);
                setRefreshing(false);
            } else {
                setData([]);
                setRefreshing(false);
            }
        } catch (error) {
            console.log(error.message, 'booking');
            setRefreshing(false);
        }
    };
    useEffect(() => {
        ProvidersPetBookingList();
    }, [searchQuery, filterItemSelected, isLoading, setRefreshing, page]);
};

export const serviceProviderTrainerBookingList = (
    setData,
    searchQuery,
    filterItemSelected,
    isLoading,
    setRefreshing,
    page,
) => {
    const {state, dispatch} = useContext(Context);
    const ProvidersTrainingBookingList = async () => {
        setRefreshing(true);
        try {
            const response = await serviceProviderConfig.get(
                `training-booking-list/?&q=${searchQuery}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setData(data);
                setRefreshing(false);
                // console.log(data, 'data');
            } else {
                setData([]);
                setRefreshing(false);
            }
        } catch (error) {
            console.log(error.message, 'booking');
            setRefreshing(false);
        }
    };
    useEffect(() => {
        ProvidersTrainingBookingList();
    }, [searchQuery, filterItemSelected, isLoading, setRefreshing, page]);
};

export const serviceProviderPet = (
    setBorrowList,
    isLoading,
    setIsLoading,
    refreshing,
    searchQuery,
) => {
    const {state} = useContext(Context);
    const ProvidersPet = async () => {
        setIsLoading(true);
        try {
            const response = await serviceProviderConfig.get(
                `my-pets/${searchQuery ? `?q=${searchQuery}` : ''}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setBorrowList(data);
                setIsLoading(false);
            } else {
                setBorrowList();
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        ProvidersPet();
    }, [refreshing, searchQuery]);
};

export const serviceProviderPetSingle = (
    setSinglePagePet,
    pk,
    loading,
    setRefreshing,
    setErrorStatus,
) => {
    const {state, dispatch} = useContext(Context);
    const getBorrowPetSingle = async () => {
        setRefreshing(true);
        try {
            const response = await serviceProviderConfig.get(`my-pet/${pk}/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setSinglePagePet(data);
                setRefreshing(false);
            } else {
                setSinglePagePet();
                setRefreshing(false);
            }
        } catch (error) {
            setErrorStatus(error.response.status);
            console.log(error.message, 'borrow error');
        }
    };
    useEffect(() => {
        getBorrowPetSingle();
    }, [loading]);
};

export const serviceProviderReview = (
    setReviews,
    param,
    reload,
    setIsLoading,
) => {
    const {state, dispatch} = useContext(Context);
    const getServiceProviderReview = async param => {
        setIsLoading(true);
        try {
            const response = await serviceProviderConfig.get(`reviews/`, {
                params: {
                    page_type: param,
                },
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });

            const {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setReviews(data);
                setIsLoading(false);
            } else {
                setReviews([]);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 401) {
                console.log('Authentication failed: Token expired or invalid');
            } else {
                console.log(
                    'Failed to get service provider review:',
                    error.message,
                );
            }
        }
    };

    useEffect(() => {
        getServiceProviderReview(param);
    }, [param, reload]);
};

export const ReplyServiceProvider = async (id, data, state, setRefreshing) => {
    setRefreshing(true);
    const formData = {
        reply: data,
    };
    try {
        const response = await serviceProviderConfig.post(
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
            setRefreshing(false);
        } else {
            setRefreshing(false);
        }
    } catch (error) {
        setRefreshing(false);
        throw error.response.data;
    }
};

export const ApiSectionServiceProviderSearch = (
    setSearchResult,
    section,
    searchQuery,
) => {
    const {state} = useContext(Context);

    const mainSearch = async () => {
        try {
            const response = await serviceProviderConfig.get(
                `search/?q=${searchQuery}&section=${section}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
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

export const ApiSectionServiceProviderRecentSearch = (
    setRecentResults,
    reload,
) => {
    const {state} = useContext(Context);

    const recentSearch = async () => {
        try {
            const response = await serviceProviderConfig.get(
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
