import {useEffect, useContext} from 'react';
import {usersConfigGeneral} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';
export const ApiGeneral = setPetCategory => {
    const GetPetTypes = async () => {
        try {
            const response = await usersConfigGeneral.get(`get-pet-types/`);
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setPetCategory(data);
            } else {
                setPetCategory([]);
            }
        } catch (error) {
            console.log(error.message, '_______________error');
        }
    };
    useEffect(() => {
        GetPetTypes();
    }, []);
};

export const ApiGeneralBreeds = (section, SetArrival) => {
    const GetPetBreeds = async () => {
        try {
            const response = await usersConfigGeneral.get(`get-breeds/`, {
                params: {
                    pet_type: section,
                },
            });
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                SetArrival(data);
            } else {
                SetArrival([]);
            }
        } catch (error) {
            console.log(error.message, '_______________error');
        }
    };
    useEffect(() => {
        GetPetBreeds();
    }, [section]);
};

export const ApiGeneralLatestOffers = setLatestOffers => {
    const getLatestOffers = async () => {
        try {
            const response = await usersConfigGeneral.get(`app-banners/`);
            let {StatusCode, data} = response.data;

            // console.log(response.data, 'latst_____offerSections__data');

            if (StatusCode === 6000) {
                setLatestOffers(data);
            } else {
                setLatestOffers([]);
            }
        } catch (error) {
            console.log(error.message, '_______________error');
        }
    };
    useEffect(() => {
        getLatestOffers();
    }, []);
};

export const ApiGeneralCharacteristics = setPetCharacteristics => {
    const GetPetCharacteristics = async () => {
        try {
            const response = await usersConfigGeneral.get(
                `get-pet-characteristics/`,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setPetCharacteristics(data);
            } else {
                setPetCharacteristics([]);
            }
        } catch (error) {
            console.log(error.message, 'Characteristics___error');
        }
    };
    useEffect(() => {
        GetPetCharacteristics();
    }, []);
};

export const ApiGeneralAgeGroup = setAgeGroup => {
    const GetPetCharacteristics = async () => {
        try {
            const response = await usersConfigGeneral.get(`get-age-groups/`);
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setAgeGroup(data);
            } else {
                setAgeGroup([]);
            }
        } catch (error) {
            console.log(error.message, 'age error');
        }
    };
    useEffect(() => {
        GetPetCharacteristics();
    }, []);
};

export const ApiGeneralMedicalGroup = setMedicalGroup => {
    const GetPetCharacteristics = async () => {
        try {
            const response = await usersConfigGeneral.get(
                `get-medical-conditions/`,
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setMedicalGroup(data);
            } else {
                setMedicalGroup([]);
            }
        } catch (error) {
            console.log(error.message, 'medical error');
        }
    };
    useEffect(() => {
        GetPetCharacteristics();
    }, []);
};

export const serviceProviderPlaceToStayAddBreedList = (
    setBreedList,
    pk,
    loading,
) => {
    const {state} = useContext(Context);
    const getPlaceToStaySingle = async () => {
        try {
            const response = await usersConfigGeneral.get(
                `get-pet-types-for-pts/?place_to_stay=${pk}/`,
                {
                    place_to_stay: pk,
                },
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setBreedList(data);
            } else {
                setBreedList();
            }
        } catch (error) {
            console.log(error.message, 'gopi');
        }
    };
    useEffect(() => {
        getPlaceToStaySingle();
    }, [loading]);
};

export const toggleUserRole = async role => {
    try {
        const response = await usersConfigGeneral.post(`set-current-role/`, {
            user_role: role,
        });
    } catch (error) {
        console.log('error toggle => UserRole', error);
    }
};

export const getNotificationCustomer = (
    setNotifications,
    isLoading,
    section,
    setRefresh,
) => {
    const {state} = useContext(Context);
    const getNotificationListCustomer = async () => {
        setRefresh(true);
        try {
            const response = await usersConfigGeneral.get(
                `customer-notifications/?type=${section}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setNotifications(data);
            } else {
                setNotifications([]);
            }
            setRefresh(false);
        } catch (error) {
            console.log(error.message);
            setRefresh(false);
        }
    };
    useEffect(() => {
        getNotificationListCustomer();
    }, [isLoading, section]);
};

export const getNotificationProvider = (
    setNotifications,
    isLoading,
    section,
    setRefresh,
) => {
    const {state} = useContext(Context);

    const getNotificationListProvider = async () => {
        setRefresh(true);
        try {
            const response = await usersConfigGeneral.get(
                `provider-notifications/?type=${section}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                setNotifications(data);
            } else {
                setNotifications([]);
            }
            setRefresh(false);
        } catch (error) {
            console.log(error.message, 'gopi');
            setRefresh(false);
        }
    };
    useEffect(() => {
        getNotificationListProvider();
    }, [isLoading, section]);
};

export const ApiSectionTrainerProviderServices = setData => {
    const {state, dispatch} = useContext(Context);
    const trainerServices = async () => {
        try {
            const response = await usersConfigGeneral.get(`get-services/`, {
                headers: {
                    Authorization: `Bearer ${state.userData.accessToken}`,
                },
            });
            let {StatusCode, data} = response.data;
            if (StatusCode == 6001) {
                setData([]);
            } else if (StatusCode == 6000) {
                setData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        trainerServices();
    }, []);
};
