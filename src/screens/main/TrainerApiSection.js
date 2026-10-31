import React, {useEffect, useContext} from 'react';
import {fetchDataCalendar, usersConfigCustomer} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';
import {format} from 'date-fns';

export const TrainerApisection = (
    refreshing,
    searchQuery,
    setTrainerList,
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
    const getTrainerList = async () => {
        try {
            setLoading && setLoading(true);
            const config = {
                headers: {},
            };
            if (state.userData.is_login) {
                config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
            }
            const response = await usersConfigCustomer.get(
                `trainers-list/?q=${searchQuery}&latitude=${latitude}&longitude=${longitude}${
                    pet_type ? `&pet_type=${pet_type}` : ''
                }${min_price ? `&min_price=${min_price}` : ''}${
                    max_price ? `&max_price=${max_price}` : ''
                }${start_date ? `&start_date=${start_date}` : ''}${
                    end_date ? `&end_date=${end_date}` : ''
                }`,
                config,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setTrainerList(data);
                setLoading && setLoading(false);
            } else {
                setTrainerList([]);
                setLoading && setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setTrainerList([]);
            setLoading && setLoading(false);
        }
    };
    useEffect(() => {
        getTrainerList();
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

export const ApiSectionCustomerTrainerSingle = (
    singleItemPk,
    setSingleSectionData,
    setIsLoading,
    refreshing,
    setErrorStatus,
    loading,
) => {
    const {state, dispatch} = useContext(Context);

    const getTrainerSingleData = async () => {
        setIsLoading(true);
        try {
            const response = await usersConfigCustomer.get(
                `trainer-single/${singleItemPk}/`,
            );

            let {StatusCode, data} = response.data;
            if (StatusCode == 6000) {
                setSingleSectionData(data);
                setIsLoading(false);
            } else {
                setSingleSectionData([]);
                setIsLoading(false);
            }
        } catch (error) {
            setSingleSectionData([]);
            setIsLoading(false);
            setErrorStatus(error.response.status);
        }
    };
    useEffect(() => {
        getTrainerSingleData();
    }, [refreshing, loading]);
};

export const toggleWishlistTrainer = async (pk, state) => {
    const token = state.userData.accessToken;
    try {
        const response = await usersConfigCustomer.post(
            `add-or-remove-trainer-wishlist/${pk}/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        console.log(response.data, 'wishList_trainerSectionDataaa');
    } catch (error) {
        console.log('error toggle => wish =========wish', error.response.data);
    }
};

export const getCustomerTrainerWishlist = () => {
    const {state, dispatch} = useContext(Context);
    const AllBookings = async () => {
        try {
            const response = await usersConfigCustomer.get(
                `trainers-wishlist/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000 && data.length !== 0) {
                data.forEach(item => {
                    const {trainer_details} = item;
                    dispatch({
                        type: 'ADD_TO_WISH_TRAINER',
                        trainerWishList: trainer_details,
                    });
                });
            }
        } catch (error) {
            // console.log('Error fetching wishlist data:', error);
        }
    };
    useEffect(() => {
        AllBookings();
    }, [state.userData.accessToken]);
};

export const ApiSectionTrainerAvailability = (
    pk,
    startDateTwo,
    endDateTwo,
    setAvailability,
) => {
    const dates = new Date(startDateTwo);
    const dateEnd = new Date(endDateTwo);
    const formattedDate = format(dates, 'yyyy-MM-dd');
    const formattedEndDate = format(dateEnd, 'yyyy-MM-dd');

    const checkAvailability = async () => {
        try {
            const {baseURL} = fetchDataCalendar();
            const formData = new FormData();
            formData.append('start_date', formattedDate);
            formData.append('end_date', formattedEndDate);

            const response = await fetch(
                `${baseURL}check-trainer-availability/${pk}/`,
                {
                    method: 'POST',
                    body: formData,
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            let {StatusCode, available_date_ranges} = responseData;
            setAvailability(available_date_ranges);

            // console.log(
            //     responseData,
            //     'available_date_ranges_________available_date_ranges',
            // );
        } catch (error) {
            console.log('Network request failed', error.response);
        }
    };

    useEffect(() => {
        checkAvailability();
    }, [startDateTwo, endDateTwo, pk]);
};

export const ApiSectionTrainerAvailableTime = (
    pk,
    startDateTwo,
    endDateTwo,
    setAvailability,
) => {
    const startDate = new Date(startDateTwo);
    startDate.setUTCMonth(startDate.getUTCMonth() + 1);
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const endDate = new Date(endDateTwo);
    endDate.setUTCMonth(endDate.getUTCMonth() + 1);
    const formattedEndDate = endDate.toISOString().slice(0, 10);
    const {state, dispatch} = useContext(Context);

    const checkAvailability = async () => {
        try {
            const {baseURL} = fetchDataCalendar();
            const formData = new FormData();
            formData.append('start_date', formattedStartDate);
            formData.append('end_date', formattedEndDate);

            const response = await fetch(
                `${baseURL}check-selected-date/${pk}/`,
                {
                    method: 'POST',
                    body: formData,
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            let {StatusCode, available_date_ranges} = responseData;
            setAvailability(available_date_ranges);

            console.log(
                available_date_ranges,
                'responseData___data___responseData',
            );
        } catch (error) {
            console.log('Network request failed', error.response);
        }
    };

    useEffect(() => {
        checkAvailability();
    }, [startDateTwo, endDateTwo, pk]);
};

export const ApiSectionCustomerTrainerWirkingHours = async (
    pk,
    date,
    no_of_hours,
    setAvailableTime,
    responses,
    setIsLoading,
) => {
    const dates = new Date(date);

    const formattedDate = format(dates, 'yyyy-MM-dd');

    try {
        const response = await usersConfigCustomer.post(
            `check-selected-date/${pk}/`,
            {
                selected_date: formattedDate,
                no_of_hours: no_of_hours,
            },
        );
        let {StatusCode, working_slots} = response.data;
        if (StatusCode === 6000) {
            setAvailableTime(response.data);
            setIsLoading(false);
        } else if (StatusCode === 6001) {
            responses(response.data);
            setIsLoading(false);
        }
    } catch (error) {
        console.log('error toggle => wish =========wish', error.response.data);
    }
};

export const ApiSectionCustomerTrainerBookingSingle = (
    pk,
    setTrainerSingle,
) => {
    const {state, dispatch} = useContext(Context);
    const trainerSingleCustomer = async () => {
        try {
            const response = await usersConfigCustomer.get(
                `trainer-booking-single/${pk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            const {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setTrainerSingle(data);
            } else {
                setTrainerSingle([]);
            }
        } catch (error) {
            console.log('error trainer single customer ===>', error);
        }
    };
    useEffect(() => {
        trainerSingleCustomer();
    }, [pk]);
};
