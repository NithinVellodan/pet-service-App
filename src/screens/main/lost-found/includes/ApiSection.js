import React, {useEffect, useContext} from 'react';

import {
    fetchDataCalendar,
    usersConfigCustomer,
    usersConfigGeneral,
} from '../../../../../axiosConfig';
import {Context} from '../../../../contexts/Store';
import moment from 'moment';

export const ApiSectionsLostPets = (
    setLostPets,
    reaLoad,
    selectedPet,
    selectedDateRange,
    setIsLoading,
) => {
    const {state} = useContext(Context);
    const config = {
        headers: {},
    };
    if (state.userData.is_login) {
        config.headers.Authorization = `Bearer ${state.userData.accessToken}`;
    }
    const formattedStartDate = moment(selectedDateRange?.startDate).format(
        'YYYY-MM-DD',
    );
    const formattedEndDate = moment(selectedDateRange?.endDate).format(
        'YYYY-MM-DD',
    );

    const getLostPets = async () => {
        setIsLoading(true);
        try {
            const response = await usersConfigGeneral.get(`lost-pets/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
            // const response = await usersConfigGeneral.get(
            //     `lost-pets/?q=${searchQuery}${
            //         selectedPet ? `&pet_type=${selectedPet}` : ''
            //     }${selectedDateRange ? `&start_date=${formattedStartDate}` : ''}${
            //         selectedDateRange ? `&end_date=${formattedEndDate}` : ''
            //     }`,
            //     config,
            // );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6000) {
                setLostPets(data);
                setIsLoading(false);
            } else {
                setLostPets([]);
                setIsLoading(false);
            }
        } catch (error) {
            setLostPets([]);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getLostPets();
    }, [reaLoad, selectedPet, selectedDateRange]);
};

export const ApiSectionsLostPetsSinglePage = (
    id,
    setPetDetails,
    setIsLoading,
    setErrorStatus,
) => {
    const {state} = useContext(Context);
    const getSingleItem = async () => {
        setIsLoading(true);

        try {
            const response = await usersConfigGeneral.get(
                `view-lost-pet/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setPetDetails(data);
                setIsLoading(false);
            } else {
                setPetDetails([]);
                setIsLoading(false);
            }
        } catch (error) {
            setPetDetails([]);
            setIsLoading(false);
            setErrorStatus(error.response.status);
        }
    };
    useEffect(() => {
        getSingleItem();
    }, [id]);
};
