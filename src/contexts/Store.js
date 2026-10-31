import React, {createContext, useReducer} from 'react';
import Reducer from './Reducer';
import {DEMO_PROFILE} from '../demo/demoApi';

const initialState = {
    userData: {
        accessToken: '',
        accountStatus: '',
        exactLocation: {},
        geoAddressText: '',
        isPetDetailsAdded: false,
        isTermsAndCondition: false,
        isVerified: false,
        is_Firbase: {
            email: '',
            google_id_token: '',
            is_fireBase: false,
        },
        // Auth bypass so screens can be reviewed without the login sheet.
        is_login: true,
        is_service: false,
        is_skip: false,
        is_temp: false,
        locationAdded: false,
        mailId: '',
        name: '',
        phone: '',
        photo: '',
        profileMail: '',
        profileName: '',
        profilePhone: '',
        role: '',
        tempPk: '',
        user: {},
        cart_count: 0,
        store_add: null,
        store_name: '',
        trainer_add: null,
        ...DEMO_PROFILE,
    },
    additionalData: [], // Add your new array here
    additionalDataPetWish: [], // Add your new array here
    wishList: [],
    trainerWishList: [], // Add your new array here
    cart: [],
    readSection: {
        un_read: false,
        un_read_booking_customer: false,
        un_read_booking_provider: false,
        un_read_booking_ecom_customer: false,
        un_read_booking_ecom_provider: false,
        unread_chats: false,
        unread_chats_ecom: false,
    },
    commonModal: {
        shakeInfoModal: true,
        shakeSupportModal: false,
        ratingSubmitted: false,
        ratingDenied: false,
        appRatingModal: false,
    },
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const checkRole = role => {
        return state.roles.includes(role);
    };

    return (
        <Context.Provider value={{state, dispatch, checkRole}}>
            {children}
        </Context.Provider>
    );
};

export const Context = createContext(initialState);

export default Store;
