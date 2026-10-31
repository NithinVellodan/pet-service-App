import axios from 'axios';
import {installDemoApi} from './src/demo/demoApi';

// // #### DEVELOPER SERVER CONFIGS #### //
export const usersConfig = axios.create({
    // baseURL: 'https://pet-to-place.talrop.works/api/v1/users/',
    // baseURL: 'http://192.168.1.7:8005/api/v1/users/',
    baseURL: 'https://petme.alwafaagroup.com/api/v1/users/',
});

export const usersConfigFireBaseLogin = axios.create({
    // baseURL: 'https://pet-to-place.talrop.works/api/v1/auth/',
    // baseURL: 'http://192.168.1.7:8005/api/v1/auth/',
    baseURL: 'https://petme.alwafaagroup.com/api/v1/auth/',
});

export const usersConfigCustomer = axios.create({
    // baseURL: 'https://pet-to-place.talrop.works/api/v1/customers/',
    // baseURL: 'http://192.168.1.7:8005/api/v1/customers/',
    baseURL: 'https://petme.alwafaagroup.com/api/v1/customers/',
});

export const usersConfigGeneral = axios.create({
    // baseURL: 'https://pet-to-place.talrop.works/api/v1/general/',
    // baseURL: 'http://192.168.1.7:8005/api/v1/general/',
    baseURL: 'https://petme.alwafaagroup.com/api/v1/general/',
});

export const serviceProviderConfig = axios.create({
    // baseURL: 'https://pet-to-place.talrop.works/api/v1/service-providers/',
    // baseURL: 'http://192.168.1.7:8005/api/v1/service-providers/',
    baseURL: 'https://petme.alwafaagroup.com/api/v1/service-providers/',
});

export const ecommerceApiServiceProvider = axios.create({
    // baseURL:
    //     'https://pet-to-place.talrop.works/api/v1/e-commerce/service-providers/',
    // baseURL: 'http://192.168.1.7:8005/api/v1/e-commerce/service-providers/',
    baseURL:
        'https://petme.alwafaagroup.com/api/v1/e-commerce/service-providers/',
});

export const ecommerceApiCustomers = axios.create({
    // baseURL: 'https://pet-to-place.talrop.works/api/v1/e-commerce/customers/',
    // baseURL: 'http://192.168.1.7:8005/api/v1/e-commerce/customers/',
    baseURL: 'https://petme.alwafaagroup.com/api/v1/e-commerce/customers/',
});

export const fetchDataCalendar = () => {
    return {
        // baseURL: 'https://pet-to-place.talrop.works/api/v1/customers/',
        // baseURL: 'http://192.168.1.7:8005/api/v1/customers/',
        baseURL: 'https://petme.alwafaagroup.com/api/v1/customers/',
    };
};

installDemoApi([
    usersConfig,
    usersConfigFireBaseLogin,
    usersConfigCustomer,
    usersConfigGeneral,
    serviceProviderConfig,
    ecommerceApiServiceProvider,
    ecommerceApiCustomers,
]);
