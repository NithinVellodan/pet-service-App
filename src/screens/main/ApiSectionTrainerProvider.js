import React, {useEffect, useContext} from 'react';
import {serviceProviderConfig} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';

export const ApiSectionTrainerProviderProfile = (
    setData,
    setIsLoading,
    refreshing,
    setErrorStatus,
    loading,
    isFocused,
) => {
    const {state, dispatch} = useContext(Context);
    const trainerProfile = async () => {
        setIsLoading(true);
        try {
            const response = await serviceProviderConfig.get(
                `trainer-profile/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6001) {
                setData([]);
                setIsLoading(false);
            } else if (StatusCode == 6000) {
                setData(data);
                setIsLoading(false);
            }
        } catch (error) {
            setErrorStatus(error.response.status);
            console.log(error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        trainerProfile();
    }, [refreshing, loading, isFocused]);
};

export const ApiSectionTrainerProviderService = (
    setData,
    setIsLoading,
    refreshing,
    setErrorStatus,
    isFocused,
) => {
    const {state, dispatch} = useContext(Context);
    const trainerService = async () => {
        setIsLoading(true);
        try {
            const response = await serviceProviderConfig.get(
                `trainer-services/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6001) {
                setData([]);
                setIsLoading(false);
            } else if (StatusCode == 6000) {
                setData(data);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setErrorStatus(error.response.status);
            console.log(error);
        }
    };
    useEffect(() => {
        trainerService();
    }, [refreshing, isFocused]);
};

export const ApiSectionTrainerProviderServiceSingle = (
    setData,
    pk,
    setIsLoading,
    refreshing,
    setErrorStatus,
) => {
    const {state, dispatch} = useContext(Context);
    const trainerServiceSingle = async () => {
        setIsLoading(true);
        try {
            const response = await serviceProviderConfig.get(
                `service-single/${pk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6001) {
                setData([]);
                setIsLoading(false);
            } else if (StatusCode == 6000) {
                setData(data);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setErrorStatus(error.response.status);
            console.log(error);
        }
    };
    useEffect(() => {
        trainerServiceSingle();
    }, [refreshing]);
};

export const ApiSectionTrainerProviderBookingSingle = (
    setData,
    pk,
    setIsLoading,
    refreshing,
    setErrorStatus,
) => {
    const {state, dispatch} = useContext(Context);
    const trainerServiceBookingSingle = async () => {
        setIsLoading(true);
        try {
            const response = await serviceProviderConfig.get(
                `training-booking-single/${pk}/`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode == 6001) {
                setData([]);
                setIsLoading(false);
            } else if (StatusCode == 6000) {
                setData(data);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setErrorStatus(error.response.status);
            console.log(error);
        }
    };
    useEffect(() => {
        trainerServiceBookingSingle();
    }, [refreshing]);
};

export const TrainerProviderSinglePageAction = async (state, id, action) => {
    try {
        const response = await serviceProviderConfig.post(
            `${action}-training-booking/${id}/`,
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
